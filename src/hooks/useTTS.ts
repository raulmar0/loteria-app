import { useCallback, useEffect, useRef, useState } from 'react';
import type { Language } from '../types';

interface UseTTSOpts {
  enabled: boolean;
  language: Language;
}

interface SpeakOptions {
  onEnd?: () => void;
  /** Speak even when the voice setting is off (used by the audio previews). */
  force?: boolean;
}

interface UseTTSResult {
  speak: (text: string, options?: SpeakOptions) => boolean;
  cancel: () => void;
  ready: boolean;
  supported: boolean;
}

function pickVoice(language: Language, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const prefix = language === 'es' ? 'es' : 'en';
  const preferred = language === 'es' ? ['es-MX', 'es-US', 'es-ES'] : ['en-US', 'en-GB', 'en-AU'];
  for (const tag of preferred) {
    const exact = voices.find(v => v.lang.toLowerCase() === tag.toLowerCase());
    if (exact) return exact;
  }
  return voices.find(v => v.lang.toLowerCase().startsWith(prefix));
}

export function useTTS({ enabled, language }: UseTTSOpts): UseTTSResult {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [ready, setReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    const refresh = () => {
      const voices = synth.getVoices();
      voiceRef.current = pickVoice(language, voices);
      if (voices.length > 0) setReady(true);
    };

    refresh();
    synth.addEventListener('voiceschanged', refresh);
    const fallback = window.setTimeout(() => setReady(true), 1000);

    return () => {
      synth.removeEventListener('voiceschanged', refresh);
      window.clearTimeout(fallback);
    };
  }, [supported, language]);

  useEffect(() => {
    if (!supported) return;
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        try { window.speechSynthesis.resume(); } catch { /* noop */ }
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [supported]);

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (!supported || !text) return false;
      if (!enabled && !options?.force) return false;
      try {
        const synth = window.speechSynthesis;
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = language === 'es' ? 'es-MX' : 'en-US';
        utter.rate = 0.95;
        utter.pitch = 1.0;
        if (voiceRef.current) utter.voice = voiceRef.current;
        utter.onend = () => options?.onEnd?.();
        utter.onerror = () => options?.onEnd?.();
        synth.speak(utter);
        return true;
      } catch (err) {
        console.warn('TTS speak failed', err);
        return false;
      }
    },
    [supported, enabled, language]
  );

  const cancel = useCallback(() => {
    if (!supported) return;
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
  }, [supported]);

  return { speak, cancel, ready, supported };
}
