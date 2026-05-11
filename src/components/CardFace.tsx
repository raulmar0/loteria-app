import { LoteriaIcon } from './LoteriaIcon';
import { chooseIconFill } from '../lib/colorContrast';
import type { Card, FontPair, Language, Palette } from '../types';

interface Props {
  card: Card | null;
  language: Language;
  showVerse: boolean;
  palette: Palette;
  fonts: FontPair;
  emptyLabel: string;
}

export function CardFace({ card, language, showVerse, palette, fonts, emptyLabel }: Props) {
  if (!card) {
    return (
      <div className="card-face empty">
        <div className="card-empty-inner">
          <div className="card-empty-glyph" aria-hidden="true">⌂</div>
          <div className="card-empty-text" style={{ fontFamily: fonts.body }}>{emptyLabel}</div>
        </div>
      </div>
    );
  }

  const name = language === 'es' ? card.es : card.en;
  const verse = language === 'es' ? card.verseEs : card.verseEn;
  const iconColor = chooseIconFill(card.color, palette.paper, palette.ink);

  return (
    <div className="card-face" key={card.n}>
      <div className="card-frame" style={{ borderColor: card.color }}>
        <div className="card-number" style={{ background: card.color, fontFamily: fonts.head }}>
          {String(card.n).padStart(2, '0')}
        </div>
        <div className="card-corner tl" style={{ borderColor: card.color }} />
        <div className="card-corner tr" style={{ borderColor: card.color }} />
        <div className="card-corner bl" style={{ borderColor: card.color }} />
        <div className="card-corner br" style={{ borderColor: card.color }} />

        <div className="card-icon-wrap" style={{ background: `${card.color}15` }}>
          <div className="card-icon-bg" style={{ background: card.color }} />
          <LoteriaIcon name={card.icon} color={iconColor} accent={card.color} size={180} />
        </div>

        <div className="card-name" style={{ fontFamily: fonts.head, color: card.color }}>{name}</div>

        {showVerse && (
          <div className="card-verse" style={{ fontFamily: fonts.body, color: palette.inkSoft }}>
            <span className="verse-quote" style={{ color: card.color }}>“</span>
            {verse}
            <span className="verse-quote close" style={{ color: card.color }}>”</span>
          </div>
        )}
      </div>
    </div>
  );
}
