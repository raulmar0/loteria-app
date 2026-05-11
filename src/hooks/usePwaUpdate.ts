import { useCallback, useState } from 'react';
import { triggerPwaUpdate } from '../lib/pwaSw';

interface UsePwaUpdateResult {
  supported: boolean;
  updating: boolean;
  update: () => Promise<void>;
}

export function usePwaUpdate(): UsePwaUpdateResult {
  const supported = typeof window !== 'undefined' && 'serviceWorker' in window.navigator;
  const [updating, setUpdating] = useState(false);

  const update = useCallback(async () => {
    if (updating) return;
    setUpdating(true);
    try {
      await triggerPwaUpdate();
    } catch {
      window.location.reload();
    }
  }, [updating]);

  return { supported, updating, update };
}
