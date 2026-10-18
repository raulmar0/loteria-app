import { useEffect, useState } from 'react';

/**
 * Keeps an overlay mounted for `exitMs` after `open` turns false so it can
 * play its exit animation (the reverse of its entrance) before unmounting.
 * `exitMs` must match the CSS duration of the `.closing` animation.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    // With reduced motion the exit animation is disabled, so unmount at once.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setMounted(false);
      return;
    }
    // A little slack so the animation's final frame paints before unmounting.
    const id = window.setTimeout(() => setMounted(false), exitMs + 50);
    return () => window.clearTimeout(id);
  }, [open, exitMs]);

  return { mounted: open || mounted, closing: !open && mounted };
}
