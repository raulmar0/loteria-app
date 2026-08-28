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

/* alacran */
/* pincer: fat oval, accent ring so it never blobs into the body, wide open mouth */
const ALACRAN_claw = (f: string, a: string, x: number, y: number, rot: number) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx="0" cy="0" rx="16" ry="11" fill={f} stroke={a} strokeWidth="3.5" />
    <path d="M-34 -10 L-3 0 L-34 10 Z" fill={a} />
  </g>
);

/* catrin */
// tailcoat: sloped shoulders, sleeves hanging inside the same mass, flared hem
const CATRIN_COAT =
  'M50 44 C40 44 34 47.5 31.5 52.5 L26.5 75 Q31 80 36 75.5 L38 62 ' +
  'L37 83 L63 83 L62 62 L64 75.5 Q69 80 73.5 75 L68.5 52.5 C66 47.5 60 44 50 44 Z';
const CATRIN_CANE = 'M78.4 93.5 L70.8 68 Q69.6 61 75.3 60.4 Q80.9 59.9 80.9 66';

/* melon */
const MELON_WEDGE = 'M44 74 L94 64 Q69 115 44 74 Z';

/* muerte */
const MUERTE_BLADE =
  'M86 22 C83 7 60 0 38 5 C26 8 17 14 11 25 C20 18.5 30 14 43 13 ' +
  'C62 11.5 78 15.5 86 22 Z';
const MUERTE_ARM_R = 'M55 57 L68 55 L79.5 46';
const MUERTE_ARM_L = 'M17 57 L10 68 L15.5 81';

/* musico */
const MUSICO_HAT_BRIM = 'M6 28 Q42 12 78 28 Q42 39 6 28 Z';
const MUSICO_HAT_CROWN = 'M29 28 Q29 5 42 5 Q55 5 55 28 Z';
const MUSICO_TORSO = 'M25 94 L28 63 Q31 55 42 55 Q54 55 58 64 L61 94 Z';
const MUSICO_GUITAR_XF = 'translate(70 76) rotate(-57.7) scale(0.94)';
const MUSICO_BODY =
  'M0 24.5 C8 24.5 13 19 13 10.5 C13 3.5 8 2 7 0 C6 -2 9.5 -4 9.5 -11.5 ' +
  'C9.5 -18 5.5 -22.5 0 -22.5 C-5.5 -22.5 -9.5 -18 -9.5 -11.5 C-9.5 -4 -6 -2 -7 0 ' +
  'C-8 2 -13 3.5 -13 10.5 C-13 19 -8 24.5 0 24.5 Z';
const MUSICO_ARM_L = 'M34 66 L17 74 L30 50.7';

/* rana */
const RANA_LEG_L = 'M30 49 C14 53 10 66 15 77';
const RANA_LEG_R = 'M70 49 C86 53 90 66 85 77';

/* sirena */
/* human chest -> pinched waist -> thick fish tail sweeping down to the right */
const SIRENA_BODY =
  'M30 32 C33 25 47 25 50 32 ' +
  'C51 38 49 44 47 50 ' +
  'C54 56 57 63 58 70 ' +
  'C62 77 68 82 76 85 ' +
  'C74 88 72 89 69 89 ' +
  'C56 85 45 78 38 69 ' +
  'C32 61 32 55 35 50 ' +
  'C31 44 30 38 30 32 Z';

/* big two-lobed fluke fanning off the tail tip */
const SIRENA_FLUKE =
  'M62 72 C72 68 84 61 93 51 C95 65 90 76 77 83 ' +
  'C86 86 91 89 94 93 C81 94 68 90 60 81 Z';

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
      {/* trident at the right edge */}
      <path d="M86 94 L86 28" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M76 28 L96 28" stroke={f} strokeWidth="5" {...ROUND} />
      <path d="M72.5 27 L76 7 L79.5 27 Z" fill={f} />
      <path d="M82.5 27 L86 5 L89.5 27 Z" fill={f} />
      <path d="M92.5 27 L96 7 L99.5 27 Z" fill={f} />

      {/* barbed tail: leaves from behind the hip and curves down into open space */}
      <path d="M28 77 C23 89 13 88 11.8 79" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <path d="M10.2 70 L17.4 76.6 L6.2 79.4 Z" fill={f} />

      {/* long curved horns sweeping back off the skull */}
      <path d="M28 31 Q15 27 8 7 Q19 17 37 22 Z" fill={f} />
      <path d="M52 31 Q65 27 72 7 Q61 17 43 22 Z" fill={f} />

      {/* torso */}
      <path d="M25 70 Q26 62 33 60 L47 60 Q54 62 55 70 L50 79 Q40 81 30 79 Z" fill={f} />

      {/* left arm raised, fist up */}
      <path d="M29 63 L20 54" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <circle cx="16.5" cy="50.5" r="5.5" fill={f} />

      {/* right arm gripping the trident */}
      <path d="M53 67 Q68 66 79 60" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <circle cx="83" cy="58" r="6" fill={f} />

      {/* head: round skull, sharp goatee chin */}
      <path d="M26 36 Q26 20 40 20 Q54 20 54 36 Q54 45 51 49 Q47 53 40 62 Q33 53 29 49 Q26 45 26 36 Z" fill={f} />
      {/* gap so the goatee reads against the chest */}
      <path d="M27 47 Q33 52 40 62 Q47 52 53 47" stroke={a} strokeWidth="3" fill="none" {...ROUND} />

      {/* legs + hooves */}
      <path d="M35 77 L33 88 M45 77 L47 88" stroke={f} strokeWidth="7.5" {...ROUND} />
      <path d="M27 94 L38 94 L36 86 L29 86 Z" fill={f} />
      <path d="M43 94 L54 94 L51 86 L44 86 Z" fill={f} />

      {/* face */}
      <path d="M31 31 L38 35 M49 31 L42 35" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M32.5 35.5 L38 39 L32.5 41 Z" fill={a} />
      <path d="M47.5 35.5 L42 39 L47.5 41 Z" fill={a} />
      <path d="M33 44 Q40 50 47 44 Q44 48 40 48 Q36 48 33 44 Z" fill={a} />
    </>
  ),

  dama: (f, a) => (
    <>
      {/* legs */}
      <path d="M45 78 L41 88 M55 78 L60 88" stroke={f} strokeWidth="6" {...ROUND} />
      {/* pumps */}
      <path d="M37 86 L44 86 Q50 88 50 93 L38 93 Z" fill={f} />
      <path d="M57 86 L64 86 Q70 88 70 93 L58 93 Z" fill={f} />

      {/* neck */}
      <path d="M47 20 L56 20 L56 33 L47 33 Z" fill={f} />

      {/* dress: fitted bodice into a long bell skirt */}
      <path d="M33 40 Q38 30 49 30 Q60 30 65 40 L58 55 L75 80 Q49 85 23 80 L40 55 Z" fill={f} />

      {/* front arm down to the purse */}
      <path d="M63 39 Q73 43 76 50" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <circle cx="77" cy="52" r="4" fill={f} />

      {/* purse, haloed so it stays clear of the skirt */}
      <path d="M71 58 Q78.5 50 86 58" stroke={a} strokeWidth="7" fill="none" {...ROUND} />
      <path d="M69 58 L90 58 L92 72 L67 72 Z" stroke={a} strokeWidth="5" strokeLinejoin="round" fill={a} />
      <path d="M71 58 Q78.5 50 86 58" stroke={f} strokeWidth="3" fill="none" {...ROUND} />
      <path d="M69 58 L90 58 L92 72 L67 72 Z" fill={f} />

      {/* head: rounded face inside the hair, updo knot on top */}
      <ellipse cx="51" cy="10.4" rx="6.4" ry="4.2" fill={f} />
      <ellipse cx="51" cy="18.4" rx="10.6" ry="9.2" fill={f} />

      {/* accents: hairline around the face, eyes and mouth */}
      <path d="M45.2 26 C43.6 19.2 45.4 13.8 51 13.8 C56.6 13.8 58.4 19.2 56.8 26" stroke={a} strokeWidth="2.4" fill="none" {...ROUND} />
      <circle cx="48.2" cy="20.4" r="1.5" fill={a} />
      <circle cx="53.8" cy="20.4" r="1.5" fill={a} />
      <path d="M49.2 24 Q51 25.4 52.8 24" stroke={a} strokeWidth="1.9" fill="none" {...ROUND} />
      <path d="M40.5 55 L58 55" stroke={a} strokeWidth="2.6" {...ROUND} />
    </>
  ),

  catrin: (f, a) => (
    <>
      {/* trousers and shoes under the coat */}
      <path d="M44 72 L44 88 M56 72 L56 88" stroke={f} strokeWidth="8" {...ROUND} />
      <ellipse cx="41" cy="90" rx="6.8" ry="3.6" fill={f} />
      <ellipse cx="59" cy="90" rx="6.8" ry="3.6" fill={f} />

      {/* coat: halo cuts it free of the trousers and the cane */}
      <path d={CATRIN_COAT} fill={a} stroke={a} strokeWidth="4.5" {...ROUND} />
      <path d={CATRIN_COAT} fill={f} />

      {/* walking stick with a crook, gripped past the sleeve */}
      <path d={CATRIN_CANE} stroke={a} strokeWidth="9" fill="none" {...ROUND} />
      <path d={CATRIN_CANE} stroke={f} strokeWidth="4.8" fill="none" {...ROUND} />

      {/* lapels and bow tie punched into the coat front */}
      <path d="M43.5 51 L50 66 L56.5 51" stroke={a} strokeWidth="3.4" fill="none" {...ROUND} />
      <path d="M50 50 L43 45.8 L43 54.2 Z M50 50 L57 45.8 L57 54.2 Z" fill={a} />

      {/* head sitting on the collar */}
      <circle cx="50" cy="36.5" r="11" fill={f} />

      {/* top hat; its halo carves the seam above the head */}
      <rect x="35" y="4" width="30" height="18.5" rx="2" fill={a} stroke={a} strokeWidth="2.6" {...ROUND} />
      <rect x="22" y="21.5" width="56" height="6.5" rx="3.25" fill={a} stroke={a} strokeWidth="2.6" {...ROUND} />
      <rect x="35" y="4" width="30" height="18.5" rx="2" fill={f} />
      <rect x="35" y="17" width="30" height="4" fill={a} />
      <rect x="22" y="21.5" width="56" height="6.5" rx="3.25" fill={f} />

      {/* face: two eyes and a waxed moustache */}
      <circle cx="45.8" cy="35" r="2.1" fill={a} />
      <circle cx="54.2" cy="35" r="2.1" fill={a} />
      <path d="M43.4 43.6 Q46.9 40 50 43 Q53.1 40 56.6 43.6" stroke={a} strokeWidth="3.2" fill="none" {...ROUND} />
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
      {/* hair: one crescent framing the head, tips at the jaw */}
      <path
        d="M26 33 C23 23 24 10 33 5 C36 3 44 3 47 5 C56 10 57 23 54 33 C53 26 51 21 48 18 C45 14 35 14 32 18 C29 21 27 26 26 33 Z"
        fill={f}
      />
      {/* body + fluke first, so they cut clear of the hair */}
      <path d={SIRENA_BODY} fill="none" stroke={a} strokeWidth="5" {...ROUND} />
      <path d={SIRENA_FLUKE} fill="none" stroke={a} strokeWidth="5" {...ROUND} />
      <path d={SIRENA_BODY} fill={f} />
      <path d={SIRENA_FLUKE} fill={f} />
      {/* arms out with the forearms lifted, drawn on top so they read as attached */}
      <path d="M34 40 L21 46 L14 36" stroke={f} strokeWidth="8.5" fill="none" {...ROUND} />
      <path d="M46 40 L59 46 L66 36" stroke={f} strokeWidth="8.5" fill="none" {...ROUND} />
      {/* head */}
      <circle cx="40" cy="16" r="10" fill={f} />
      {/* face */}
      <circle cx="36.5" cy="14.5" r="1.9" fill={a} />
      <circle cx="43.5" cy="14.5" r="1.9" fill={a} />
      <path d="M36.5 21 Q40 24 43.5 21" stroke={a} strokeWidth="2" fill="none" {...ROUND} />
      {/* waist seam, then one scale row on the tail */}
      <path d="M36 50 Q41 53 46 50" stroke={a} strokeWidth="2.4" fill="none" {...ROUND} />
      <path d="M40 64 Q49 72 58 75" stroke={a} strokeWidth="2.4" fill="none" {...ROUND} />
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
      {/* stalk and leaf */}
      <path d="M42 20 L40 9" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <path d="M39 18 Q26 22 14 10 Q29 6 39 18 Z" fill={f} />
      {/* whole ribbed melon */}
      <circle cx="41" cy="45" r="30" fill={f} />
      <g stroke={a} strokeWidth="5" fill="none" {...ROUND}>
        <path d="M41 16 Q11 45 41 74" />
        <path d="M41 16 L41 74" />
        <path d="M41 16 Q71 45 41 74" />
      </g>
      {/* the wedge cut from it: gap, flesh, rind seam, seeds */}
      <path d={MELON_WEDGE} fill={a} stroke={a} strokeWidth="7" {...ROUND} />
      <path d={MELON_WEDGE} fill={f} />
      <path d="M49 76 Q69 99 89 66.5" stroke={a} strokeWidth="4.5" fill="none" {...ROUND} />
      <g fill={a}>
        <ellipse cx="61" cy="78" rx="5.6" ry="3.2" transform="rotate(4 61 78)" />
        <ellipse cx="76" cy="75" rx="5.6" ry="3.2" transform="rotate(-11 76 75)" />
      </g>
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
      {/* crown: one big dome */}
      <path d="M19 54 C19 -8 81 -8 81 54 Z" fill={f} />
      {/* frill: four deep scallops flaring wider than the crown */}
      <circle cx="19" cy="56" r="13" fill={f} />
      <circle cx="39.7" cy="56" r="13" fill={f} />
      <circle cx="60.3" cy="56" r="13" fill={f} />
      <circle cx="81" cy="56" r="13" fill={f} />
      {/* seam where the frill is sewn to the crown */}
      <path d="M13 47 Q50 60 87 47" stroke={a} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* bow tied under the chin */}
      <path d="M45 77 L26 68 Q20 77 26 87 Z" fill={f} />
      <path d="M55 77 L74 68 Q80 77 74 87 Z" fill={f} />
      <circle cx="50" cy="77" r="8" fill={f} />
      {/* ribbon tails */}
      <path d="M47 83 Q44 89 42 94" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <path d="M53 83 Q56 89 58 94" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
    </>
  ),

  muerte: (f, a) => (
    <>
      {/* scythe: blade sweeping over the skull, shaft down the right */}
      <path d={MUERTE_BLADE} fill={f} />
      <path d="M85 19 L70 94" stroke={f} strokeWidth="6.5" {...ROUND} />

      {/* skull: cranium + jaw */}
      <ellipse cx="36" cy="30" rx="13.5" ry="12" fill={f} />
      <path d="M27.5 39 L44.5 39 L43 45 Q36 48.5 29 45 Z" fill={f} />
      <path d="M25.5 40.5 L46.5 40.5" stroke={a} strokeWidth="2.4" {...ROUND} />
      <path d="M32 42 L32 47.5 M40 42 L40 47.5" stroke={a} strokeWidth="2.2" {...ROUND} />
      <circle cx="30" cy="28" r="4.8" fill={a} />
      <circle cx="42" cy="28" r="4.8" fill={a} />
      <path d="M36 32.5 L33 38 L39 38 Z" fill={a} />

      {/* spine doubles as the neck; clavicle and three ribs hang off it */}
      <path d="M36 46 L36 84" stroke={f} strokeWidth="4.6" {...ROUND} />
      <path d="M17 56 Q36 51.5 55 56" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M22 63 Q36 69 50 63" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M25 71.5 Q36 77 47 71.5" stroke={f} strokeWidth="4" fill="none" {...ROUND} />
      <path d="M28 80 Q36 84.5 44 80" stroke={f} strokeWidth="4" fill="none" {...ROUND} />

      {/* pelvis */}
      <path d="M25 87 C31 90 41 90 47 87 L47 94.5 C41 92 31 92 25 94.5 Z" fill={f} />

      {/* arms */}
      <path d={MUERTE_ARM_R} stroke={a} strokeWidth="10.5" fill="none" {...ROUND} />
      <path d={MUERTE_ARM_L} stroke={a} strokeWidth="10.5" fill="none" {...ROUND} />
      <path d={MUERTE_ARM_R} stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <path d={MUERTE_ARM_L} stroke={f} strokeWidth="6" fill="none" {...ROUND} />

      {/* fist clamped on the shaft, bony hand hanging at the hip */}
      <circle cx="79.5" cy="46" r="6.8" fill={a} />
      <circle cx="79.5" cy="46" r="5.1" fill={f} />
      <circle cx="15.5" cy="81" r="4.5" fill={f} />
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
      {/* pole with finial */}
      <circle cx="10.7" cy="10" r="5.6" fill={f} />
      <rect x="7" y="14" width="7.4" height="80" rx="3.4" fill={f} />
      {/* waving flag field */}
      <path d="M17 17 Q36.75 26.2 56.5 17 Q76.25 7.8 96 17 L96 65 Q76.25 55.8 56.5 65 Q36.75 74.2 17 65 Z" fill={f} />
      {/* hoist third punched out */}
      <path d="M21.8 23.76 Q30.1 26.69 38.4 26.37 L38.4 64.77 Q30.1 65.09 21.8 62.16 Z" fill={a} />
      {/* fly third punched out */}
      <path d="M74.8 17.22 Q83.1 16.94 91.4 19.91 L91.4 58.31 Q83.1 55.34 74.8 55.62 Z" fill={a} />
      {/* eagle emblem */}
      <path d="M41.8 46.8 Q49.6 32.4 56.8 41.4 Q64 32.4 71.8 46.8 Q64 39 56.8 49 Q49.6 39 41.8 46.8 Z" fill={a} />
      <circle cx="56.8" cy="35.6" r="4.6" fill={a} />
      <path d="M52.8 34 L47.6 36.4 L52.8 38.6 Z" fill={a} />
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
      {/* slim body sweeping back into the tail plumes */}
      <path
        d="M40 55 C40 46 51 41 63 42 C76 43 85 48 94 55 C87 59 83 64 71 67 C58 70 42 66 40 55 Z"
        fill={f}
      />
      {/* long S-curved neck */}
      <path d="M33 25 C39 34 33 45 48 55" stroke={f} strokeWidth="9.5" fill="none" {...ROUND} />
      {/* head */}
      <circle cx="32" cy="18" r="8.5" fill={f} />
      {/* long dagger beak */}
      <path d="M27 11.5 L6 21 L28 23.5 Z" fill={f} />
      {/* crest plume swept back */}
      <path d="M38 12 Q48 8 55 11" stroke={f} strokeWidth="4.2" fill="none" {...ROUND} />
      {/* eye */}
      <circle cx="31" cy="17" r="2.2" fill={a} />
      {/* folded wing edge */}
      <path d="M47 53 C58 46 73 49 85 58" stroke={a} strokeWidth="3" fill="none" {...ROUND} />
      {/* long legs */}
      <path d="M54 68 L50 92" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M67 67 L72 92" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* feet */}
      <path d="M50 92 L41 94 M50 92 L57 94 M72 92 L63 94 M72 92 L79 94" stroke={f} strokeWidth="3.8" fill="none" {...ROUND} />
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
      {/* tail: two long tapered feathers hanging down behind the body */}
      <path d="M61.2 64.8 L72.8 61.4 L73.6 90.3 L67.9 91.1 Z" fill={f} />
      <path d="M67.1 59.0 L74.9 55.0 L85.3 78.9 L80.3 81.4 Z" fill={f} />
      {/* perch bar coming in from the left */}
      <path d="M6 83 H59" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      {/* body */}
      <ellipse cx="54" cy="54" rx="18" ry="20" transform="rotate(9 54 54)" fill={f} />
      {/* head */}
      <circle cx="52" cy="24" r="13" fill={f} />
      {/* hooked beak: deep culmen bulging forward, sharp tip curling down under the chin */}
      <path d="M45 14 C33 15 24 20 23 29 C22 36 25 42 28 47 C31 41 34 36 39 32 C44 28 46 21 45 14 Z" fill={f} />
      {/* legs + toes gripping the perch */}
      <path d="M46 70 L46 82 M58 70 L58 82" stroke={f} strokeWidth="5.5" fill="none" {...ROUND} />
      <path d="M40 90 L46 82 L52 90 M52 90 L58 82 L61 88" stroke={f} strokeWidth="4.5" fill="none" {...ROUND} />
      {/* --- accent holes --- */}
      {/* nostril */}
      <circle cx="37" cy="17" r="2" fill={a} />
      {/* eye ring + pupil */}
      <circle cx="55" cy="22" r="5" stroke={a} strokeWidth="2.4" fill="none" />
      <circle cx="55" cy="22" r="2.3" fill={a} />
      {/* folded wing */}
      <path d="M50 45 C61 48 64 56 58.5 65" stroke={a} strokeWidth="2.6" fill="none" {...ROUND} />
    </>
  ),

  borracho: (f, a) => (
    <>
      {/* shoes, stumbling stance */}
      <path d="M13 85 L28 85 L28 92 L8 92 Q4 92 5 88 Q6 85 13 85 Z" fill={f} />
      <path d="M44 85 L57 85 Q66 85 66 90 Q66 92 62 92 L44 92 Z" fill={f} />
      {/* trousers */}
      <path d="M24 64 L52 64 L58 86 L45 86 L39 73 L28 86 L15 86 Z" fill={f} />

      {/* torso, shoulders tipped by the lean */}
      <path d="M17 56 Q21 46 31 45 Q42 45 46 50 L53 67 L22 67 Z" fill={f} />

      {/* free arm flung out for balance */}
      <path d="M20 54 Q13.5 51 9.5 47" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <circle cx="8" cy="45.5" r="5" fill={f} />

      {/* raised arm to the bottle */}
      <path d="M45 51 Q60 50 68 41" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />

      {/* bottle: neck, shoulders, body */}
      <g transform="rotate(20 71 34)">
        <path d="M63 23 Q63 18 67.5 15 L67.5 5 Q67.5 2.5 71 2.5 Q74.5 2.5 74.5 5 L74.5 15 Q79 18 79 23 L79 43 Q79 46 76 46 L66 46 Q63 46 63 43 Z" fill={f} />
        <path d="M63 27 L79 27 L79 36 L63 36 Z" fill={a} />
        <path d="M67 8 L74.5 8" stroke={a} strokeWidth="2.2" {...ROUND} />
      </g>
      <circle cx="70.5" cy="37" r="5" fill={f} />

      {/* head + hat, tipped over */}
      <g transform="rotate(-13 31 42)">
        <path d="M25 39 L37 39 L37 50 L25 50 Z" fill={f} />
        <circle cx="31" cy="30" r="10.5" fill={f} />
        <g transform="rotate(-14 31 18)">
          <ellipse cx="31" cy="19.5" rx="19.5" ry="5.5" fill={f} />
          <path d="M20 19.5 Q20 5 31 5 Q42 5 42 19.5 Z" fill={f} />
          <path d="M21.5 15.5 Q31 19.5 40.5 15.5" stroke={a} strokeWidth="2.4" fill="none" {...ROUND} />
        </g>
        {/* tipsy eyes and a lopsided grin */}
        <path d="M25 28 Q27.5 31 30 28 M34 28 Q36.5 31 39 28" stroke={a} strokeWidth="2.2" fill="none" {...ROUND} />
        <path d="M26 35 Q31 40 37 34" stroke={a} strokeWidth="2.2" fill="none" {...ROUND} />
      </g>
    </>
  ),

  negrito: (f, a) => (
    <>
      {/* neck + collar */}
      <rect x="41.6" y="30" width="6.8" height="10" fill={f} />
      <path d="M38 46 L40 36 L50 36 L52 46 Z" fill={f} />
      {/* jacket */}
      <path d="M30 43 Q45 33 60 43 L58 58 L63 70 L27 70 L32 58 Z" fill={f} />
      {/* legs */}
      <g stroke={f} fill="none" {...ROUND}>
        <path d="M40 68 L36 87" strokeWidth="9.6" />
        <path d="M55 68 L68 78 L79 69" strokeWidth="9.6" />
      </g>
      <ellipse cx="32" cy="89.5" rx="10" ry="4.8" fill={f} />
      <ellipse cx="84" cy="65" rx="10" ry="4.8" fill={f} transform="rotate(-38 84 65)" />
      {/* arms */}
      <path d="M32.5 45.5 L22 50 L15 52" stroke={a} strokeWidth="11.4" fill="none" {...ROUND} />
      <path d="M32.5 45.5 L22 50 L15 52" stroke={f} strokeWidth="7.6" fill="none" {...ROUND} />
      <path d="M58 45 L72 40 L77 28" stroke={f} strokeWidth="7.6" fill="none" {...ROUND} />
      <circle cx="78" cy="25" r="5.3" fill={f} />
      <circle cx="14" cy="53" r="5.7" fill={f} />
      {/* cane, planted well clear of the body */}
      <path d="M17 27 L10 90" stroke={f} strokeWidth="5.4" {...ROUND} />
      <ellipse cx="17" cy="25" rx="5.6" ry="3.4" fill={f} transform="rotate(12 17 25)" />
      {/* head */}
      <circle cx="45" cy="25" r="8.6" fill={f} />
      {/* wide-brim hat */}
      <g transform="rotate(-10 44 13)">
        <ellipse cx="44" cy="13" rx="21.5" ry="5.2" fill={f} />
        <path d="M34 13 L34 5 Q34 1 44 1 Q54 1 54 5 L54 13 Z" fill={f} />
        <rect x="34" y="8.2" width="20" height="4" fill={a} />
      </g>
      {/* face */}
      <circle cx="41.9" cy="24" r="2.1" fill={a} />
      <circle cx="48.3" cy="24" r="2.1" fill={a} />
      <path d="M42.1 29.2 Q45.1 32.6 48.1 29.2" stroke={a} strokeWidth="2.3" fill="none" {...ROUND} />
      {/* bow tie + jacket opening */}
      <path d="M45 41 L39.4 38 L39.4 44 Z M45 41 L50.6 38 L50.6 44 Z" fill={a} />
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
      {/* head */}
      <circle cx="43" cy="39.5" r="10.5" fill={f} />

      {/* sombrero: its halo carves the seam between brim and head */}
      <path d={MUSICO_HAT_BRIM} fill={a} stroke={a} strokeWidth="5.5" {...ROUND} />
      <path d={MUSICO_HAT_CROWN} fill={a} stroke={a} strokeWidth="5.5" {...ROUND} />
      <path d={MUSICO_HAT_BRIM} fill={f} />
      <path d={MUSICO_HAT_CROWN} fill={f} />
      <path d="M30 25 Q42 30.5 54 25" stroke={a} strokeWidth="2.6" fill="none" {...ROUND} />

      {/* torso; right shoulder runs on behind the guitar */}
      <path d={MUSICO_TORSO} fill={a} stroke={a} strokeWidth="5.5" {...ROUND} />
      <path d={MUSICO_TORSO} fill={f} />
      <path d="M51 57.5 Q55.5 62 56.5 71" stroke={a} strokeWidth="2.4" fill="none" {...ROUND} />

      {/* fretting arm, swung out to the left */}
      <path d={MUSICO_ARM_L} stroke={a} strokeWidth="11" fill="none" {...ROUND} />
      <path d={MUSICO_ARM_L} stroke={f} strokeWidth="7" fill="none" {...ROUND} />

      {/* guitar in front: halo cuts it free of torso and arm */}
      <g transform={MUSICO_GUITAR_XF}>
        <path d={MUSICO_BODY} fill={a} stroke={a} strokeWidth="6.5" {...ROUND} />
        <path d="M0 -20 L0 -66" stroke={a} strokeWidth="14" {...ROUND} />
      </g>
      <g transform={MUSICO_GUITAR_XF}>
        <path d={MUSICO_BODY} fill={f} />
        <path d="M0 -20 L0 -66" stroke={f} strokeWidth="7.5" {...ROUND} />
        <circle cx="0" cy="-6.5" r="5.6" fill={a} />
      </g>

      {/* fretting fist clamped on the neck */}
      <circle cx="30" cy="50.7" r="6.9" fill={a} />
      <circle cx="30" cy="50.7" r="5.2" fill={f} />

      {/* face */}
      <circle cx="39" cy="38" r="1.9" fill={a} />
      <circle cx="47" cy="38" r="1.9" fill={a} />
      <path d="M37.8 44 Q43 47.8 48.2 44" stroke={a} strokeWidth="2.8" fill="none" {...ROUND} />
    </>
  ),

  arana: (f, a) => (
    <>
      {/* clear the dragline out from under the spider */}
      <g stroke={a} strokeWidth="13" fill="none" {...ROUND}>
        <path d="M44 36 L26 19 L15 25 M42 41 L22 31 L11 41 M42 47 L21 49 L11 62 M44 53 L26 64 L20 79" />
        <path d="M56 36 L74 19 L85 25 M58 41 L78 31 L89 41 M58 47 L79 49 L89 62 M56 53 L74 64 L80 79" />
      </g>
      <ellipse cx="50" cy="62" rx="18.4" ry="20" fill={a} />
      <circle cx="50" cy="38" r="13.6" fill={a} />
      {/* eight thick legs */}
      <g stroke={f} strokeWidth="6.4" fill="none" {...ROUND}>
        <path d="M44 36 L26 19 L15 25 M42 41 L22 31 L11 41 M42 47 L21 49 L11 62 M44 53 L26 64 L20 79" />
        <path d="M56 36 L74 19 L85 25 M58 41 L78 31 L89 41 M58 47 L79 49 L89 62 M56 53 L74 64 L80 79" />
      </g>
      {/* abdomen + cephalothorax */}
      <ellipse cx="50" cy="62" rx="14.8" ry="16.4" fill={f} />
      {/* dragline it hangs from, meeting the body */}
      <path d="M50 3 L50 34" stroke={f} strokeWidth="4.6" {...ROUND} />
      <circle cx="50" cy="38" r="10" fill={f} />
      {/* eyes + abdomen markings */}
      <circle cx="46.1" cy="36.6" r="2.5" fill={a} />
      <circle cx="53.9" cy="36.6" r="2.5" fill={a} />
      <path d="M43 59 L50 63.5 L57 59 M43.5 68.5 L50 72.5 L56.5 68.5" stroke={a} strokeWidth="2.9" fill="none" {...ROUND} />
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
      <circle cx="50" cy="50" r="42" fill={f} />
      <g stroke={a} strokeWidth="5" fill="none" {...ROUND}>
        {/* equator */}
        <path d="M11 50 L89 50" />
        {/* tropics */}
        <path d="M20 26 L80 26" />
        <path d="M20 74 L80 74" />
        {/* central meridian */}
        <ellipse cx="50" cy="50" rx="17" ry="41" />
      </g>
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
      {/* one welded white mass: trunk, tall base pad, two side pads, three tunas */}
      <path d="M44 68 L42 94 L58 94 L56 68 Z" fill={f} />
      <ellipse cx="50" cy="50" rx="17" ry="27" fill={f} />
      <ellipse cx="24" cy="55" rx="12" ry="15" fill={f} transform="rotate(-34 24 55)" />
      <ellipse cx="76" cy="47" rx="12" ry="15" fill={f} transform="rotate(34 76 47)" />
      <ellipse cx="50" cy="20" rx="6.5" ry="9" fill={f} />
      <ellipse cx="14" cy="38" rx="5.8" ry="6.2" fill={f} />
      <ellipse cx="86" cy="30" rx="5.8" ry="6.2" fill={f} />
      {/* panel-coloured marks: two seams that keep the side pads separate,
          four spines that punch holes in the base pad */}
      <g stroke={a} strokeWidth="4.5" fill="none" {...ROUND}>
        <path d="M33.6 41 Q32.8 53 35.2 65" />
        <path d="M65 34 Q67.2 46 64.8 60" />
      </g>
      <g fill={a}>
        <circle cx="44" cy="38" r="2.7" />
        <circle cx="56" cy="42" r="2.7" />
        <circle cx="44" cy="54" r="2.7" />
        <circle cx="56" cy="58" r="2.7" />
      </g>
    </>
  ),

  alacran: (f, a) => (
    <>
      {/* walking legs fanning out below the body */}
      <path
        d="M43 67 L32 76 L26 86 M54 70 L51 81 L47 90 M63 70 L67 81 L65 90 M70 67 L80 75 L83 84"
        stroke={f}
        strokeWidth="5.5"
        fill="none"
        {...ROUND}
      />
      {/* tail arcing up and over the back, then the stinger */}
      <path d="M74 68 C90 66 97 50 89 38 C87 34 84 32 81 30" stroke={f} strokeWidth="10" fill="none" {...ROUND} />
      <path d="M84 26 L77 37 L66 20 Z" fill={f} />
      {/* segmented body */}
      <ellipse cx="71" cy="66" rx="8" ry="7" fill={f} />
      <ellipse cx="61" cy="62" rx="10" ry="9" fill={f} />
      <ellipse cx="48" cy="58" rx="12" ry="10.5" fill={f} />
      {/* the two pincers, splayed forward */}
      {ALACRAN_claw(f, a, 30, 31, 18)}
      {ALACRAN_claw(f, a, 20, 62, -4)}
      {/* arms drawn last so they bridge the accent gap into each pincer */}
      <path d="M45 50 L38 38" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      <path d="M44 62 L33 62" stroke={f} strokeWidth="6.5" fill="none" {...ROUND} />
      {/* segment seams */}
      <path d="M55 52 Q53 61 56 71 M67 57 Q65 65 68 73" stroke={a} strokeWidth="3.2" fill="none" {...ROUND} />
      {/* tail joints */}
      <path d="M86 60 Q91 59 94 56 M86 45 Q91 44 94 42" stroke={a} strokeWidth="3" fill="none" {...ROUND} />
      {/* eyes */}
      <circle cx="47" cy="54" r="2" fill={a} />
      <circle cx="47" cy="62" r="2" fill={a} />
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
      {/* antlers: two clean beams off the top of the skull, tines branching outward */}
      <path d="M66 23 C61 16 57 11 54 6" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <path d="M60 15 L49 12 M57 10 L48 6" stroke={f} strokeWidth="5.2" fill="none" {...ROUND} />
      <path d="M75 23 C79 16 83 11 87 6" stroke={f} strokeWidth="6" fill="none" {...ROUND} />
      <path d="M80 15 L91 12 M84 10 L92 6" stroke={f} strokeWidth="5.2" fill="none" {...ROUND} />
      {/* ear laid back */}
      <path d="M64 28 L47 27 L60 39 Z" fill={f} />
      {/* head: short skull into a blunt muzzle */}
      <path d="M63 24 C71 20 79 24 86 32 C90 37 86 43 80 41 C71 39 63 34 61 29 Z" fill={f} />
      {/* neck joining head to shoulder */}
      <path d="M45 62 C47 49 53 39 62 31 L74 40 C67 45 61 54 59 66 Z" fill={f} />
      {/* body */}
      <path d="M19 49 C33 43 49 44 59 52 C66 59 63 67 56 71 C44 76 25 75 17 67 C10 60 12 53 19 49 Z" fill={f} />
      {/* short raised tail */}
      <path d="M18 48 L11 40 L16 54 Z" fill={f} />
      {/* legs */}
      <path d="M22 72 L19 94 M32 75 L31 94" stroke={f} strokeWidth="5.2" fill="none" {...ROUND} />
      <path d="M48 73 L46 94 M57 70 L61 94" stroke={f} strokeWidth="5.2" fill="none" {...ROUND} />
      {/* --- accent holes --- */}
      <circle cx="70" cy="29" r="2.4" fill={a} />
      <circle cx="82" cy="37" r="2" fill={a} />
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
      {/* curved trunk, flared at the base */}
      <path d="M30 94 Q38 68 46 47 L58 49 Q50 70 48 94 Z" fill={f} />
      {/* broad fronds, each outlined so they read as separate blades */}
      <path d="M50 40 Q26 26 6 58 Q26 44 46 54 Z" fill={f} />
      <path d="M50 40 Q26 26 6 58 Q26 44 46 54 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M50 39 Q24 12 8 34 Q30 32 47 48 Z" fill={f} />
      <path d="M50 39 Q24 12 8 34 Q30 32 47 48 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M48 40 Q30 6 22 12 Q36 24 45 48 Z" fill={f} />
      <path d="M48 40 Q30 6 22 12 Q36 24 45 48 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M50 38 Q44 12 54 4 Q60 18 56 42 Z" fill={f} />
      <path d="M50 38 Q44 12 54 4 Q60 18 56 42 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M52 40 Q68 6 78 14 Q62 24 55 48 Z" fill={f} />
      <path d="M52 40 Q68 6 78 14 Q62 24 55 48 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M52 39 Q78 12 92 32 Q72 30 54 48 Z" fill={f} />
      <path d="M52 39 Q78 12 92 32 Q72 30 54 48 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      <path d="M52 42 Q76 28 94 58 Q74 44 54 54 Z" fill={f} />
      <path d="M52 42 Q76 28 94 58 Q74 44 54 54 Z" fill="none" stroke={a} strokeWidth="2.8" {...ROUND} />
      {/* crown knot and the coconut bunch hanging under it */}
      <circle cx="50" cy="44" r="7" fill={f} />
      <circle cx="43" cy="52" r="5.6" fill={f} />
      <circle cx="56" cy="52.5" r="5.6" fill={f} />
      <circle cx="49.5" cy="58" r="5.4" fill={f} />
      {/* trunk segment bars */}
      <g stroke={a} strokeWidth="3" {...ROUND}>
        <path d="M39.8 69.6 L49.7 70.8" />
        <path d="M36.4 79.6 L47.7 80.8" />
        <path d="M33.3 89.6 L46.4 90.8" />
      </g>
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

  arpa: (f) => (
    <>
      {/* soundbox: slim slanted body closing the right side of the frame */}
      <path d="M79 30 L86 35 L46 88 L36 88 Z" fill={f} />
      {/* front pillar: straight column */}
      <path d="M15 21 L15 87" stroke={f} strokeWidth="11" {...ROUND} />
      {/* foot: pillar and body stand on one slab */}
      <path d="M9 86 L54 86 L54 94 L9 94 Z" fill={f} />
      {/* swan neck arching over the top */}
      <path d="M15 20 Q47 2 82 32" stroke={f} strokeWidth="9" fill="none" {...ROUND} />
      {/* four graduated strings, stopping short of the body so the frame stays open */}
      <path d="M31 15 L31 85" stroke={f} strokeWidth="4.6" {...ROUND} />
      <path d="M42.5 13.5 L42.5 74" stroke={f} strokeWidth="4.6" {...ROUND} />
      <path d="M54 15.5 L54 58" stroke={f} strokeWidth="4.6" {...ROUND} />
      <path d="M65.5 21 L65.5 43" stroke={f} strokeWidth="4.6" {...ROUND} />
    </>
  ),

  rana: (f, a) => (
    <>
      {/* wide head and rounder body */}
      <ellipse cx="50" cy="45" rx="29" ry="18" fill={f} />
      <ellipse cx="50" cy="68" rx="24" ry="20" fill={f} />
      {/* folded hind legs: accent groove first so they break the body outline */}
      <path d={RANA_LEG_L} stroke={a} strokeWidth="19.5" fill="none" {...ROUND} />
      <path d={RANA_LEG_R} stroke={a} strokeWidth="19.5" fill="none" {...ROUND} />
      <path d={RANA_LEG_L} stroke={f} strokeWidth="14.5" fill="none" {...ROUND} />
      <path d={RANA_LEG_R} stroke={f} strokeWidth="14.5" fill="none" {...ROUND} />
      {/* three splayed toes on each hind foot */}
      <path d="M16 76 L3 84 M16 76 L4 93 M16 76 L15 96" stroke={f} strokeWidth="8" fill="none" {...ROUND} />
      <path d="M84 76 L97 84 M84 76 L96 93 M84 76 L85 96" stroke={f} strokeWidth="8" fill="none" {...ROUND} />
      {/* front legs peeking out below the belly */}
      <path d="M42 78 L40 90 M58 78 L60 90" stroke={f} strokeWidth="8" fill="none" {...ROUND} />
      <path d="M40 90 L33 95 M40 90 L40 97 M40 90 L47 95" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      <path d="M60 90 L53 95 M60 90 L60 97 M60 90 L67 95" stroke={f} strokeWidth="5" fill="none" {...ROUND} />
      {/* bulging eyes on top of the head */}
      <circle cx="30" cy="22" r="12" fill={f} />
      <circle cx="70" cy="22" r="12" fill={f} />
      <circle cx="30" cy="22" r="5" fill={a} />
      <circle cx="70" cy="22" r="5" fill={a} />
      <circle cx="31.6" cy="20.2" r="1.7" fill={f} />
      <circle cx="71.6" cy="20.2" r="1.7" fill={f} />
      {/* wide mouth */}
      <path d="M30 44 Q50 60 70 44" stroke={a} strokeWidth="3.6" fill="none" {...ROUND} />
    </>
  ),
};
