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

export const ICON_RENDERERS: Record<IconName, IconRenderer> = {
  gallo: (f, a) => (
    <>
      {/* tail plumes - three arcs sweeping up-left, rooted in the body */}
      <path d="M38 72 Q6 70 7 42 Q20 62 42 60 Z" fill={f} />
      <path d="M38 62 Q10 52 15 24 Q27 47 44 50 Z" fill={f} />
      <path d="M42 53 Q22 36 30 12 Q39 36 50 44 Z" fill={f} />
      {/* body */}
      <ellipse cx="50" cy="58" rx="22" ry="22" fill={f} />
      {/* neck connecting body to head */}
      <path d="M58 24 L78 38 L70 56 L48 44 Z" fill={f} />
      {/* head */}
      <circle cx="68" cy="29" r="11" fill={f} />
      {/* comb - three bold lobes */}
      <path d="M58 24 Q53 12 62 13 Q62 5 70 9 Q75 3 78 11 Q85 10 80 22 Q70 28 58 24 Z" fill={f} />
      {/* beak */}
      <path d="M77 26 L93 31 L77 37 Z" fill={f} />
      {/* wattle hanging under the beak */}
      <path d="M78 36 Q84 50 75 53 Q66 51 69 37 Z" fill={f} />
      {/* eye */}
      <circle cx="70" cy="27" r="2.4" fill={a} />
      {/* wing detail */}
      <path d="M40 52 Q53 64 64 55" stroke={a} strokeWidth="2.2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M44 60 Q54 68 62 62" stroke={a} strokeWidth="1.8" fill="none" opacity="0.4" {...ROUND} />
      {/* plume detail lines */}
      <path d="M36 66 Q15 62 12 46" stroke={a} strokeWidth="1.6" fill="none" opacity="0.45" {...ROUND} />
      <path d="M38 56 Q21 48 21 32" stroke={a} strokeWidth="1.6" fill="none" opacity="0.45" {...ROUND} />
      {/* sturdy legs and feet */}
      <path d="M44 78 L42 90 M58 78 L60 90" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M42 90 L34 92 M42 90 L42 93 M42 90 L48 92" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M60 90 L52 92 M60 90 L60 93 M60 90 L66 92" stroke={f} strokeWidth="3" {...ROUND} />
    </>
  ),

  diablito: (f, a) => (
    <>
      {/* horns */}
      <path d="M36 24 L28 8 Q36 12 44 21 Z" fill={f} />
      <path d="M56 24 L64 8 Q56 12 48 21 Z" fill={f} />
      {/* head */}
      <ellipse cx="46" cy="33" rx="14" ry="13" fill={f} />
      {/* body */}
      <ellipse cx="46" cy="58" rx="11.5" ry="14" fill={f} />
      {/* legs */}
      <path d="M41 70 L39 85 M51 70 L53 85" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M39 85 L33 88 M53 85 L59 88" stroke={f} strokeWidth="2.6" {...ROUND} />
      {/* arm + hand gripping trident */}
      <path d="M55 52 Q65 51 72 45" stroke={f} strokeWidth="5" {...ROUND} />
      <circle cx="73" cy="44" r="4" fill={f} />
      {/* trident */}
      <path d="M76 80 L76 26" stroke={f} strokeWidth="3.2" {...ROUND} />
      <path d="M68 27 L84 27" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M68 27 L68 17 M76 26 L76 13 M84 27 L84 17" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M73.5 14 L76 6 L78.5 14 Z" fill={f} />
      <path d="M65.8 18 L68 10 L70.2 18 Z" fill={f} />
      <path d="M81.8 18 L84 10 L86.2 18 Z" fill={f} />
      {/* tail with arrowhead */}
      <path d="M38 67 Q22 78 14 66 Q10 54 18 49" stroke={f} strokeWidth="3.4" fill="none" {...ROUND} />
      <path d="M13 38 L7 48 L22 46 Z" fill={f} />
      {/* face: brows, eyes, grin */}
      <path d="M38 26 L44 29 M54 26 L48 29" stroke={a} strokeWidth="2.4" {...ROUND} />
      <ellipse cx="40" cy="33" rx="2.4" ry="3.2" fill={a} />
      <ellipse cx="52" cy="33" rx="2.4" ry="3.2" fill={a} />
      <path d="M36 40 Q46 49 56 40 Q54 47 46 47 Q38 47 36 40 Z" fill={a} />
      <path d="M40 41.5 L42 45 L44 41.5 Z" fill={f} />
      <path d="M48 41.5 L50 45 L52 41.5 Z" fill={f} />
    </>
  ),

  dama: (f, a) => (
    <>
      {/* ground line */}
      <path d="M21 93 L81 93" stroke={f} strokeWidth="2.6" {...ROUND} />
      {/* head, facing right */}
      <circle cx="52" cy="15.5" r="9" fill={f} />
      {/* profile nose hint */}
      <path d="M60 13.8 Q63.2 16 60 18.6 Z" fill={f} />
      {/* bob hair mass with nape curl */}
      <path d="M59.5 8.5 Q53 3.5 47 6.5 Q41.6 9.5 41.4 16.5 Q41.3 21.8 43 26 Q47 28.2 45.8 23.5 Q44.6 18.5 46.6 13.5 Q50.5 7.8 59.5 8.5 Z" fill={f} />
      <circle cx="44.8" cy="25.8" r="3" fill={f} />
      {/* hairline seam separating face from bob */}
      <path d="M58.5 8.6 Q52 9.4 49.6 13.5 Q47.9 17.5 48.6 21.8" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* hair wave seam */}
      <path d="M45.5 9.5 Q43.3 13.5 43.5 18.5" stroke={a} strokeWidth="1.8" fill="none" opacity="0.45" {...ROUND} />
      {/* eye + lip */}
      <circle cx="55.6" cy="14" r="1.5" fill={a} />
      <path d="M57.5 19.2 L60 19.2" stroke={a} strokeWidth="1.8" {...ROUND} />
      {/* neck */}
      <path d="M49.5 22 L49.5 30 L55 30 L55 22 Z" fill={f} />
      {/* fitted jacket + pencil skirt silhouette: sloped shoulders, nipped waist, knee hem */}
      <path d="M50 28.5 Q44 29.8 41.5 34.8 Q43.8 42 45.5 49 Q43.2 52.5 43.6 56.5 Q45 62.5 47 66.5 L61 66.5 Q62.8 61 62.4 56 Q61.4 52 60.5 49 Q62.8 41 64.8 34 Q61 29.5 56 28.5 Q53 30.5 50 28.5 Z" fill={f} />
      {/* lapel V seam */}
      <path d="M50 29.5 L56 40 L61.8 30.5" stroke={a} strokeWidth="1.9" fill="none" opacity="0.55" {...ROUND} />
      {/* buttons */}
      <circle cx="56.3" cy="44" r="1.5" fill={a} opacity="0.75" />
      <circle cx="56" cy="48" r="1.5" fill={a} opacity="0.75" />
      {/* jacket hem seam over hips */}
      <path d="M44.2 56 Q53 58.5 62 55.5" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      {/* back arm swinging back */}
      <path d="M44.5 35 Q38.5 42.5 34 51.5" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      <circle cx="33.2" cy="54" r="3.1" fill={f} />
      {/* front arm bent, holding purse */}
      <path d="M62 35 Q67 39.5 68.4 44.5 Q69.8 47.8 71.4 50.2" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      <circle cx="71.8" cy="51" r="2.9" fill={f} />
      {/* purse: loop handle + trapezoid body */}
      <path d="M68.5 55 Q72 47.8 75.5 55" stroke={f} strokeWidth="2.4" fill="none" {...ROUND} />
      <path d="M67 54.5 L77 54.5 L78.8 64 L65.2 64 Z" fill={f} />
      <path d="M66.4 58 L77.8 58" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
      {/* front leg striding forward */}
      <path d="M58.5 64.5 Q62.5 74 66.5 84.5" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* front heeled shoe */}
      <path d="M64.6 83 L74 89.8 L64.6 90.8 Z" fill={f} />
      <path d="M66 90.4 L65.8 93.2" stroke={f} strokeWidth="2.2" {...ROUND} />
      {/* back leg trailing */}
      <path d="M50 64.5 Q45 71.5 41.5 80" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* back heeled shoe, heel raised toe down */}
      <path d="M43.6 78.5 L34 90.5 L43 86.5 Z" fill={f} />
      <path d="M43.2 86 L44.8 89.2" stroke={f} strokeWidth="2.2" {...ROUND} />
    </>
  ),

  catrin: (f, a) => (
    <>
      <rect x="38" y="6" width="24" height="16" rx="1.5" fill={f} />
      <rect x="29" y="20" width="42" height="5.5" rx="2.75" fill={f} />
      <rect x="38" y="16" width="24" height="3.4" fill={a} opacity="0.5" />
      <ellipse cx="50" cy="35" rx="10.5" ry="11.5" fill={f} />
      {face(a, 50, 34, 'serious')}
      <path d="M50 43.5 Q41.5 44.5 38 50.5 L42 64 L36.5 88 L45.5 88 L50 72 L54.5 88 L63.5 88 L58 64 L62 50.5 Q58.5 44.5 50 43.5 Z" fill={f} />
      <ellipse cx="45.8" cy="89.8" rx="3.7" ry="2.4" fill={f} />
      <ellipse cx="54.2" cy="89.8" rx="3.7" ry="2.4" fill={f} />
      <path d="M50 49 L44 45.8 L44 52.2 Z M50 49 L56 45.8 L56 52.2 Z" fill={a} />
      <circle cx="50" cy="49" r="1.6" fill={a} />
      <path d="M44.5 50 L50 60 L55.5 50" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <circle cx="50" cy="64" r="1.4" fill={a} opacity="0.7" />
      <circle cx="50" cy="68" r="1.4" fill={a} opacity="0.7" />
      <path d="M60 53.5 Q67 56 69.5 62" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <circle cx="70" cy="63" r="3" fill={f} />
      <path d="M70.5 65 L75 92" stroke={f} strokeWidth="3.4" {...ROUND} />
    </>
  ),

  paraguas: (f, a) => (
    <>
      {/* ferrule tip */}
      <path d="M50 9.5 L50 18" stroke={f} strokeWidth="5" {...ROUND} />
      {/* scalloped canopy (narrowed slightly to clear room for rain) */}
      <path d="M17.5 55 Q22.8 22 50 15.5 Q77.2 22 82.5 55 Q74.2 48 66 55 Q58 48 50 55 Q42 48 34 55 Q26 48 17.5 55 Z" fill={f} />
      {/* ribs */}
      <path d="M50 16 Q36 26 34 54 M50 16 Q64 26 66 54 M50 16 L50 53" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      {/* shaft + J-handle */}
      <path d="M50 52 L50 79 Q50 89 40.5 89 Q31 89 31 79 L31 73.5" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* diagonal rain in the free corners */}
      <path d="M15 8 L12.3 16.6 M9 24 L6.3 32.6 M12 36 L9.3 44.6 M28 7 L25.3 15.6 M40 4 L37.3 12.6 M66 5 L63.3 13.6 M82 18 L79.3 26.6 M90 8 L87.3 16.6 M88 34 L85.3 42.6" stroke={f} strokeWidth="2.2" {...ROUND} />
      {/* puddle arc + splash ticks, clear of the handle */}
      <path d="M57 90.5 Q68 93.8 79 90.5" stroke={f} strokeWidth="2" fill="none" {...ROUND} />
      <path d="M56 87.5 L53.8 85 M80 87.5 L82.2 85 M68 86.5 L68 83.5" stroke={f} strokeWidth="2" {...ROUND} />
    </>
  ),

  sirena: (f, a) => (
    <>
      {/* hair: long mass down the left, two separated wavy tips */}
      <path d="M47 7 Q30 4 26 14 Q23 24 20 34 Q16 46 19 58 Q24 50 28 45 Q29 56 34 62 Q36 53 35 44 Q33 32 35 22 Q37 12 47 7 Z" fill={f} />
      {/* head */}
      <circle cx="41" cy="15" r="9" fill={f} />
      {/* torso narrowing to pinched waist */}
      <path d="M33 27 Q41 22 49 27 Q52 39 45 51 Q41 53 37 51 Q30 39 33 27 Z" fill={f} />
      {/* tail: single thick sweep down-left then right to the stem */}
      <path d="M37 51 C27 60 24 70 31 78 C39 86 54 87 63 81 Q67 78 69 73 L66 66 Q58 63 51 57 Q47 54 45 51 Z" fill={f} />
      {/* large two-lobed fluke lifted upward with deep notch */}
      <path d="M62 77 Q61 68 65 61 Q64 46 71 32 Q79 41 80 53 L80 56 Q87 45 95 42 Q93 57 84 65 Q76 72 64 77 Z" fill={f} />
      {/* raised arm with hand */}
      <path d="M49 32 Q57 28 61 17" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="62.5" cy="13" r="3.6" fill={f} />
      {/* seam channel so lower arm separates from hair and torso */}
      <path d="M36 30 Q31.5 40 36 50" stroke={a} strokeWidth="7.5" fill="none" {...ROUND} />
      {/* lower arm resting down to the hip */}
      <path d="M36 30 Q31.5 40 36 50" stroke={f} strokeWidth="4.6" fill="none" {...ROUND} />
      {/* face */}
      <circle cx="37.5" cy="14" r="2" fill={a} />
      <circle cx="44.5" cy="14" r="2" fill={a} />
      <path d="M38 20 Q41 22.5 44 20" stroke={a} strokeWidth="1.8" fill="none" {...ROUND} />
      {/* waist seam marking skin-to-tail boundary */}
      <path d="M37 50.5 Q41 53 45 50.5" stroke={a} strokeWidth="2.2" fill="none" opacity="0.8" {...ROUND} />
      {/* two scale rows below the waist */}
      <path d="M35 58 Q43 63 50 58.5 M32 67 Q43 73 55 68" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      {/* fin rays */}
      <path d="M70 60 Q73 47 72 37 M78 62 Q84 52 90 46" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* hair strand */}
      <path d="M29 14 Q25 30 24 44 Q23 52 25 56" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* waves */}
      <path d="M6 88 Q11 82 16 88 Q21 94 26 88" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
      <path d="M74 92 Q80 86 86 92 Q91 96 95 92" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
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
      <rect x="41" y="8" width="18" height="9" rx="2" fill={f} />
      <path d="M44 16 L56 16 L56 31 Q68 39 68 53 L68 83 Q68 90 61 90 L39 90 Q32 90 32 83 L32 53 Q32 39 44 31 Z" fill={f} />
      <path d="M45.5 23 L54.5 23" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
      <path d="M36 47 Q50 41 64 47" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <rect x="38" y="55" width="24" height="21" rx="3" fill={a} opacity="0.82" />
      <path d="M42.5 62 L57.5 62 M42.5 68 L57.5 68" stroke={f} strokeWidth="1.6" opacity="0.7" {...ROUND} />
    </>
  ),

  barril: (f, a) => (
    <>
      <path d="M31 13 L69 13 Q82 30 82 50 Q82 70 69 87 L31 87 Q18 70 18 50 Q18 30 31 13 Z" fill={f} />
      <path d="M23.5 25 L76.5 25 L79.5 32 L20.5 32 Z M20.5 68 L79.5 68 L77 75 L23 75 Z" fill={a} opacity="0.78" />
      <path d="M37 17 Q28 50 37 83 M50 14 L50 86 M63 17 Q72 50 63 83" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      <circle cx="50" cy="50" r="2.8" fill={a} />
    </>
  ),

  arbol: (f, a) => (
    <>
      <path
        d="M40 66
           Q26 72 17 54
           Q4 44 15 27
           Q24 9 40 11
           Q53 3 66 13
           Q84 11 87 33
           Q96 46 81 56
           Q74 71 60 66
           Z"
        fill={f}
      />
      <path d="M41 62 Q46 76 37 90 L33 92 L67 92 L63 90 Q54 76 59 62 Z" fill={f} />
      <path d="M45 78 L41 88 M55 78 L59 88 M50 70 L50 86" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      <circle cx="34" cy="40" r="3" fill={a} opacity="0.4" />
      <circle cx="61" cy="31" r="3" fill={a} opacity="0.4" />
      <circle cx="50" cy="50" r="3" fill={a} opacity="0.4" />
    </>
  ),

  melon: (f, a) => (
    <>
      <ellipse cx="44" cy="46" rx="31" ry="26" fill={f} />
      <path d="M44 20 Q6 46 44 72 M44 20 Q26 46 44 72 M44 20 Q62 46 44 72 M44 20 Q82 46 44 72" stroke={a} strokeWidth="2.6" fill="none" opacity="0.62" {...ROUND} />
      <path d="M44 22 Q41 14 46 9" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M47 12 Q57 5 65 11 Q56 18 47 12 Z" fill={f} />
      <path d="M40 13 Q31 7 30 14 Q30 19 35 18" stroke={f} strokeWidth="2" fill="none" {...ROUND} />
      <path d="M36 74 L92 64 Q69 102 36 74 Z" fill={f} />
      <path d="M39 74.5 L88 66 Q69 93 39 74.5 Z" fill={a} opacity="0.7" />
      <circle cx="55" cy="77" r="2" fill={f} />
      <circle cx="65" cy="76" r="2" fill={f} />
      <circle cx="75" cy="73" r="2" fill={f} />
    </>
  ),

  valiente: (f, a) => (
    <>
      {/* sombrero */}
      <ellipse cx="44" cy="17.5" rx="10" ry="6.5" fill={f} />
      <path d="M20 27 Q20 17.5 44 16.5 Q68 17.5 68 27 Q56 31.5 44 31.5 Q32 31.5 20 27 Z" fill={f} />
      {/* head */}
      <ellipse cx="44" cy="36" rx="11.5" ry="12.5" fill={f} />
      {face(a, 44, 36, 'serious')}
      {/* determined eyebrows */}
      <path d="M35.5 30.5 L41 32.5 M52.5 30.5 L47 32.5" stroke={a} strokeWidth="1.8" opacity="0.7" {...ROUND} />
      {/* broad torso with wide-stance legs */}
      <path d="M27 92 L31 64 Q31 54 44 53 Q57 54 57 64 L61 92 L50 92 L44 75 L38 92 Z" fill={f} />
      {/* sarape stripes across chest */}
      <path d="M36 60 L52 66 M34 66 L52 72" stroke={a} strokeWidth="2.4" opacity="0.55" {...ROUND} />
      {/* belt */}
      <path d="M34 76 L41 76 M47 76 L55 76" stroke={a} strokeWidth="2" opacity="0.5" {...ROUND} />
      {/* left arm akimbo, hand on hip */}
      <path d="M33 60 L24 69 L32 76" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      {/* right arm raised to fist */}
      <path d="M50 59 L64 50" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <circle cx="66" cy="49.5" r="4.6" fill={f} />
      {/* crossguard */}
      <path d="M66 38 L77 46" stroke={f} strokeWidth="4" {...ROUND} />
      {/* machete blade */}
      <path d="M67 40 L87 10 Q89 8 91.5 10.5 Q93.5 14 90.5 17.5 L74.5 46 Z" fill={f} />
      <path d="M71 41 L87 16" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
    </>
  ),

  gorrito: (f, a) => (
    <>
      <g transform="rotate(-7 50 52)">
        {/* ribbon ties hanging from the sides */}
        <path d="M17 62 Q12 73 15 85 L20 80.5 L24 84 Q23 73 24 62 Z" fill={f} />
        <path d="M83 62 Q88 76 85 91 L80 86 L76 90 Q77 76 76 62 Z" fill={f} />
        {/* soft rounded crown */}
        <path d="M19 56 Q16 21 49 14 Q84 19 83 56 Q51 50 19 56 Z" fill={f} />
        {/* pompom on top */}
        <circle cx="48" cy="12" r="4.2" fill={f} />
        {/* frilled brim: small scallops */}
        <path d="M15 52 L85 52 L85 62 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 -10 0 Z" fill={f} />
        {/* soft fabric gather lines */}
        <path d="M28 44 Q50 37 73 44 M33 31 Q50 25 68 31" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
        {/* seam between crown and frill */}
        <path d="M18 52 L83 52" stroke={a} strokeWidth="1.8" opacity="0.45" {...ROUND} />
      </g>
    </>
  ),

  muerte: (f, a) => (
    <>
      {/* scythe shaft */}
      <path d="M70 8 L60 92" stroke={f} strokeWidth="4.5" {...ROUND} />
      {/* crescent blade attached to shaft top, tip hooking down-left over the head */}
      <path d="M75 3.5 Q54 -2 38 5 Q26 11 23 26 Q29 11 46 8.5 Q60 6 71 12 Z" fill={f} />
      {/* blade back-edge shading */}
      <path d="M66 8 Q48 4.5 36 10" stroke={a} strokeWidth="1.6" fill="none" opacity="0.5" {...ROUND} />
      {/* skull */}
      <circle cx="41" cy="20" r="7.5" fill={f} />
      {/* jaw */}
      <path d="M36.5 26 L45.5 26 L45.5 29.5 Q45.5 31.5 41 31.5 Q36.5 31.5 36.5 29.5 Z" fill={f} />
      <path d="M36.8 27.2 L45.2 27.2" stroke={a} strokeWidth="1.2" opacity="0.6" {...ROUND} />
      {/* teeth */}
      <path d="M39 28.3 L39 30.6 M41.3 28.3 L41.3 30.9 M43.6 28.3 L43.6 30.6" stroke={a} strokeWidth="1.2" opacity="0.6" {...ROUND} />
      {/* eye sockets + nose notch */}
      <circle cx="38.2" cy="19" r="2.1" fill={a} />
      <circle cx="44" cy="19" r="2.1" fill={a} />
      <path d="M41.2 20.8 L39.9 23.6 L42.5 23.6 Z" fill={a} />
      {/* neck */}
      <path d="M41 30.5 L41 35" stroke={f} strokeWidth="3.5" {...ROUND} />
      {/* ribcage */}
      <path d="M41 34 Q51 34 50 42 Q49 49 41 49.5 Q33 49 32 42 Q31 34 41 34 Z" fill={f} />
      {/* rib gaps punched into the chest */}
      <path d="M34 38.5 L48 38.5 M33.8 42 L48.2 42 M34.8 45.5 L47.2 45.5" stroke={a} strokeWidth="2" {...ROUND} />
      {/* spine */}
      <path d="M41 49.5 L41 57" stroke={f} strokeWidth="3.5" {...ROUND} />
      {/* bow-tie pelvis with center seam */}
      <path d="M32 56.5 C38 59.5 44 59.5 50 56.5 L50 66.5 C44 63.5 38 63.5 32 66.5 Z" fill={f} />
      <path d="M41 58.5 L41 62" stroke={a} strokeWidth="1.5" opacity="0.55" {...ROUND} />
      {/* right arm gripping shaft high */}
      <path d="M48.5 35.5 L57 39.5 L67 33" stroke={f} strokeWidth="4" {...ROUND} />
      <circle cx="48.5" cy="35.5" r="2.5" fill={f} />
      <circle cx="57" cy="39.5" r="2.5" fill={f} />
      <circle cx="67" cy="33" r="3" fill={f} />
      {/* left arm gripping shaft low */}
      <path d="M33.5 35.5 L27.5 52 L64.6 54" stroke={f} strokeWidth="4" {...ROUND} />
      <circle cx="33.5" cy="35.5" r="2.5" fill={f} />
      <circle cx="27.5" cy="52" r="2.5" fill={f} />
      <circle cx="64.6" cy="54" r="3" fill={f} />
      {/* striding left leg */}
      <path d="M36 64.5 L31 76 L28 88 L21 90" stroke={f} strokeWidth="4" {...ROUND} />
      <circle cx="31" cy="76" r="2.5" fill={f} />
      {/* trailing right leg, foot kept clear of shaft */}
      <path d="M46 64.5 L48.5 76 L49.5 88 L54.5 89.5" stroke={f} strokeWidth="4" {...ROUND} />
      <circle cx="48.5" cy="76" r="2.5" fill={f} />
    </>
  ),

  pera: (f, a) => (
    <>
      <path d="M50 26 C57 26 60 33 60 40 C60 47 64 52 68 58 C72 64 74 70 74 76 C74 86 63 91 50 91 C37 91 26 86 26 76 C26 70 28 64 32 58 C36 52 40 47 40 40 C40 33 43 26 50 26 Z" fill={f} />
      <path d="M50 27 Q48 17 56 10" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      <path d="M55 15 Q66 3 78 10 Q70 23 57 20 Q54 17 55 15 Z" fill={f} />
      <path d="M59 15 Q68 11 74 11" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
      <path d="M42 49 Q34 60 33 71 Q33 80 39 86" stroke={a} strokeWidth="3" fill="none" opacity="0.5" {...ROUND} />
    </>
  ),

  bandera: (f, a) => (
    <>
      <rect x="16" y="11" width="5" height="79" rx="2" fill={f} />
      <circle cx="18.5" cy="11" r="4.5" fill={f} />
      <path d="M21 16 L86 16 L86 54 L21 54 Z" fill={f} />
      <rect x="21" y="16" width="21.7" height="38" fill={a} opacity="0.72" />
      <rect x="64.3" y="16" width="21.7" height="38" fill={a} opacity="0.42" />
      <path d="M54.6 34.5 L59.5 39 L53.6 40.6 Z" fill={a} opacity="0.85" />
      <path d="M44.5 26.2 L49.2 23.4 Q51.8 22 53 24.2 Q53.7 25.5 53.4 26.8 Q57.2 21.2 63.8 20.4 Q62.8 27 57.6 30 Q55.6 31.1 54.2 31.2 L54.9 34.8 Q55.2 39.6 51.2 41.8 Q48 38.6 47.4 32.6 Q46.4 28.6 44.5 26.2 Z" fill={a} opacity="0.85" />
      <path d="M56.8 29.3 Q60.8 26.5 62.3 22.3" stroke={f} strokeWidth="1.2" fill="none" opacity="0.9" {...ROUND} />
      <circle cx="50" cy="24.9" r="1" fill={f} />
      <path d="M52 49.5 L52 42 M52 45 Q48.6 45 48 41.8 M52 45 Q55.4 45 56 41.8" stroke={a} strokeWidth="2.4" fill="none" opacity="0.85" {...ROUND} />
    </>
  ),

  bandolon: (f, a) => (
    <>
      <g transform="translate(-4 1) rotate(40 50 50) translate(50 50) scale(1.1) translate(-50 -50)">
        {/* teardrop body */}
        <path d="M44 30 C31 39 25 53 25 66 C25 81 36 91 50 91 C64 91 75 81 75 66 C75 53 69 39 56 30 Z" fill={f} />
        {/* short neck */}
        <rect x="44" y="13" width="12" height="20" fill={f} />
        {/* headstock */}
        <rect x="42" y="1" width="16" height="14" rx="4.5" fill={f} />
        {/* tuning pegs, both sides */}
        <circle cx="39.5" cy="5" r="2.6" fill={f} />
        <circle cx="39.5" cy="11" r="2.6" fill={f} />
        <circle cx="60.5" cy="5" r="2.6" fill={f} />
        <circle cx="60.5" cy="11" r="2.6" fill={f} />
        {/* nut seam */}
        <path d="M44.5 16.5 L55.5 16.5" stroke={a} strokeWidth="2" opacity="0.7" {...ROUND} />
        {/* sound hole */}
        <circle cx="50" cy="54" r="7.5" fill={a} opacity="0.9" />
        {/* strings */}
        <path d="M46.5 18 L46.5 76 M50 18 L50 76 M53.5 18 L53.5 76" stroke={a} strokeWidth="1.5" opacity="0.55" {...ROUND} />
        {/* bridge */}
        <path d="M40 76.5 L60 76.5" stroke={a} strokeWidth="3.4" opacity="0.8" {...ROUND} />
        {/* tailpiece */}
        <path d="M46 85 L54 85" stroke={a} strokeWidth="2.4" opacity="0.55" {...ROUND} />
      </g>
    </>
  ),

  cello: (f, a) => (
    <>
      {/* scroll */}
      <circle cx="50" cy="12" r="5.5" fill={f} />
      <circle cx="50" cy="12" r="2" fill={a} opacity="0.7" />
      {/* tuning pegs */}
      <path d="M46 18 L40 18 M54 18 L60 18 M46 22 L41 22 M54 22 L59 22" stroke={f} strokeWidth="2.2" {...ROUND} />
      {/* bow (behind body): stick, hair, tip, frog */}
      <path d="M13 86 L90 44" stroke={f} strokeWidth="2.6" {...ROUND} />
      <path d="M14.5 88.8 L91.5 46.8" stroke={f} strokeWidth="1.6" {...ROUND} />
      <path d="M90 44 L91.5 46.8" stroke={f} strokeWidth="1.6" {...ROUND} />
      <path d="M13.5 87.2 L15 90" stroke={f} strokeWidth="3.6" {...ROUND} />
      {/* neck */}
      <rect x="46" y="15" width="8" height="24" rx="1.5" fill={f} />
      {/* body with two C-bout waists */}
      <path d="M50 35 Q31 35 30 45 Q29 52 36 56 Q42.5 61 36 66 Q27 69.5 27 78 Q27 87.5 50 89 Q73 87.5 73 78 Q73 69.5 64 66 Q57.5 61 64 56 Q71 52 70 45 Q69 35 50 35 Z" fill={f} />
      {/* endpin */}
      <path d="M50 89 L50 94" stroke={f} strokeWidth="3" {...ROUND} />
      {/* strings */}
      <path d="M47.5 16 L47.5 76 M50 16 L50 76 M52.5 16 L52.5 76" stroke={a} strokeWidth="1.3" opacity="0.65" {...ROUND} />
      {/* f-holes */}
      <path d="M43 56.5 Q40.5 62.5 43 68.5 M57 56.5 Q59.5 62.5 57 68.5" stroke={a} strokeWidth="2" fill="none" opacity="0.7" {...ROUND} />
      <circle cx="43" cy="56.5" r="1.3" fill={a} opacity="0.7" />
      <circle cx="43" cy="68.5" r="1.3" fill={a} opacity="0.7" />
      <circle cx="57" cy="56.5" r="1.3" fill={a} opacity="0.7" />
      <circle cx="57" cy="68.5" r="1.3" fill={a} opacity="0.7" />
      {/* bridge */}
      <rect x="42" y="70.5" width="16" height="2.6" rx="0.9" fill={a} opacity="0.75" />
      {/* tailpiece */}
      <path d="M46.8 76.5 L53.2 76.5 L52.2 84.5 L47.8 84.5 Z" fill={a} opacity="0.75" />
    </>
  ),

  garza: (f, a) => (
    <>
      {/* teardrop body, tail tapering back-right */}
      <path d="M35 58 Q35 46 50 44 Q66 42 85 36 Q81 52 69 60 Q58 69 48 68 Q36 66 35 58 Z" fill={f} />
      {/* S-curved neck as thick rounded stroke */}
      <path d="M44 56 C54 50 55 38 46 32 C40 28 39 22 42 19" stroke={f} strokeWidth="8" fill="none" {...ROUND} />
      {/* head */}
      <circle cx="41" cy="18" r="6" fill={f} />
      {/* dagger beak */}
      <path d="M36 14.5 L13 21 L37 21.5 Z" fill={f} />
      {/* thin swept crest plumes */}
      <path d="M46 14 Q55 12 60 17" stroke={f} strokeWidth="2.2" fill="none" {...ROUND} />
      <path d="M46 18 Q53 17 57 21" stroke={f} strokeWidth="1.8" fill="none" {...ROUND} />
      {/* eye */}
      <circle cx="39" cy="17" r="1.8" fill={a} />
      {/* wing detail */}
      <path d="M46 52 Q60 56 72 48" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M52 60 Q62 60 70 53" stroke={a} strokeWidth="1.6" fill="none" opacity="0.4" {...ROUND} />
      {/* straight leg + foot */}
      <path d="M47 67 L47 92" stroke={f} strokeWidth="3.4" {...ROUND} />
      <path d="M47 92 L41 94 M47 92 L53 94" stroke={f} strokeWidth="2.2" {...ROUND} />
      {/* folded leg with dangling foot */}
      <path d="M58 66 L63 76 L56 81" stroke={f} strokeWidth="3.4" fill="none" {...ROUND} />
      <path d="M56 81 L51 84" stroke={f} strokeWidth="2.2" {...ROUND} />
    </>
  ),

  pajaro: (f, a) => (
    <>
      {/* branch */}
      <path d="M9 86 Q50 79 91 84" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      <path d="M76 82 Q79 72 90 71 Q89 82 78 84 Z" fill={f} />
      {/* notched tail */}
      <path d="M40 50 L10 40 L21 49 L12 56 L42 64 Z" fill={f} />
      {/* body */}
      <path d="M58 22 Q42 24 34 38 Q28 50 34 62 Q40 75 56 76 Q70 76 75 62 Q79 50 74 36 Q70 26 58 22 Z" fill={f} />
      {/* head (slight tilt up-right) */}
      <circle cx="64" cy="32" r="13" fill={f} />
      {/* beak */}
      <path d="M75 26 L91 30 L75 37 Z" fill={f} />
      {/* eye */}
      <circle cx="67" cy="29" r="2.4" fill={a} />
      {/* wing with feather lines */}
      <path d="M43 42 Q58 38 64 49 Q58 61 45 59 Q37 50 43 42 Z" stroke={a} strokeWidth="2.2" fill="none" opacity="0.7" {...ROUND} />
      <path d="M47 43 L42 55 M53 41.5 L47 58 M59 45 L53 59" stroke={a} strokeWidth="1.7" opacity="0.6" {...ROUND} />
      {/* legs gripping branch */}
      <path d="M50 74 L48 83 M60 74 L60 83" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M48 83 L45 87 M48 83 L51 87 M60 83 L57 87 M60 83 L63 87" stroke={f} strokeWidth="1.8" {...ROUND} />
    </>
  ),

  mano: (f, a) => (
    <>
      {/* palm + four fingers */}
      <path d="M30 57 L30 32 Q30 25 36 25 Q42 25 42 32 L42 48 L42 20 Q42 13 49 13 Q55 13 55 20 L55 48 L55 23 Q55 17 61 17 Q67 17 67 23 L67 49 L67 31 Q67 25 73 25 Q79 25 79 31 L79 58 Q79 84 54 91 Q32 86 28 66 Z" fill={f} />
      {/* thumb: fat lobe merged into palm edge */}
      <path d="M33 53 Q24 57 19 65" stroke={f} strokeWidth="11" {...ROUND} />
      {/* cuff */}
      <rect x="36" y="87" width="32" height="7.5" rx="2.5" fill={f} />
      <path d="M38 87.5 L66 87.5" stroke={a} strokeWidth="1.8" opacity="0.6" {...ROUND} />
      {/* palm creases */}
      <path d="M36 61 Q41 72 43 82 M46 56 Q49 72 50 86 M57 56 Q59 72 61 84 M69 62 Q67 73 64 82" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
      {/* finger seams */}
      <path d="M40 33 L40 48 M53 24 L53 48 M65 30 L65 49" stroke={a} strokeWidth="1.4" opacity="0.45" {...ROUND} />
      {/* thumb crease */}
      <path d="M32 51 Q28 55 26 60" stroke={a} strokeWidth="1.6" fill="none" opacity="0.5" {...ROUND} />
      {/* palm dot */}
      <circle cx="54" cy="65" r="4" fill={a} opacity="0.36" />
    </>
  ),

  bota: (f, a) => (
    <>
      {/* pull-strap loop at top rear */}
      <ellipse cx="25.5" cy="8.2" rx="4.8" ry="5.4" stroke={f} strokeWidth="3.6" fill="none" transform="rotate(-18 25.5 8.2)" />
      {/* boot body: tall straight shaft, notched top, rounded toe, stacked heel */}
      <path d="M20 12 L32 12 Q37 18 42 12 L50 12 Q48 24 47.5 34 L47.5 51 Q47.5 61 57 65 L66 68 Q81 72 86.5 78 Q91 85 81 85 L54 85 L50 92.5 L20 92.5 Q23 52 20 12 Z" fill={f} />
      {/* top band stitch */}
      <path d="M23 21 L47 21" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      {/* shaft chevron stitches */}
      <path d="M28 33 Q34.5 38 41 33 M28 43 Q34.5 48 41 43" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* back seam */}
      <path d="M24 27 L23 78" stroke={a} strokeWidth="1.6" opacity="0.4" {...ROUND} />
      {/* ankle seam */}
      <path d="M47.5 54 Q49 62 57.5 65.5" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      {/* sole line */}
      <path d="M55 81.5 L79 81.5" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
      {/* heel stitch */}
      <path d="M23 89 L45 89" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
    </>
  ),

  luna: (f, a) => (
    <>
      <path
        d="M34 12 A40 40 0 1 1 34 88
           C46 84 52 79 55 71
           Q56 67 50 65.5
           Q46.5 64 50 61.5
           L54 61
           Q47.5 58.5 52 56
           L51.5 55
           Q41.5 53.5 44 49
           Q46.5 45.5 53 42.5
           Q56.5 32 52 25
           Q46 18 34 12 Z"
        fill={f}
      />
      <path d="M53.5 45.5 Q58 49.5 63.5 45.5" stroke={a} strokeWidth="2.2" fill="none" {...ROUND} />
      <path d="M52.5 39 Q58 36.5 64 39" stroke={a} strokeWidth="2" fill="none" opacity="0.7" {...ROUND} />
      <path d="M55 60.5 Q58.5 62.4 62 60.5" stroke={a} strokeWidth="2" fill="none" opacity="0.75" {...ROUND} />
      <circle cx="73" cy="32" r="2.2" fill={a} opacity="0.45" />
      <circle cx="71" cy="73" r="2" fill={a} opacity="0.4" />
      <path d="M18 23 Q18 29 24 29 Q18 29 18 35 Q18 29 12 29 Q18 29 18 23 Z" fill={f} />
      <path d="M12 52 Q12 56 16 56 Q12 56 12 60 Q12 56 8 56 Q12 56 12 52 Z" fill={f} />
      <path d="M24 71 Q24 76 29 76 Q24 76 24 81 Q24 76 19 76 Q24 76 24 71 Z" fill={f} />
    </>
  ),

  cotorro: (f, a) => (
    <>
      {/* perch bar */}
      <path d="M9 73 Q50 68 91 73" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* long tapering tail feathers hanging below the perch */}
      <path d="M49 62 L51 94 L57 93 L55 60 Z" fill={f} />
      <path d="M54 59 L62 92 L67 89 L60 56 Z" fill={f} />
      <path d="M59 55 L69 84 L73 81 L64 52 Z" fill={f} />
      {/* body */}
      <path d="M50 34 Q37 38 35 52 Q34 65 45 70 Q57 74 63 64 Q67 55 65 43 Q63 35 55 33 Z" fill={f} />
      {/* head */}
      <circle cx="47" cy="24" r="13" fill={f} />
      {/* compact hooked beak */}
      <path d="M43 13 Q26 10 25 22 Q25 31 30 39 Q35 36 38 29 Q42 19 43 15 Z" fill={f} />
      <path d="M43 14 Q38 21 39 29" stroke={a} strokeWidth="1.7" fill="none" opacity="0.55" {...ROUND} />
      <path d="M27 25 Q31 29 37 29" stroke={a} strokeWidth="1.6" fill="none" opacity="0.6" {...ROUND} />
      {/* round eye patch + pupil */}
      <circle cx="49" cy="22" r="5.2" stroke={a} strokeWidth="1.9" fill="none" opacity="0.75" />
      <circle cx="49" cy="22" r="2.5" fill={a} />
      {/* folded wing with feather lines */}
      <path d="M51 40 Q61 42 61 52 Q60 62 50 65 Q43 60 43 50 Q44 42 51 40 Z" stroke={a} strokeWidth="2.1" fill="none" opacity="0.7" {...ROUND} />
      <path d="M49 43 L46 58 M54 44 L50 62 M58 48 L55 61" stroke={a} strokeWidth="1.6" opacity="0.55" {...ROUND} />
      {/* feet gripping the perch */}
      <path d="M40 67 L39 75 M48 70 L48 75" stroke={f} strokeWidth="3.4" {...ROUND} />
      <path d="M39 75 L34 81 M39 75 L42 81 M48 75 L44 81 M48 75 L52 81" stroke={f} strokeWidth="2.4" {...ROUND} />
    </>
  ),

  borracho: (f, a) => (
    <>
      {/* rumpled hat, askew */}
      <g transform="rotate(-15 42 28)">
        <ellipse cx="42" cy="28" rx="18.5" ry="4.8" fill={f} />
        <path d="M31 28 Q31.5 14 38.5 12.5 L41.5 16.5 L45.5 12 Q53 13.5 53.5 28 Q42 31.5 31 28 Z" fill={f} />
        <path d="M33 24 Q42 27.5 51.5 24" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      </g>
      {/* head, tilted with the sway */}
      <g transform="rotate(-8 42 38)">
        <ellipse cx="42" cy="38" rx="12.5" ry="13.5" fill={f} />
      </g>
      {/* happy closed tipsy eyes */}
      <path d="M33.5 36.5 Q36.5 39.5 39.5 36.5 M44.5 36 Q47.5 39 50.5 36" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      {/* red nose */}
      <circle cx="42" cy="42" r="1.9" fill={a} opacity="0.7" />
      {/* lopsided grin */}
      <path d="M36 46 Q42 51 48 45" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      {/* leaning torso */}
      <path d="M34 91 Q33 76 38 63 Q40 55 47 54 Q54 54 57 60 L68 91 Z" fill={f} />
      {/* collar + rumpled fold lines */}
      <path d="M39 62 Q47 68 55 61" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M45 72 L42 88 M53 71 L57 88" stroke={a} strokeWidth="1.6" opacity="0.45" {...ROUND} />
      {/* dangling left arm, swinging away from body */}
      <path d="M39 63 Q28 68 24 80" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <circle cx="24" cy="82" r="4.2" fill={f} />
      {/* raised right arm to bottle */}
      <path d="M53 60 L63 52 L71 45" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      {/* bottle, tipped in a toast */}
      <g transform="rotate(22 72.5 44)">
        <rect x="68.4" y="6.5" width="8.2" height="4.8" rx="2" fill={f} />
        <path d="M69.6 10.5 L75.4 10.5 L75.4 19.5 Q80.5 23 80.5 28.5 L80.5 41 Q80.5 44.5 77 44.5 L68 44.5 Q64.5 44.5 64.5 41 L64.5 28.5 Q64.5 23 69.6 19.5 Z" fill={f} />
        <rect x="66.4" y="29.5" width="12.2" height="7.5" rx="1" fill={a} opacity="0.6" />
        <path d="M70.4 14.5 L74.6 14.5" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
      </g>
      {/* hand gripping bottle */}
      <circle cx="72" cy="44" r="4.4" fill={f} />
      {/* splashing drops */}
      <circle cx="90.5" cy="7.5" r="2" fill={f} />
      <circle cx="92" cy="14.5" r="1.5" fill={f} />
    </>
  ),

  negrito: (f, a) => (
    <>
      {/* cane planted down-left */}
      <path d="M26 45 L15.5 90" stroke={f} strokeWidth="4.2" {...ROUND} />
      {/* arm reaching out to grip the cane */}
      <path d="M40 39 Q32 41 26.5 48" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="24.6" cy="51" r="4.2" fill={f} />
      {/* other arm flung up, bent at the elbow */}
      <path d="M58 38 Q68 33 72 25" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="73" cy="22" r="4.2" fill={f} />
      {/* planted leg + shoe */}
      <path d="M45 63 L41 86" stroke={f} strokeWidth="7" {...ROUND} />
      <ellipse cx="37" cy="88.5" rx="6.3" ry="3.1" fill={f} />
      {/* kicked leg: bent knee, heel up */}
      <path d="M53 63 L64 73 L72.5 62.5" stroke={f} strokeWidth="7" fill="none" {...ROUND} />
      <ellipse cx="77" cy="57" rx="6.4" ry="3.2" fill={f} transform="rotate(-40 77 57)" />
      {/* tilted fitted jacket with flared hem */}
      <path d="M40 35 Q50 31.5 61 37.5 L57 56 Q58.5 61 56.5 64 L37.5 64 Q35.5 60 38.5 56 Z" fill={f} />
      {/* head */}
      <circle cx="46" cy="24" r="9" fill={f} />
      {/* flat wide-brim hat with band */}
      <g transform="rotate(-9 44 13)">
        <ellipse cx="44" cy="13" rx="19" ry="4.2" fill={f} />
        <path d="M33.5 13 L33.5 6.5 Q33.5 3.5 44 3.5 Q54.5 3.5 54.5 6.5 L54.5 13 Z" fill={f} />
        <rect x="33.5" y="9.4" width="21" height="3.4" fill={a} opacity="0.55" />
      </g>
      {/* face */}
      <circle cx="43" cy="23" r="2" fill={a} />
      <circle cx="49.6" cy="23" r="2" fill={a} />
      <path d="M43 27.5 Q46.3 31 49.6 27.5" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      {/* bow tie */}
      <path d="M48.5 38.5 L43 35.7 L43 41.3 Z M48.5 38.5 L54 35.7 L54 41.3 Z" fill={a} />
      <circle cx="48.5" cy="38.5" r="1.5" fill={a} />
      {/* jacket buttons */}
      <circle cx="48.3" cy="47" r="1.6" fill={a} opacity="0.75" />
      <circle cx="47.3" cy="55" r="1.6" fill={a} opacity="0.75" />
      {/* trouser creases */}
      <path d="M45 66 L42.5 83" stroke={a} strokeWidth="1.8" opacity="0.45" {...ROUND} />
      <path d="M55 65.5 L61 70.5" stroke={a} strokeWidth="1.8" opacity="0.45" {...ROUND} />
    </>
  ),

  corazon: (f, a) => (
    <>
      {/* arrow shaft behind heart (heart occludes middle) */}
      <path d="M95 8.5 L14 83" stroke={f} strokeWidth="3.8" {...ROUND} />
      {/* fletching feather ticks at tail */}
      <path d="M88.4 7.9 L91 17" stroke={f} strokeWidth="3.4" {...ROUND} />
      <path d="M82.8 13 L85.4 22.1" stroke={f} strokeWidth="3.4" {...ROUND} />
      {/* solid triangular arrowhead exiting lower-left */}
      <path d="M7.5 89 L10.7 78.5 L18.3 86.7 Z" fill={f} />
      {/* heart (dominant mass, drawn on top) */}
      <path d="M50 86 Q14 62 14 36 Q14 18 31 18 Q44 18 50 33 Q56 18 69 18 Q86 18 86 36 Q86 62 50 86 Z" fill={f} />
      {/* gloss accent */}
      <path d="M25 32 Q27 26 33 25 Q37 27 34 32 Q29 34 25 32 Z" fill={a} opacity="0.36" />
    </>
  ),

  sandia: (f, a) => (
    <>
      <path d="M50 19 Q30 42 12 67 Q50 92 88 67 Q70 42 50 19 Z" fill={f} />
      <path d="M50 26 Q34 46 19 65 Q50 82 81 65 Q66 46 50 26 Z" fill={a} opacity="0.78" />
      <path d="M16 70 Q50 88 84 70" stroke={a} strokeWidth="2" fill="none" opacity="0.5" {...ROUND} />
      <ellipse cx="50" cy="44" rx="2.5" ry="3.5" fill={f} />
      <ellipse cx="38" cy="59" rx="2.5" ry="3.5" fill={f} transform="rotate(-16 38 59)" />
      <ellipse cx="62" cy="59" rx="2.5" ry="3.5" fill={f} transform="rotate(16 62 59)" />
      <ellipse cx="50" cy="66" rx="2.3" ry="3.2" fill={f} />
    </>
  ),

  tambor: (f, a) => (
    <>
      <path d="M27 44 L73 13 M73 44 L27 13" stroke={f} strokeWidth="4" {...ROUND} />
      <circle cx="73" cy="13" r="4.5" fill={f} />
      <circle cx="27" cy="13" r="4.5" fill={f} />
      <ellipse cx="50" cy="44" rx="31" ry="10" fill={f} />
      <path d="M19 44 L19 72 Q19 83.5 50 85.5 Q81 83.5 81 72 L81 44 Q72 53.5 50 53.5 Q28 53.5 19 44 Z" fill={f} />
      <ellipse cx="50" cy="44" rx="25" ry="5.8" fill={a} opacity="0.55" />
      <path d="M23 57 Q50 62.5 77 57" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <path d="M23 77 Q50 86.5 77 77" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <path d="M23 57 L32 79.6 L41 59.4 L50 81.7 L59 59.4 L68 79.6 L77 57" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
    </>
  ),

  camaron: (f, a) => (
    <>
      <ellipse cx="30" cy="46" rx="14" ry="13" fill={f} />
      <path d="M20 38 L10 29 L23 49 Z" fill={f} />
      <path d="M32 32 Q54 14 74 26 Q88 36 87 52 Q86 68 70 73 L60 77 Q68 64 66 52 Q62 40 48 38 Q38 36 32 46 Z" fill={f} />
      <path d="M67 72 L46 68 L54 76 L42 81 L55 84 L50 94 L69 83 Z" fill={f} />
      <path d="M22 36 Q6 38 8 58 Q9 70 16 78 M21 42 Q10 50 14 64 Q16 74 24 80" stroke={f} strokeWidth="2.4" fill="none" {...ROUND} />
      <path d="M27 58 L23 72 M34 60 L32 74 M41 58 L41 72" stroke={f} strokeWidth="2.2" {...ROUND} />
      <circle cx="26" cy="42" r="2.5" fill={a} />
      <path d="M48 18 Q44 27 48 37 M62 21 Q56 31 60 42 M75 27 Q67 36 66 48 M86 44 Q76 50 69 59" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M64 76 L52 73 M64 78 L50 81 M64 80 L54 88" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
    </>
  ),

  jaras: (f, a) => (
    <>
      {/* Arrow A: lower-left to upper-right, head up */}
      <path d="M85 13 L80.8 24.3 L73.7 17.2 Z" fill={f} />
      <path d="M78 20 L15 83" stroke={f} strokeWidth="4" {...ROUND} />
      <path d="M20.1 79.6 L22.9 76.8 L25.2 83.4 L22.4 86.2 Z" fill={f} />
      <path d="M25 74.7 L27.9 71.8 L30.2 78.4 L27.4 81.2 Z" fill={f} />
      <path d="M18.4 77.9 L21.2 75.1 L14.6 72.8 L11.8 75.6 Z" fill={f} />
      <path d="M23.3 73 L26.2 70.2 L19.6 67.8 L16.8 70.6 Z" fill={f} />
      <path d="M59 39 L72 26" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
      <path d="M28 70 L41 57" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />

      {/* Arrow B: lower-right to upper-left, head up */}
      <path d="M15 13 L19.2 24.3 L26.3 17.2 Z" fill={f} />
      <path d="M22 20 L85 83" stroke={f} strokeWidth="4" {...ROUND} />
      <path d="M79.9 79.6 L77.1 76.8 L74.8 83.4 L77.6 86.2 Z" fill={f} />
      <path d="M75 74.7 L72.1 71.8 L69.8 78.4 L72.6 81.2 Z" fill={f} />
      <path d="M81.6 77.9 L78.8 75.1 L85.4 72.8 L88.2 75.6 Z" fill={f} />
      <path d="M76.7 73 L73.8 70.2 L80.4 67.8 L83.2 70.6 Z" fill={f} />
      <path d="M41 39 L28 26" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
      <path d="M72 70 L59 57" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />

      {/* ribbon bow at crossing: loops, tails, knot */}
      <path d="M46.5 47.5 L35 41 Q32 48 35 55 Z" fill={f} />
      <path d="M53.5 47.5 L65 41 Q68 48 65 55 Z" fill={f} />
      <path d="M47.5 51 L42 63 L49.5 58.8 Z" fill={f} />
      <path d="M52.5 51 L58 63 L50.5 58.8 Z" fill={f} />
      <circle cx="50" cy="48" r="4.2" fill={f} />
      <circle cx="50" cy="48" r="4.2" stroke={a} strokeWidth="1.2" opacity="0.45" />
      <path d="M45.3 45 L44.6 50.8" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
      <path d="M54.7 45 L55.4 50.8" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
    </>
  ),

  musico: (f, a) => (
    <>
      {/* sombrero brim + crown */}
      <path d="M8 30 Q12 17 36 15 Q60 17 64 30 Q50 37 36 37 Q22 37 8 30 Z" fill={f} />
      <path d="M26 19 Q27 4 36 4 Q45 4 46 19 Z" fill={f} />
      <path d="M27 17 Q36 22 45 17" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M13 29 Q36 35 59 29" stroke={a} strokeWidth="1.8" fill="none" opacity="0.45" {...ROUND} />
      {/* head (profile, facing right) */}
      <circle cx="37" cy="37" r="11" fill={f} />
      <circle cx="41" cy="38" r="2.2" fill={a} />
      {/* torso (charro jacket) */}
      <path d="M21 90 L26 58 Q32 50 38 50 Q46 50 50 58 L53 90 Z" fill={f} />
      <circle cx="30" cy="66" r="1.6" fill={a} opacity="0.6" />
      <circle cx="31" cy="74" r="1.6" fill={a} opacity="0.6" />
      <circle cx="32" cy="82" r="1.6" fill={a} opacity="0.6" />
      {/* guitar: waisted figure-8 body, big lower bout */}
      <circle cx="76.5" cy="81" r="12" fill={f} />
      <circle cx="61.8" cy="71.5" r="8" fill={f} />
      {/* neck + headstock block */}
      <path d="M58 69.1 L26 48.4" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M26 48.4 L20.7 45" stroke={f} strokeWidth="8" {...ROUND} />
      {/* sound hole + bridge tick */}
      <circle cx="64.3" cy="73.1" r="4" fill={a} />
      <path d="M77.1 76.4 L72.5 83.4" stroke={a} strokeWidth="2.2" opacity="0.75" {...ROUND} />
      {/* strings: headstock to bridge */}
      <path d="M26.8 47.1 L75.6 78.6 M25.2 49.7 L74 81.2" stroke={a} strokeWidth="1.5" fill="none" opacity="0.65" {...ROUND} />
      {/* strumming arm, hand over sound hole */}
      <path d="M42 54 Q53 58 60.5 68.5" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="60.5" cy="70.5" r="3.7" fill={f} />
      {/* support arm, hand under headstock */}
      <path d="M27 59 Q23 56 21 53.5" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <circle cx="20" cy="51.7" r="3.7" fill={f} />
      {/* headstock peg dots */}
      <circle cx="24.6" cy="47.4" r="1.3" fill={a} opacity="0.75" />
      <circle cx="21.7" cy="45.5" r="1.3" fill={a} opacity="0.75" />
      {/* floating eighth note */}
      <circle cx="75" cy="19" r="3" fill={f} />
      <path d="M77.8 18.5 L77.8 8 Q83 9 81.5 15" stroke={f} strokeWidth="2.2" fill="none" {...ROUND} />
    </>
  ),

  arana: (f, a) => (
    <>
      {/* web: 8 radial spokes through center (50,48) */}
      <path d="M50 2 L50 98 M2 48 L98 48 M2 2 L98 94 M98 2 L2 94" stroke={f} strokeWidth="1.6" strokeOpacity="0.9" {...ROUND} />
      {/* web: sagging concentric rings */}
      <path d="M73 48 Q65.8 54.4 66.6 63.9 Q56.6 63.6 50 71 Q43.4 63.6 33.4 63.9 Q34.2 54.4 27 48 Q34.2 41.6 33.4 32.1 Q43.4 32.4 50 25 Q56.6 32.4 66.6 32.1 Q65.8 41.6 73 48 Z" stroke={f} strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
      <path d="M87 48 Q75.5 58.2 76.7 73.6 Q60.7 73 50 85 Q39.3 73 23.3 73.6 Q24.5 58.2 13 48 Q24.5 37.8 23.3 22.4 Q39.3 23 50 11 Q60.7 23 76.7 22.4 Q75.5 37.8 87 48 Z" stroke={f} strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
      <path d="M100 48 Q84.4 61.8 86.1 82.6 Q64.4 81.8 50 98 Q35.6 81.8 13.9 82.6 Q15.6 61.8 0 48 Q15.6 34.2 13.9 13.4 Q35.6 14.2 50 -2 Q64.4 14.2 86.1 13.4 Q84.4 34.2 100 48 Z" stroke={f} strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
      {/* legs, left */}
      <path d="M46 33 L37 23 L30 25 L26 31 M43.5 37 L33 31.5 L26.5 35.5 L24.5 42 M43.5 42 L33 44 L27.5 50 L26.5 57 M45 46 L36.5 53.5 L33.5 61 L33.5 67.5" stroke={f} strokeWidth="3.2" fill="none" {...ROUND} />
      {/* legs, right */}
      <path d="M54 33 L63 23 L70 25 L74 31 M56.5 37 L67 31.5 L73.5 35.5 L75.5 42 M56.5 42 L67 44 L72.5 50 L73.5 57 M55 46 L63.5 53.5 L66.5 61 L66.5 67.5" stroke={f} strokeWidth="3.2" fill="none" {...ROUND} />
      {/* body: abdomen + cephalothorax */}
      <ellipse cx="50" cy="58.5" rx="13.5" ry="15" fill={f} />
      <circle cx="50" cy="37.5" r="8" fill={f} />
      {/* waist seam */}
      <path d="M43.5 45 Q50 49.5 56.5 45" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      {/* eyes */}
      <circle cx="46.8" cy="36" r="2.1" fill={a} />
      <circle cx="53.2" cy="36" r="2.1" fill={a} />
      {/* abdomen chevrons */}
      <path d="M44 54 L50 58 L56 54 M44 62 L50 66 L56 62" stroke={a} strokeWidth="2.4" fill="none" opacity="0.6" {...ROUND} />
    </>
  ),

  soldado: (f, a) => (
    <>
      {/* rifle stock - wide tapered quad, flared butt at bottom */}
      <path d="M55.8 83.2 L64.2 86.6 L79.4 45.4 L73.8 43.2 Z" fill={f} />
      {/* rifle barrel - thin upper stroke */}
      <path d="M76.6 44.3 L87.2 18.3" stroke={f} strokeWidth="3" {...ROUND} />
      {/* front-sight nub near muzzle */}
      <circle cx="83.2" cy="21" r="1.7" fill={f} />
      {/* bayonet tip */}
      <path d="M87.8 16.7 L89.9 11.9" stroke={f} strokeWidth="2.6" {...ROUND} />
      {/* trigger-guard nub below gripping hand */}
      <circle cx="73.3" cy="62.3" r="2.6" fill={f} />
      {/* sling line inside stock */}
      <path d="M61.9 80.4 L75.1 48" stroke={a} strokeWidth="2" opacity="0.5" {...ROUND} />
      {/* kepi cap */}
      <path d="M28 21.5 L28 13 Q28 8.5 32.5 8.5 L47.5 8.5 Q52 8.5 52 13 L52 21.5 Z" fill={f} />
      {/* short front visor */}
      <path d="M49 17.5 L63 21 L49 24.5 Z" fill={f} />
      {/* head */}
      <circle cx="40" cy="27" r="12" fill={f} />
      {/* cap seam */}
      <path d="M29 21.5 L51.5 21.5" stroke={a} strokeWidth="2.2" opacity="0.65" {...ROUND} />
      {/* cap badge */}
      <circle cx="40" cy="14.5" r="2" fill={a} opacity="0.7" />
      {/* face */}
      <circle cx="35" cy="27.5" r="2.4" fill={a} />
      <circle cx="45" cy="27.5" r="2.4" fill={a} />
      <path d="M34.5 35.5 L45.5 35.5" stroke={a} strokeWidth="2.2" {...ROUND} />
      {/* neck */}
      <rect x="36" y="38" width="8" height="6" fill={f} />
      {/* tunic */}
      <path d="M29.5 45 Q29.5 42.5 33 42.5 L47 42.5 Q50.5 42.5 50.5 45 L53 72 L27 72 Z" fill={f} />
      {/* left arm at attention */}
      <path d="M30.5 46 L22 56.5 L23.5 68.5" stroke={f} strokeWidth="6" {...ROUND} />
      <circle cx="24" cy="71" r="3.6" fill={f} />
      {/* right arm gripping rifle */}
      <path d="M50 47 L60 51.5 L67 54.5" stroke={f} strokeWidth="6" {...ROUND} />
      <circle cx="69.8" cy="55.5" r="4" fill={f} />
      {/* belt + buckle */}
      <rect x="28.3" y="62.5" width="23.5" height="4" fill={a} opacity="0.7" />
      <rect x="37.5" y="61.5" width="5.5" height="6" fill={f} />
      {/* pocket dots */}
      <circle cx="33.5" cy="52" r="1.9" fill={a} opacity="0.65" />
      <circle cx="46.5" cy="52" r="1.9" fill={a} opacity="0.65" />
      {/* trousers */}
      <rect x="30" y="72" width="9" height="14.5" fill={f} />
      <rect x="41.5" y="72" width="9" height="14.5" fill={f} />
      {/* boots */}
      <rect x="25.5" y="88" width="13" height="7.5" rx="3.5" fill={f} />
      <rect x="41" y="88" width="13" height="7.5" rx="3.5" fill={f} />
    </>
  ),

  estrella: (f, a) => (
    <>
      {/* radiating ray dashes in the gaps between points */}
      <path d="M61.13 23.77 L64.26 16.4 M71.51 31.3 L77.55 26.05 M78.39 52.49 L86.36 53.18 M74.43 64.68 L81.29 68.8 M56.41 77.77 L58.21 85.57 M43.59 77.77 L41.79 85.57 M25.57 64.68 L18.71 68.8 M21.61 52.49 L13.64 53.18 M28.49 31.3 L22.45 26.05 M38.87 23.77 L35.74 16.4" stroke={f} strokeWidth="2.8" {...ROUND} />
      {/* bold five-point star body, outer r=36 centered at 50,50 */}
      <path d="M50 14 L58.7 38.03 L84.24 38.88 L64.08 54.57 L71.16 79.12 L50 64.8 L28.84 79.12 L35.92 54.57 L15.76 38.88 L41.3 38.03 Z" fill={f} />
      {/* faceted-gem seams from center to each tip */}
      <path d="M50 50 L50 17 M50 50 L81.39 39.8 M50 50 L69.4 76.7 M50 50 L30.6 76.7 M50 50 L18.61 39.8" stroke={a} strokeWidth="2" opacity="0.5" {...ROUND} />
      {/* center facet dot */}
      <circle cx="50" cy="50" r="3.5" fill={a} opacity="0.6" />
    </>
  ),

  cazo: (f, a) => (
    <>
      {/* steam curls rising from the basin */}
      <path d="M40 25 Q36 19 40 14 Q44 9 40 4 M60 25 Q56 19 60 14 Q64 9 60 4" stroke={f} strokeWidth="2.2" fill="none" opacity="0.85" {...ROUND} />
      {/* small ring handles at the rim sides */}
      <path d="M13 30 A6.5 6.5 0 1 0 13 42" stroke={f} strokeWidth="3.8" fill="none" {...ROUND} />
      <path d="M87 30 A6.5 6.5 0 1 1 87 42" stroke={f} strokeWidth="3.8" fill="none" {...ROUND} />
      {/* wide flared basin body */}
      <path d="M14 34 L86 34 L70 72 Q50 77 30 72 Z" fill={f} />
      {/* rolled rim band overhanging the body */}
      <ellipse cx="50" cy="34" rx="39" ry="6" fill={f} />
      {/* interior opening hint */}
      <ellipse cx="50" cy="34" rx="32" ry="4" fill={a} opacity="0.55" />
      {/* hammered-copper flute lines */}
      <path d="M25.2 42 L33.7 68 M37.6 42 L41.9 68 M50 42 L50 68 M62.4 42 L58.1 68 M74.8 42 L66.3 68" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* base shadow */}
      <path d="M28 79 L72 79" stroke={f} strokeWidth="3" opacity="0.55" {...ROUND} />
    </>
  ),

  mundo: (f, a) => (
    <>
      {/* ground line */}
      <path d="M18 92 L82 92" stroke={f} strokeWidth="2.5" {...ROUND} />
      {/* arms reaching up around the globe */}
      <path d="M42 76 Q10 56 25.8 20" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M54 76 Q90 56 74.2 20" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* globe */}
      <circle cx="50" cy="34" r="26" fill={f} />
      <g transform="translate(50 36) scale(0.62) translate(-50 -46)">
        <path d="M23 39 Q30 35 36 40 Q42 37 48 42 L45 51 L38 52 Q35 58 40 63 L49 65 L54 72 L61 68 L64 60 L73 59 L78 53 Q80 47 75 43 L68 39 L66 34 L58 31 Q52 32 49 27 Q42 25 36 30 Q28 29 23 39 Z" fill={a} opacity="0.5" />
      </g>
      <ellipse cx="50" cy="34" rx="26" ry="7.3" fill="none" stroke={a} strokeWidth="1.6" opacity="0.26" />
      <path d="M50 8 Q40 34 50 60 Q60 34 50 8" stroke={a} strokeWidth="1.6" fill="none" opacity="0.35" {...ROUND} />
      {/* hands gripping the rim at 10 and 2 o'clock */}
      <circle cx="25.8" cy="20" r="3.5" fill={f} />
      <circle cx="74.2" cy="20" r="3.5" fill={f} />
      {/* head tucked under the globe */}
      <circle cx="46" cy="68" r="6.5" fill={f} />
      {/* forward-leaning torso */}
      <path d="M49 72.5 Q54 74 58 79" stroke={f} strokeWidth="10" fill="none" {...ROUND} />
      {/* braced legs */}
      <path d="M58 79 L68.5 82.5 L66.5 90" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <path d="M56 80 L41 84 L34.5 90" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      {/* feet */}
      <path d="M63.5 90.2 L71.5 90.2" stroke={f} strokeWidth="4" {...ROUND} />
      <path d="M31 90.2 L39 90.2" stroke={f} strokeWidth="4" {...ROUND} />
    </>
  ),

  apache: (f, a) => (
    <>
      {/* war-bonnet fan: five quilled lozenge feathers rooted at (40,29) */}
      <g transform="rotate(-50 40 29)">
        <ellipse cx="40" cy="19.5" rx="5.4" ry="12" fill={f} />
        <line x1="40" y1="25" x2="40" y2="10" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      </g>
      <g transform="rotate(50 40 29)">
        <ellipse cx="40" cy="19.5" rx="5.4" ry="12" fill={f} />
        <line x1="40" y1="25" x2="40" y2="10" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      </g>
      <g transform="rotate(-24 40 29)">
        <ellipse cx="40" cy="17" rx="5.8" ry="13.5" fill={f} />
        <line x1="40" y1="23" x2="40" y2="6.5" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      </g>
      <g transform="rotate(24 40 29)">
        <ellipse cx="40" cy="17" rx="5.8" ry="13.5" fill={f} />
        <line x1="40" y1="23" x2="40" y2="6.5" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      </g>
      <ellipse cx="40" cy="15.5" rx="6" ry="14.5" fill={f} />
      <line x1="40" y1="22.5" x2="40" y2="4.5" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      {/* side-drop feathers hanging from the band ends */}
      <g transform="rotate(16 21.5 40)">
        <ellipse cx="21.5" cy="40" rx="3.4" ry="8" fill={f} />
        <line x1="21.5" y1="36.5" x2="21.5" y2="45" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      </g>
      <g transform="rotate(-16 58.5 40)">
        <ellipse cx="58.5" cy="40" rx="3.4" ry="8" fill={f} />
        <line x1="58.5" y1="36.5" x2="58.5" y2="45" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      </g>
      {/* head */}
      <ellipse cx="40" cy="44" rx="14" ry="13.5" fill={f} />
      {/* headband with dots and bottom seam */}
      <rect x="22.5" y="27" width="35" height="8.5" rx="4" fill={f} />
      <path d="M27 35.5 L53 35.5" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
      <circle cx="28.5" cy="31.2" r="1.9" fill={a} />
      <circle cx="40" cy="31.2" r="1.9" fill={a} />
      <circle cx="51.5" cy="31.2" r="1.9" fill={a} />
      {/* face */}
      <circle cx="34.5" cy="43.5" r="2.5" fill={a} />
      <circle cx="45.5" cy="43.5" r="2.5" fill={a} />
      <path d="M34.5 51.5 L45.5 51.5" stroke={a} strokeWidth="2.2" {...ROUND} />
      {/* torso tunic */}
      <path d="M29 81 L31.5 63 Q34.5 57 40 57 Q45.5 57 48.5 63 L51 81 Z" fill={f} />
      {/* necklace V */}
      <path d="M34.5 62 L40 69.5 L45.5 62" stroke={a} strokeWidth="2.2" fill="none" opacity="0.6" {...ROUND} />
      {/* fringe ticks at hem */}
      <path d="M34.5 76 L34.5 80.5 M40 76 L40 80.5 M45.5 76 L45.5 80.5" stroke={a} strokeWidth="1.8" opacity="0.55" {...ROUND} />
      {/* left arm with hand and armband */}
      <path d="M32.5 64 L21.5 79" stroke={f} strokeWidth="6" {...ROUND} />
      <circle cx="21" cy="81.5" r="3.8" fill={f} />
      <path d="M27.4 67.2 L31 69.8" stroke={a} strokeWidth="1.8" opacity="0.6" {...ROUND} />
      {/* right arm reaching to bow grip, with armband */}
      <path d="M48 64 Q65 60 84 55" stroke={f} strokeWidth="6" {...ROUND} />
      <path d="M57.9 59 L58.9 64" stroke={a} strokeWidth="1.8" opacity="0.6" {...ROUND} />
      {/* bow with string, hand gripping */}
      <path d="M75 26 Q99 55 75 84" stroke={f} strokeWidth="4.2" fill="none" {...ROUND} />
      <path d="M75 26 L75 84" stroke={f} strokeWidth="2.4" {...ROUND} />
      <circle cx="86" cy="55" r="4" fill={f} />
      {/* legs with feet and trouser fringe */}
      <path d="M35.5 81 L34 91.5 M44.5 81 L46 91.5" stroke={f} strokeWidth="7.5" {...ROUND} />
      <ellipse cx="32.5" cy="93.5" rx="5.5" ry="2.8" fill={f} />
      <ellipse cx="47.5" cy="93.5" rx="5.5" ry="2.8" fill={f} />
      <path d="M33.8 84 L33.8 87.5 M46.2 84 L46.2 87.5" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
    </>
  ),

  nopal: (f, a) => (
    <>
      {/* short trunk / base */}
      <path d="M45 92 L45 72 Q50 69 55 72 L55 92 Z" fill={f} />
      {/* big central upright paddle - tall rounded oval */}
      <ellipse cx="50" cy="48" rx="17" ry="26" fill={f} />
      {/* left side paddle - elongated oval branching out and up */}
      <ellipse cx="27" cy="55" rx="8.5" ry="12.5" fill={f} transform="rotate(-30 27 55)" />
      {/* right side paddle - elongated oval branching out and up */}
      <ellipse cx="74" cy="47" rx="9" ry="13" fill={f} transform="rotate(33 74 47)" />
      {/* oval tunas (prickly-pear fruits) perched ON the top rims of the paddles */}
      <ellipse cx="50" cy="20" rx="6" ry="8" fill={f} />
      <ellipse cx="79" cy="33" rx="4.6" ry="6.6" fill={f} transform="rotate(20 79 33)" />
      <ellipse cx="21" cy="44" rx="4.4" ry="6.2" fill={f} transform="rotate(-20 21 44)" />
      {/* spine dots in rows across the central paddle */}
      <g fill={a} opacity="0.6">
        <circle cx="44" cy="40" r="1.5" /><circle cx="52" cy="40" r="1.5" /><circle cx="60" cy="42" r="1.5" />
        <circle cx="42" cy="50" r="1.5" /><circle cx="50" cy="50" r="1.5" /><circle cx="58" cy="52" r="1.5" />
        <circle cx="44" cy="60" r="1.5" /><circle cx="52" cy="60" r="1.5" /><circle cx="60" cy="62" r="1.5" />
        {/* side paddle spines */}
        <circle cx="24" cy="51" r="1.4" /><circle cx="29" cy="60" r="1.4" />
        <circle cx="72" cy="43" r="1.4" /><circle cx="77" cy="51" r="1.4" />
      </g>
      {/* tuna crown dots */}
      <circle cx="50" cy="17" r="1.3" fill={a} opacity="0.6" />
      <circle cx="80" cy="31" r="1.1" fill={a} opacity="0.6" />
    </>
  ),

  alacran: (f, a) => (
    <>
      {/* legs - 3 sturdy bent legs per side, drawn first so body overlaps roots */}
      <path d="M42 60 L32 56 L26 62 M46 63 L34 67 L28 74 M50 66 L38 76 L34 84" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      <path d="M55 61 L65 55 L73 59 M57 64 L69 66 L77 72 M57 68 L67 76 L73 84" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* upper pincer arm reaching forward / up */}
      <path d="M45 50 L32 40 L23 31" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* upper claw - fat pincer */}
      <ellipse cx="17" cy="26" rx="11.5" ry="8" fill={f} transform="rotate(-34 17 26)" />
      {/* upper claw notch (gripping opening) */}
      <path d="M8 19 L16 23 L9 28 Z" fill={a} />
      {/* lower pincer arm reaching forward */}
      <path d="M43 57 L29 59 L17 55" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* lower claw - fat pincer */}
      <ellipse cx="13" cy="53" rx="11.5" ry="8" fill={f} transform="rotate(12 13 53)" />
      {/* lower claw notch (gripping opening) */}
      <path d="M3 50 L11 52 L3 57 Z" fill={a} />
      {/* segmented body - chunky head + 3 fat segments tapering back */}
      <ellipse cx="48" cy="54" rx="12" ry="9.5" fill={f} />
      <ellipse cx="58" cy="60" rx="9.5" ry="8.5" fill={f} />
      <ellipse cx="66" cy="66" rx="8" ry="7" fill={f} />
      {/* tail curling up and over the back, ending in a bulb + stinger */}
      <path d="M71 68 Q86 71 89 55 Q90 42 80 38" stroke={f} strokeWidth="7" fill="none" {...ROUND} />
      {/* tail bulb */}
      <ellipse cx="78" cy="36" rx="7.5" ry="7" fill={f} />
      {/* stinger */}
      <path d="M74 30 L62 25 L72 38 Z" fill={f} />
      {/* segment seams (accent over body) */}
      <path d="M53 51 Q54 57 53 63 M62 58 Q63 63 61 68" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* eyes on head */}
      <circle cx="45" cy="52" r="1.7" fill={a} />
      <circle cx="51" cy="53" r="1.7" fill={a} />
    </>
  ),

  rosa: (f, a) => (
    <>
      {/* stem */}
      <path d="M50 54 Q49 72 45 90" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* thorn */}
      <path d="M48 70 L38 66 L47 64 Z" fill={f} />
      {/* two leaves */}
      <path d="M47 80 Q29 76 22 87 Q39 92 47 80 Z" fill={f} />
      <path d="M50 63 Q67 56 75 65 Q60 73 50 63 Z" fill={f} />
      {/* bloom silhouette: scalloped outer petals forming a cup */}
      <path d="M50 14
               Q40 10 33 17 Q24 14 21 26 Q14 30 18 40 Q16 50 26 53
               Q34 58 50 56 Q66 58 74 53 Q84 50 82 40 Q86 30 79 26
               Q76 14 67 17 Q60 10 50 14 Z" fill={f} />
      {/* outer petal seams: arcs cupping the bud, suggesting layered petals */}
      <path d="M28 44 Q30 34 39 30 M72 44 Q70 34 61 30" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      <path d="M36 52 Q44 53 49 49 M64 52 Q56 53 51 49" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      {/* inner bud: tight curled spiral of petals */}
      <path d="M50 21 Q38 25 38 37 Q39 50 50 50 Q62 50 62 37 Q62 27 51 27 Q43 27 44 36 Q44 43 51 42 Q56 41 55 36"
            stroke={a} strokeWidth="2.4" fill="none" opacity="0.8" {...ROUND} />
      {/* leaf veins */}
      <path d="M28 82 Q37 81 44 81" stroke={a} strokeWidth="1.4" fill="none" opacity="0.5" {...ROUND} />
    </>
  ),

  calavera: (f, a) => (
    <>
      {/* crossed bones behind: double-knob ends peek on all four sides */}
      <circle cx="13.6" cy="82" r="4.4" fill={f} />
      <circle cx="9.9" cy="76.1" r="4.4" fill={f} />
      <circle cx="90.1" cy="31.9" r="4.4" fill={f} />
      <circle cx="86.4" cy="26" r="4.4" fill={f} />
      <path d="M15.2 76.9 L84.8 31.1" stroke={f} strokeWidth="7" {...ROUND} />
      <circle cx="9.9" cy="31.9" r="4.4" fill={f} />
      <circle cx="13.6" cy="26" r="4.4" fill={f} />
      <circle cx="86.4" cy="82" r="4.4" fill={f} />
      <circle cx="90.1" cy="76.1" r="4.4" fill={f} />
      <path d="M15.2 31.1 L84.8 76.9" stroke={f} strokeWidth="7" {...ROUND} />
      {/* skull at 90% centered (50,44); cream seam separates it from bones */}
      <g transform="translate(50 44) scale(0.9) translate(-50 -50)">
        <path d="M22 50 Q22 16 50 16 Q78 16 78 50 L78 66 Q78 73 70 73 L62 73 L62 84 L38 84 L38 73 L30 73 Q22 73 22 66 Z" stroke={a} strokeWidth="5" fill="none" />
        <path d="M22 50 Q22 16 50 16 Q78 16 78 50 L78 66 Q78 73 70 73 L62 73 L62 84 L38 84 L38 73 L30 73 Q22 73 22 66 Z" fill={f} />
        {/* eye sockets with petal glints */}
        <circle cx="38" cy="48" r="9" fill={a} />
        <circle cx="62" cy="48" r="9" fill={a} />
        <path d="M38 48 L34 42 L42 42 Z M38 48 L42 54 L34 54 Z M62 48 L58 42 L66 42 Z M62 48 L66 54 L58 54 Z" fill={f} opacity="0.85" />
        {/* nose */}
        <path d="M44 63 L50 55 L56 63 Z" fill={a} />
        {/* teeth */}
        <path d="M39 75 L39 84 M45 75 L45 84 M51 75 L51 84 M57 75 L57 84" stroke={a} strokeWidth="2.2" {...ROUND} />
        {/* brow cracks */}
        <path d="M30 31 Q34 27 38 31 M62 31 Q66 27 70 31 M44 30 Q47 25 50 29 Q53 25 56 30" stroke={a} strokeWidth="2" fill="none" opacity="0.65" {...ROUND} /></g>
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
      {/* LARGE branched antlers - two beams sweeping up, each with bold tines */}
      {/* left antler */}
      <path
        d="M60 30 Q54 17 51 6 M55 16 L45 11 M52 21 L43 21 M57 24 L49 29"
        stroke={f}
        strokeWidth="3.6"
        fill="none"
        {...ROUND}
      />
      {/* right antler */}
      <path
        d="M70 30 Q76 17 79 6 M75 16 L85 11 M78 21 L87 21 M73 24 L81 29"
        stroke={f}
        strokeWidth="3.6"
        fill="none"
        {...ROUND}
      />
      {/* short ears flanking the head */}
      <path d="M60 35 L53 31 L58 40 Z" fill={f} />
      <path d="M70 35 L77 31 L72 40 Z" fill={f} />
      {/* head with muzzle, alert and raised */}
      <path d="M64 31 Q73 32 77 41 Q78 49 71 53 Q62 53 60 44 Q59 35 64 31 Z" fill={f} />
      {/* arched neck flowing down into the body */}
      <path d="M61 47 Q56 54 50 57 L40 52 Q46 41 57 41 Z" fill={f} />
      {/* compact deer body */}
      <ellipse cx="39" cy="63" rx="22" ry="13" fill={f} />
      {/* short upright tail */}
      <path d="M18 57 Q11 53 12 62 Q17 62 20 59 Z" fill={f} />
      {/* slim legs - hind pair */}
      <path d="M25 73 L23 90 M33 74 L31 90" stroke={f} strokeWidth="3.4" {...ROUND} />
      {/* foreleg planted */}
      <path d="M48 73 L48 90" stroke={f} strokeWidth="3.4" {...ROUND} />
      {/* near foreleg lifted mid-step, bent at knee */}
      <path d="M55 71 Q61 75 58 81 L62 86" stroke={f} strokeWidth="3.4" fill="none" {...ROUND} />
      {/* eye */}
      <circle cx="67" cy="42" r="2.1" fill={a} />
      {/* nose tip at the front of the muzzle */}
      <path d="M76 47 Q79 47 78 50" stroke={a} strokeWidth="2" fill="none" opacity="0.8" {...ROUND} />
      {/* flank spots + haunch line accents */}
      <path d="M29 56 Q23 62 25 70" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
      <ellipse cx="38" cy="58" rx="2.8" ry="1.9" fill={a} opacity="0.45" />
      <ellipse cx="46" cy="61" rx="2.3" ry="1.6" fill={a} opacity="0.45" />
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
      {/* solid base band */}
      <rect x="16" y="65" width="68" height="19" rx="3" fill={f} />
      {/* three distinct crown points rising from the band, with clear V-gaps between them */}
      <path d="M16 67 L30 41 L44 67 Z" fill={f} />
      <path d="M36 67 L50 26 L64 67 Z" fill={f} />
      <path d="M56 67 L70 41 L84 67 Z" fill={f} />
      {/* ball/jewel tips on each point */}
      <circle cx="30" cy="39" r="5.2" fill={f} />
      <circle cx="50" cy="25" r="6" fill={f} />
      <circle cx="70" cy="39" r="5.2" fill={f} />
      {/* accent jewel highlights on the tips */}
      <circle cx="30" cy="39" r="2.4" fill={a} opacity="0.6" />
      <circle cx="50" cy="25" r="2.8" fill={a} opacity="0.6" />
      <circle cx="70" cy="39" r="2.4" fill={a} opacity="0.6" />
      {/* jewel dots on the band */}
      <circle cx="32" cy="73" r="3" fill={a} opacity="0.55" />
      <circle cx="50" cy="73" r="3.4" fill={a} opacity="0.6" />
      <circle cx="68" cy="73" r="3" fill={a} opacity="0.55" />
    </>
  ),

  chalupa: (f, a) => (
    <>
      {/* paddle held diagonally, drawn first so figure overlaps it; blade dips astern */}
      <path d="M57 42 L87 88" stroke={f} strokeWidth="3.2" {...ROUND} />
      <ellipse cx="89" cy="90" rx="5.5" ry="8" transform="rotate(43 89 90)" fill={f} />

      {/* seated human figure: torso */}
      <path d="M40 64 L42 44 Q50 38 58 44 L60 64 Z" fill={f} />
      {/* arm reaching to paddle */}
      <path d="M53 47 Q60 49 65 55" stroke={f} strokeWidth="3.4" fill="none" {...ROUND} />
      {/* head */}
      <circle cx="49" cy="35" r="7" fill={f} />
      {/* wide sombrero: brim then rounded crown sitting on it */}
      <path d="M33 29 Q49 21 65 29 Q49 34 33 29 Z" fill={f} />
      <path d="M42 28 Q42 17 49 16 Q56 17 56 28 Z" fill={f} />

      {/* canoe hull: long flat-bottomed boat */}
      <path d="M8 62 L92 62 Q86 82 70 84 L30 84 Q14 82 8 62 Z" fill={f} />
      {/* inner gunwale highlight (accent over hull) */}
      <path d="M8 62 L92 62 L88 68 L12 68 Z" fill={a} opacity="0.5" />
      {/* pointed prow tips */}
      <path d="M8 62 Q3 60 6 56 L12 62 Z" fill={f} />
      <path d="M92 62 Q97 60 94 56 L88 62 Z" fill={f} />

      {/* bundle of flowers piled at the prow */}
      <path d="M22 61 L24 52 M26 61 L26 51 M30 61 L29 52" stroke={f} strokeWidth="1.8" {...ROUND} />
      <circle cx="22" cy="50" r="3.6" fill={f} />
      <circle cx="30" cy="50" r="3.6" fill={f} />
      <circle cx="26" cy="46" r="3.8" fill={f} />
      <circle cx="22" cy="50" r="1.4" fill={a} />
      <circle cx="30" cy="50" r="1.4" fill={a} />
      <circle cx="26" cy="46" r="1.5" fill={a} />

      {/* face detail */}
      <circle cx="46.5" cy="35" r="1.4" fill={a} />
      <circle cx="51.5" cy="35" r="1.4" fill={a} />

      {/* water ripples */}
      <path d="M18 90 Q24 85 30 90 M44 92 Q50 87 56 92 M68 90 Q74 85 80 90" stroke={f} strokeWidth="2" fill="none" opacity="0.8" {...ROUND} />
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
      {/* gently curved trunk, slightly wider at the base */}
      <path d="M45 46 Q41 70 39 92 L53 92 Q54 70 55 46 Z" fill={f} />
      {/* crown of full drooping fronds — each a broad tapered leaf blade.
          Built as base -> (bowed outer edge) -> tip -> (bowed inner edge) -> base */}
      {/* far left frond, drooping low */}
      <path d="M49 45 Q24 40 9 62 Q30 54 42 52 Z" fill={f} />
      {/* mid-left frond */}
      <path d="M49 44 Q24 26 11 36 Q32 36 45 47 Z" fill={f} />
      {/* upper-left frond, reaching up */}
      <path d="M47 44 Q33 24 30 14 Q40 28 50 41 Z" fill={f} />
      {/* upper-right frond, reaching up */}
      <path d="M53 44 Q67 24 70 14 Q60 28 50 41 Z" fill={f} />
      {/* mid-right frond */}
      <path d="M51 44 Q76 26 89 36 Q68 36 55 47 Z" fill={f} />
      {/* far right frond, drooping low */}
      <path d="M51 45 Q76 40 91 62 Q70 54 58 52 Z" fill={f} />
      {/* solid crown cap unifying the fronds */}
      <circle cx="50" cy="43" r="6" fill={f} />
      {/* two coconuts at crown base */}
      <circle cx="44" cy="47" r="4.2" fill={f} />
      <circle cx="56" cy="47" r="4.2" fill={f} />
      {/* accent: midribs running through each frond */}
      <path d="M48 45 Q28 47 12 60 M49 45 Q30 33 13 38 M48 45 Q40 23 26 13 M52 45 Q60 23 74 13 M51 45 Q70 33 87 38 M52 45 Q72 47 88 60" stroke={a} strokeWidth="1.5" fill="none" opacity="0.5" {...ROUND} />
      {/* accent: trunk ring/segment marks */}
      <path d="M44 58 L54 58 M43 70 L53 70 M41 82 L51 82" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
    </>
  ),

  maceta: (f, a) => (
    <>
      {/* stems rising from the pot */}
      <path d="M50 56 L50 22 M50 46 Q39 42 30 33 M50 42 Q61 39 71 32" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
      {/* leaves on the stems */}
      <path d="M48 48 Q37 47 31 53 Q41 54 48 48 Z" fill={f} />
      <path d="M52 40 Q63 38 69 44 Q58 45 52 40 Z" fill={f} />

      {/* left flower - 5 petals around a center */}
      <circle cx="24" cy="30" r="5" fill={f} />
      <circle cx="29" cy="22" r="5" fill={f} />
      <circle cx="38" cy="25" r="5" fill={f} />
      <circle cx="36" cy="34" r="5" fill={f} />
      <circle cx="27" cy="37" r="5" fill={f} />
      <circle cx="31" cy="30" r="4.4" fill={a} opacity="0.7" />

      {/* right flower - 5 petals around a center */}
      <circle cx="76" cy="30" r="5" fill={f} />
      <circle cx="71" cy="22" r="5" fill={f} />
      <circle cx="62" cy="25" r="5" fill={f} />
      <circle cx="64" cy="34" r="5" fill={f} />
      <circle cx="73" cy="37" r="5" fill={f} />
      <circle cx="69" cy="30" r="4.4" fill={a} opacity="0.7" />

      {/* top center flower - 5 petals around a center */}
      <circle cx="44" cy="12" r="5.5" fill={f} />
      <circle cx="56" cy="12" r="5.5" fill={f} />
      <circle cx="59" cy="21" r="5.5" fill={f} />
      <circle cx="50" cy="26" r="5.5" fill={f} />
      <circle cx="41" cy="21" r="5.5" fill={f} />
      <circle cx="50" cy="18" r="5" fill={a} opacity="0.7" />

      {/* pot rim */}
      <rect x="26" y="54" width="48" height="9" rx="2" fill={f} />
      {/* trapezoid pot body */}
      <path d="M30 64 L70 64 L64 90 L36 90 Z" fill={f} />
      {/* pot detail line */}
      <path d="M34 71 L66 71" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
    </>
  ),

  arpa: (f, a) => (
    <>
      {/* curved neck across the top */}
      <path d="M22 24 Q44 9 76 15 Q74 23 67 22 Q44 16 28 31 Q24 29 22 24 Z" fill={f} />
      {/* slanted soundboard (bass side) - thick diagonal from top-left to base */}
      <path d="M23 24 Q17 26 20 33 L51 84 L61 84 L29 30 Q26 25 23 24 Z" fill={f} />
      {/* front pillar (curved vertical column on the right) */}
      <path d="M70 15 Q78 15 76 24 Q72 52 68 84 L59 84 Q62 52 63 24 Q63 18 70 15 Z" fill={f} />
      {/* base / feet spreading from the join */}
      <path d="M53 84 L48 91 M63 84 L68 91" stroke={f} strokeWidth="5" {...ROUND} />
      {/* strings: neck down to the soundboard diagonal */}
      <path d="M32 31 L41 74" stroke={f} strokeWidth="1.8" {...ROUND} />
      <path d="M39 29 L46 69" stroke={f} strokeWidth="1.8" {...ROUND} />
      <path d="M46 27 L51 64" stroke={f} strokeWidth="1.8" {...ROUND} />
      <path d="M53 25 L57 57" stroke={f} strokeWidth="1.8" {...ROUND} />
      <path d="M60 23 L62 50" stroke={f} strokeWidth="1.8" {...ROUND} />
      {/* accent highlight along the neck */}
      <path d="M30 27 Q49 17 68 21" stroke={a} strokeWidth="1.8" fill="none" opacity="0.5" {...ROUND} />
    </>
  ),

  rana: (f, a) => (
    <>
      {/* ground */}
      <path d="M12 90 L88 90" stroke={f} strokeWidth="2.5" fill="none" {...ROUND} />
      {/* body: domed back sweeping to blunt snout, crouched profile facing right */}
      <path d="M19 79 C15 57 26 38 44 32 C54 28.5 63 29 70 33 C79 37 86.5 46 88 56 C88.7 62 86 67 80.5 69.5 C76 71.5 71 74.5 66.5 78 C54 84 35 86 26.5 85.5 C21 85 18.6 82.5 19 79 Z" fill={f} />
      {/* oversized folded hind thigh */}
      <circle cx="31" cy="67.5" r="15" fill={f} />
      {/* Z-folded shin */}
      <path d="M22 79 L16 87" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* long webbed hind foot with toe points */}
      <path d="M12 90 Q11 83 19 83 L32 83 L48 79 L44 84.5 L55.5 82.5 L50 87.5 L59 86.5 L53 90 Z" fill={f} />
      {/* front leg planted under chin, toes spread */}
      <path d="M68 77.5 L66.5 87" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <path d="M66 87.5 L58 91 M66 87.5 L66 91.5 M66 87.5 L74 90.5" stroke={f} strokeWidth="3.5" fill="none" {...ROUND} />
      {/* bulging eye on top of head */}
      <circle cx="68" cy="26" r="8" fill={f} />
      <circle cx="69.6" cy="26.5" r="3.4" fill={a} />
      <circle cx="70.8" cy="25" r="1.2" fill={f} />
      {/* wide mouth reaching snout edge + nostril */}
      <path d="M66 73.5 Q78 70.5 86.5 62" stroke={a} strokeWidth="2.8" fill="none" opacity="0.8" {...ROUND} />
      <circle cx="85.5" cy="54" r="1.4" fill={a} opacity="0.7" />
      {/* folded shank crease under thigh */}
      <path d="M20 76 Q26 81.5 35 81.5" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      {/* thigh seam */}
      <path d="M26 53.5 A15 15 0 0 1 45 72.5" stroke={a} strokeWidth="2.2" fill="none" opacity="0.6" {...ROUND} />
      {/* back spots */}
      <circle cx="38" cy="44" r="2.4" fill={a} opacity="0.5" />
      <circle cx="49" cy="39" r="2.2" fill={a} opacity="0.5" />
      <circle cx="44" cy="53" r="2.5" fill={a} opacity="0.5" />
      <circle cx="57" cy="45" r="2" fill={a} opacity="0.5" />
      {/* belly seam */}
      <path d="M27 83 Q40 82 52 78.5" stroke={a} strokeWidth="2" fill="none" opacity="0.45" {...ROUND} />
    </>
  ),
};
