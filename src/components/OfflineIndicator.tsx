import { useNetworkStatus } from '../hooks/useNetworkStatus';
import type { FontPair } from '../types';

interface Props {
  fonts: FontPair;
  offlineLabel: string;
  onlineLabel: string;
}

export function OfflineIndicator({ fonts, offlineLabel, onlineLabel }: Props) {
  const isOnline = useNetworkStatus();

  return (
    <div
      className="network-status"
      role="status"
      aria-live="polite"
      aria-label={isOnline ? onlineLabel : offlineLabel}
      data-online={isOnline}
      style={{ fontFamily: fonts.body }}
    >
      <span className="network-dot" aria-hidden="true" />
      <span className="network-text">{isOnline ? onlineLabel : offlineLabel}</span>
    </div>
  );
}
