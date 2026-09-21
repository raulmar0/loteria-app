/**
 * Reads a clip's length by loading its metadata in a throwaway <audio>.
 *
 * Returns 0 rather than throwing when the browser can't tell: MediaRecorder
 * webm files famously report `Infinity`, and a missing duration is only a
 * cosmetic loss in the list.
 */
export function probeAudioDuration(blob: Blob, timeoutMs = 4000): Promise<number> {
  return new Promise(resolve => {
    if (typeof Audio === 'undefined' || typeof URL.createObjectURL !== 'function') {
      resolve(0);
      return;
    }

    const url = URL.createObjectURL(blob);
    const el = new Audio();
    let settled = false;

    const finish = (durationMs: number) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      el.removeAttribute('src');
      el.load();
      URL.revokeObjectURL(url);
      resolve(durationMs);
    };

    const timer = window.setTimeout(() => finish(0), timeoutMs);

    el.preload = 'metadata';
    el.onloadedmetadata = () => {
      const seconds = el.duration;
      finish(Number.isFinite(seconds) && seconds > 0 ? Math.round(seconds * 1000) : 0);
    };
    el.onerror = () => finish(0);
    el.src = url;
  });
}
