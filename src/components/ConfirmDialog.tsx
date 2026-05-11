import { useEffect, useId, useRef } from 'react';
import type { FontPair, Palette } from '../types';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  palette: Palette;
  fonts: FontPair;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  palette,
  fonts,
}: Props) {
  const titleId = useId();
  const messageId = useId();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };

    document.addEventListener('keydown', onKey);
    cancelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        onClick={e => e.stopPropagation()}
      >
        <h2 id={titleId} style={{ fontFamily: fonts.head }}>
          {title}
        </h2>
        <p id={messageId} style={{ fontFamily: fonts.body }}>
          {message}
        </p>
        <div className="confirm-actions">
          <button
            ref={cancelRef}
            type="button"
            className="confirm-btn confirm-cancel"
            onClick={onCancel}
            style={{ fontFamily: fonts.head }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="confirm-btn confirm-danger"
            onClick={onConfirm}
            style={{ fontFamily: fonts.head, background: palette.accent }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
