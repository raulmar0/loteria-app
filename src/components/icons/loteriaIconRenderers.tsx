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
      {/* head with wavy shoulder-length hair, chin visible between hair lobes */}
      <path d="M50 8 Q30 8 29 24 Q28 34 33 39 Q29 46 37 46 Q42 46 44 42 Q47 45 50 45 Q53 45 56 42 Q58 46 63 46 Q71 46 67 39 Q72 34 71 24 Q70 8 50 8 Z" fill={f} />
      {/* hairline */}
      <path d="M38 22 Q44 15 50 17 Q56 15 62 22" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      {/* hair waves on the side lobes */}
      <path d="M35 24 Q31 30 35 35 Q32 40 37 43 M65 24 Q69 30 65 35 Q68 40 63 43" stroke={a} strokeWidth="1.8" fill="none" opacity="0.45" {...ROUND} />
      {/* face */}
      <circle cx="44.5" cy="29" r="2.2" fill={a} />
      <circle cx="55.5" cy="29" r="2.2" fill={a} />
      <path d="M44 36 Q50 41 56 36" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      {/* neck */}
      <path d="M46.5 43 L46.5 53 L53.5 53 L53.5 43 Z" fill={f} />
      {/* dress: fitted bodice, clear waist, long flared skirt */}
      <path d="M46 51 Q50 54.5 54 51 Q60 52 63 55 Q67 57 65 61 Q63 64.5 59 67 Q64 74 72 80 Q79 85 80 91 Q65 87 50 87 Q35 87 20 91 Q21 85 28 80 Q36 74 41 67 Q37 64.5 35 61 Q33 57 37 55 Q40 52 46 51 Z" fill={f} />
      {/* necklace with pendant */}
      <path d="M44 55 Q50 60 56 55" stroke={a} strokeWidth="2" fill="none" opacity="0.7" {...ROUND} />
      <circle cx="50" cy="60" r="1.7" fill={a} opacity="0.7" />
      {/* waist sash */}
      <path d="M42.5 66 Q50 69.5 57.5 66" stroke={a} strokeWidth="2.2" fill="none" opacity="0.6" {...ROUND} />
      {/* skirt fold lines */}
      <path d="M45 73 L38 86 M55 73 L62 86" stroke={a} strokeWidth="1.8" opacity="0.45" {...ROUND} />
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
      <path d="M50 9.5 L50 18" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M12 55 Q18 22 50 15.5 Q82 22 88 55 Q78.5 48 69 55 Q59.5 48 50 55 Q40.5 48 31 55 Q21.5 48 12 55 Z" fill={f} />
      <path d="M50 16 Q33.5 26 31 54 M50 16 Q66.5 26 69 54 M50 16 L50 53" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M50 52 L50 79 Q50 89 40.5 89 Q31 89 31 79 L31 73.5" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
    </>
  ),

  sirena: (f, a) => (
    <>
      {/* long flowing hair down the left side, two wavy tips */}
      <path d="M48 8 Q34 6 31 18 Q30 28 26 40 Q22 52 28 62 Q31 53 36 47 Q34 58 40 64 Q43 54 42 42 Q40 30 41 20 Z" fill={f} />
      {/* head */}
      <circle cx="44" cy="20" r="9.5" fill={f} />
      {/* face */}
      <circle cx="40" cy="19" r="2" fill={a} />
      <circle cx="48.5" cy="19" r="2" fill={a} />
      <path d="M40 25 Q44 28 48 25" stroke={a} strokeWidth="1.8" fill="none" {...ROUND} />
      {/* raised arm with hand */}
      <path d="M51 35 Q60 31 63.5 20" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="64.5" cy="16" r="3.4" fill={f} />
      {/* lower arm at side */}
      <path d="M38 35 Q33 43 37 50" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* torso */}
      <path d="M36 31 Q44 26 52 31 Q54 41 51 50 Q46 53 41 50 Q37 41 36 31 Z" fill={f} />
      {/* tail curving down-left then sweeping right to a tapered tip */}
      <path d="M40 50 Q30 60 34 70 Q40 80 53 81 Q62 83 69 79 Q60 71 56 61 Q53 54 51 50 Z" fill={f} />
      {/* two-lobed fin */}
      <path d="M61 72 Q73 63 88 56 Q86 70 73 77 Q86 80 91 92 Q76 93 63 84 Q58 77 61 72 Z" fill={f} />
      {/* chest top line */}
      <path d="M38 36 Q44 40 50 36" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      {/* scale marks */}
      <path d="M37 57 Q44 61 51 57 M39 66 Q47 70 55 66 M45 75 Q53 78 61 74" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      {/* fin rays */}
      <path d="M70 78 Q77 72 83 66 M70 81 Q77 84 85 88" stroke={a} strokeWidth="1.6" fill="none" opacity="0.5" {...ROUND} />
      {/* hair strand */}
      <path d="M35 14 Q31 26 29 40 Q27 50 31 57" stroke={a} strokeWidth="1.6" fill="none" opacity="0.5" {...ROUND} />
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
      <path d="M14 25 L86 25 L86 32 L14 32 Z M14 68 L86 68 L86 75 L14 75 Z" fill={a} opacity="0.78" />
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
      <path d="M80.5 32 L69 93" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M84 30 Q79 9 52 6.5 Q26 6 11 18 Q37 14 57 19.5 Q73 24 78 36 Z" fill={f} />
      <path d="M24 15 Q42 11.5 58 16.5" stroke={a} strokeWidth="1.6" fill="none" opacity="0.5" {...ROUND} />
      <path d="M14.5 58.2 Q14.5 31 40 31 Q65.5 31 65.5 58.2 L65.5 70.1 Q65.5 76.9 58.7 76.9 L51.9 76.9 L51.9 87.1 L28.1 87.1 L28.1 76.9 L21.3 76.9 Q14.5 76.9 14.5 70.1 Z" fill={f} />
      <ellipse cx="29.8" cy="58.2" rx="6.4" ry="7.2" fill={a} />
      <ellipse cx="50.2" cy="58.2" rx="6.4" ry="7.2" fill={a} />
      <path d="M35 70.1 L40 64.2 L45 70.1 Z" fill={a} />
      <path d="M30.6 78.6 L30.6 87.1 M35.7 78.6 L35.7 87.1 M40.8 78.6 L40.8 87.1 M45.9 78.6 L45.9 87.1" stroke={a} strokeWidth="1.8" {...ROUND} />
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
      <circle cx="35" cy="67" r="25" fill={f} />
      <path d="M38.3 56.3 L69.4 23.8 L76.6 30.7 L45.5 63.2 Z" fill={f} />
      <path d="M67.2 23.2 L78.3 11.6 L88.5 21.2 L77.4 32.8 Z" fill={f} />
      <circle cx="35" cy="67" r="9" fill="none" stroke={a} strokeWidth="3.8" opacity="0.8" />
      <path d="M60.7 47.3 L53.5 40.4 M69 38.7 L61.8 31.8" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
      <path d="M76.3 31 L69.1 24.1" stroke={a} strokeWidth="2" opacity="0.6" {...ROUND} />
      <path d="M24.6 77.8 L73 27.2 M26.9 80 L75.3 29.4 M22.3 75.6 L70.7 25" stroke={a} strokeWidth="1.5" opacity="0.7" {...ROUND} />
      <path d="M20.6 74 L28.6 81.6" stroke={a} strokeWidth="2.8" opacity="0.8" {...ROUND} />
      <path d="M69.6 20.6 L66.7 17.9 M72.75 17.4 L69.9 14.6 M75.9 14.2 L73 11.4" stroke={f} strokeWidth="2.2" {...ROUND} />
      <circle cx="65.6" cy="16.8" r="2.4" fill={f} />
      <circle cx="68.8" cy="13.6" r="2.4" fill={f} />
      <circle cx="71.9" cy="10.4" r="2.4" fill={f} />
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
      <path d="M30 57 L30 32 Q30 25 36 25 Q42 25 42 32 L42 48 L42 20 Q42 13 49 13 Q55 13 55 20 L55 48 L55 23 Q55 17 61 17 Q67 17 67 23 L67 49 L67 31 Q67 25 73 25 Q79 25 79 31 L79 58 Q79 84 54 91 Q32 86 28 66 Z" fill={f} />
      <path d="M36 61 Q41 72 43 82 M46 56 Q49 72 50 86 M57 56 Q59 72 61 84 M69 62 Q67 73 64 82" stroke={a} strokeWidth="1.6" fill="none" opacity="0.55" {...ROUND} />
      <path d="M40 33 L40 48 M53 24 L53 48 M65 30 L65 49" stroke={a} strokeWidth="1.4" opacity="0.45" {...ROUND} />
      <circle cx="54" cy="65" r="4" fill={a} opacity="0.36" />
    </>
  ),

  bota: (f, a) => (
    <>
      <path d="M34 12 L34 8.5 Q34 6 37 6 L41 6 Q44 6 44 8.5 L44 12 Z" fill={f} />
      <path d="M30 12 Q43 17 56 12 L56 48 Q56 60 66 64 L71 66 Q84 70 88 77 Q91 85 83 85 L52 85 L48 93 L28 93 Z" fill={f} />
      <path d="M31 20 Q43 24 55 20" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <path d="M36 32 Q43 38 50 32 M36 42 Q43 48 50 42" stroke={a} strokeWidth="1.8" fill="none" opacity="0.55" {...ROUND} />
      <path d="M56 53 Q58 62 67 65" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <path d="M57 81 L82 81" stroke={a} strokeWidth="1.8" opacity="0.5" {...ROUND} />
      <path d="M31 89 L46 89" stroke={a} strokeWidth="1.6" opacity="0.5" {...ROUND} />
      <circle cx="39" cy="9.5" r="1.6" fill={a} opacity="0.7" />
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
      <ellipse cx="50" cy="37" rx="13" ry="13" fill={f} />
      <path d="M33 90 L35.5 59 Q40.5 50.5 50 50.5 Q59.5 50.5 64.5 59 L67 90 L52 90 L50 85.5 L48 90 Z" fill={f} />
      <ellipse cx="50" cy="24.5" rx="26.5" ry="5.8" fill={f} />
      <path d="M36.5 25 L36.5 13 Q36.5 8.5 50 8.5 Q63.5 8.5 63.5 13 L63.5 25 Z" fill={f} />
      <rect x="36.5" y="20.2" width="27" height="3.8" fill={a} opacity="0.55" />
      {face(a, 50, 36, 'smile')}
      <path d="M50 55.5 L43.6 52.2 L43.6 58.8 Z M50 55.5 L56.4 52.2 L56.4 58.8 Z" fill={a} />
      <circle cx="50" cy="55.5" r="1.7" fill={a} />
      <path d="M43 61 L50 68.5 L57 61" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      <circle cx="50" cy="73" r="1.4" fill={a} opacity="0.7" />
      <circle cx="50" cy="78.5" r="1.4" fill={a} opacity="0.7" />
      <path d="M38.5 63 L37 87 M61.5 63 L63 87" stroke={a} strokeWidth="1.6" opacity="0.4" {...ROUND} />
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
      {/* Arrow A (upper-left) */}
      <path d="M78 8 L73 22.9 L63.1 13 Z" fill={f} />
      <path d="M71 15 L10.6 75.4" stroke={f} strokeWidth="4.8" {...ROUND} />
      <path d="M15.7 72 L18.5 69.2 L20.8 75.8 L18 78.6 Z" fill={f} />
      <path d="M20.6 67.1 L23.5 64.2 L25.8 70.8 L23 73.6 Z" fill={f} />
      <path d="M14 70.3 L16.8 67.5 L10.2 65.2 L7.4 68 Z" fill={f} />
      <path d="M18.9 65.4 L21.8 62.6 L15.2 60.2 L12.4 63 Z" fill={f} />
      <path d="M35 51 L62 24" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />

      {/* Arrow B (lower-right) */}
      <path d="M91 21 L86 35.9 L76.1 26 Z" fill={f} />
      <path d="M84 28 L23.6 88.4" stroke={f} strokeWidth="4.8" {...ROUND} />
      <path d="M28.7 85 L31.5 82.2 L33.8 88.8 L31 91.6 Z" fill={f} />
      <path d="M33.6 80.1 L36.5 77.2 L38.8 83.8 L36 86.6 Z" fill={f} />
      <path d="M27 83.3 L29.8 80.5 L23.2 78.2 L20.4 81 Z" fill={f} />
      <path d="M31.9 78.4 L34.8 75.6 L28.2 73.2 L25.4 76 Z" fill={f} />
      <path d="M48 64 L75 37" stroke={a} strokeWidth="1.5" opacity="0.5" {...ROUND} />
    </>
  ),

  musico: (f, a) => (
    <>
      {/* sombrero brim + crown */}
      <path d="M8 33 Q12 20 36 18 Q60 20 64 33 Q50 40 36 40 Q22 40 8 33 Z" fill={f} />
      <path d="M26 22 Q27 7 36 7 Q45 7 46 22 Z" fill={f} />
      <path d="M27 20 Q36 25 45 20" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
      <path d="M13 32 Q36 38 59 32" stroke={a} strokeWidth="1.8" fill="none" opacity="0.45" {...ROUND} />
      {/* head (profile, facing right) */}
      <circle cx="37" cy="43" r="11" fill={f} />
      <circle cx="41" cy="44" r="2.2" fill={a} />
      {/* torso (charro jacket) */}
      <path d="M21 90 L26 60 Q32 53 38 53 Q46 53 50 60 L53 90 Z" fill={f} />
      <circle cx="30" cy="68" r="1.6" fill={a} opacity="0.6" />
      <circle cx="31" cy="75" r="1.6" fill={a} opacity="0.6" />
      <circle cx="32" cy="82" r="1.6" fill={a} opacity="0.6" />
      {/* trumpet: lead pipe, valves, flared bell */}
      <path d="M46 49 L74 49" stroke={f} strokeWidth="6" {...ROUND} />
      <path d="M61 46 L61 38 M66.5 46 L66.5 37 M72 46 L72 38" stroke={f} strokeWidth="3" {...ROUND} />
      <path d="M73 45.5 Q85 43.5 92 30 L92 68 Q85 54.5 73 53 Z" fill={f} />
      <path d="M92 32 Q89 49 92 66" stroke={a} strokeWidth="2" fill="none" opacity="0.6" {...ROUND} />
      {/* arm gripping the valves */}
      <path d="M38 58 Q47 63 55 54" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <circle cx="56" cy="52" r="4" fill={f} />
      {/* floating eighth note */}
      <circle cx="75" cy="19" r="3" fill={f} />
      <path d="M77.8 18.5 L77.8 8 Q83 9 81.5 15" stroke={f} strokeWidth="2.2" fill="none" {...ROUND} />
    </>
  ),

  arana: (f, a) => (
    <>
      <path d="M50 6 L50 30" stroke={f} strokeWidth="2" {...ROUND} />
      <circle cx="50" cy="8" r="2.6" fill={f} />
      <path d="M46 44 L23 29 L9 37 M44 50 L18 43 L7 54 M44 58 L18 61 L9 74 M46 64 L26 77 L17 90" stroke={f} strokeWidth="3.2" fill="none" {...ROUND} />
      <path d="M54 44 L77 29 L91 37 M56 50 L82 43 L93 54 M56 58 L82 61 L91 74 M54 64 L74 77 L83 90" stroke={f} strokeWidth="3.2" fill="none" {...ROUND} />
      <ellipse cx="50" cy="59" rx="16" ry="19" fill={f} />
      <circle cx="50" cy="33" r="10" fill={f} />
      <circle cx="46" cy="32" r="2.2" fill={a} />
      <circle cx="54" cy="32" r="2.2" fill={a} />
      <path d="M44 54 L50 58 L56 54 M44 63 L50 67 L56 63" stroke={a} strokeWidth="2" fill="none" opacity="0.55" {...ROUND} />
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
      {/* steam curls rising above the pan */}
      <path d="M38 34 Q34 28 38 23 Q42 18 38 13 M50 35 Q46 29 50 24 Q54 19 50 14 M62 34 Q58 28 62 23 Q66 18 62 13" stroke={f} strokeWidth="2.4" fill="none" opacity="0.85" {...ROUND} />
      {/* long straight handle sticking out the right side */}
      <path d="M78 51 L95 51" stroke={f} strokeWidth="6" {...ROUND} />
      {/* small loop handle on the left */}
      <path d="M19 50 Q7 49 7 56 Q7 63 18 61" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* wide shallow pan body */}
      <path d="M13 50 L87 50 Q84 66 72 73 Q62 78 50 78 Q38 78 28 73 Q16 66 13 50 Z" fill={f} />
      {/* rim ellipse on top of body */}
      <ellipse cx="50" cy="50" rx="37" ry="8" fill={f} />
      {/* inner rim opening (accent over silhouette) */}
      <ellipse cx="50" cy="50" rx="30" ry="5" fill={a} opacity="0.6" />
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
      {/* paddle held diagonally, drawn first so figure overlaps it */}
      <path d="M76 28 L46 66" stroke={f} strokeWidth="3.2" {...ROUND} />
      <ellipse cx="79" cy="24" rx="5" ry="7" transform="rotate(38 79 24)" fill={f} />

      {/* seated human figure: torso */}
      <path d="M40 64 L42 44 Q50 38 58 44 L60 64 Z" fill={f} />
      {/* arm reaching to paddle */}
      <path d="M55 50 Q64 50 70 44" stroke={f} strokeWidth="3.4" fill="none" {...ROUND} />
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
