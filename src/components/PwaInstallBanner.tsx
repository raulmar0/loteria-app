import { useState } from 'react';
import type { PwaInstallOutcome } from '../lib/pwaInstall';
import type { FontPair } from '../types';

const DISMISSED_KEY = 'loteria:pwa-install-banner-dismissed';

interface Props {
  fonts: FontPair;
  message: string;
  installLabel: string;
  dismissLabel: string;
  canInstall: boolean;
  installing: boolean;
  onInstall: () => Promise<PwaInstallOutcome>;
}

export function PwaInstallBanner({
  fonts,
  message,
  installLabel,
  dismissLabel,
  canInstall,
  installing,
  onInstall,
}: Props) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.localStorage.getItem(DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Ignore storage failures; the in-memory dismissed state still hides it.
    }
  };

  const handleInstall = async () => {
    const outcome = await onInstall();

    if (outcome === 'accepted') {
      handleDismiss();
    }
  };

  if (dismissed || !canInstall) return null;

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
      <button
        type="button"
        className="pwa-banner-install"
        onClick={handleInstall}
        disabled={installing}
        style={{ fontFamily: fonts.head }}
      >
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
