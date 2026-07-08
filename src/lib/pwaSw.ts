import { registerSW } from 'virtual:pwa-register';
import { findFreshServiceWorker, waitForServiceWorkerActivation } from './swLifecycle';

type UpdateSW = (reloadPage?: boolean) => Promise<void>;

let updateSW: UpdateSW | null = null;

export function registerPwaServiceWorker(): void {
  if (updateSW) return;
  if (typeof window === 'undefined' || !('serviceWorker' in window.navigator)) return;
  updateSW = registerSW({ immediate: true });
}

// A fresh service worker must download and precache every app asset before it
// can activate, which can take several seconds on a slow connection.
const ACTIVATION_TIMEOUT_MS = 20_000;
const UPDATE_FOUND_GRACE_MS = 500;

/**
 * Checks for a new app version and reloads into it. Resolves with false when
 * a fresh worker was found but is still installing after the timeout — the
 * page must then stay open (the autoUpdate register code reloads on its
 * `activated` event, but only tracks workers found while the page is alive;
 * reloading mid-install would be served by the OLD worker's precache and
 * bring the same version back).
 */
export async function triggerPwaUpdate(): Promise<boolean> {
  const reg = await window.navigator.serviceWorker?.getRegistration?.();
  const fresh = reg ? await findFreshServiceWorker(reg, UPDATE_FOUND_GRACE_MS) : null;
  if (fresh) {
    const settled = await waitForServiceWorkerActivation(fresh, ACTIVATION_TIMEOUT_MS);
    if (!settled) return false;
  }
  window.location.reload();
  return true;
}
