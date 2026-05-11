import { useCallback, useEffect, useState } from 'react';
import { TWEAK_DEFAULTS, type Tweaks } from '../types';

const STORAGE_KEY = 'loteria.tweaks.v1';

function readStored(): Tweaks {
  if (typeof localStorage === 'undefined') return TWEAK_DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return TWEAK_DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Tweaks>;
    return { ...TWEAK_DEFAULTS, ...parsed };
  } catch {
    return TWEAK_DEFAULTS;
  }
}

export function useTweaks() {
  const [tweaks, setTweaks] = useState<Tweaks>(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
    } catch {
      // Safari private mode or quota — ignore
    }
  }, [tweaks]);

  const setTweak = useCallback(
    <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
      setTweaks(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetTweaks = useCallback(() => setTweaks(TWEAK_DEFAULTS), []);

  return { tweaks, setTweak, resetTweaks } as const;
}
