import { useCallback, useEffect, useState } from 'react';
import { isIos, isStandalonePwa, promptPwaInstall, type PwaInstallOutcome, type PwaInstallPrompt } from '../lib/pwaInstall';

type BeforeInstallPromptEvent = Event & PwaInstallPrompt;

function getInitialInstalledState(): boolean {
  const displayModeStandalone = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
  const navigatorStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone;

  return isStandalonePwa(displayModeStandalone, navigatorStandalone);
}

export function usePwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<PwaInstallPrompt | null>(null);
  const [installed, setInstalled] = useState(getInitialInstalledState);
  const [installing, setInstalling] = useState(false);
  const [isIosBrowser] = useState(() => isIos());

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstalled(false);
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = useCallback(async (): Promise<PwaInstallOutcome> => {
    if (!installPrompt || installing) return 'unavailable';

    setInstalling(true);
    try {
      const outcome = await promptPwaInstall(installPrompt);
      setInstallPrompt(null);

      if (outcome === 'accepted') {
        setInstalled(true);
      }

      return outcome;
    } finally {
      setInstalling(false);
    }
  }, [installPrompt, installing]);

  return {
    canInstall: Boolean(installPrompt) && !installed,
    showIosHint: isIosBrowser && !installed,
    installed,
    installing,
    install,
  };
}
