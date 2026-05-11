import type { ReactNode } from 'react';
import type { IconName } from '../../types';

type IconRenderer = (fill: string, accent: string) => ReactNode;

const D = 'rgba(0,0,0,0.18)';
const DD = 'rgba(0,0,0,0.32)';
const H = 'rgba(255,255,255,0.22)';

export const ICON_RENDERERS: Record<IconName, IconRenderer> = {
  gallo: (f, a) => (
    <>
      <path d="M8 36 Q0 58 16 78 Q24 74 24 66 L28 60 Q24 50 22 42 L24 34 Z" fill={f} />
      <path d="M2 56 Q4 76 24 82 L28 72 L26 64 L20 58 L12 52 Z" fill={f} opacity="0.78" />
      <path d="M14 30 Q24 24 30 32 L28 38 L20 36 Z" fill={f} opacity="0.7" />
      <ellipse cx="48" cy="58" rx="26" ry="20" fill={f} />
      <path d="M28 64 Q40 76 62 74" stroke={D} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 52 L34 48 M38 50 L42 46 M46 52 L50 48" stroke={D} strokeWidth="1" opacity="0.4" />
      <circle cx="66" cy="34" r="14" fill={f} />
      <path d="M54 28 Q56 12 62 18 Q64 6 70 16 Q76 10 76 22 Q72 28 64 28 Z" fill={f} />
      <path d="M62 48 Q58 60 64 60 Q68 58 68 50 Z" fill={f} />
      <path d="M58 56 Q56 64 62 64 Q64 60 64 56 Z" fill={f} opacity="0.85" />
      <path d="M78 34 L94 36 L82 44 Z" fill={f} />
      <path d="M88 36 L84 38" stroke={D} strokeWidth="1" />
      <circle cx="68" cy="32" r="2.6" fill={a} />
      <circle cx="68.5" cy="31.5" r="0.8" fill={f} />
      <path d="M40 76 L36 90 M56 76 L60 90" stroke={f} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 90 L30 92 M36 90 L36 94 M36 90 L42 94" stroke={f} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M60 90 L66 92 M60 90 L60 94 M60 90 L54 94" stroke={f} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),

  diablito: (f, a) => (
    <>
      <path d="M22 28 Q14 14 24 16 L34 30 Z M78 28 Q86 14 76 16 L66 30 Z" fill={f} />
      <path d="M24 48 Q24 22 50 22 Q76 22 76 48 Q76 70 60 76 L66 86 L54 80 L50 86 L46 80 L34 86 L40 76 Q24 70 24 48 Z" fill={f} />
      <path d="M84 56 Q92 62 88 74 Q86 70 88 66 Q84 70 82 66 Q86 64 84 56 Z" fill={f} />
      <ellipse cx="40" cy="48" rx="5" ry="6" fill={a} />
      <ellipse cx="60" cy="48" rx="5" ry="6" fill={a} />
      <circle cx="41" cy="49" r="2" fill={f} />
      <circle cx="61" cy="49" r="2" fill={f} />
      <path d="M36 64 Q42 68 50 66 Q58 68 64 64 L60 70 L56 66 L50 70 L44 66 Z" fill={a} />
      <path d="M40 38 L34 34 M60 38 L66 34" stroke={D} strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  dama: (f, a) => (
    <>
      <path d="M24 30 Q24 14 50 14 Q76 14 76 30 Q76 38 70 40 L70 44 Q66 50 50 50 Q34 50 30 44 L30 40 Q24 38 24 30 Z" fill={f} />
      <ellipse cx="50" cy="38" rx="14" ry="16" fill={f} />
      <circle cx="44" cy="38" r="2.2" fill={a} />
      <circle cx="56" cy="38" r="2.2" fill={a} />
      <path d="M44 46 Q50 50 56 46" stroke={a} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M50 54 L48 60 Q30 64 24 88 L46 88 L50 70 L54 88 L76 88 Q70 64 52 60 Z" fill={f} />
      <circle cx="50" cy="68" r="2" fill={a} opacity="0.6" />
      <path d="M36 80 Q50 84 64 80" stroke={D} strokeWidth="1.8" fill="none" />
      <path d="M30 24 Q40 16 50 18 Q60 16 70 24" stroke={D} strokeWidth="1.6" fill="none" />
    </>
  ),

  catrin: (f, a) => (
    <>
      <rect x="34" y="10" width="32" height="16" rx="1" fill={f} />
      <rect x="28" y="24" width="44" height="4" rx="1" fill={f} />
      <path d="M36 16 Q42 14 50 16 L50 24 L36 24 Z" fill={D} opacity="0.5" />
      <ellipse cx="50" cy="40" rx="13" ry="14" fill={f} />
      <circle cx="44" cy="40" r="3" fill={f} stroke={a} strokeWidth="1.2" />
      <circle cx="44" cy="40" r="1.4" fill={a} />
      <circle cx="56" cy="40" r="1.6" fill={a} />
      <path d="M44 50 Q50 52 56 50" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M42 46 Q40 50 38 50 M58 46 Q60 50 62 50" stroke={D} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M34 56 L34 88 L66 88 L66 56 L58 54 L54 58 L50 56 L46 58 L42 54 Z" fill={f} />
      <path d="M48 56 L48 88 M52 56 L52 88" stroke={D} strokeWidth="1.4" />
      <circle cx="50" cy="68" r="1.6" fill={a} />
      <circle cx="50" cy="76" r="1.6" fill={a} />
      <path d="M46 58 L50 64 L54 58" stroke={a} strokeWidth="1.4" fill="none" />
    </>
  ),

  paraguas: (f, a) => (
    <>
      <path d="M14 52 Q14 22 50 18 Q86 22 86 52 Q70 46 58 52 Q50 46 42 52 Q30 46 14 52 Z" fill={f} />
      <path d="M50 18 Q34 22 30 52 Q40 48 42 52 Q44 28 50 18 Z M50 18 Q66 22 70 52 Q60 48 58 52 Q56 28 50 18 Z" fill={D} opacity="0.4" />
      <rect x="48" y="50" width="4" height="32" rx="1" fill={f} />
      <path d="M52 82 Q52 92 62 92 Q66 92 66 86 Q66 84 64 84 Q62 84 62 86" stroke={f} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="18" r="3" fill={f} />
      <path d="M22 50 L32 48 M40 50 L48 48 M56 50 L62 48 M68 50 L78 48" stroke={a} strokeWidth="1.2" opacity="0.5" />
    </>
  ),

  sirena: (f, a) => (
    <>
      <path d="M30 16 Q34 8 50 10 Q42 14 44 22 Q40 18 36 22 Z" fill={f} />
      <circle cx="50" cy="24" r="10" fill={f} />
      <circle cx="46" cy="24" r="1.6" fill={a} />
      <circle cx="54" cy="24" r="1.6" fill={a} />
      <path d="M46 30 Q50 32 54 30" stroke={a} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M40 34 Q34 30 26 36 Q34 36 36 40 Q30 42 28 50 Q34 46 40 46 L40 52 Q44 50 50 50 Q56 50 60 52 L60 46 Q66 46 72 50 Q70 42 64 40 Q66 36 74 36 Q66 30 60 34 Q50 32 40 34 Z" fill={f} />
      <path d="M40 54 Q40 70 50 76 Q60 70 60 54 Q56 56 50 56 Q44 56 40 54 Z" fill={f} />
      <path d="M44 58 Q44 62 48 62 M52 60 Q52 64 56 64 M46 68 Q46 70 50 70 M52 66 Q52 70 56 70" stroke={D} strokeWidth="1.4" fill="none" />
      <path d="M50 76 Q30 84 22 78 Q26 86 38 88 Q44 86 50 80 Q56 86 62 88 Q74 86 78 78 Q70 84 50 76 Z" fill={f} />
      <path d="M14 70 Q12 76 18 78 M86 70 Q88 76 82 78" stroke={f} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />
    </>
  ),

  escalera: (f) => (
    <>
      <path d="M22 14 L30 12 L36 86 L28 88 Z" fill={f} />
      <path d="M64 12 L72 14 L66 88 L58 86 Z" fill={f} />
      <rect x="28" y="22" width="34" height="6" transform="rotate(2 45 25)" fill={f} />
      <rect x="28" y="36" width="34" height="6" transform="rotate(2 45 39)" fill={f} />
      <rect x="28" y="50" width="34" height="6" transform="rotate(2 45 53)" fill={f} />
      <rect x="28" y="64" width="34" height="6" transform="rotate(2 45 67)" fill={f} />
      <rect x="28" y="78" width="34" height="6" transform="rotate(2 45 81)" fill={f} />
      <path d="M30 22 L32 28 M68 26 L66 32 M30 50 L32 56 M68 54 L66 60 M30 78 L32 84 M68 82 L66 88" stroke={DD} strokeWidth="1" opacity="0.5" />
    </>
  ),

  botella: (f, a) => (
    <>
      <rect x="44" y="10" width="12" height="6" fill={f} />
      <path d="M42 16 L58 16 L58 30 Q66 36 66 50 L66 84 Q66 90 60 90 L40 90 Q34 90 34 84 L34 50 Q34 36 42 30 Z" fill={f} />
      <path d="M38 38 Q42 34 50 34 Q58 34 62 38 Q58 36 50 36 Q42 36 38 38" fill={H} />
      <rect x="40" y="56" width="20" height="18" rx="2" fill={a} opacity="0.85" />
      <path d="M44 62 L56 62 M44 68 L56 68" stroke={f} strokeWidth="1.2" opacity="0.6" />
      <circle cx="50" cy="66" r="3" fill={f} opacity="0.45" />
      <rect x="44" y="10" width="12" height="3" fill={D} />
    </>
  ),

  barril: (f) => (
    <>
      <path d="M22 22 L78 22 L74 30 Q82 50 74 70 L78 78 L22 78 L26 70 Q18 50 26 30 Z" fill={f} />
      <path d="M18 30 L82 30 L82 36 L18 36 Z M18 64 L82 64 L82 70 L18 70 Z" fill={DD} />
      <path d="M34 32 L30 68 M50 32 L50 68 M66 32 L70 68" stroke={D} strokeWidth="1.4" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="2" fill={D} />
    </>
  ),

  arbol: (f) => (
    <>
      <circle cx="30" cy="44" r="16" fill={f} />
      <circle cx="70" cy="42" r="18" fill={f} />
      <circle cx="50" cy="22" r="18" fill={f} />
      <circle cx="42" cy="48" r="15" fill={f} />
      <circle cx="62" cy="50" r="15" fill={f} />
      <circle cx="50" cy="40" r="14" fill={f} />
      <circle cx="38" cy="38" r="3" fill={D} opacity="0.4" />
      <circle cx="62" cy="32" r="3.5" fill={D} opacity="0.4" />
      <circle cx="52" cy="52" r="4" fill={D} opacity="0.3" />
      <circle cx="26" cy="50" r="3" fill={D} opacity="0.35" />
      <circle cx="72" cy="56" r="3" fill={D} opacity="0.35" />
      <path d="M44 60 Q46 78 40 90 L60 90 Q54 78 56 60 Z" fill={f} />
      <path d="M44 78 L42 86 M56 78 L58 86 M50 70 L50 80" stroke={D} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M46 64 Q48 66 50 64 Q52 66 54 64" stroke={D} strokeWidth="1.2" fill="none" opacity="0.45" />
    </>
  ),

  melon: (f, a) => (
    <>
      <path d="M16 50 Q16 22 50 22 Q84 22 84 50 Q84 76 50 84 Q16 76 16 50 Z" fill={f} />
      <path d="M22 50 Q22 28 50 28 Q78 28 78 50 Q78 72 50 78 Q22 72 22 50 Z" fill={a} opacity="0.75" />
      <ellipse cx="38" cy="46" rx="2" ry="3" fill={f} />
      <ellipse cx="52" cy="42" rx="2" ry="3" fill={f} />
      <ellipse cx="62" cy="50" rx="2" ry="3" fill={f} />
      <ellipse cx="44" cy="58" rx="2" ry="3" fill={f} />
      <ellipse cx="56" cy="60" rx="2" ry="3" fill={f} />
      <ellipse cx="34" cy="58" rx="2" ry="3" fill={f} />
      <path d="M50 22 Q46 14 50 12 Q54 14 50 22 Z" fill={f} />
      <path d="M52 14 L60 10 L56 18 Z" fill={f} />
    </>
  ),

  valiente: (f, a) => (
    <>
      <path d="M22 30 Q22 20 50 18 Q78 20 78 30 Q72 32 50 32 Q28 32 22 30 Z" fill={f} />
      <path d="M30 30 L70 30 L66 36 L34 36 Z" fill={f} />
      <ellipse cx="50" cy="42" rx="12" ry="13" fill={f} />
      <circle cx="46" cy="42" r="1.6" fill={a} />
      <circle cx="54" cy="42" r="1.6" fill={a} />
      <path d="M44 48 Q50 50 56 48" stroke={a} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M42 46 Q40 50 36 50 M58 46 Q60 50 64 50" stroke={D} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M32 56 L32 88 L68 88 L68 56 L60 54 L54 60 L50 56 L46 60 L40 54 Z" fill={f} />
      <path d="M68 50 L86 80 L88 86 L82 84 Z" fill={f} />
      <path d="M84 80 L92 84 L86 88 Z" fill={f} />
      <path d="M68 50 L72 54 L68 56" fill={D} opacity="0.5" />
      <path d="M44 64 Q50 70 56 64" stroke={D} strokeWidth="1.4" fill="none" />
    </>
  ),

  gorrito: (f, a) => (
    <>
      <path d="M22 58 Q22 26 50 22 Q78 26 78 58 Q72 56 60 56 L40 56 Q28 56 22 58 Z" fill={f} />
      <path d="M16 60 Q16 70 22 70 L78 70 Q84 70 84 60 Q70 64 50 64 Q30 64 16 60 Z" fill={f} />
      <ellipse cx="50" cy="22" rx="5" ry="4" fill={f} />
      <path d="M50 14 Q54 8 60 10 Q56 14 50 14 Z" fill={f} />
      <path d="M22 70 L18 84 Q22 88 28 86 L34 76 Z" fill={f} />
      <path d="M78 70 L82 84 Q78 88 72 86 L66 76 Z" fill={f} />
      <path d="M34 44 Q42 38 50 38 Q58 38 66 44" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M28 52 Q50 46 72 52" stroke={a} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M26 60 L28 64 M40 56 L42 60 M58 56 L60 60 M72 60 L74 64" stroke={D} strokeWidth="1.2" />
      <circle cx="34" cy="48" r="1.4" fill={a} opacity="0.5" />
      <circle cx="50" cy="44" r="1.4" fill={a} opacity="0.5" />
      <circle cx="66" cy="48" r="1.4" fill={a} opacity="0.5" />
    </>
  ),

  muerte: (f, a) => (
    <>
      <path d="M20 46 Q20 16 50 16 Q80 16 80 46 L80 62 Q80 68 74 68 L66 68 L66 78 Q66 82 62 82 L38 82 Q34 82 34 78 L34 68 L26 68 Q20 68 20 62 Z" fill={f} />
      <ellipse cx="38" cy="48" rx="7" ry="8" fill={a} />
      <ellipse cx="62" cy="48" rx="7" ry="8" fill={a} />
      <path d="M44 64 L50 56 L56 64 Z" fill={a} />
      <path d="M40 70 L40 80 M46 70 L46 80 M54 70 L54 80 M60 70 L60 80" stroke={a} strokeWidth="2" />
      <path d="M70 84 L82 96" stroke={f} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M82 96 Q90 92 92 84 Q88 88 80 88" fill={f} />
      <path d="M34 28 Q40 26 46 28 M54 28 Q60 26 66 28" stroke={D} strokeWidth="1.4" fill="none" />
    </>
  ),

  pera: (f) => (
    <>
      <path d="M50 28 Q60 28 60 38 Q62 44 56 48 Q70 58 70 70 Q70 84 50 88 Q30 84 30 70 Q30 58 44 48 Q38 44 40 38 Q40 28 50 28 Z" fill={f} />
      <path d="M50 28 Q50 18 56 14" stroke={f} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M56 14 Q62 8 70 12 Q66 18 60 18 Q56 18 56 14 Z" fill={f} />
      <ellipse cx="42" cy="62" rx="6" ry="10" fill={H} />
      <circle cx="56" cy="78" r="2" fill={D} opacity="0.5" />
    </>
  ),

  bandera: (f) => (
    <>
      <rect x="18" y="12" width="4" height="78" fill={f} />
      <path d="M22 16 L78 16 L78 50 L22 50 Z" fill="#FAF3E0" />
      <rect x="22" y="16" width="18" height="34" fill="#1F8A5B" />
      <rect x="60" y="16" width="18" height="34" fill="#D62828" />
      <path d="M46 26 Q42 28 42 32 Q42 38 50 40 Q58 38 58 32 Q58 28 54 26 Q52 30 50 30 Q48 30 46 26 Z" fill="#5D2E0E" />
      <path d="M50 40 L50 44 M44 42 L52 42" stroke="#5D2E0E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M40 44 Q44 46 46 48 M60 44 Q56 46 54 48" stroke="#1F8A5B" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="32" r="1.2" fill="#FAF3E0" />
      <circle cx="18" cy="12" r="4" fill={f} />
      <path d="M22 50 L22 58 L26 54 Z" fill={D} opacity="0.4" />
      <path d="M22 24 L40 24 M22 32 L40 32 M22 40 L40 40 M60 24 L78 24 M60 32 L78 32 M60 40 L78 40" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
    </>
  ),

  bandolon: (f, a) => (
    <>
      <ellipse cx="40" cy="64" rx="22" ry="22" fill={f} />
      <ellipse cx="40" cy="64" rx="5" ry="5" fill={a} />
      <rect x="58" y="22" width="9" height="44" rx="1" transform="rotate(-12 62 44)" fill={f} />
      <path d="M70 16 L78 12 L74 22 Z" fill={f} />
      <path d="M64 24 L62 30 L70 28 L67 34 L75 32" stroke={D} strokeWidth="1.2" fill="none" />
      <path d="M18 60 Q40 50 60 36 M20 66 Q40 56 62 42 M22 72 Q40 62 64 48" stroke={a} strokeWidth="1" opacity="0.7" fill="none" />
      <path d="M62 28 L66 32 M58 34 L62 38 M54 40 L58 44 M50 46 L54 50" stroke={D} strokeWidth="1" />
      <circle cx="40" cy="64" r="11" fill="none" stroke={a} strokeWidth="0.8" opacity="0.4" />
    </>
  ),

  cello: (f, a) => (
    <>
      <path d="M44 6 Q40 6 40 12 Q40 14 42 14 Q40 14 40 18 Q40 22 44 22 L56 22 Q60 22 60 18 Q60 14 58 14 Q60 14 60 12 Q60 6 56 6 Z" fill={f} />
      <circle cx="44" cy="10" r="1.4" fill={a} />
      <circle cx="50" cy="10" r="1.4" fill={a} />
      <circle cx="56" cy="10" r="1.4" fill={a} />
      <circle cx="44" cy="18" r="1.4" fill={a} />
      <circle cx="56" cy="18" r="1.4" fill={a} />
      <rect x="46" y="22" width="8" height="28" fill={f} />
      <path d="M30 56 Q26 46 38 44 Q44 44 46 50 L46 54 Q44 58 38 58 L40 64 Q32 66 30 60 Z" fill={f} />
      <path d="M70 56 Q74 46 62 44 Q56 44 54 50 L54 54 Q56 58 62 58 L60 64 Q68 66 70 60 Z" fill={f} />
      <path d="M28 64 Q28 78 50 90 Q72 78 72 64 Q72 60 68 58 L60 58 Q56 58 54 62 L54 70 L46 70 L46 62 Q44 58 40 58 L32 58 Q28 60 28 64 Z" fill={f} />
      <path d="M40 64 Q40 70 44 72 Q40 74 40 78 L42 78 Q44 72 44 68 Q44 64 40 64 Z M60 64 Q60 70 56 72 Q60 74 60 78 L58 78 Q56 72 56 68 Q56 64 60 64 Z" fill={a} />
      <rect x="48" y="68" width="4" height="14" fill={D} opacity="0.55" />
      <line x1="50" y1="22" x2="50" y2="88" stroke={a} strokeWidth="0.6" opacity="0.55" />
      <line x1="48" y1="22" x2="48" y2="88" stroke={a} strokeWidth="0.6" opacity="0.4" />
      <line x1="52" y1="22" x2="52" y2="88" stroke={a} strokeWidth="0.6" opacity="0.4" />
      <path d="M76 16 L88 8 L84 16 L86 22" stroke={f} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),

  garza: (f, a) => (
    <>
      <ellipse cx="60" cy="22" rx="7" ry="6" fill={f} />
      <path d="M67 22 L86 24 L82 28 L67 26 Z" fill={f} />
      <circle cx="62" cy="20" r="1.6" fill={a} />
      <path d="M60 28 Q56 36 56 46 Q56 56 64 60 Q70 60 72 68 L74 78 L70 76 L68 80 L64 76 L62 82 L58 78 Q40 68 30 76 L34 78 L30 84 L36 84 L34 90 L42 84 L40 90 L48 80 Q60 78 64 64" fill={f} />
      <path d="M50 70 L46 86 M58 70 L60 86" stroke={f} strokeWidth="2" strokeLinecap="round" />
      <path d="M44 86 L40 92 M46 86 L42 92 M48 86 L46 92 M58 86 L62 92 M60 86 L64 92 M62 86 L66 92" stroke={f} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M88 22 L96 22 M88 24 L94 26 M88 20 L94 18" stroke={f} strokeWidth="1" />
    </>
  ),

  pajaro: (f, a) => (
    <>
      <ellipse cx="48" cy="56" rx="24" ry="18" fill={f} />
      <circle cx="68" cy="44" r="11" fill={f} />
      <path d="M76 44 L92 42 L82 50 Z" fill={f} />
      <circle cx="70" cy="42" r="2" fill={a} />
      <circle cx="70" cy="42" r="1" fill={f} />
      <path d="M26 56 Q14 50 12 58 Q14 66 28 62 Q30 60 26 56 Z" fill={f} />
      <path d="M36 64 Q44 66 50 66 Q46 70 36 70 Z" fill={D} opacity="0.5" />
      <path d="M60 74 L58 88 M52 74 L52 88" stroke={f} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 88 L54 92 M58 88 L60 92 M58 88 L62 92" stroke={f} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M52 88 L48 92 M52 88 L52 92 M52 88 L56 92" stroke={f} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M40 50 L46 50 M32 56 L40 56" stroke={D} strokeWidth="1.4" />
    </>
  ),

  mano: (f, a) => (
    <>
      <path d="M30 56 L30 30 Q30 24 36 24 Q42 24 42 30 L42 48 L42 18 Q42 12 48 12 Q54 12 54 18 L54 48 L54 22 Q54 16 60 16 Q66 16 66 22 L66 48 L66 30 Q66 24 72 24 Q78 24 78 30 L78 58 Q78 84 54 90 Q30 86 28 64 Z" fill={f} />
      <path d="M34 60 Q40 70 42 80 M44 56 Q48 70 50 84 M56 56 Q58 70 60 84 M68 60 Q66 70 64 80" stroke={a} strokeWidth="1.2" fill="none" opacity="0.55" />
      <circle cx="54" cy="64" r="4" fill={a} opacity="0.4" />
      <path d="M40 30 L40 46 M52 24 L52 46 M64 28 L64 46" stroke={D} strokeWidth="1" opacity="0.5" />
    </>
  ),

  bota: (f, a) => (
    <>
      <path d="M34 10 L52 10 L52 60 Q52 64 56 66 L74 76 Q80 80 80 86 L80 88 L18 88 L18 84 Q18 78 24 74 L34 66 Z" fill={f} />
      <path d="M34 38 L52 38" stroke={a} strokeWidth="2" />
      <path d="M36 22 L52 22" stroke={D} strokeWidth="1.4" opacity="0.6" />
      <path d="M34 50 L52 50" stroke={D} strokeWidth="1.4" opacity="0.6" />
      <path d="M52 60 L52 70 L66 80" stroke={D} strokeWidth="1.4" fill="none" />
      <circle cx="42" cy="14" r="2" fill={a} />
      <circle cx="42" cy="32" r="1.4" fill={a} />
      <circle cx="42" cy="44" r="1.4" fill={a} />
      <circle cx="42" cy="56" r="1.4" fill={a} />
      <path d="M22 84 L78 84" stroke={a} strokeWidth="1.4" opacity="0.6" />
      <path d="M30 12 L34 10 M28 12 L30 14" stroke={f} strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  luna: (f, a) => (
    <>
      <path d="M68 12 Q40 20 32 50 Q40 80 68 88 Q44 76 44 50 Q44 24 68 12 Z" fill={f} />
      <circle cx="58" cy="38" r="2.4" fill={a} />
      <circle cx="56" cy="48" r="2" fill={a} />
      <path d="M52 52 Q50 56 54 58" stroke={a} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M52 64 Q56 68 60 64" stroke={a} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="22" r="1.6" fill={f} opacity="0.6" />
      <circle cx="84" cy="42" r="1.2" fill={f} opacity="0.55" />
      <circle cx="80" cy="66" r="1.4" fill={f} opacity="0.5" />
    </>
  ),

  cotorro: (f, a) => (
    <>
      <path d="M62 18 Q72 22 70 36 Q66 48 60 54 L58 70 Q56 84 50 88 Q44 84 42 70 L40 54 Q34 48 30 36 Q28 22 38 18 Q42 24 50 24 Q58 24 62 18 Z" fill={f} />
      <circle cx="50" cy="34" r="3" fill={a} />
      <path d="M50 36 L42 42 L50 46 Z" fill={f} />
      <path d="M44 26 Q40 28 38 32 M56 26 Q60 28 62 32" stroke={D} strokeWidth="1.4" fill="none" />
      <path d="M42 56 Q42 64 50 66 Q58 64 58 56" stroke={D} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M44 70 L40 86 L46 84 M56 70 L60 86 L54 84" fill={f} />
      <path d="M26 30 L18 24 L24 36 Z M74 30 L82 24 L76 36 Z" fill={f} />
      <circle cx="50" cy="34" r="1" fill={f} />
    </>
  ),

  borracho: (f, a) => (
    <>
      <path d="M28 30 Q30 14 50 14 Q70 14 72 30 Q66 32 50 32 Q34 32 28 30 Z" fill={f} />
      <path d="M30 28 L70 28 L66 34 L34 34 Z" fill={f} />
      <ellipse cx="48" cy="42" rx="13" ry="14" fill={f} transform="rotate(-8 48 42)" />
      <circle cx="44" cy="40" r="1.8" fill={a} />
      <circle cx="54" cy="42" r="1.8" fill={a} />
      <ellipse cx="44" cy="48" rx="3" ry="1.6" fill={a} opacity="0.5" />
      <ellipse cx="54" cy="50" rx="3" ry="1.6" fill={a} opacity="0.5" />
      <path d="M42 52 Q48 56 56 52" stroke={a} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M28 58 L34 88 L66 88 L72 58 L66 56 L60 62 L56 58 L50 64 L44 58 L40 62 L34 56 Z" fill={f} transform="rotate(-4 50 70)" />
      <rect x="68" y="56" width="14" height="22" rx="3" fill={f} stroke={a} strokeWidth="1.4" transform="rotate(14 75 67)" />
      <rect x="71" y="54" width="8" height="4" fill={f} transform="rotate(14 75 67)" />
      <path d="M72 64 L78 64" stroke={a} strokeWidth="1" transform="rotate(14 75 67)" />
      <path d="M50 8 Q54 4 58 8 Q56 12 50 10 Z" fill={a} opacity="0.4" />
    </>
  ),

  negrito: (f, a) => (
    <>
      <ellipse cx="50" cy="26" rx="28" ry="8" fill={f} />
      <path d="M22 26 Q22 14 50 12 Q78 14 78 26 L74 24 Q72 18 50 18 Q28 18 26 24 Z" fill={f} />
      <ellipse cx="50" cy="40" rx="12" ry="13" fill={f} />
      <circle cx="46" cy="40" r="1.8" fill={a} />
      <circle cx="54" cy="40" r="1.8" fill={a} />
      <path d="M42 36 L48 36 M52 36 L58 36" stroke={D} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <path d="M44 46 Q50 50 56 46" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M32 56 L26 88 L40 88 L42 64 L46 60 L54 60 L58 64 L60 88 L74 88 L68 56 Q60 52 50 52 Q40 52 32 56 Z" fill={f} />
      <path d="M40 64 L40 76 M60 64 L60 76" stroke={D} strokeWidth="1.4" opacity="0.5" />
      <rect x="44" y="60" width="12" height="3" fill={a} opacity="0.55" />
      <path d="M44 70 L56 70" stroke={a} strokeWidth="1.4" opacity="0.55" />
      <circle cx="36" cy="82" r="2" fill={a} opacity="0.5" />
      <circle cx="64" cy="82" r="2" fill={a} opacity="0.5" />
    </>
  ),

  corazon: (f, a) => (
    <>
      <path d="M50 84 Q14 60 14 36 Q14 18 30 18 Q44 18 50 32 Q56 18 70 18 Q86 18 86 36 Q86 60 50 84 Z" fill={f} />
      <path d="M22 32 Q24 26 30 24 Q34 26 32 30 Q28 32 22 32 Z" fill={H} />
      <path d="M50 20 Q52 14 56 10 Q58 14 56 18 M44 20 Q42 14 46 10 Q48 14 48 18" stroke={a} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M50 30 L50 78" stroke={a} strokeWidth="1.2" opacity="0.35" />
    </>
  ),

  sandia: (f) => (
    <>
      <path d="M14 60 Q14 28 50 26 Q86 28 86 60 Q86 64 80 66 L20 66 Q14 64 14 60 Z" fill={f} />
      <path d="M20 60 Q20 34 50 32 Q80 34 80 60 Z" fill="#1F8A5B" />
      <path d="M22 58 Q22 38 50 36 Q78 38 78 58 Z" fill="#FAF3E0" />
      <path d="M24 56 Q24 40 50 38 Q76 40 76 56 Z" fill="#E63946" />
      <ellipse cx="36" cy="50" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="46" cy="46" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="56" cy="48" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="66" cy="52" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="40" cy="54" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="52" cy="54" rx="2" ry="3" fill="#0F0E17" />
      <ellipse cx="62" cy="44" rx="2" ry="3" fill="#0F0E17" />
      <path d="M14 64 Q50 76 86 64 L82 70 Q50 80 18 70 Z" fill={f} opacity="0.6" />
    </>
  ),

  tambor: (f, a) => (
    <>
      <ellipse cx="50" cy="30" rx="28" ry="8" fill={f} />
      <ellipse cx="50" cy="30" rx="24" ry="5" fill={a} opacity="0.6" />
      <path d="M22 30 L22 68 Q22 76 50 78 Q78 76 78 68 L78 30 Q72 36 50 36 Q28 36 22 30 Z" fill={f} />
      <path d="M22 32 L78 32 L78 36 L22 36 Z" fill={DD} opacity="0.4" />
      <path d="M26 38 L36 76 M40 38 L46 76 M58 38 L60 76 M72 38 L66 76" stroke={a} strokeWidth="1.8" opacity="0.85" />
      <path d="M26 50 L36 64 M40 50 L36 64 M40 50 L46 64 M58 50 L60 64 M72 50 L66 64 M58 50 L46 64" stroke={a} strokeWidth="1.2" opacity="0.7" />
      <ellipse cx="50" cy="76" rx="28" ry="6" fill={D} opacity="0.4" />
      <path d="M14 12 L22 32 M86 12 L78 32" stroke={f} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="12" r="3" fill={f} />
      <circle cx="86" cy="12" r="3" fill={f} />
    </>
  ),

  camaron: (f, a) => (
    <>
      <path d="M14 50 Q14 30 38 22 Q56 18 72 24 Q86 30 86 46 Q86 60 74 66 Q70 76 60 78 Q50 80 42 76 Q34 82 26 78 L30 72 Q20 70 16 60 Q14 56 14 50 Z" fill={f} />
      <path d="M86 26 L94 18 M88 30 L96 24 M88 34 L96 32" stroke={f} strokeWidth="2" strokeLinecap="round" />
      <path d="M82 24 L90 14 M78 22 L84 10" stroke={f} strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <circle cx="76" cy="34" r="2.2" fill={a} />
      <circle cx="76" cy="34" r="1" fill={f} />
      <path d="M26 78 L18 84 L24 80 Z" fill={f} />
      <path d="M22 80 L16 88 L22 84 Z" fill={f} />
      <path d="M30 50 Q40 40 50 36 M34 56 Q44 46 54 42 M30 64 Q40 56 50 52" stroke={a} strokeWidth="1.2" opacity="0.45" fill="none" />
      <path d="M40 60 L36 70 M48 62 L46 74 M56 60 L58 72 M64 56 L70 66" stroke={a} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M68 30 Q72 36 70 42" stroke={a} strokeWidth="1.2" fill="none" opacity="0.5" />
    </>
  ),

  jaras: (f) => (
    <>
      <path d="M76 18 L80 14 L82 22 L86 26 L78 24 L74 28 Z" fill={f} />
      <path d="M20 80 L80 22 L74 16 L14 74 Z" fill={f} />
      <path d="M14 74 L10 78 L18 80 L20 86 L22 80 L14 78 Z" fill={f} />
      <path d="M10 78 L8 76 M16 84 L14 88" stroke={f} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M86 22 L92 26 L88 30 L90 34 L82 30 Z" fill={f} />
      <path d="M28 84 L88 26 L84 20 L24 78 Z" fill={f} />
      <path d="M22 80 L18 82 L26 86 L26 92 L30 86 L26 84 Z" fill={f} />
      <path d="M68 22 L78 32 M62 28 L72 38 M56 34 L66 44" stroke={D} strokeWidth="1" opacity="0.55" />
    </>
  ),

  musico: (f, a) => (
    <>
      <path d="M18 22 Q24 14 36 14 Q44 14 46 22 Q44 26 30 26 Q22 26 18 22 Z" fill={f} />
      <ellipse cx="34" cy="32" rx="11" ry="12" fill={f} />
      <circle cx="30" cy="32" r="1.6" fill={a} />
      <circle cx="38" cy="32" r="1.6" fill={a} />
      <path d="M28 38 Q34 42 40 38" stroke={a} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M22 46 L22 84 L48 84 L48 50 L42 46 Z" fill={f} />
      <path d="M48 50 L60 38 L74 26 Q82 22 86 26 Q88 30 88 34 L74 38 L62 50 L60 56 L48 60 Z" fill={f} />
      <circle cx="86" cy="30" r="6" fill={f} />
      <ellipse cx="86" cy="30" rx="3" ry="3" fill={a} />
      <path d="M58 44 L64 50 M64 38 L70 44 M70 32 L76 38" stroke={D} strokeWidth="1" />
      <rect x="28" y="60" width="4" height="6" fill={a} />
      <rect x="38" y="60" width="4" height="6" fill={a} />
    </>
  ),

  arana: (f, a) => (
    <>
      <path d="M50 14 L50 32" stroke={f} strokeWidth="1.4" />
      <circle cx="50" cy="14" r="2.5" fill={f} />
      <ellipse cx="50" cy="58" rx="24" ry="22" fill={f} />
      <ellipse cx="50" cy="46" rx="14" ry="10" fill={f} />
      <circle cx="44" cy="44" r="3" fill={a} />
      <circle cx="56" cy="44" r="3" fill={a} />
      <circle cx="44" cy="44" r="1.4" fill={f} />
      <circle cx="56" cy="44" r="1.4" fill={f} />
      <path d="M40 50 Q44 54 50 52 Q56 54 60 50" stroke={DD} strokeWidth="1.4" fill="none" />
      <path d="M28 30 L40 46 L34 50 M16 44 L34 56 L30 60 M14 64 L34 64 L34 68 M22 86 L40 70 L42 74 M72 30 L60 46 L66 50 M84 44 L66 56 L70 60 M86 64 L66 64 L66 68 M78 86 L60 70 L58 74" stroke={f} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M44 70 Q50 76 56 70" stroke={DD} strokeWidth="1.6" fill="none" />
    </>
  ),

  soldado: (f, a) => (
    <>
      <path d="M30 18 Q30 8 50 8 Q70 8 70 18 Q70 22 66 22 L34 22 Q30 22 30 18 Z" fill={f} />
      <rect x="32" y="22" width="36" height="6" fill={f} />
      <ellipse cx="50" cy="34" rx="11" ry="11" fill={f} />
      <circle cx="46" cy="34" r="1.6" fill={a} />
      <circle cx="54" cy="34" r="1.6" fill={a} />
      <path d="M44 40 Q50 42 56 40" stroke={a} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <rect x="34" y="44" width="32" height="34" rx="2" fill={f} />
      <path d="M40 50 L60 50 M40 56 L60 56" stroke={a} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="62" r="3" fill={a} />
      <path d="M74 12 L78 86" stroke={f} strokeWidth="4" strokeLinecap="round" />
      <path d="M74 12 L88 14 L74 18 Z" fill={f} />
      <rect x="72" y="50" width="8" height="4" rx="1" fill={f} />
      <path d="M40 78 L40 92 L46 92 L46 78 M54 78 L54 92 L60 92 L60 78" fill={f} />
      <rect x="14" y="14" width="6" height="2" fill={f} />
      <rect x="14" y="18" width="4" height="2" fill={f} />
    </>
  ),

  estrella: (f, a) => (
    <>
      <path d="M50 8 L60 36 L90 38 L66 56 L74 84 L50 68 L26 84 L34 56 L10 38 L40 36 Z" fill={f} />
      <path d="M50 18 L56 36 L74 38 L60 50 L66 70 L50 60 L34 70 L40 50 L26 38 L44 36 Z" fill={D} opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill={a} opacity="0.5" />
      <path d="M6 18 L10 14 L8 22 M88 86 L84 82 L92 80 M14 86 L18 82 L18 90 M84 14 L80 18 L88 18" stroke={f} strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),

  cazo: (f, a) => (
    <>
      <path d="M20 36 L80 36 L74 80 Q74 86 68 86 L32 86 Q26 86 26 80 Z" fill={f} />
      <ellipse cx="50" cy="36" rx="30" ry="6" fill={f} />
      <ellipse cx="50" cy="36" rx="26" ry="3" fill={DD} opacity="0.5" />
      <rect x="8" y="32" width="84" height="6" rx="3" fill={f} />
      <path d="M80 38 L94 42 L96 50 L92 50 L88 46" fill={f} />
      <path d="M30 24 Q32 14 28 12 M44 22 Q46 12 42 10 M58 22 Q60 12 56 10 M70 24 Q72 14 68 12" stroke={f} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M34 50 L40 78 M50 50 L50 78 M66 50 L60 78" stroke={a} strokeWidth="1" opacity="0.45" />
      <ellipse cx="50" cy="80" rx="14" ry="3" fill={D} opacity="0.4" />
    </>
  ),

  mundo: (f, a) => (
    <>
      <circle cx="50" cy="46" r="32" fill={f} />
      <path d="M22 38 Q28 36 32 40 Q40 38 44 42 L42 50 L36 52 Q34 58 38 62 L46 64 L50 70 L58 68 L62 60 L70 60 L78 56 Q80 50 76 46 L70 42 L68 36 L60 32 Q52 32 50 28 Q44 26 36 30 Q28 28 22 38 Z" fill={a} opacity="0.55" />
      <ellipse cx="50" cy="46" rx="32" ry="8" fill="none" stroke={a} strokeWidth="1" opacity="0.4" />
      <path d="M28 38 L72 56 M28 56 L72 38" stroke={a} strokeWidth="0.8" opacity="0.3" />
      <rect x="46" y="78" width="8" height="6" fill={f} />
      <rect x="34" y="84" width="32" height="6" rx="2" fill={f} />
      <circle cx="42" cy="42" r="1.4" fill={f} />
      <circle cx="62" cy="50" r="1.4" fill={f} />
    </>
  ),

  apache: (f, a) => (
    <>
      <path d="M24 28 L18 6 L26 22 L28 6 L32 22 L36 6 L40 22 L44 8 L48 22 L52 8 L56 22 L60 6 L64 22 L68 6 L72 22 L74 6 L76 28 Z" fill={f} />
      <path d="M28 24 Q40 26 50 26 Q60 26 72 24 L70 32 L30 32 Z" fill={f} opacity="0.8" />
      <ellipse cx="50" cy="44" rx="14" ry="15" fill={f} />
      <circle cx="44" cy="44" r="1.8" fill={a} />
      <circle cx="56" cy="44" r="1.8" fill={a} />
      <path d="M44 52 Q50 56 56 52" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M40 48 L36 50 M60 48 L64 50" stroke={D} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="30" y="58" width="40" height="30" rx="2" fill={f} />
      <path d="M36 64 L50 76 L64 64 M44 66 L50 70 L56 66" stroke={a} strokeWidth="1.4" fill="none" />
      <circle cx="50" cy="62" r="2" fill={a} />
    </>
  ),

  nopal: (f) => (
    <>
      <path d="M38 88 L38 50 Q38 36 50 36 Q62 36 62 50 L62 88 Z" fill={f} />
      <path d="M18 62 Q18 42 32 42 Q40 42 40 50 L40 66 Q40 70 36 70 Q22 70 18 62 Z" fill={f} />
      <path d="M82 58 Q82 38 68 38 Q60 38 60 46 L60 62 Q60 66 64 66 Q78 66 82 58 Z" fill={f} />
      <circle cx="50" cy="30" r="6" fill="#D62828" />
      <circle cx="32" cy="38" r="4" fill="#D62828" />
      <circle cx="68" cy="34" r="4" fill="#D62828" />
      <path d="M50 26 L50 22 M50 26 L48 24 M50 26 L52 24" stroke="#1F8A5B" strokeWidth="1.2" />
      <path d="M40 52 L42 50 M40 60 L42 58 M44 68 L46 66 M52 72 L54 70 M48 56 L50 54 M56 60 L58 58 M52 78 L54 76 M44 82 L46 80 M58 78 L60 76 M44 76 L46 74" stroke={D} strokeWidth="0.8" opacity="0.6" />
      <path d="M22 52 L24 50 M22 58 L24 56 M26 50 L28 48 M30 56 L32 54 M26 60 L28 58 M76 50 L78 48 M76 56 L78 54 M72 50 L74 48 M72 56 L74 54 M68 58 L70 56" stroke={D} strokeWidth="0.8" opacity="0.6" />
      <path d="M42 88 L60 88" stroke={DD} strokeWidth="2" opacity="0.5" />
    </>
  ),

  alacran: (f, a) => (
    <>
      <ellipse cx="48" cy="60" rx="18" ry="12" fill={f} />
      <path d="M48 50 L46 60 L48 64 L52 60 L48 50 Z" fill={DD} opacity="0.4" />
      <path d="M30 58 L20 64 L14 60 L10 66 L18 70 M30 64 L18 76 L22 80 L14 82" stroke={f} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M20 62 L14 58 L8 62 M14 76 L8 76 L10 82" stroke={f} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M66 60 L78 56 Q86 50 84 40 Q78 30 70 32 Q62 32 60 40" stroke={f} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M60 40 L52 38 L56 42 Z" fill={f} />
      <circle cx="40" cy="56" r="1.6" fill={a} />
      <circle cx="44" cy="58" r="1.4" fill={a} />
      <path d="M30 50 L38 56 M30 70 L40 64 M50 48 L48 40 M50 72 L48 80 M66 48 L62 42 M66 70 L62 78" stroke={f} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),

  rosa: (f, a) => (
    <>
      <path d="M22 76 L20 90 L26 90 M22 76 Q12 70 14 60 M22 76 Q26 80 30 84" stroke="#1F8A5B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M22 76 L18 60 Q16 50 22 44" stroke="#1F8A5B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M14 60 Q6 60 6 52 Q10 50 16 54 Z M14 60 Q14 54 20 52 Q22 56 18 60 Z" fill="#1F8A5B" />
      <circle cx="50" cy="36" r="22" fill={f} />
      <path d="M50 18 Q42 22 40 30 Q44 38 50 38 Q56 38 60 30 Q58 22 50 18 Z" fill={a} opacity="0.5" />
      <path d="M34 36 Q36 26 44 22 M66 36 Q64 26 56 22 M30 40 Q34 50 44 50 M70 40 Q66 50 56 50 M42 48 Q40 58 50 60 Q60 58 58 48" stroke={D} strokeWidth="1.4" fill="none" />
      <circle cx="50" cy="36" r="6" fill={a} />
      <path d="M50 30 Q46 32 46 36 Q50 38 54 36 Q54 32 50 30 Z" fill={f} />
      <path d="M22 76 L22 58" stroke="#1F8A5B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22" cy="58" r="2" fill={DD} opacity="0.3" />
    </>
  ),

  calavera: (f) => (
    <>
      <path d="M22 50 Q22 16 50 16 Q78 16 78 50 L78 66 Q78 72 72 72 L62 72 L62 82 L38 82 L38 72 L28 72 Q22 72 22 66 Z" fill={f} stroke="#1A0E2A" strokeWidth="2.5" />
      <circle cx="38" cy="48" r="8.5" fill="#1A0E2A" />
      <circle cx="62" cy="48" r="8.5" fill="#1A0E2A" />
      <path d="M38 48 L34 42 L42 42 Z M38 48 L42 54 L34 54 Z" fill={f} />
      <path d="M62 48 L58 42 L66 42 Z M62 48 L66 54 L58 54 Z" fill={f} />
      <circle cx="38" cy="48" r="1.6" fill={f} />
      <circle cx="62" cy="48" r="1.6" fill={f} />
      <path d="M44 62 L50 54 L56 62 Z" fill="#1A0E2A" />
      <path d="M40 74 L40 82 M44 74 L44 82 M50 74 L50 82 M56 74 L56 82 M60 74 L60 82" stroke="#1A0E2A" strokeWidth="1.6" />
      <path d="M30 30 Q34 26 38 30 Q34 34 30 30 Z" fill="#E91E63" />
      <path d="M62 30 Q66 26 70 30 Q66 34 62 30 Z" fill="#E91E63" />
      <circle cx="50" cy="24" r="3" fill="#1F8A5B" />
      <circle cx="50" cy="24" r="1.2" fill="#FFB703" />
      <path d="M30 38 L34 36 L32 40 Z M70 38 L66 36 L68 40 Z" fill="#FFB703" />
      <path d="M44 30 Q46 26 50 28 Q54 26 56 30" stroke="#118AB2" strokeWidth="1.4" fill="none" />
      <circle cx="34" cy="60" r="1.4" fill="#E91E63" />
      <circle cx="66" cy="60" r="1.4" fill="#E91E63" />
    </>
  ),

  campana: (f, a) => (
    <>
      <path d="M50 18 Q52 14 56 14 Q58 16 56 20 Q54 22 50 22 Q50 22 50 18 Z" fill={f} />
      <path d="M28 68 Q28 32 50 26 Q72 32 72 68 Q72 74 64 74 L36 74 Q28 74 28 68 Z" fill={f} />
      <path d="M28 68 Q28 40 50 32 Q50 32 50 70" fill={DD} opacity="0.18" />
      <rect x="24" y="74" width="52" height="6" rx="2" fill={f} />
      <circle cx="50" cy="86" r="4" fill={f} />
      <path d="M44 30 Q50 28 56 30" stroke={a} strokeWidth="1.4" fill="none" />
      <path d="M38 58 Q50 64 62 58" stroke={a} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M14 60 Q18 54 22 56 M86 60 Q82 54 78 56" stroke={f} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />
    </>
  ),

  cantarito: (f, a) => (
    <>
      <path d="M36 18 L36 24 Q22 30 22 56 Q22 80 50 84 Q78 80 78 56 Q78 30 64 24 L64 18 Q60 16 50 16 Q40 16 36 18 Z" fill={f} />
      <rect x="36" y="18" width="28" height="4" fill={DD} opacity="0.4" />
      <path d="M22 46 Q12 46 12 56 Q12 66 22 64 L22 60 Q18 60 18 56 Q18 52 22 52 Z" fill={f} />
      <path d="M30 36 Q40 38 50 36 Q60 38 70 36" stroke={a} strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M30 70 Q40 74 50 72 Q60 74 70 70" stroke={a} strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M40 50 Q42 56 46 56 Q48 50 46 46 Q42 46 40 50 Z" fill={a} opacity="0.5" />
      <path d="M58 52 Q60 56 56 60" stroke={D} strokeWidth="1.2" fill="none" />
    </>
  ),

  venado: (f, a) => (
    <>
      <path d="M60 28 L54 14 L58 24 L52 16 L52 28 M76 28 L82 14 L78 24 L84 16 L84 28" stroke={f} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M62 22 L64 26 M76 22 L78 26 M58 18 L62 22 M82 18 L78 22" stroke={f} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="56" rx="22" ry="14" fill={f} />
      <ellipse cx="68" cy="40" r="9" rx="9" ry="11" fill={f} />
      <circle cx="68" cy="40" r="9" fill={f} />
      <circle cx="70" cy="38" r="1.8" fill={a} />
      <path d="M74 44 Q78 46 76 50" stroke={a} strokeWidth="1.4" fill="none" />
      <path d="M76 40 L82 38 L78 42 Z" fill={f} />
      <path d="M58 38 L60 30 L62 38 M78 38 L80 30 L78 38" stroke={f} strokeWidth="1.4" />
      <path d="M36 68 L34 88 M44 68 L42 88 M56 68 L58 88 M64 68 L66 88" stroke={f} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 88 L30 90 M42 88 L38 90 M58 88 L62 90 M66 88 L70 90" stroke={f} strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="50" r="2" fill={f} opacity="0.7" />
      <circle cx="44" cy="58" r="1.5" fill={a} opacity="0.5" />
      <circle cx="56" cy="52" r="1.5" fill={a} opacity="0.5" />
    </>
  ),

  sol: (f, a) => (
    <>
      <g stroke={f} strokeWidth="4" strokeLinecap="round">
        <line x1="50" y1="6" x2="50" y2="18" />
        <line x1="50" y1="82" x2="50" y2="94" />
        <line x1="6" y1="50" x2="18" y2="50" />
        <line x1="82" y1="50" x2="94" y2="50" />
        <line x1="18" y1="18" x2="26" y2="26" />
        <line x1="74" y1="74" x2="82" y2="82" />
        <line x1="82" y1="18" x2="74" y2="26" />
        <line x1="18" y1="82" x2="26" y2="74" />
      </g>
      <g stroke={f} strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="32" y1="10" x2="36" y2="20" />
        <line x1="68" y1="10" x2="64" y2="20" />
        <line x1="32" y1="90" x2="36" y2="80" />
        <line x1="68" y1="90" x2="64" y2="80" />
        <line x1="10" y1="32" x2="20" y2="36" />
        <line x1="10" y1="68" x2="20" y2="64" />
        <line x1="90" y1="32" x2="80" y2="36" />
        <line x1="90" y1="68" x2="80" y2="64" />
      </g>
      <circle cx="50" cy="50" r="22" fill={f} />
      <circle cx="42" cy="48" r="2.8" fill={a} />
      <circle cx="58" cy="48" r="2.8" fill={a} />
      <path d="M40 56 Q50 64 60 56" stroke={a} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M38 46 Q42 42 46 46 M54 46 Q58 42 62 46" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="36" cy="56" r="2" fill={a} opacity="0.5" />
      <circle cx="64" cy="56" r="2" fill={a} opacity="0.5" />
    </>
  ),

  corona: (f, a) => (
    <>
      <path d="M14 72 L20 32 L34 54 L42 22 L50 14 L58 22 L66 54 L80 32 L86 72 Z" fill={f} />
      <rect x="14" y="70" width="72" height="12" fill={f} />
      <rect x="14" y="70" width="72" height="3" fill={DD} opacity="0.4" />
      <circle cx="20" cy="32" r="4" fill="#E63946" />
      <circle cx="50" cy="16" r="5" fill="#E63946" />
      <circle cx="80" cy="32" r="4" fill="#E63946" />
      <circle cx="34" cy="54" r="3" fill="#FFB703" />
      <circle cx="66" cy="54" r="3" fill="#FFB703" />
      <path d="M20 82 L80 82" stroke={DD} strokeWidth="1.4" opacity="0.5" />
      <path d="M28 76 L72 76" stroke={a} strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="32" r="1.6" fill={H} />
      <circle cx="50" cy="16" r="2" fill={H} />
      <circle cx="80" cy="32" r="1.6" fill={H} />
    </>
  ),

  chalupa: (f) => (
    <>
      <ellipse cx="50" cy="32" rx="3" ry="6" fill={f} />
      <circle cx="50" cy="26" r="4" fill={f} />
      <path d="M44 38 L56 38 L58 56 L42 56 Z" fill={f} />
      <path d="M44 38 L42 56 M56 38 L58 56" stroke={DD} strokeWidth="0.8" opacity="0.4" />
      <path d="M12 56 Q14 76 30 80 L70 80 Q86 76 88 56 Z" fill={f} />
      <path d="M12 56 L88 56 L84 62 L16 62 Z" fill={DD} opacity="0.3" />
      <circle cx="30" cy="48" r="3" fill="#E63946" />
      <circle cx="34" cy="44" r="3" fill="#FFB703" />
      <circle cx="38" cy="48" r="3" fill="#1F8A5B" />
      <circle cx="62" cy="48" r="3" fill="#FFB703" />
      <circle cx="66" cy="44" r="3" fill="#E63946" />
      <circle cx="70" cy="48" r="3" fill="#1F8A5B" />
      <path d="M8 70 Q14 66 20 70 Q14 74 8 70 M80 70 Q86 66 92 70 Q86 74 80 70" fill={f} opacity="0.5" />
      <path d="M16 84 Q20 80 24 84 M40 86 Q44 82 48 86 M56 86 Q60 82 64 86 M76 84 Q80 80 84 84" stroke={f} strokeWidth="1.4" fill="none" opacity="0.7" />
    </>
  ),

  pino: (f) => (
    <>
      <path d="M50 10 L34 32 L42 32 L26 54 L36 54 L18 78 L82 78 L64 54 L74 54 L58 32 L66 32 Z" fill={f} />
      <path d="M50 16 L40 30 L46 30 L36 50 L42 50 L30 70 L70 70 L58 50 L64 50 L54 30 L60 30 Z" fill={DD} opacity="0.18" />
      <rect x="42" y="78" width="16" height="14" fill="#5D2E0E" />
      <path d="M42 84 L58 84" stroke={DD} strokeWidth="1.4" opacity="0.5" />
      <circle cx="50" cy="12" r="3" fill="#FFB703" />
      <path d="M50 7 L48 12 L43 12 L47 15 L46 20 L50 17 L54 20 L53 15 L57 12 L52 12 Z" fill="#FFB703" opacity="0.5" />
      <circle cx="32" cy="46" r="2" fill="#E63946" />
      <circle cx="68" cy="46" r="2" fill="#E63946" />
      <circle cx="26" cy="66" r="2" fill="#FFB703" />
      <circle cx="74" cy="66" r="2" fill="#FFB703" />
      <circle cx="50" cy="64" r="2" fill="#118AB2" />
    </>
  ),

  pescado: (f, a) => (
    <>
      <path d="M14 50 Q14 28 50 28 Q74 28 82 50 Q74 72 50 72 Q14 72 14 50 Z" fill={f} />
      <path d="M82 50 L96 34 L94 50 L96 66 Z" fill={f} />
      <path d="M50 28 Q46 22 50 18 Q56 22 54 28 M50 72 Q46 78 50 82 Q56 78 54 72" fill={f} />
      <circle cx="32" cy="46" r="3.5" fill={a} />
      <circle cx="32" cy="46" r="1.4" fill={f} />
      <path d="M22 50 Q24 46 28 46 M22 54 Q24 58 28 54" stroke={D} strokeWidth="1" fill="none" />
      <path d="M44 36 Q50 50 44 64 M54 34 Q60 50 54 66 M62 36 Q68 50 62 64 M70 40 Q74 50 70 60" stroke={DD} strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M36 64 Q42 68 50 66" stroke={a} strokeWidth="1.2" fill="none" opacity="0.55" />
      <circle cx="46" cy="40" r="1.4" fill={a} opacity="0.5" />
      <circle cx="54" cy="58" r="1.4" fill={a} opacity="0.5" />
      <circle cx="68" cy="48" r="1.4" fill={a} opacity="0.5" />
    </>
  ),

  palma: (f) => (
    <>
      <path d="M48 38 L46 92 L54 92 L52 38 Z" fill="#5D2E0E" />
      <path d="M48 50 L46 50 L46 54 L48 54 M48 64 L46 64 L46 68 L48 68 M48 78 L46 78 L46 82 L48 82" stroke={DD} strokeWidth="1" />
      <path d="M50 38 Q30 28 12 36 Q26 30 38 36 M50 38 Q70 28 88 36 Q74 30 62 36" stroke={f} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M50 38 Q38 18 22 16 Q34 22 42 32 M50 38 Q62 18 78 16 Q66 22 58 32" stroke={f} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M50 38 Q50 22 38 10 M50 38 Q50 22 62 10" stroke={f} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M50 38 Q42 30 28 26 M50 38 Q58 30 72 26" stroke={f} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="46" cy="40" rx="3" ry="2" fill="#5D2E0E" />
      <ellipse cx="54" cy="40" rx="3" ry="2" fill="#5D2E0E" />
      <ellipse cx="50" cy="42" rx="3" ry="2" fill="#5D2E0E" />
    </>
  ),

  maceta: (f, a) => (
    <>
      <path d="M44 8 Q44 22 36 32 Q44 28 50 30 Q56 28 64 32 Q56 22 56 8 Q50 18 50 18 Q50 18 44 8 Z" fill="#1F8A5B" />
      <circle cx="40" cy="14" r="4" fill="#E63946" />
      <circle cx="60" cy="16" r="4" fill="#FFB703" />
      <circle cx="50" cy="6" r="4" fill="#FF6B6B" />
      <circle cx="40" cy="14" r="1.8" fill="#FFB703" />
      <circle cx="60" cy="16" r="1.8" fill="#E63946" />
      <circle cx="50" cy="6" r="1.8" fill="#FAF3E0" />
      <path d="M48 30 L48 38 M52 30 L52 38" stroke="#1F8A5B" strokeWidth="1.4" />
      <rect x="24" y="42" width="52" height="6" rx="1" fill={f} />
      <path d="M28 48 L72 48 L66 84 L34 84 Z" fill={f} />
      <path d="M28 48 L72 48 L70 56 L30 56 Z" fill={DD} opacity="0.18" />
      <path d="M36 64 Q40 68 40 72 M58 64 Q60 70 58 76" stroke={a} strokeWidth="1.4" fill="none" opacity="0.55" />
    </>
  ),

  arpa: (f, a) => (
    <>
      <path d="M22 12 Q18 12 18 18 L18 78 Q18 86 26 88 L48 88 L48 14 Q40 12 22 12 Z" fill={f} />
      <path d="M18 18 Q22 14 30 14 L48 14 L48 18 Q40 16 22 18 Z" fill={DD} opacity="0.35" />
      <path d="M26 88 L44 88 Q50 88 50 84 L50 80" stroke={f} strokeWidth="4" fill="none" />
      <rect x="44" y="80" width="6" height="10" fill={f} />
      <path d="M26 22 L44 86 M30 22 L46 86 M34 22 L48 86 M38 22 L48 84 M42 22 L48 80" stroke={a} strokeWidth="0.8" opacity="0.6" />
      <circle cx="20" cy="20" r="2" fill={a} />
      <path d="M22 16 Q26 12 32 12 Q28 14 22 16" fill={H} />
      <circle cx="46" cy="86" r="2.4" fill={a} />
    </>
  ),

  rana: (f, a) => (
    <>
      <ellipse cx="50" cy="58" rx="30" ry="22" fill={f} />
      <circle cx="34" cy="36" r="11" fill={f} />
      <circle cx="66" cy="36" r="11" fill={f} />
      <circle cx="34" cy="38" r="6" fill={a} />
      <circle cx="66" cy="38" r="6" fill={a} />
      <circle cx="34" cy="40" r="2.4" fill="#0F0E17" />
      <circle cx="66" cy="40" r="2.4" fill="#0F0E17" />
      <circle cx="33" cy="38" r="1" fill="#FAF3E0" />
      <circle cx="65" cy="38" r="1" fill="#FAF3E0" />
      <path d="M36 64 Q50 76 64 64" stroke={DD} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="56" r="1.5" fill={a} opacity="0.4" />
      <circle cx="56" cy="56" r="1.5" fill={a} opacity="0.4" />
      <circle cx="50" cy="60" r="1" fill={a} opacity="0.4" />
      <path d="M22 74 L14 80 L20 84 L14 86 L22 88 M78 74 L86 80 L80 84 L86 86 L78 88" fill={f} />
      <path d="M14 86 L10 90 M86 86 L90 90" stroke={f} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};
