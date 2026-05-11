import { BottomSheet } from './BottomSheet';
import type { Card, FontPair, Language, Palette } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  called: Card[];
  language: Language;
  palette: Palette;
  fonts: FontPair;
  onPillClick: (card: Card) => void;
  title: string;
  closeLabel: string;
  emptyLabel: string;
}

export function HistorySheet({
  open,
  onClose,
  called,
  language,
  palette,
  fonts,
  onPillClick,
  title,
  closeLabel,
  emptyLabel,
}: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} titleFont={fonts.head} closeLabel={closeLabel}>
      {called.length === 0 ? (
        <div className="empty-state" style={{ fontFamily: fonts.body }}>{emptyLabel}</div>
      ) : (
        <div className="hist-list">
          {called.map((card, i) => (
            <button
              key={`${card.n}-${i}`}
              type="button"
              className="hist-pill"
              style={{ borderColor: card.color, background: `${card.color}10` }}
              onClick={() => onPillClick(card)}
            >
              <span className="hist-num" style={{ background: card.color, fontFamily: fonts.head }}>{card.n}</span>
              <span className="hist-name" style={{ fontFamily: fonts.body, color: palette.ink }}>
                {language === 'es' ? card.es : card.en}
              </span>
            </button>
          ))}
        </div>
      )}
    </BottomSheet>
  );
}
