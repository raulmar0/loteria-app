import type { ReactNode } from 'react';
import type { IconName } from '../../types';

type IconRenderer = (fill: string, accent: string) => ReactNode;

const ROUND = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function face(accent: string, cx = 50, cy = 40, mood: 'smile' | 'serious' | 'sleepy' = 'smile') {
  const mouth =
    mood === 'serious'
      ? <path d={`M${cx - 6} ${cy + 9} L${cx + 6} ${cy + 9}`} stroke={accent} strokeWidth="2" {...ROUND} />
      : mood === 'sleepy'
        ? <path d={`M${cx - 6} ${cy + 9} Q${cx} ${cy + 7} ${cx + 6} ${cy + 9}`} stroke={accent} strokeWidth="2" fill="none" {...ROUND} />
        : <path d={`M${cx - 7} ${cy + 9} Q${cx} ${cy + 14} ${cx + 7} ${cy + 9}`} stroke={accent} strokeWidth="2" fill="none" {...ROUND} />;

  return (
    <>
      <circle cx={cx - 6} cy={cy - 1} r="2.2" fill={accent} />
      <circle cx={cx + 6} cy={cy - 1} r="2.2" fill={accent} />
      {mouth}
    </>
  );
}

function person(fill: string, accent: string, mood: 'smile' | 'serious' | 'sleepy' = 'smile') {
  return (
    <>
      <ellipse cx="50" cy="38" rx="14" ry="15" fill={fill} />
      {face(accent, 50, 38, mood)}
      <path d="M32 90 L36 60 Q42 54 50 54 Q58 54 64 60 L68 90 Z" fill={fill} />
      <path d="M40 64 Q50 70 60 64" stroke={accent} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M44 72 L44 88 M56 72 L56 88" stroke={accent} strokeWidth="1.6" opacity="0.45" {...ROUND} />
    </>
  );
}

function plantLeaf(fill: string, d: string) {
  return <path d={d} fill={fill} />;
}

export const ICON_RENDERERS: Record<IconName, IconRenderer> = {
  gallo: (f, a) => (
    <>
      <path d="M26 60 Q18 42 30 30 Q42 18 58 28 Q72 36 72 56 Q72 76 50 82 Q34 80 26 60 Z" fill={f} />
      <path d="M22 58 Q10 52 8 64 Q12 78 30 72 Q32 64 22 58 Z" fill={f} />
      <circle cx="66" cy="32" r="12" fill={f} />
      <path d="M56 22 Q56 8 63 15 Q67 7 71 16 Q80 10 78 24 Q68 28 56 22 Z" fill={f} />
      <path d="M76 32 L92 36 L76 42 Z" fill={f} />
      <circle cx="69" cy="30" r="2.2" fill={a} />
      <path d="M40 54 Q50 64 64 58" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M42 80 L38 92 M58 80 L62 92" stroke={f} strokeWidth="4" {...ROUND} />
      <path d="M38 92 L31 94 M38 92 L42 94 M62 92 L69 94 M62 92 L58 94" stroke={f} strokeWidth="2.6" {...ROUND} />
    </>
  ),

  diablito: (f, a) => (
    <>
      <path d="M28 30 L18 12 L38 24 M72 30 L82 12 L62 24" fill={f} />
      <path d="M22 50 Q22 22 50 22 Q78 22 78 50 Q78 70 62 78 L66 90 L56 82 L50 91 L44 82 L34 90 L38 78 Q22 70 22 50 Z" fill={f} />
      <path d="M82 56 Q94 62 88 76 Q86 70 90 66 Q84 70 82 64" fill={f} />
      <ellipse cx="40" cy="48" rx="5" ry="7" fill={a} />
      <ellipse cx="60" cy="48" rx="5" ry="7" fill={a} />
      <path d="M36 36 L44 40 M64 36 L56 40" stroke={a} strokeWidth="2.6" {...ROUND} />
      <path d="M37 64 Q50 72 63 64 L58 72 L50 68 L42 72 Z" fill={a} />
    </>
  ),

  dama: (f, a) => (
    <>
      <path d="M24 34 Q24 14 50 14 Q76 14 76 34 Q72 42 64 42 Q58 50 50 50 Q42 50 36 42 Q28 42 24 34 Z" fill={f} />
      {face(a, 50, 39)}
      <path d="M36 58 Q50 52 64 58 L78 90 L56 90 L50 70 L44 90 L22 90 Z" fill={f} />
      <path d="M36 28 Q44 22 50 24 Q56 22 64 28" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <circle cx="50" cy="67" r="2.4" fill={a} opacity="0.65" />
    </>
  ),

  catrin: (f, a) => (
    <>
      <rect x="34" y="10" width="32" height="16" rx="2" fill={f} />
      <rect x="26" y="24" width="48" height="6" rx="2" fill={f} />
      <ellipse cx="50" cy="43" rx="14" ry="15" fill={f} />
      {face(a, 50, 42, 'serious')}
      <path d="M35 59 L35 90 L65 90 L65 59 L58 56 L52 62 L50 58 L48 62 L42 56 Z" fill={f} />
      <path d="M46 60 L50 70 L54 60 M50 70 L50 90" stroke={a} strokeWidth="1.8" fill="none" opacity="0.65" {...ROUND} />
      <circle cx="50" cy="76" r="2" fill={a} />
    </>
  ),

  paraguas: (f, a) => (
    <>
      <path d="M12 54 Q18 22 50 18 Q82 22 88 54 Q72 48 60 54 Q50 48 40 54 Q28 48 12 54 Z" fill={f} />
      <path d="M50 18 Q40 30 40 54 M50 18 Q60 30 60 54 M50 18 L50 83" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M50 54 L50 82 Q50 94 62 94 Q70 94 70 86 Q70 82 66 82 Q62 82 62 86" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <circle cx="50" cy="18" r="4" fill={f} />
    </>
  ),

  sirena: (f, a) => (
    <>
      <path d="M34 18 Q42 6 56 12 Q48 14 46 24 Q40 18 34 18 Z" fill={f} />
      <circle cx="50" cy="27" r="10" fill={f} />
      {face(a, 50, 27)}
      <path d="M36 40 Q28 34 20 42 Q30 42 34 48 Q26 54 28 64 Q36 58 42 60 Q44 54 50 54 Q56 54 58 60 Q64 58 72 64 Q74 54 66 48 Q70 42 80 42 Q72 34 64 40 Q56 36 50 38 Q44 36 36 40 Z" fill={f} />
      <path d="M40 60 Q40 74 50 80 Q60 74 60 60 Q50 64 40 60 Z" fill={f} />
      <path d="M50 80 Q32 88 22 78 Q26 90 38 92 Q46 88 50 82 Q54 88 62 92 Q74 90 78 78 Q68 88 50 80 Z" fill={f} />
      <path d="M45 62 Q46 68 50 68 M55 62 Q54 70 50 74" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
    </>
  ),

  escalera: (f, a) => (
    <>
      <path d="M26 12 L34 12 L30 90 L22 90 Z M66 12 L74 12 L78 90 L70 90 Z" fill={f} />
      <path d="M30 24 L68 24 M29 38 L69 38 M28 52 L70 52 M27 66 L71 66 M26 80 L72 80" stroke={f} strokeWidth="6" {...ROUND} />
      <path d="M32 24 L66 24 M31 52 L69 52 M30 80 L70 80" stroke={a} strokeWidth="1.6" opacity="0.45" {...ROUND} />
    </>
  ),

  botella: (f, a) => (
    <>
      <rect x="43" y="10" width="14" height="10" rx="2" fill={f} />
      <path d="M40 20 L60 20 L60 34 Q68 42 68 56 L68 84 Q68 91 61 91 L39 91 Q32 91 32 84 L32 56 Q32 42 40 34 Z" fill={f} />
      <rect x="39" y="56" width="22" height="20" rx="3" fill={a} opacity="0.82" />
      <path d="M43 63 L57 63 M43 69 L57 69" stroke={f} strokeWidth="1.6" opacity="0.7" {...ROUND} />
      <path d="M40 40 Q50 34 60 40" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
    </>
  ),

  barril: (f, a) => (
    <>
      <path d="M23 24 L77 24 L72 34 Q80 50 72 66 L77 76 L23 76 L28 66 Q20 50 28 34 Z" fill={f} />
      <path d="M18 32 L82 32 L82 39 L18 39 Z M18 61 L82 61 L82 68 L18 68 Z" fill={a} opacity="0.78" />
      <path d="M36 35 Q32 50 36 65 M50 34 L50 66 M64 35 Q68 50 64 65" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      <circle cx="50" cy="50" r="2.5" fill={a} />
    </>
  ),

  arbol: (f, a) => (
    <>
      <circle cx="30" cy="45" r="16" fill={f} />
      <circle cx="50" cy="28" r="19" fill={f} />
      <circle cx="70" cy="44" r="17" fill={f} />
      <circle cx="46" cy="52" r="17" fill={f} />
      <circle cx="61" cy="55" r="15" fill={f} />
      <path d="M42 66 Q47 76 40 92 L60 92 Q53 76 58 66 Z" fill={f} />
      <path d="M45 78 L41 88 M55 78 L59 88 M50 70 L50 86" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      <circle cx="38" cy="42" r="3" fill={a} opacity="0.4" />
      <circle cx="62" cy="34" r="3" fill={a} opacity="0.4" />
    </>
  ),

  melon: (f, a) => (
    <>
      <path d="M16 50 Q16 24 50 22 Q84 24 84 50 Q84 76 50 84 Q16 76 16 50 Z" fill={f} />
      <path d="M24 50 Q24 32 50 30 Q76 32 76 50 Q76 68 50 76 Q24 68 24 50 Z" fill={a} opacity="0.65" />
      <path d="M38 42 L42 48 M52 38 L56 44 M60 52 L64 58 M36 58 L40 64 M50 56 L54 62" stroke={f} strokeWidth="2" opacity="0.7" {...ROUND} />
      <path d="M50 22 Q46 14 50 10 Q55 14 50 22 Z M52 13 L62 10 L57 19 Z" fill={f} />
    </>
  ),

  valiente: (f, a) => (
    <>
      <path d="M22 30 Q22 18 50 17 Q78 18 78 30 Q68 35 50 35 Q32 35 22 30 Z" fill={f} />
      {person(f, a, 'serious')}
      <path d="M70 46 L88 80 L84 86 L66 52 Z" fill={f} />
      <path d="M86 78 L94 82 L86 88 Z" fill={f} />
      <path d="M70 50 L76 56" stroke={a} strokeWidth="2" opacity="0.55" {...ROUND} />
    </>
  ),

  gorrito: (f, a) => (
    <>
      <path d="M22 60 Q22 28 50 22 Q78 28 78 60 Q64 56 50 58 Q36 56 22 60 Z" fill={f} />
      <path d="M16 62 Q16 72 24 73 L76 73 Q84 72 84 62 Q66 68 50 68 Q34 68 16 62 Z" fill={f} />
      <ellipse cx="50" cy="22" rx="6" ry="5" fill={f} />
      <path d="M50 16 Q56 8 64 11 Q58 16 50 16 Z" fill={f} />
      <path d="M24 73 L18 88 Q26 92 34 78 M76 73 L82 88 Q74 92 66 78" fill={f} />
      <path d="M30 54 Q50 48 70 54 M34 42 Q50 36 66 42" stroke={a} strokeWidth="2" fill="none" opacity="0.58" {...ROUND} />
    </>
  ),

  muerte: (f, a) => (
    <>
      <path d="M20 48 Q20 16 50 16 Q80 16 80 48 L80 62 Q80 70 72 70 L64 70 L64 82 L36 82 L36 70 L28 70 Q20 70 20 62 Z" fill={f} />
      <ellipse cx="38" cy="48" rx="7.5" ry="8.5" fill={a} />
      <ellipse cx="62" cy="48" rx="7.5" ry="8.5" fill={a} />
      <path d="M44 62 L50 55 L56 62 Z" fill={a} />
      <path d="M39 72 L39 82 M45 72 L45 82 M51 72 L51 82 M57 72 L57 82" stroke={a} strokeWidth="2" {...ROUND} />
      <path d="M70 84 L84 94 M84 94 Q91 90 92 82 Q86 88 78 88" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
    </>
  ),

  pera: (f, a) => (
    <>
      <path d="M50 28 Q60 28 61 40 Q61 46 56 50 Q70 58 70 72 Q70 86 50 90 Q30 86 30 72 Q30 58 44 50 Q39 46 39 40 Q40 28 50 28 Z" fill={f} />
      <path d="M50 28 Q50 18 58 12" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M58 12 Q66 7 74 12 Q68 20 60 19 Q57 17 58 12 Z" fill={f} />
      <ellipse cx="42" cy="62" rx="6" ry="10" fill={a} opacity="0.42" />
      <circle cx="58" cy="78" r="2.4" fill={a} opacity="0.55" />
    </>
  ),

  bandera: (f, a) => (
    <>
      <rect x="18" y="12" width="5" height="78" rx="2" fill={f} />
      <path d="M23 17 L82 17 L82 53 L23 53 Z" fill={f} />
      <rect x="23" y="17" width="19" height="36" fill={a} opacity="0.72" />
      <rect x="63" y="17" width="19" height="36" fill={a} opacity="0.42" />
      <path d="M48 29 Q44 32 44 36 Q44 43 50 45 Q56 43 56 36 Q56 32 52 29 Q51 33 50 33 Q49 33 48 29 Z" fill={a} opacity="0.82" />
      <path d="M50 45 L50 49 M45 48 L55 48" stroke={a} strokeWidth="1.6" {...ROUND} />
      <circle cx="20.5" cy="12" r="4.5" fill={f} />
      <path d="M23 53 L23 61 L29 55 Z" fill={a} opacity="0.55" />
    </>
  ),

  bandolon: (f, a) => (
    <>
      <ellipse cx="39" cy="65" rx="23" ry="22" fill={f} />
      <circle cx="39" cy="65" r="7" fill={a} opacity="0.82" />
      <rect x="57" y="20" width="10" height="46" rx="2" transform="rotate(-12 62 43)" fill={f} />
      <path d="M69 16 L80 12 L75 24 Z" fill={f} />
      <path d="M20 60 Q42 50 62 36 M20 66 Q42 57 64 44 M22 72 Q42 64 66 52" stroke={a} strokeWidth="1.4" fill="none" opacity="0.7" {...ROUND} />
      <path d="M57 34 L69 32 M54 44 L66 42" stroke={a} strokeWidth="1.4" opacity="0.55" {...ROUND} />
    </>
  ),

  cello: (f, a) => (
    <>
      <path d="M44 8 Q40 8 40 14 Q40 16 42 18 Q38 20 40 25 L60 25 Q62 20 58 18 Q60 16 60 14 Q60 8 56 8 Z" fill={f} />
      <rect x="46" y="25" width="8" height="26" rx="1" fill={f} />
      <path d="M31 56 Q28 47 39 45 Q46 45 47 54 Q44 60 38 59 Q42 66 32 67 Q28 64 31 56 Z M69 56 Q72 47 61 45 Q54 45 53 54 Q56 60 62 59 Q58 66 68 67 Q72 64 69 56 Z" fill={f} />
      <path d="M28 64 Q28 80 50 91 Q72 80 72 64 Q70 58 62 58 L57 58 Q54 61 54 68 L46 68 Q46 61 43 58 L38 58 Q30 58 28 64 Z" fill={f} />
      <path d="M50 25 L50 88 M46 26 L46 86 M54 26 L54 86" stroke={a} strokeWidth="1.2" opacity="0.62" {...ROUND} />
      <path d="M40 66 Q42 72 46 73 M60 66 Q58 72 54 73" stroke={a} strokeWidth="1.8" fill="none" opacity="0.62" {...ROUND} />
    </>
  ),

  garza: (f, a) => (
    <>
      <ellipse cx="62" cy="22" rx="8" ry="7" fill={f} />
      <path d="M69 22 L90 25 L69 30 Z" fill={f} />
      <circle cx="64" cy="20" r="2" fill={a} />
      <path d="M60 30 Q54 44 58 56 Q62 66 74 70 L72 78 L66 74 L63 82 L58 76 Q44 68 30 78 L35 82 L30 88 L42 84 Q56 82 64 68 Q54 62 54 50 Q54 38 60 30 Z" fill={f} />
      <path d="M48 74 L44 92 M58 74 L60 92" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M44 92 L38 94 M60 92 L66 94" stroke={f} strokeWidth="2" {...ROUND} />
      <path d="M88 23 L94 21 M88 25 L94 27" stroke={f} strokeWidth="1.6" opacity="0.8" {...ROUND} />
    </>
  ),

  pajaro: (f, a) => (
    <>
      <ellipse cx="48" cy="57" rx="25" ry="18" fill={f} />
      <circle cx="69" cy="45" r="12" fill={f} />
      <path d="M78 45 L94 42 L82 52 Z" fill={f} />
      <circle cx="72" cy="42" r="2.2" fill={a} />
      <path d="M25 56 Q12 50 10 60 Q14 70 30 63 Z" fill={f} />
      <path d="M36 63 Q46 68 58 64 Q50 74 36 70 Z" fill={a} opacity="0.5" />
      <path d="M55 75 L53 91 M63 75 L65 91" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M53 91 L48 94 M65 91 L70 94" stroke={f} strokeWidth="2" {...ROUND} />
    </>
  ),

  mano: (f, a) => (
    <>
      <path d="M30 57 L30 32 Q30 25 36 25 Q42 25 42 32 L42 48 L42 20 Q42 13 49 13 Q55 13 55 20 L55 48 L55 23 Q55 17 61 17 Q67 17 67 23 L67 49 L67 31 Q67 25 73 25 Q79 25 79 31 L79 58 Q79 84 54 91 Q32 86 28 66 Z" fill={f} />
      <path d="M36 61 Q41 72 43 82 M46 56 Q49 72 50 86 M57 56 Q59 72 61 84 M69 62 Q67 73 64 82" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
      <path d="M40 33 L40 48 M53 24 L53 48 M65 30 L65 49" stroke={a} strokeWidth="1.4" opacity="0.45" {...ROUND} />
      <circle cx="54" cy="65" r="4" fill={a} opacity="0.36" />
    </>
  ),

  bota: (f, a) => (
    <>
      <path d="M34 10 L54 10 L54 59 Q54 65 60 68 L76 76 Q83 80 83 90 L18 90 Q18 80 26 74 L34 66 Z" fill={f} />
      <path d="M34 39 L54 39 M36 23 L54 23 M34 52 L54 52" stroke={a} strokeWidth="2" opacity="0.58" {...ROUND} />
      <path d="M55 61 Q60 74 76 82 M23 84 L80 84" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      <circle cx="43" cy="31" r="2" fill={a} />
      <circle cx="43" cy="45" r="2" fill={a} />
    </>
  ),

  luna: (f, a) => (
    <>
      <path d="M70 12 Q40 20 32 50 Q40 80 70 88 Q47 75 47 50 Q47 25 70 12 Z" fill={f} />
      <circle cx="58" cy="38" r="2.6" fill={a} opacity="0.78" />
      <circle cx="56" cy="50" r="2.2" fill={a} opacity="0.72" />
      <path d="M52 58 Q55 63 61 61" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      <circle cx="82" cy="24" r="2" fill={f} opacity="0.6" />
      <circle cx="84" cy="66" r="1.8" fill={f} opacity="0.55" />
    </>
  ),

  cotorro: (f, a) => (
    <>
      <path d="M62 18 Q73 22 71 38 Q67 50 60 56 L58 72 Q56 86 50 90 Q44 86 42 72 L40 56 Q33 50 29 38 Q27 22 38 18 Q42 25 50 25 Q58 25 62 18 Z" fill={f} />
      <circle cx="51" cy="35" r="3" fill={a} />
      <path d="M50 38 L39 42 L50 48 Z" fill={f} />
      <path d="M39 28 Q43 32 50 32 Q57 32 61 28" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      <path d="M42 58 Q50 66 58 58 M45 72 L40 88 M55 72 L60 88" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      <path d="M28 32 L18 26 L24 40 M72 32 L82 26 L76 40" fill={f} />
    </>
  ),

  borracho: (f, a) => (
    <>
      <path d="M28 30 Q30 14 50 14 Q70 14 72 30 Q62 35 50 35 Q38 35 28 30 Z" fill={f} />
      {person(f, a, 'sleepy')}
      <path d="M68 56 L81 60 L77 82 L64 78 Z" fill={f} />
      <path d="M70 62 L78 64 M69 70 L76 72" stroke={a} strokeWidth="1.6" opacity="0.58" {...ROUND} />
      <path d="M42 36 L46 38 M56 36 L60 38" stroke={a} strokeWidth="1.8" {...ROUND} />
    </>
  ),

  negrito: (f, a) => (
    <>
      <ellipse cx="50" cy="25" rx="28" ry="8" fill={f} />
      <path d="M24 25 Q26 12 50 12 Q74 12 76 25 Q64 20 50 20 Q36 20 24 25 Z" fill={f} />
      {person(f, a)}
      <rect x="41" y="60" width="18" height="5" rx="2" fill={a} opacity="0.55" />
      <path d="M38 74 L62 74" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
    </>
  ),

  corazon: (f, a) => (
    <>
      <path d="M50 86 Q14 62 14 36 Q14 18 31 18 Q44 18 50 33 Q56 18 69 18 Q86 18 86 36 Q86 62 50 86 Z" fill={f} />
      <path d="M25 32 Q27 26 33 25 Q37 27 34 32 Q29 34 25 32 Z" fill={a} opacity="0.36" />
      <path d="M50 34 L50 78" stroke={a} strokeWidth="1.8" opacity="0.35" {...ROUND} />
    </>
  ),

  sandia: (f, a) => (
    <>
      <path d="M12 62 Q14 30 50 28 Q86 30 88 62 Q50 76 12 62 Z" fill={f} />
      <path d="M20 60 Q22 38 50 36 Q78 38 80 60 Q50 68 20 60 Z" fill={a} opacity="0.66" />
      <path d="M26 58 Q29 43 50 41 Q71 43 74 58 Q50 64 26 58 Z" fill={f} opacity="0.86" />
      <ellipse cx="39" cy="52" rx="2" ry="3" fill={a} />
      <ellipse cx="51" cy="49" rx="2" ry="3" fill={a} />
      <ellipse cx="63" cy="53" rx="2" ry="3" fill={a} />
      <path d="M16 64 Q50 80 84 64" stroke={a} strokeWidth="2" fill="none" opacity="0.5" {...ROUND} />
    </>
  ),

  tambor: (f, a) => (
    <>
      <ellipse cx="50" cy="30" rx="29" ry="9" fill={f} />
      <path d="M21 30 L21 68 Q21 78 50 80 Q79 78 79 68 L79 30 Q72 38 50 38 Q28 38 21 30 Z" fill={f} />
      <ellipse cx="50" cy="30" rx="24" ry="5" fill={a} opacity="0.56" />
      <path d="M27 40 L37 76 M41 40 L46 78 M59 40 L54 78 M73 40 L63 76" stroke={a} strokeWidth="2" opacity="0.7" {...ROUND} />
      <path d="M16 14 L24 34 M84 14 L76 34" stroke={f} strokeWidth="3" {...ROUND} />
      <circle cx="16" cy="14" r="3.5" fill={f} />
      <circle cx="84" cy="14" r="3.5" fill={f} />
    </>
  ),

  camaron: (f, a) => (
    <>
      <path d="M16 50 Q16 30 40 24 Q60 20 76 30 Q88 38 84 54 Q80 66 66 68 Q62 80 50 80 Q40 80 34 74 Q26 78 20 70 L28 66 Q16 62 16 50 Z" fill={f} />
      <circle cx="76" cy="36" r="2.4" fill={a} />
      <path d="M84 28 L94 20 M86 34 L94 30" stroke={f} strokeWidth="2.2" {...ROUND} />
      <path d="M31 50 Q42 41 54 38 M31 58 Q44 50 58 46 M35 66 Q48 59 62 54" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
      <path d="M42 70 L36 82 M52 70 L50 84 M62 66 L68 78" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
    </>
  ),

  jaras: (f, a) => (
    <>
      <path d="M18 82 L78 22 L72 16 L12 76 Z" fill={f} />
      <path d="M72 16 L88 10 L82 26 Z M12 76 L8 80 L18 84 L22 94 L26 84 L18 80 Z" fill={f} />
      <path d="M30 86 L90 26 L84 20 L24 80 Z" fill={f} />
      <path d="M84 20 L94 16 L91 32 Z M24 80 L20 84 L30 88 L34 94 L38 88 L30 84 Z" fill={f} />
      <path d="M64 28 L76 40 M58 34 L70 46 M72 24 L84 36" stroke={a} strokeWidth="1.6" opacity="0.48" {...ROUND} />
    </>
  ),

  musico: (f, a) => (
    <>
      <path d="M18 23 Q24 14 36 14 Q44 14 47 22 Q42 27 30 27 Q22 27 18 23 Z" fill={f} />
      <ellipse cx="34" cy="35" rx="12" ry="13" fill={f} />
      {face(a, 34, 34)}
      <path d="M22 50 L22 86 L48 86 L48 52 L42 48 Q34 54 26 48 Z" fill={f} />
      <path d="M48 54 L64 36 L78 26 Q86 22 90 30 Q88 38 78 40 L64 52 L60 62 L48 62 Z" fill={f} />
      <circle cx="86" cy="30" r="7" fill={f} />
      <circle cx="86" cy="30" r="3" fill={a} opacity="0.7" />
      <path d="M58 45 L66 52 M66 38 L74 45" stroke={a} strokeWidth="1.5" opacity="0.55" {...ROUND} />
    </>
  ),

  arana: (f, a) => (
    <>
      <path d="M50 12 L50 31" stroke={f} strokeWidth="2" {...ROUND} />
      <circle cx="50" cy="12" r="3" fill={f} />
      <ellipse cx="50" cy="60" rx="24" ry="22" fill={f} />
      <ellipse cx="50" cy="47" rx="14" ry="10" fill={f} />
      <circle cx="44" cy="46" r="3" fill={a} />
      <circle cx="56" cy="46" r="3" fill={a} />
      <path d="M40 54 Q50 60 60 54" stroke={a} strokeWidth="2" fill="none" opacity="0.56" {...ROUND} />
      <path d="M29 34 L40 48 L33 52 M16 48 L34 58 L28 63 M16 70 L36 66 L32 74 M30 90 L42 72 M71 34 L60 48 L67 52 M84 48 L66 58 L72 63 M84 70 L64 66 L68 74 M70 90 L58 72" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
    </>
  ),

  soldado: (f, a) => (
    <>
      <path d="M30 18 Q30 8 50 8 Q70 8 70 18 Q70 23 64 23 L36 23 Q30 23 30 18 Z" fill={f} />
      <rect x="31" y="23" width="38" height="6" rx="1" fill={f} />
      {person(f, a, 'serious')}
      <rect x="34" y="48" width="32" height="34" rx="3" fill={f} />
      <path d="M40 54 L60 54 M40 61 L60 61" stroke={a} strokeWidth="1.5" opacity="0.58" {...ROUND} />
      <path d="M76 12 L80 90" stroke={f} strokeWidth="4" {...ROUND} />
      <path d="M76 12 L91 16 L76 22 Z" fill={f} />
      <path d="M40 82 L40 94 M60 82 L60 94" stroke={f} strokeWidth="5" {...ROUND} />
    </>
  ),

  estrella: (f, a) => (
    <>
      <path d="M50 8 L60 36 L90 38 L66 56 L74 86 L50 68 L26 86 L34 56 L10 38 L40 36 Z" fill={f} />
      <path d="M50 20 L56 39 L74 40 L60 52 L65 70 L50 60 L35 70 L40 52 L26 40 L44 39 Z" fill={a} opacity="0.34" />
      <circle cx="50" cy="50" r="4" fill={a} opacity="0.62" />
    </>
  ),

  cazo: (f, a) => (
    <>
      <path d="M20 36 L80 36 L74 80 Q74 88 66 88 L34 88 Q26 88 26 80 Z" fill={f} />
      <ellipse cx="50" cy="36" rx="31" ry="7" fill={f} />
      <ellipse cx="50" cy="36" rx="25" ry="3.5" fill={a} opacity="0.54" />
      <rect x="8" y="32" width="84" height="7" rx="4" fill={f} />
      <path d="M80 39 L94 45 L94 51 L86 48" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M34 50 L40 78 M50 50 L50 80 M66 50 L60 78" stroke={a} strokeWidth="1.6" opacity="0.45" {...ROUND} />
      <path d="M34 24 Q31 16 35 11 M50 22 Q47 14 51 9 M66 24 Q63 16 67 11" stroke={f} strokeWidth="2.2" fill="none" opacity="0.75" {...ROUND} />
    </>
  ),

  mundo: (f, a) => (
    <>
      <circle cx="50" cy="46" r="32" fill={f} />
      <path d="M23 39 Q30 35 36 40 Q42 37 48 42 L45 51 L38 52 Q35 58 40 63 L49 65 L54 72 L61 68 L64 60 L73 59 L78 53 Q80 47 75 43 L68 39 L66 34 L58 31 Q52 32 49 27 Q42 25 36 30 Q28 29 23 39 Z" fill={a} opacity="0.55" />
      <ellipse cx="50" cy="46" rx="32" ry="9" fill="none" stroke={a} strokeWidth="1.6" opacity="0.45" />
      <path d="M50 14 Q38 46 50 78 Q62 46 50 14" stroke={a} strokeWidth="1.6" fill="none" opacity="0.45" {...ROUND} />
      <rect x="46" y="78" width="8" height="7" fill={f} />
      <rect x="34" y="85" width="32" height="7" rx="3" fill={f} />
    </>
  ),

  apache: (f, a) => (
    <>
      <path d="M22 30 L18 8 L28 24 L30 6 L36 24 L42 8 L46 24 L50 10 L54 24 L58 8 L64 24 L70 6 L72 24 L82 8 L78 30 Z" fill={f} />
      <path d="M26 27 Q50 34 74 27 L72 36 L28 36 Z" fill={f} />
      {person(f, a, 'serious')}
      <path d="M34 62 L50 78 L66 62 M42 66 L50 72 L58 66" stroke={a} strokeWidth="2" fill="none" opacity="0.58" {...ROUND} />
    </>
  ),

  nopal: (f, a) => (
    <>
      <path d="M38 90 L38 50 Q38 36 50 36 Q62 36 62 50 L62 90 Z" fill={f} />
      <path d="M18 62 Q18 42 33 42 Q41 42 41 51 L41 66 Q40 72 32 72 Q18 70 18 62 Z" fill={f} />
      <path d="M82 58 Q82 38 67 38 Q59 38 59 47 L59 63 Q60 69 68 69 Q82 67 82 58 Z" fill={f} />
      <circle cx="50" cy="30" r="6" fill={f} />
      <circle cx="32" cy="39" r="4" fill={f} />
      <circle cx="68" cy="35" r="4" fill={f} />
      <path d="M44 52 L47 49 M52 56 L55 53 M43 67 L46 64 M55 72 L58 69 M46 82 L49 79 M25 54 L28 51 M29 64 L32 61 M69 50 L72 47 M72 60 L75 57" stroke={a} strokeWidth="1.4" opacity="0.65" {...ROUND} />
    </>
  ),

  alacran: (f, a) => (
    <>
      <ellipse cx="48" cy="60" rx="19" ry="13" fill={f} />
      <path d="M30 58 L20 64 L12 59 M30 65 L18 76 L10 76 M66 60 L78 56 Q88 49 84 39 Q80 31 70 33 Q61 36 61 45" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M61 45 L53 40 L56 50 Z" fill={f} />
      <circle cx="40" cy="56" r="2" fill={a} />
      <path d="M30 50 L39 56 M30 72 L40 64 M48 48 L48 38 M48 72 L48 82 M66 49 L60 42 M66 71 L60 80" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M44 56 L50 62 L56 56" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
    </>
  ),

  rosa: (f, a) => (
    <>
      <path d="M22 78 L20 92 M22 78 Q12 70 14 60 M22 78 Q28 82 32 88" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M22 78 L20 58 Q18 49 26 43" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M14 60 Q7 58 8 51 Q14 50 19 55 Z M21 62 Q22 55 29 52 Q30 59 24 64 Z" fill={f} />
      <circle cx="52" cy="38" r="23" fill={f} />
      <path d="M52 16 Q41 22 39 33 Q44 43 52 43 Q60 43 65 33 Q63 22 52 16 Z" fill={a} opacity="0.48" />
      <path d="M36 39 Q39 50 49 51 M68 39 Q65 50 55 51 M45 50 Q43 61 52 63 Q61 61 59 50" stroke={a} strokeWidth="1.8" fill="none" opacity="0.58" {...ROUND} />
      <circle cx="52" cy="38" r="6" fill={a} opacity="0.7" />
    </>
  ),

  calavera: (f, a) => (
    <>
      <path d="M22 50 Q22 16 50 16 Q78 16 78 50 L78 66 Q78 73 70 73 L62 73 L62 84 L38 84 L38 73 L30 73 Q22 73 22 66 Z" fill={f} />
      <circle cx="38" cy="48" r="9" fill={a} />
      <circle cx="62" cy="48" r="9" fill={a} />
      <path d="M38 48 L34 42 L42 42 Z M38 48 L42 54 L34 54 Z M62 48 L58 42 L66 42 Z M62 48 L66 54 L58 54 Z" fill={f} opacity="0.85" />
      <path d="M44 63 L50 55 L56 63 Z" fill={a} />
      <path d="M39 75 L39 84 M45 75 L45 84 M51 75 L51 84 M57 75 L57 84" stroke={a} strokeWidth="1.8" {...ROUND} />
      <path d="M30 31 Q34 27 38 31 M62 31 Q66 27 70 31 M44 30 Q47 25 50 29 Q53 25 56 30" stroke={a} strokeWidth="1.7" fill="none" opacity="0.65" {...ROUND} />
    </>
  ),

  campana: (f, a) => (
    <>
      <path d="M50 18 Q52 12 58 14 Q60 20 50 22 Z" fill={f} />
      <path d="M28 68 Q28 34 50 26 Q72 34 72 68 Q72 75 64 75 L36 75 Q28 75 28 68 Z" fill={f} />
      <rect x="24" y="74" width="52" height="7" rx="3" fill={f} />
      <circle cx="50" cy="88" r="5" fill={f} />
      <path d="M38 58 Q50 64 62 58 M42 35 Q50 31 58 35" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M18 60 Q20 55 24 55 M82 60 Q80 55 76 55" stroke={f} strokeWidth="2.2" fill="none" {...ROUND} />
    </>
  ),

  cantarito: (f, a) => (
    <>
      <path d="M36 18 Q42 15 50 15 Q58 15 64 18 L64 26 Q78 32 78 58 Q78 82 50 86 Q22 82 22 58 Q22 32 36 26 Z" fill={f} />
      <rect x="36" y="18" width="28" height="6" rx="2" fill={a} opacity="0.5" />
      <path d="M22 48 Q12 48 12 58 Q12 68 22 66" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M30 38 Q40 42 50 39 Q60 42 70 38 M30 70 Q40 75 50 72 Q60 75 70 70" stroke={a} strokeWidth="2" fill="none" opacity="0.58" {...ROUND} />
      <path d="M42 52 Q44 60 50 58 Q48 50 42 52 Z M58 52 Q56 60 50 58 Q52 50 58 52 Z" fill={a} opacity="0.45" />
    </>
  ),

  venado: (f, a) => (
    <>
      <path d="M60 30 L54 14 L58 24 L52 18 M74 30 L82 14 L78 24 L84 18" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
      <ellipse cx="50" cy="58" rx="23" ry="15" fill={f} />
      <circle cx="68" cy="42" r="11" fill={f} />
      <path d="M76 42 L84 39 L78 46 Z" fill={f} />
      <circle cx="70" cy="39" r="2" fill={a} />
      <path d="M34 68 L32 90 M44 69 L42 90 M58 69 L60 90 M66 66 L70 88" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M37 52 L42 48 M47 62 L52 58 M57 54 L62 50" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
    </>
  ),

  sol: (f, a) => (
    <>
      <g stroke={f} strokeWidth="4.5" {...ROUND}>
        <line x1="50" y1="6" x2="50" y2="18" />
        <line x1="50" y1="82" x2="50" y2="94" />
        <line x1="6" y1="50" x2="18" y2="50" />
        <line x1="82" y1="50" x2="94" y2="50" />
        <line x1="18" y1="18" x2="26" y2="26" />
        <line x1="74" y1="74" x2="82" y2="82" />
        <line x1="82" y1="18" x2="74" y2="26" />
        <line x1="18" y1="82" x2="26" y2="74" />
      </g>
      <circle cx="50" cy="50" r="23" fill={f} />
      <circle cx="42" cy="47" r="2.8" fill={a} />
      <circle cx="58" cy="47" r="2.8" fill={a} />
      <path d="M39 56 Q50 65 61 56 M37 45 Q42 40 47 45 M53 45 Q58 40 63 45" stroke={a} strokeWidth="2.2" fill="none" {...ROUND} />
    </>
  ),

  corona: (f, a) => (
    <>
      <path d="M14 72 L20 32 L35 54 L44 23 L50 14 L56 23 L65 54 L80 32 L86 72 Z" fill={f} />
      <rect x="14" y="70" width="72" height="13" rx="2" fill={f} />
      <circle cx="20" cy="32" r="4" fill={a} opacity="0.62" />
      <circle cx="50" cy="16" r="5" fill={a} opacity="0.62" />
      <circle cx="80" cy="32" r="4" fill={a} opacity="0.62" />
      <circle cx="35" cy="54" r="3" fill={a} opacity="0.46" />
      <circle cx="65" cy="54" r="3" fill={a} opacity="0.46" />
      <path d="M24 77 L76 77" stroke={a} strokeWidth="2" opacity="0.5" {...ROUND} />
    </>
  ),

  chalupa: (f, a) => (
    <>
      <circle cx="50" cy="27" r="5" fill={f} />
      <path d="M44 38 L56 38 L58 58 L42 58 Z" fill={f} />
      <path d="M12 56 Q14 78 30 82 L70 82 Q86 78 88 56 Z" fill={f} />
      <path d="M12 56 L88 56 L84 63 L16 63 Z" fill={a} opacity="0.45" />
      <circle cx="32" cy="49" r="3" fill={f} />
      <circle cx="40" cy="48" r="3" fill={f} />
      <circle cx="60" cy="48" r="3" fill={f} />
      <circle cx="68" cy="49" r="3" fill={f} />
      <path d="M20 88 Q26 82 32 88 M44 90 Q50 84 56 90 M68 88 Q74 82 80 88" stroke={f} strokeWidth="2" fill="none" opacity="0.75" {...ROUND} />
    </>
  ),

  pino: (f, a) => (
    <>
      <path d="M50 10 L34 32 L42 32 L26 54 L36 54 L18 78 L82 78 L64 54 L74 54 L58 32 L66 32 Z" fill={f} />
      <path d="M50 18 L40 31 L47 31 L35 51 L44 51 L32 70 L68 70 L56 51 L65 51 L53 31 L60 31 Z" fill={a} opacity="0.28" />
      <rect x="43" y="78" width="14" height="14" rx="2" fill={f} />
      <path d="M34 46 L66 46 M28 66 L72 66" stroke={a} strokeWidth="1.8" opacity="0.42" {...ROUND} />
    </>
  ),

  pescado: (f, a) => (
    <>
      <path d="M14 50 Q14 28 50 28 Q74 28 82 50 Q74 72 50 72 Q14 72 14 50 Z" fill={f} />
      <path d="M82 50 L96 34 L93 50 L96 66 Z" fill={f} />
      <path d="M50 28 Q48 20 54 17 Q59 22 55 29 M50 72 Q48 80 54 83 Q59 78 55 71" fill={f} />
      <circle cx="32" cy="46" r="3.4" fill={a} />
      <path d="M44 36 Q50 50 44 64 M55 34 Q61 50 55 66 M66 39 Q71 50 66 61" stroke={a} strokeWidth="1.8" fill="none" opacity="0.56" {...ROUND} />
    </>
  ),

  palma: (f, a) => (
    <>
      <path d="M47 40 L45 92 L55 92 L53 40 Z" fill={f} />
      <path d="M50 40 Q30 28 12 36 Q26 31 38 38 M50 40 Q70 28 88 36 Q74 31 62 38 M50 40 Q38 18 22 16 Q35 22 43 34 M50 40 Q62 18 78 16 Q65 22 57 34 M50 40 Q50 23 38 10 M50 40 Q50 23 62 10" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M48 54 L46 58 M52 66 L54 70 M47 78 L45 82" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
      <circle cx="46" cy="42" r="3" fill={a} opacity="0.55" />
      <circle cx="54" cy="42" r="3" fill={a} opacity="0.55" />
    </>
  ),

  maceta: (f, a) => (
    <>
      {plantLeaf(f, 'M44 10 Q44 26 36 36 Q44 30 50 33 Q56 30 64 36 Q56 26 56 10 Q50 20 50 20 Q50 20 44 10 Z')}
      <circle cx="40" cy="17" r="5" fill={f} />
      <circle cx="60" cy="19" r="5" fill={f} />
      <circle cx="50" cy="9" r="5" fill={f} />
      <path d="M48 33 L48 43 M52 33 L52 43" stroke={f} strokeWidth="2" {...ROUND} />
      <rect x="24" y="43" width="52" height="7" rx="2" fill={f} />
      <path d="M28 50 L72 50 L66 86 L34 86 Z" fill={f} />
      <path d="M32 58 L68 58 M38 66 Q42 72 40 78 M58 66 Q62 72 60 78" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
    </>
  ),

  arpa: (f, a) => (
    <>
      <path d="M22 12 Q18 12 18 18 L18 78 Q18 88 28 90 L50 90 L50 14 Q40 12 22 12 Z" fill={f} />
      <path d="M18 20 Q28 15 50 16 L50 22 Q34 18 18 24 Z" fill={a} opacity="0.32" />
      <path d="M28 90 L45 90 Q52 90 52 82 L52 78" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M27 24 L47 87 M32 23 L48 86 M37 23 L49 84 M42 23 L50 80" stroke={a} strokeWidth="1.4" opacity="0.7" {...ROUND} />
      <circle cx="22" cy="20" r="2.5" fill={a} opacity="0.7" />
    </>
  ),

  rana: (f, a) => (
    <>
      <ellipse cx="50" cy="59" rx="30" ry="23" fill={f} />
      <circle cx="34" cy="36" r="11" fill={f} />
      <circle cx="66" cy="36" r="11" fill={f} />
      <circle cx="34" cy="38" r="6" fill={a} />
      <circle cx="66" cy="38" r="6" fill={a} />
      <circle cx="34" cy="40" r="2.4" fill={f} />
      <circle cx="66" cy="40" r="2.4" fill={f} />
      <path d="M37 65 Q50 76 63 65" stroke={a} strokeWidth="2.4" fill="none" opacity="0.68" {...ROUND} />
      <circle cx="44" cy="56" r="1.8" fill={a} opacity="0.42" />
      <circle cx="56" cy="56" r="1.8" fill={a} opacity="0.42" />
      <path d="M22 75 L14 82 L22 86 M78 75 L86 82 L78 86" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
    </>
  ),
};
