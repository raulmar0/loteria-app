import { PALETTES } from '../data/palettes';

interface Props {
  color: string;
  count?: number;
}

export function PapelPicado({ color, count = 7 }: Props) {
  const accents = [
    PALETTES.fiesta.accent,
    PALETTES.fiesta.accent2,
    PALETTES.fiesta.accent3,
    PALETTES.fiesta.accent4,
  ];

  return (
    <div className="papel" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const c = accents[i % accents.length];
        return (
          <svg key={i} viewBox="0 0 40 50" className="papel-flag" style={{ color: c }}>
            <path d="M0 0 L40 0 L40 30 L20 46 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="14" r="4" fill={color} />
            <circle cx="10" cy="22" r="2.5" fill={color} />
            <circle cx="30" cy="22" r="2.5" fill={color} />
            <path d="M14 30 L20 36 L26 30 L20 24 Z" fill={color} />
            <circle cx="12" cy="10" r="1.5" fill={color} />
            <circle cx="28" cy="10" r="1.5" fill={color} />
          </svg>
        );
      })}
    </div>
  );
}
