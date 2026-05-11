import { registerSW } from 'virtual:pwa-register';

type UpdateSW = (reloadPage?: boolean) => Promise<void>;

let updateSW: UpdateSW | null = null;

export function registerPwaServiceWorker(): void {
  if (updateSW) return;
  if (typeof window === 'undefined' || !('serviceWorker' in window.navigator)) return;
  updateSW = registerSW({ immediate: true });
}

export async function triggerPwaUpdate(): Promise<void> {
  try {
    const reg = await window.navigator.serviceWorker?.getRegistration?.();
    if (reg) {
      await reg.update();
    }
    // Give a freshly-detected SW a moment to enter the installing/waiting state
    // so the upcoming reload picks up the new version.
    await new Promise(resolve => setTimeout(resolve, 400));
  } finally {
    window.location.reload();
  }
}
