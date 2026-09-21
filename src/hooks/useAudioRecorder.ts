import { useCallback, useEffect, useRef, useState } from 'react';
import { MAX_RECORD_MS, classifyMicError, pickRecorderMime, type CardAudioError } from '../lib/cardAudio';

const TICK_MS = 100;

interface UseAudioRecorderOpts {
  onComplete: (key: number, blob: Blob, durationMs: number) => void;
}

export interface UseAudioRecorderResult {
  supported: boolean;
  /** Which card is being recorded right now, or null. */
  recordingKey: number | null;
  elapsedMs: number;
  error: CardAudioError | null;
  start: (key: number) => void;
  /** Finish and hand the clip to `onComplete`. */
  stop: () => void;
  /** Finish and throw the clip away. */
  cancel: () => void;
  clearError: () => void;
}

export function useAudioRecorder({ onComplete }: UseAudioRecorderOpts): UseAudioRecorderResult {
  const supported =
    typeof window !== 'undefined'
    && typeof MediaRecorder !== 'undefined'
    && typeof navigator !== 'undefined'
    && Boolean(navigator.mediaDevices?.getUserMedia);

  const [recordingKey, setRecordingKey] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<CardAudioError | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef(0);
  const discardRef = useRef(false);
  // getUserMedia is async: without this a double tap would open two streams.
  const startingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const autoStopRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (autoStopRef.current !== null) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }
  }, []);

  const releaseStream = useCallback(() => {
    // Stopping the tracks is what turns the browser's recording dot back off.
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }, []);

  const finishRecorder = useCallback(
    (discard: boolean) => {
      const recorder = recorderRef.current;
      discardRef.current = discard;
      clearTimers();

      if (!recorder || recorder.state === 'inactive') {
        recorderRef.current = null;
        releaseStream();
        setRecordingKey(null);
        setElapsedMs(0);
        return;
      }

      try {
        recorder.stop();
      } catch {
        recorderRef.current = null;
        releaseStream();
        setRecordingKey(null);
        setElapsedMs(0);
      }
    },
    [clearTimers, releaseStream]
  );

  const start = useCallback(
    (key: number) => {
      if (recorderRef.current || startingRef.current) return;
      setError(null);

      if (!supported) {
        // Outside a secure context the mic API isn't even exposed, and that
        // needs a different explanation than "your browser can't do this".
        setError(typeof window !== 'undefined' && !window.isSecureContext ? 'mic-insecure' : 'mic-failed');
        return;
      }

      startingRef.current = true;
      void (async () => {
        let stream: MediaStream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
          });
        } catch (err) {
          startingRef.current = false;
          setError(classifyMicError(err));
          return;
        }

        const mimeType = pickRecorderMime(type => MediaRecorder.isTypeSupported(type));
        let recorder: MediaRecorder;
        try {
          recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        } catch (err) {
          startingRef.current = false;
          stream.getTracks().forEach(track => track.stop());
          setError(classifyMicError(err));
          return;
        }

        streamRef.current = stream;
        recorderRef.current = recorder;
        chunksRef.current = [];
        discardRef.current = false;
        startedAtRef.current = performance.now();

        recorder.ondataavailable = event => {
          if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
        };

        recorder.onstop = () => {
          const durationMs = Math.round(performance.now() - startedAtRef.current);
          const chunks = chunksRef.current;
          const discard = discardRef.current;

          chunksRef.current = [];
          recorderRef.current = null;
          clearTimers();
          releaseStream();
          setRecordingKey(null);
          setElapsedMs(0);

          if (discard || chunks.length === 0) return;
          const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || 'audio/webm' });
          if (blob.size === 0) return;
          onCompleteRef.current(key, blob, durationMs);
        };

        recorder.onerror = () => {
          setError('mic-failed');
          finishRecorder(true);
        };

        try {
          recorder.start();
        } catch (err) {
          recorderRef.current = null;
          startingRef.current = false;
          releaseStream();
          setError(classifyMicError(err));
          return;
        }

        startingRef.current = false;
        setRecordingKey(key);
        setElapsedMs(0);
        intervalRef.current = window.setInterval(() => {
          setElapsedMs(performance.now() - startedAtRef.current);
        }, TICK_MS);
        autoStopRef.current = window.setTimeout(() => finishRecorder(false), MAX_RECORD_MS);
      })();
    },
    [supported, clearTimers, finishRecorder, releaseStream]
  );

  const stop = useCallback(() => finishRecorder(false), [finishRecorder]);
  const cancel = useCallback(() => finishRecorder(true), [finishRecorder]);
  const clearError = useCallback(() => setError(null), []);

  useEffect(
    () => () => {
      clearTimers();
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        discardRef.current = true;
        try { recorder.stop(); } catch { /* noop */ }
      }
      recorderRef.current = null;
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    },
    [clearTimers]
  );

  return { supported, recordingKey, elapsedMs, error, start, stop, cancel, clearError };
}
