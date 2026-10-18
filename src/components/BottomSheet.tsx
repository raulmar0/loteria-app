import { useEffect, useRef, type ReactNode } from 'react';
import { usePresence } from '../hooks/usePresence';

// Keep in sync with the `.sheet-backdrop.closing` animations in global.css.
const SHEET_EXIT_MS = 220;

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  titleFont: string;
  closeLabel: string;
  /** `tall` gives list-heavy sheets more room than the default 75%. */
  size?: 'default' | 'tall';
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, titleFont, closeLabel, size = 'default', children }: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { mounted, closing } = usePresence(open, SHEET_EXIT_MS);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);

    // Focus the sheet itself for screen readers. preventScroll: the sheet starts
    // below the screen, and a scroll-into-view would drag the whole app up
    // (.app-root is overflow:hidden but still scrollable) instead of letting
    // the sheet slide in.
    sheetRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener('keydown', onKey);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`sheet-backdrop${closing ? ' closing' : ''}`}
      onClick={onClose}
      role="presentation"
      aria-hidden={closing || undefined}
    >
      <div
        className={`sheet${size === 'tall' ? ' sheet-tall' : ''}`}
        ref={sheetRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={e => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 style={{ fontFamily: titleFont }}>{title}</h2>
          <button type="button" className="sheet-close" onClick={onClose} aria-label={closeLabel}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18"/>
              <line x1="6" y1="18" x2="18" y2="6"/>
            </svg>
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}
