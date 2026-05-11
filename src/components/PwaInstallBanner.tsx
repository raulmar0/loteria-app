import { useEffect, useState } from 'react';
import type { FontPair } from '../types';

const DISMISSED_KEY = 'loteria:pwa-install-banner-dismissed';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface Props {
  fonts: FontPair;
  message: string;
  installLabel: string;
  dismissLabel: string;
}

export function PwaInstallBanner({ fonts, message, installLabel, dismissLabel }: Props) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.localStorage.getItem(DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dismissed) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setInstallPrompt(null);
    try {
      window.localStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Ignore storage failures; the in-memory dismissed state still hides it.
    }
  };

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    setInstallPrompt(null);

    if (outcome === 'accepted') {
      handleDismiss();
    }
  };

  if (dismissed || !installPrompt) return null;

  return (
    <section className="pwa-banner" aria-label={message}>
      <div className="pwa-banner-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      </div>
      <p className="pwa-banner-message" style={{ fontFamily: fonts.body }}>
        {message}
      </p>
      <button type="button" className="pwa-banner-install" onClick={handleInstall} style={{ fontFamily: fonts.head }}>
        {installLabel}
      </button>
      <button type="button" className="pwa-banner-dismiss" onClick={handleDismiss} aria-label={dismissLabel}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </section>
  );
}
