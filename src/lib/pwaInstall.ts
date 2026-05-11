export type PwaInstallOutcome = 'accepted' | 'dismissed' | 'unavailable';

export interface PwaInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: Exclude<PwaInstallOutcome, 'unavailable'>; platform: string }>;
}

export function isStandalonePwa(displayModeStandalone: boolean, navigatorStandalone: boolean | undefined): boolean {
  return displayModeStandalone || navigatorStandalone === true;
}

export function isIos(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Macintosh') && 'ontouchend' in document);
}

export async function promptPwaInstall(installPrompt: PwaInstallPrompt | null): Promise<PwaInstallOutcome> {
  if (!installPrompt) return 'unavailable';

  await installPrompt.prompt();
  const { outcome } = await installPrompt.userChoice;
  return outcome;
}
