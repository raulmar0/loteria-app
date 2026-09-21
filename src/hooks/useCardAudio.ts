import { useCallback, useEffect, useRef, useState } from 'react';
import { probeAudioDuration } from '../lib/audioDuration';
import { classifyStorageError, type CardAudioError } from '../lib/cardAudio';
import {
  audioStorageSupported,
  clearClips,
  deleteClip,
  loadAllMeta,
  loadClipBlob,
  saveClip,
} from '../lib/cardAudioStore';
import type { AudioSource, CardAudioMap, CardAudioMeta } from '../types';

/** An empty WAV, used only to unlock playback inside a user gesture. */
const SILENT_WAV =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=';

interface UseCardAudioOpts {
  /** Mirrors the voice + custom-audio settings; previews pass `force`. */
  enabled: boolean;
}

interface PlayOpts {
  onEnd?: () => void;
  /** Play even when the setting is off (used by the preview buttons). */
  force?: boolean;
}

interface SaveInfo {
  source: AudioSource;
  name: string;
  /** Measured length for recordings; 0 lets the hook probe the blob. */
  durationMs: number;
}

export interface UseCardAudioResult {
  supported: boolean;
  ready: boolean;
  clips: CardAudioMap;
  playingKey: number | null;
  has: (key: number) => boolean;
  play: (key: number, opts?: PlayOpts) => boolean;
  stop: () => void;
  prime: () => void;
  save: (key: number, blob: Blob, info: SaveInfo) => Promise<CardAudioError | null>;
  remove: (key: number) => Promise<CardAudioError | null>;
  clearAll: () => Promise<CardAudioError | null>;
}

export function useCardAudio({ enabled }: UseCardAudioOpts): UseCardAudioResult {
  const supported = audioStorageSupported();
  const [clips, setClips] = useState<CardAudioMap>({});
  const [ready, setReady] = useState(!supported);
  const [playingKey, setPlayingKey] = useState<number | null>(null);

  const clipsRef = useRef<CardAudioMap>(clips);
  const urlsRef = useRef(new Map<number, string>());
  const elementRef = useRef<HTMLAudioElement | null>(null);
  const primedRef = useRef(false);
  // Every playback gets a token; late async steps from an older play are
  // ignored so a card called during a previous clip never gets stepped on.
  const tokenRef = useRef(0);
  const onEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    clipsRef.current = clips;
  }, [clips]);

  useEffect(() => {
    if (!supported) return;
    let cancelled = false;

    loadAllMeta()
      .then(loaded => {
        if (cancelled) return;
        setClips(loaded);
      })
      .catch(err => {
        console.warn('Custom audio unavailable', err);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => { cancelled = true; };
  }, [supported]);

  const finishPlayback = useCallback((token: number) => {
    if (token !== tokenRef.current) return;
    const onEnd = onEndRef.current;
    onEndRef.current = null;
    setPlayingKey(null);
    onEnd?.();
  }, []);

  const getElement = useCallback((): HTMLAudioElement | null => {
    if (elementRef.current) return elementRef.current;
    if (typeof Audio === 'undefined') return null;

    const el = new Audio();
    el.preload = 'auto';
    el.addEventListener('ended', () => finishPlayback(tokenRef.current));
    el.addEventListener('error', () => finishPlayback(tokenRef.current));
    elementRef.current = el;
    return el;
  }, [finishPlayback]);

  const revokeUrl = useCallback((key: number) => {
    const url = urlsRef.current.get(key);
    if (!url) return;
    URL.revokeObjectURL(url);
    urlsRef.current.delete(key);
  }, []);

  const revokeAllUrls = useCallback(() => {
    for (const url of urlsRef.current.values()) URL.revokeObjectURL(url);
    urlsRef.current.clear();
  }, []);

  const stop = useCallback(() => {
    tokenRef.current += 1;
    onEndRef.current = null;
    setPlayingKey(null);
    const el = elementRef.current;
    if (!el) return;
    try {
      el.pause();
    } catch {
      /* noop */
    }
  }, []);

  /**
   * Browsers only allow programmatic playback once the element has played
   * inside a user gesture — the deck advances on a timer, so the play/next
   * buttons warm it up with a silent clip.
   */
  const prime = useCallback(() => {
    if (primedRef.current) return;
    const el = getElement();
    if (!el) return;

    primedRef.current = true;
    const token = tokenRef.current;
    const release = () => {
      // Only undo the priming if no real clip started in the meantime.
      if (tokenRef.current !== token) return;
      try { el.pause(); } catch { /* noop */ }
      el.muted = false;
    };

    try {
      el.muted = true;
      el.src = SILENT_WAV;
      const started = el.play();
      if (started) {
        started.then(release).catch(() => {
          // Blocked: let the next gesture try again.
          primedRef.current = false;
          el.muted = false;
        });
      } else {
        release();
      }
    } catch {
      primedRef.current = false;
      el.muted = false;
    }
  }, [getElement]);

  const ensureUrl = useCallback(async (key: number): Promise<string | null> => {
    const cached = urlsRef.current.get(key);
    if (cached) return cached;

    const blob = await loadClipBlob(key);
    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    urlsRef.current.set(key, url);
    return url;
  }, []);

  /**
   * The clip lookup is async (IndexedDB), but callers need a synchronous
   * yes/no to decide whether to fall back to speech — so `play` answers from
   * the metadata it already has and finishes the work in the background.
   */
  const play = useCallback(
    (key: number, opts?: PlayOpts): boolean => {
      if (!supported) return false;
      if (!enabled && !opts?.force) return false;
      if (!clipsRef.current[key]) return false;

      tokenRef.current += 1;
      const token = tokenRef.current;
      onEndRef.current = opts?.onEnd ?? null;
      setPlayingKey(key);

      void (async () => {
        const el = getElement();
        if (!el) {
          finishPlayback(token);
          return;
        }

        try {
          const url = await ensureUrl(key);
          if (token !== tokenRef.current) return;
          if (!url) {
            finishPlayback(token);
            return;
          }

          // Assigning src restarts the clip even when it is the same one.
          el.muted = false;
          el.src = url;
          await el.play();
        } catch (err) {
          if (token !== tokenRef.current) return;
          console.warn('Custom audio playback failed', err);
          finishPlayback(token);
        }
      })();

      return true;
    },
    [supported, enabled, ensureUrl, finishPlayback, getElement]
  );

  const save = useCallback(
    async (key: number, blob: Blob, info: SaveInfo): Promise<CardAudioError | null> => {
      if (!supported) return 'unsupported';

      const durationMs = info.durationMs > 0 ? info.durationMs : await probeAudioDuration(blob);
      const meta: CardAudioMeta = {
        key,
        mime: blob.type || 'audio/webm',
        bytes: blob.size,
        durationMs: Math.round(durationMs),
        source: info.source,
        name: info.name,
        updatedAt: Date.now(),
      };

      try {
        await saveClip(meta, blob);
      } catch (err) {
        console.warn('Saving custom audio failed', err);
        return classifyStorageError(err);
      }

      revokeUrl(key);
      urlsRef.current.set(key, URL.createObjectURL(blob));
      setClips(prev => ({ ...prev, [key]: meta }));
      return null;
    },
    [supported, revokeUrl]
  );

  const remove = useCallback(
    async (key: number): Promise<CardAudioError | null> => {
      if (!supported) return 'unsupported';

      try {
        await deleteClip(key);
      } catch (err) {
        console.warn('Deleting custom audio failed', err);
        return classifyStorageError(err);
      }

      revokeUrl(key);
      setClips(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      stop();
      return null;
    },
    [supported, revokeUrl, stop]
  );

  const clearAll = useCallback(async (): Promise<CardAudioError | null> => {
    if (!supported) return 'unsupported';

    try {
      await clearClips();
    } catch (err) {
      console.warn('Clearing custom audio failed', err);
      return classifyStorageError(err);
    }

    revokeAllUrls();
    setClips({});
    stop();
    return null;
  }, [supported, revokeAllUrls, stop]);

  const has = useCallback((key: number) => Boolean(clipsRef.current[key]), []);

  useEffect(
    () => () => {
      tokenRef.current += 1;
      onEndRef.current = null;
      try { elementRef.current?.pause(); } catch { /* noop */ }
      revokeAllUrls();
    },
    [revokeAllUrls]
  );

  return { supported, ready, clips, playingKey, has, play, stop, prime, save, remove, clearAll };
}
