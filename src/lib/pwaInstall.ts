export type PwaInstallOutcome = 'accepted' | 'dismissed' | 'unavailable';

export interface PwaInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: Exclude<PwaInstallOutcome, 'unavailable'>; platform: string }>;
}

export function isStandalonePwa(displayModeStandalone: boolean, navigatorStandalone: boolean | undefined): boolean {
  return displayModeStandalone || navigatorStandalone === true;
}

export async function promptPwaInstall(installPrompt: PwaInstallPrompt | null): Promise<PwaInstallOutcome> {
  if (!installPrompt) return 'unavailable';

  await installPrompt.prompt();
  const { outcome } = await installPrompt.userChoice;
  return outcome;
}
