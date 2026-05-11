// Geometric icon glyphs for each Lotería card.
// Original simple shape-based representations — NOT recreations of the
// classic Don Clemente illustrations. Each renders in a 100x100 viewBox.

const LoteriaIcon = ({ name, color = "currentColor", size = 100 }) => {
  const fill = color;
  const stroke = color;
  const sw = 4; // stroke width
  const common = { width: size, height: size, viewBox: "0 0 100 100", fill: "none", stroke: fill, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };

  switch (name) {
    case "gallo":
      return <svg {...common}><circle cx="50" cy="58" r="22" fill={fill} stroke="none"/><circle cx="50" cy="36" r="14" fill={fill} stroke="none"/><path d="M50 22 L46 14 L54 18 L48 10 L56 14 L52 8" stroke={fill} fill="none"/><path d="M64 38 L74 36 L72 44 Z" fill={fill} stroke="none"/><circle cx="56" cy="34" r="2" fill="#fff" stroke="none"/><path d="M30 78 L40 88 M50 80 L50 92 M60 78 L56 90" stroke={fill}/></svg>;
    case "diablito":
      return <svg {...common}><path d="M30 30 L20 14 L34 26 M70 30 L80 14 L66 26" fill={fill} stroke="none"/><circle cx="50" cy="50" r="28" fill={fill} stroke="none"/><circle cx="40" cy="46" r="3" fill="#fff" stroke="none"/><circle cx="60" cy="46" r="3" fill="#fff" stroke="none"/><path d="M38 62 Q50 70 62 62" stroke="#fff" strokeWidth="3" fill="none"/><path d="M50 82 L46 92 L50 88 L54 92 Z" fill={fill} stroke="none"/></svg>;
    case "dama":
      return <svg {...common}><circle cx="50" cy="32" r="14" fill={fill} stroke="none"/><path d="M30 84 Q30 56 50 56 Q70 56 70 84 Z" fill={fill} stroke="none"/><circle cx="45" cy="30" r="2" fill="#fff" stroke="none"/><circle cx="55" cy="30" r="2" fill="#fff" stroke="none"/><path d="M40 22 Q50 14 60 22" stroke={fill} fill="none"/></svg>;
    case "catrin":
      return <svg {...common}><rect x="36" y="14" width="28" height="6" fill={fill} stroke="none"/><rect x="32" y="20" width="36" height="4" fill={fill} stroke="none"/><circle cx="50" cy="38" r="14" fill={fill} stroke="none"/><path d="M36 52 L36 84 L64 84 L64 52 Z" fill={fill} stroke="none"/><circle cx="50" cy="62" r="2" fill="#fff" stroke="none"/><path d="M44 36 L46 36 M54 36 L56 36" stroke="#fff" strokeWidth="2"/></svg>;
    case "paraguas":
      return <svg {...common}><path d="M20 50 Q50 18 80 50 Z" fill={fill} stroke="none"/><path d="M50 50 L50 80 Q50 88 58 88" stroke={fill} strokeWidth="5" fill="none"/><path d="M35 50 Q35 44 50 44 Q65 44 65 50" stroke="#fff" strokeWidth="2" fill="none"/></svg>;
    case "sirena":
      return <svg {...common}><circle cx="50" cy="26" r="10" fill={fill} stroke="none"/><path d="M40 36 Q50 32 60 36 L58 60 Q50 64 42 60 Z" fill={fill} stroke="none"/><path d="M42 60 Q34 78 50 84 Q66 78 58 60" fill={fill} stroke="none"/><path d="M30 80 L20 88 L36 84 M70 80 L80 88 L64 84" fill={fill} stroke="none"/></svg>;
    case "escalera":
      return <svg {...common}><line x1="30" y1="14" x2="30" y2="86"/><line x1="70" y1="14" x2="70" y2="86"/><line x1="30" y1="28" x2="70" y2="28"/><line x1="30" y1="42" x2="70" y2="42"/><line x1="30" y1="56" x2="70" y2="56"/><line x1="30" y1="70" x2="70" y2="70"/></svg>;
    case "botella":
      return <svg {...common}><rect x="44" y="10" width="12" height="14" fill={fill} stroke="none"/><path d="M42 24 Q42 32 38 38 Q34 46 34 56 L34 84 Q34 88 38 88 L62 88 Q66 88 66 84 L66 56 Q66 46 62 38 Q58 32 58 24 Z" fill={fill} stroke="none"/><circle cx="50" cy="64" r="6" fill="#fff" stroke="none"/></svg>;
    case "barril":
      return <svg {...common}><ellipse cx="50" cy="50" rx="28" ry="36" fill={fill} stroke="none"/><line x1="22" y1="36" x2="78" y2="36" stroke="#fff" strokeWidth="3"/><line x1="22" y1="64" x2="78" y2="64" stroke="#fff" strokeWidth="3"/><line x1="50" y1="20" x2="50" y2="80" stroke="#fff" strokeWidth="2" opacity="0.5"/></svg>;
    case "arbol":
      return <svg {...common}><circle cx="35" cy="40" r="18" fill={fill} stroke="none"/><circle cx="65" cy="38" r="20" fill={fill} stroke="none"/><circle cx="50" cy="28" r="16" fill={fill} stroke="none"/><rect x="46" y="56" width="8" height="32" fill={fill} stroke="none"/></svg>;
    case "melon":
      return <svg {...common}><circle cx="50" cy="54" r="32" fill={fill} stroke="none"/><path d="M22 50 Q50 44 78 50 M22 58 Q50 64 78 58 M30 38 Q50 32 70 38" stroke="#fff" strokeWidth="2" fill="none"/><path d="M50 22 L48 18 L52 18 Z" fill={fill} stroke="none"/></svg>;
    case "valiente":
      return <svg {...common}><circle cx="50" cy="30" r="12" fill={fill} stroke="none"/><path d="M30 84 L30 50 Q30 44 36 44 L64 44 Q70 44 70 50 L70 84" fill={fill} stroke="none"/><line x1="74" y1="40" x2="86" y2="76" stroke={fill} strokeWidth="5"/><path d="M84 74 L90 78 L84 80 Z" fill={fill} stroke="none"/></svg>;
    case "gorrito":
      return <svg {...common}><path d="M20 70 Q50 30 80 70 Z" fill={fill} stroke="none"/><circle cx="50" cy="28" r="6" fill={fill} stroke="none"/><path d="M50 34 L50 38" stroke={fill} strokeWidth="3"/><rect x="14" y="68" width="72" height="8" fill={fill} stroke="none"/></svg>;
    case "muerte":
      return <svg {...common}><path d="M30 46 Q30 22 50 22 Q70 22 70 46 L70 60 Q70 64 66 64 L60 64 L60 74 L40 74 L40 64 L34 64 Q30 64 30 60 Z" fill={fill} stroke="none"/><circle cx="40" cy="46" r="5" fill="#fff" stroke="none"/><circle cx="60" cy="46" r="5" fill="#fff" stroke="none"/><path d="M46 58 L50 54 L54 58" stroke="#fff" strokeWidth="2" fill="none"/><line x1="42" y1="68" x2="42" y2="74" stroke="#fff" strokeWidth="2"/><line x1="50" y1="68" x2="50" y2="74" stroke="#fff" strokeWidth="2"/><line x1="58" y1="68" x2="58" y2="74" stroke="#fff" strokeWidth="2"/></svg>;
    case "pera":
      return <svg {...common}><path d="M50 22 L50 32 Q34 38 34 56 Q34 80 50 86 Q66 80 66 56 Q66 38 50 32" fill={fill} stroke="none"/><path d="M50 22 Q56 16 60 18" stroke={fill} strokeWidth="3" fill="none"/><path d="M58 24 L66 18 L62 28 Z" fill={fill} stroke="none"/></svg>;
    case "bandera":
      return <svg {...common}><line x1="22" y1="14" x2="22" y2="88" stroke={fill} strokeWidth="4"/><rect x="22" y="18" width="20" height="36" fill="#1F8A5B" stroke="none"/><rect x="42" y="18" width="20" height="36" fill="#FAF3E0" stroke="#999" strokeWidth="1"/><rect x="62" y="18" width="20" height="36" fill="#D62828" stroke="none"/></svg>;
    case "bandolon":
      return <svg {...common}><ellipse cx="38" cy="62" rx="22" ry="20" fill={fill} stroke="none"/><rect x="56" y="22" width="10" height="40" fill={fill} stroke="none"/><circle cx="38" cy="62" r="6" fill="#fff" stroke="none"/><line x1="50" y1="58" x2="62" y2="38" stroke="#fff" strokeWidth="1"/><line x1="48" y1="62" x2="62" y2="42" stroke="#fff" strokeWidth="1"/></svg>;
    case "cello":
      return <svg {...common}><path d="M42 14 Q38 14 38 22 L38 36 Q30 38 30 50 Q30 70 50 86 Q70 70 70 50 Q70 38 62 36 L62 22 Q62 14 58 14 Z" fill={fill} stroke="none"/><circle cx="42" cy="56" r="2" fill="#fff" stroke="none"/><circle cx="58" cy="56" r="2" fill="#fff" stroke="none"/><line x1="50" y1="22" x2="50" y2="80" stroke="#fff" strokeWidth="1"/></svg>;
    case "garza":
      return <svg {...common}><circle cx="62" cy="26" r="6" fill={fill} stroke="none"/><path d="M68 26 L82 30 L68 30 Z" fill={fill} stroke="none"/><path d="M62 32 Q62 50 50 60 Q40 60 36 70 L40 70 L36 80 L44 78 L42 86 L52 80 L70 70 L70 50 Q70 40 62 32" fill={fill} stroke="none"/><line x1="44" y1="78" x2="40" y2="88" stroke={fill} strokeWidth="2"/><line x1="52" y1="80" x2="50" y2="90" stroke={fill} strokeWidth="2"/></svg>;
    case "pajaro":
      return <svg {...common}><ellipse cx="50" cy="56" rx="22" ry="16" fill={fill} stroke="none"/><circle cx="68" cy="46" r="10" fill={fill} stroke="none"/><path d="M76 46 L86 44 L76 50 Z" fill={fill} stroke="none"/><path d="M30 56 Q20 50 20 60 Q26 64 36 60" fill={fill} stroke="none"/><circle cx="70" cy="44" r="2" fill="#fff" stroke="none"/><line x1="62" y1="70" x2="60" y2="84" stroke={fill} strokeWidth="3"/><line x1="56" y1="70" x2="54" y2="84" stroke={fill} strokeWidth="3"/></svg>;
    case "mano":
      return <svg {...common}><path d="M34 50 L34 30 Q34 26 38 26 Q42 26 42 30 L42 48 L42 24 Q42 20 46 20 Q50 20 50 24 L50 48 L50 22 Q50 18 54 18 Q58 18 58 22 L58 48 L58 28 Q58 24 62 24 Q66 24 66 28 L66 56 Q66 80 50 84 Q34 80 34 60 Z" fill={fill} stroke="none"/></svg>;
    case "bota":
      return <svg {...common}><path d="M36 14 L36 64 L20 78 L20 86 L70 86 L70 78 L52 64 L52 14 Z" fill={fill} stroke="none"/><line x1="36" y1="40" x2="52" y2="40" stroke="#fff" strokeWidth="2"/><circle cx="44" cy="30" r="2" fill="#fff" stroke="none"/></svg>;
    case "luna":
      return <svg {...common}><path d="M62 16 Q34 28 34 50 Q34 72 62 84 Q44 70 44 50 Q44 30 62 16 Z" fill={fill} stroke="none"/><circle cx="40" cy="40" r="2" fill={fill} opacity="0.5" stroke="none"/></svg>;
    case "cotorro":
      return <svg {...common}><path d="M44 22 Q60 22 64 36 Q68 50 60 60 L56 70 Q54 82 50 86 Q46 82 44 70 L42 60 Q34 50 38 36 Q42 22 44 22 Z" fill={fill} stroke="none"/><path d="M40 38 L30 38 L40 46 Z" fill={fill} stroke="none"/><circle cx="50" cy="36" r="2" fill="#fff" stroke="none"/></svg>;
    case "borracho":
      return <svg {...common}><circle cx="50" cy="32" r="14" fill={fill} stroke="none"/><path d="M30 84 L34 56 Q36 50 42 50 L58 50 Q64 50 66 56 L70 84 Z" fill={fill} stroke="none"/><path d="M40 30 L44 32 M56 30 L60 32" stroke="#fff" strokeWidth="2"/><path d="M44 38 Q50 42 56 38" stroke="#fff" strokeWidth="2" fill="none"/><rect x="68" y="52" width="10" height="20" rx="2" fill={fill} stroke="#fff"/></svg>;
    case "negrito":
      return <svg {...common}><circle cx="50" cy="36" r="14" fill={fill} stroke="none"/><circle cx="50" cy="24" r="8" fill={fill} stroke="none"/><rect x="30" y="50" width="40" height="34" rx="4" fill={fill} stroke="none"/><circle cx="44" cy="34" r="2" fill="#fff" stroke="none"/><circle cx="56" cy="34" r="2" fill="#fff" stroke="none"/><path d="M44 42 Q50 46 56 42" stroke="#fff" strokeWidth="2" fill="none"/></svg>;
    case "corazon":
      return <svg {...common}><path d="M50 84 Q20 64 20 40 Q20 24 34 24 Q44 24 50 36 Q56 24 66 24 Q80 24 80 40 Q80 64 50 84 Z" fill={fill} stroke="none"/></svg>;
    case "sandia":
      return <svg {...common}><path d="M14 60 Q14 30 50 30 Q86 30 86 60 Z" fill={fill} stroke="none"/><path d="M20 60 Q20 36 50 36 Q80 36 80 60 Z" fill="#1F8A5B" stroke="none"/><path d="M24 60 Q24 40 50 40 Q76 40 76 60 Z" fill="#E63946" stroke="none"/><circle cx="40" cy="52" r="2" fill={fill} stroke="none"/><circle cx="54" cy="48" r="2" fill={fill} stroke="none"/><circle cx="62" cy="54" r="2" fill={fill} stroke="none"/><circle cx="32" cy="56" r="2" fill={fill} stroke="none"/></svg>;
    case "tambor":
      return <svg {...common}><ellipse cx="50" cy="32" rx="28" ry="8" fill={fill} stroke="none"/><path d="M22 32 L22 68 Q22 76 50 76 Q78 76 78 68 L78 32" fill={fill} stroke="none"/><path d="M28 38 L34 70 M40 38 L44 70 M56 38 L60 70 M66 38 L72 70" stroke="#fff" strokeWidth="2"/><line x1="14" y1="20" x2="86" y2="20" stroke={fill} strokeWidth="3"/></svg>;
    case "camaron":
      return <svg {...common}><path d="M76 30 Q60 26 50 30 Q34 36 30 50 Q26 64 36 74 Q44 80 56 74 L54 84 L60 78 L66 84 L66 74 L74 76 L70 68 L78 64 L72 58 L78 52 Z" fill={fill} stroke="none"/><circle cx="74" cy="36" r="2" fill="#fff" stroke="none"/><line x1="74" y1="26" x2="80" y2="20" stroke={fill} strokeWidth="2"/><line x1="78" y1="28" x2="86" y2="24" stroke={fill} strokeWidth="2"/></svg>;
    case "jaras":
      return <svg {...common}><line x1="18" y1="82" x2="74" y2="26" stroke={fill} strokeWidth="3"/><path d="M74 26 L62 30 L70 38 Z" fill={fill} stroke="none"/><path d="M18 82 L24 76 M24 76 L18 70" stroke={fill} strokeWidth="3"/><line x1="28" y1="82" x2="84" y2="26" stroke={fill} strokeWidth="3"/><path d="M84 26 L72 30 L80 38 Z" fill={fill} stroke="none"/><path d="M28 82 L34 76 M34 76 L28 70" stroke={fill} strokeWidth="3"/></svg>;
    case "musico":
      return <svg {...common}><circle cx="46" cy="32" r="12" fill={fill} stroke="none"/><path d="M30 80 L30 54 Q30 48 36 48 L56 48 Q62 48 62 54 L62 80" fill={fill} stroke="none"/><path d="M62 56 L82 30 L82 24 L78 24 L62 50" fill={fill} stroke="none"/><circle cx="82" cy="24" r="4" fill={fill} stroke="none"/></svg>;
    case "arana":
      return <svg {...common}><line x1="50" y1="20" x2="50" y2="34" stroke={fill} strokeWidth="2"/><circle cx="50" cy="20" r="3" fill={fill} stroke="none"/><circle cx="50" cy="56" r="22" fill={fill} stroke="none"/><circle cx="42" cy="50" r="3" fill="#fff" stroke="none"/><circle cx="58" cy="50" r="3" fill="#fff" stroke="none"/><path d="M28 38 L40 50 M16 50 L34 56 M20 70 L36 62 M28 84 L42 70 M72 38 L60 50 M84 50 L66 56 M80 70 L64 62 M72 84 L58 70" stroke={fill} strokeWidth="3"/></svg>;
    case "soldado":
      return <svg {...common}><rect x="36" y="14" width="28" height="8" fill={fill} stroke="none"/><circle cx="50" cy="32" r="10" fill={fill} stroke="none"/><rect x="34" y="42" width="32" height="32" fill={fill} stroke="none"/><rect x="74" y="20" width="4" height="60" fill={fill} stroke="none"/><path d="M74 20 L86 24 L74 28 Z" fill={fill} stroke="none"/><rect x="40" y="74" width="8" height="14" fill={fill} stroke="none"/><rect x="52" y="74" width="8" height="14" fill={fill} stroke="none"/></svg>;
    case "estrella":
      return <svg {...common}><path d="M50 12 L58 38 L86 38 L64 54 L72 80 L50 64 L28 80 L36 54 L14 38 L42 38 Z" fill={fill} stroke="none"/></svg>;
    case "cazo":
      return <svg {...common}><path d="M22 36 L78 36 L74 78 Q74 84 68 84 L32 84 Q26 84 26 78 Z" fill={fill} stroke="none"/><rect x="10" y="32" width="80" height="6" rx="3" fill={fill} stroke="none"/><line x1="80" y1="40" x2="92" y2="46" stroke={fill} strokeWidth="3"/><circle cx="92" cy="46" r="3" fill={fill} stroke="none"/></svg>;
    case "mundo":
      return <svg {...common}><circle cx="50" cy="50" r="32" fill={fill} stroke="none"/><ellipse cx="50" cy="50" rx="32" ry="12" fill="none" stroke="#fff" strokeWidth="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="#fff" strokeWidth="2"/><path d="M28 38 Q40 32 50 36 Q56 40 64 36 Q72 32 76 40" stroke="#fff" strokeWidth="2" fill="none"/></svg>;
    case "apache":
      return <svg {...common}><circle cx="50" cy="42" r="16" fill={fill} stroke="none"/><path d="M34 30 L30 14 L38 24 L42 12 L46 24 L50 12 L54 24 L58 12 L62 24 L66 14 L66 30 Z" fill={fill} stroke="none"/><rect x="36" y="58" width="28" height="28" fill={fill} stroke="none"/><circle cx="44" cy="42" r="2" fill="#fff" stroke="none"/><circle cx="56" cy="42" r="2" fill="#fff" stroke="none"/></svg>;
    case "nopal":
      return <svg {...common}><path d="M40 86 L40 50 Q40 38 50 38 Q60 38 60 50 L60 86 Z" fill={fill} stroke="none"/><path d="M22 60 Q22 44 36 44 Q42 44 42 52 L42 64 Z" fill={fill} stroke="none"/><path d="M78 56 Q78 40 64 40 Q58 40 58 48 L58 60 Z" fill={fill} stroke="none"/><circle cx="50" cy="32" r="6" fill="#D62828" stroke="none"/><circle cx="36" cy="46" r="4" fill="#D62828" stroke="none"/></svg>;
    case "alacran":
      return <svg {...common}><ellipse cx="50" cy="56" rx="18" ry="12" fill={fill} stroke="none"/><path d="M14 70 L26 60 L36 50 M86 50 Q90 40 80 32 Q70 26 64 34 Q60 40 64 46" stroke={fill} strokeWidth="4" fill="none"/><path d="M86 50 L92 44 L88 54 Z" fill={fill} stroke="none"/><line x1="38" y1="58" x2="28" y2="64" stroke={fill} strokeWidth="3"/><line x1="38" y1="62" x2="26" y2="72" stroke={fill} strokeWidth="3"/><line x1="42" y1="50" x2="34" y2="44" stroke={fill} strokeWidth="3"/><line x1="42" y1="48" x2="40" y2="38" stroke={fill} strokeWidth="3"/></svg>;
    case "rosa":
      return <svg {...common}><circle cx="50" cy="40" r="20" fill={fill} stroke="none"/><circle cx="50" cy="40" r="12" fill="#fff" opacity="0.3" stroke="none"/><circle cx="50" cy="40" r="6" fill={fill} stroke="none"/><path d="M50 60 L50 86 M50 70 Q40 70 36 78 M50 76 Q60 76 64 84" stroke="#1F8A5B" strokeWidth="3" fill="none"/></svg>;
    case "calavera":
      return <svg {...common}><path d="M26 46 Q26 22 50 22 Q74 22 74 46 L74 62 Q74 66 70 66 L62 66 L62 76 L38 76 L38 66 L30 66 Q26 66 26 62 Z" fill={fill} stroke="#0F0E17" strokeWidth="3"/><circle cx="40" cy="46" r="6" fill="#0F0E17" stroke="none"/><circle cx="60" cy="46" r="6" fill="#0F0E17" stroke="none"/><path d="M46 58 L50 54 L54 58 Z" fill="#0F0E17" stroke="none"/><line x1="42" y1="68" x2="42" y2="76" stroke="#0F0E17" strokeWidth="2"/><line x1="50" y1="68" x2="50" y2="76" stroke="#0F0E17" strokeWidth="2"/><line x1="58" y1="68" x2="58" y2="76" stroke="#0F0E17" strokeWidth="2"/></svg>;
    case "campana":
      return <svg {...common}><path d="M30 70 Q30 36 50 30 Q70 36 70 70 Z" fill={fill} stroke="none"/><rect x="26" y="70" width="48" height="6" fill={fill} stroke="none"/><circle cx="50" cy="80" r="4" fill={fill} stroke="none"/><circle cx="50" cy="26" r="3" fill={fill} stroke="none"/></svg>;
    case "cantarito":
      return <svg {...common}><path d="M36 24 L36 30 Q22 36 22 56 Q22 80 50 84 Q78 80 78 56 Q78 36 64 30 L64 24 Z" fill={fill} stroke="none"/><path d="M22 50 Q12 50 12 60 Q12 68 22 64" fill="none" stroke={fill} strokeWidth="4"/><rect x="36" y="22" width="28" height="4" fill={fill} stroke="none"/><path d="M30 56 Q50 62 70 56" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5"/></svg>;
    case "venado":
      return <svg {...common}><ellipse cx="50" cy="62" rx="20" ry="14" fill={fill} stroke="none"/><circle cx="68" cy="42" r="10" fill={fill} stroke="none"/><path d="M64 32 L58 16 L62 26 L56 18 M72 32 L78 16 L74 26 L80 18" stroke={fill} strokeWidth="3" fill="none"/><circle cx="70" cy="40" r="2" fill="#fff" stroke="none"/><line x1="38" y1="74" x2="36" y2="86" stroke={fill} strokeWidth="3"/><line x1="48" y1="74" x2="46" y2="86" stroke={fill} strokeWidth="3"/><line x1="58" y1="74" x2="60" y2="86" stroke={fill} strokeWidth="3"/></svg>;
    case "sol":
      return <svg {...common}><circle cx="50" cy="50" r="20" fill={fill} stroke="none"/><g stroke={fill} strokeWidth="5"><line x1="50" y1="12" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="88"/><line x1="12" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="88" y2="50"/><line x1="22" y1="22" x2="30" y2="30"/><line x1="70" y1="70" x2="78" y2="78"/><line x1="78" y1="22" x2="70" y2="30"/><line x1="22" y1="78" x2="30" y2="70"/></g><circle cx="44" cy="48" r="2" fill="#fff" stroke="none"/><circle cx="56" cy="48" r="2" fill="#fff" stroke="none"/><path d="M44 56 Q50 60 56 56" stroke="#fff" strokeWidth="2" fill="none"/></svg>;
    case "corona":
      return <svg {...common}><path d="M18 70 L24 30 L36 50 L50 22 L64 50 L76 30 L82 70 Z" fill={fill} stroke="none"/><rect x="18" y="70" width="64" height="10" fill={fill} stroke="none"/><circle cx="24" cy="30" r="4" fill="#D62828" stroke="none"/><circle cx="50" cy="22" r="4" fill="#D62828" stroke="none"/><circle cx="76" cy="30" r="4" fill="#D62828" stroke="none"/></svg>;
    case "chalupa":
      return <svg {...common}><path d="M14 50 Q14 70 30 78 L70 78 Q86 70 86 50 Z" fill={fill} stroke="none"/><circle cx="50" cy="36" r="6" fill={fill} stroke="none"/><rect x="46" y="36" width="8" height="18" fill={fill} stroke="none"/><path d="M30 78 L26 86 M70 78 L74 86" stroke={fill} strokeWidth="3"/></svg>;
    case "pino":
      return <svg {...common}><path d="M50 14 L34 36 L42 36 L28 56 L40 56 L22 78 L78 78 L60 56 L72 56 L58 36 L66 36 Z" fill={fill} stroke="none"/><rect x="46" y="78" width="8" height="10" fill="#5D2E0E" stroke="none"/></svg>;
    case "pescado":
      return <svg {...common}><path d="M16 50 Q16 30 50 30 Q74 30 80 50 Q74 70 50 70 Q16 70 16 50 Z" fill={fill} stroke="none"/><path d="M80 50 L94 36 L94 64 Z" fill={fill} stroke="none"/><circle cx="32" cy="46" r="3" fill="#fff" stroke="none"/><path d="M50 36 Q56 50 50 64 M62 38 Q68 50 62 62" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6"/></svg>;
    case "palma":
      return <svg {...common}><path d="M50 80 L50 40" stroke="#5D2E0E" strokeWidth="6"/><path d="M50 40 Q30 30 16 40 Q24 36 36 40 M50 40 Q70 30 84 40 Q76 36 64 40 M50 40 Q40 22 24 22 Q36 26 44 36 M50 40 Q60 22 76 22 Q64 26 56 36 M50 40 Q50 26 38 16 M50 40 Q50 26 62 16" fill="none" stroke={fill} strokeWidth="3"/><circle cx="46" cy="42" r="3" fill="#5D2E0E" stroke="none"/><circle cx="54" cy="42" r="3" fill="#5D2E0E" stroke="none"/></svg>;
    case "maceta":
      return <svg {...common}><path d="M44 14 Q44 28 36 36 Q44 30 50 32 Q56 30 64 36 Q56 28 56 14 Q50 22 50 22 Q50 22 44 14 Z" fill="#1F8A5B" stroke="none"/><circle cx="40" cy="20" r="5" fill="#D62828" stroke="none"/><circle cx="60" cy="22" r="5" fill="#FFB703" stroke="none"/><circle cx="50" cy="14" r="5" fill="#E63946" stroke="none"/><path d="M28 44 L72 44 L66 84 L34 84 Z" fill={fill} stroke="none"/><rect x="26" y="42" width="48" height="6" fill={fill} stroke="none"/></svg>;
    case "arpa":
      return <svg {...common}><path d="M22 14 Q22 80 50 86 L50 14 Z" fill={fill} stroke="none"/><line x1="30" y1="24" x2="48" y2="80" stroke="#fff" strokeWidth="1"/><line x1="36" y1="24" x2="48" y2="78" stroke="#fff" strokeWidth="1"/><line x1="42" y1="24" x2="48" y2="76" stroke="#fff" strokeWidth="1"/></svg>;
    case "rana":
      return <svg {...common}><ellipse cx="50" cy="54" rx="28" ry="22" fill={fill} stroke="none"/><circle cx="36" cy="36" r="9" fill={fill} stroke="none"/><circle cx="64" cy="36" r="9" fill={fill} stroke="none"/><circle cx="36" cy="36" r="4" fill="#fff" stroke="none"/><circle cx="64" cy="36" r="4" fill="#fff" stroke="none"/><circle cx="36" cy="36" r="2" fill="#0F0E17" stroke="none"/><circle cx="64" cy="36" r="2" fill="#0F0E17" stroke="none"/><path d="M40 62 Q50 70 60 62" stroke="#0F0E17" strokeWidth="2" fill="none"/><path d="M22 70 L14 78 L28 76 M78 70 L86 78 L72 76" fill={fill} stroke="none"/></svg>;
    default:
      return <svg {...common}><circle cx="50" cy="50" r="30" fill={fill} stroke="none"/><text x="50" y="58" textAnchor="middle" fontSize="32" fill="#fff" fontWeight="900">?</text></svg>;
  }
};

window.LoteriaIcon = LoteriaIcon;
