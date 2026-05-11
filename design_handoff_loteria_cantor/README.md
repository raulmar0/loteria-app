# Handoff: Lotería Mexicana — El Cantor (mobile app)

## Overview
Aplicación web móvil que funciona como **cantor automático** para la Lotería Mexicana tradicional (54 cartas). El usuario es quien anuncia las cartas a un grupo de jugadores — no hay tablas ni interacción del jugador en el teléfono. La app sortea aleatoriamente, anuncia con voz, muestra la carta en pantalla y mantiene el historial.

## About the Design Files
Los archivos en este paquete son **referencias de diseño creadas en HTML/React** — prototipos que muestran la apariencia y el comportamiento deseados, **no código de producción para copiar directamente**.

La tarea es **recrear estos diseños en el entorno del codebase existente** (React Native, Flutter, SwiftUI, Kotlin, etc.) usando sus patrones y librerías establecidas. Si no existe codebase aún, elegir el framework más apropiado (recomendado: React Native o Flutter por la naturaleza móvil) e implementar ahí.

## Fidelity
**High-fidelity (hifi)**: mockups pixel-perfect con colores, tipografía, espaciado e interacciones finales. El desarrollador debe recrear la UI fielmente usando las librerías y patrones del codebase objetivo.

---

## Screens / Views

### 1. Main Caller Screen (única pantalla principal)
- **Purpose**: Mostrar la carta cantada actual + controles de canto.
- **Layout** (mobile-first, 390–402px de ancho):
  - **Papel picado decorativo** (50px alto) en la parte superior — 7 banderines SVG con sway animation
  - **Header** (8px top, 18px lateral): logo "Lotería / El cantor" a la izquierda, botones idioma (ES/EN) + ajustes a la derecha
  - **Counters row**: 3 contadores (Cantadas / Restan / Mazo total) en card blanca con borde duro de 2px + sombra dura 3px 3px 0
  - **Card face** (flex 1): tarjeta grande con número en círculo (top-left), ícono geométrico en panel de color, nombre grande, verso opcional
  - **Countdown bar** (cuando auto-mode activo): 36px alto con fill animado del color de acento
  - **Controls grid** (3 columnas 1fr 1.6fr 1fr): Repetir / CANTAR-PAUSAR-SEGUIR-REINICIAR / Siguiente
  - **History toggle button**: botón dashed con badge mostrando cantidad cantada

### 2. History Sheet (bottom sheet modal)
- **Purpose**: Ver todas las cartas cantadas en orden inverso (más reciente arriba). Tap en una carta = re-anunciar con voz.
- **Layout**: bottom sheet de máx 75% altura, border-radius 24px top, borde superior 3px, sombra `0 -8px 0` color tinta
- Lista de "history pills": cada uno con número en círculo color de carta + nombre de carta, borde de 2px en color de carta

### 3. Settings Sheet (bottom sheet modal)
- **Purpose**: Ajustes rápidos dentro de la app (separados del panel de Tweaks del entorno de diseño)
- **Controls**:
  - Toggle Voz (switch)
  - Toggle Versos (switch)
  - Velocidad (segmented: Lento 12s / Medio 7s / Rápido 4s)
  - Idioma (segmented: Español / English)
  - Botón "Reiniciar mazo"

---

## Components

### CardFace
- Borde 3px en color de carta, border-radius 18px, padding 16/14/14, fondo `--paper`, sombra dura `5px 5px 0` tinta
- **Card number badge** (top-left): círculo 44px, fondo color de carta, texto blanco font display, borde 2px tinta, sombra dura 2px
- **Icon panel**: flex 1, fondo color de carta (con gradient sutil), ícono SVG centrado max 60% con drop-shadow
- **Card name**: font display 28-40px clamp, color de carta, text-align center, text-wrap balance
- **Verse**: italic 13px, line-height 1.35, comillas decorativas en color de carta, text-wrap pretty

### Controls
- Botones rectangulares con borde duro 3px tinta, border-radius 14px, sombra dura 3px
- Estados: `:active` translada 3px y elimina sombra (feedback táctil), `:disabled` opacity 0.35
- Botón primario más alto (16px padding), fondo color accent, font 16px display blanco
- Botones secundarios fondo paper, 11px caps con SVG icon arriba

### Bottom Sheet Pattern
- Backdrop `rgba(0,0,0,0.5)` con `fadeIn` 0.2s
- Sheet animado con `sheetUp` 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)
- Drag handle 40x4px arriba

---

## Interactions & Behavior

### Auto mode timer
- Al presionar **CANTAR**: canta una carta inmediatamente, inicia interval con duración según speed
- **PAUSAR**: detiene interval, mantiene última carta y deck
- **SEGUIR**: reanuda desde donde estaba
- Cuando deck queda vacío: botón cambia a **REINICIAR**, presionarlo baraja un nuevo deck completo

### Card calling logic
1. Shuffle inicial del array de 54 cartas (Fisher-Yates)
2. Pop del primer índice del deck → push al frente de `called`
3. Llamar TTS con `${name}. ${verse}` (o solo `${name}` si versos off)
4. Actualizar lastCallAt para countdown

### Voice (TTS)
- Usa `window.speechSynthesis` (Web Speech API en web; AVSpeechSynthesizer/TextToSpeech en nativo)
- Idioma: `es-MX` o `en-US`
- Rate 0.95, pitch 1.0
- Match voice por prefijo de language

### Countdown
- Barra fill se actualiza cada 200ms con `elapsed / interval * 100`
- Label muestra `Math.ceil((interval - elapsed) / 1000)` segundos restantes

---

## State Management

```ts
{
  deck: number[],           // índices barajados pendientes
  called: Card[],           // cartas cantadas, newest first
  running: boolean,         // auto-mode activo
  lastCallAt: number,       // timestamp ms de la última carta cantada
  showHistory: boolean,
  showSettings: boolean,
  // Persisted preferences
  palette: 'fiesta' | 'noche' | 'desierto' | 'rosa',
  font: 'display' | 'bold' | 'retro',
  voice: boolean,
  verses: boolean,
  speed: 'lento' | 'medio' | 'rapido',
  language: 'es' | 'en'
}
```

Persiste preferencias en localStorage / AsyncStorage / UserDefaults.

---

## Design Tokens

### Palettes (cada una define bg/paper/ink/inkSoft/accent/accent2/accent3/accent4)

**Fiesta (default)**:
- bg `#FFF8E7` · paper `#FFFFFF` · ink `#1A1410` · inkSoft `#5A4A3F`
- accent `#D62828` · accent2 `#1F8A5B` · accent3 `#FFB703` · accent4 `#118AB2`

**Noche**:
- bg `#1A0E2A` · paper `#2A1B3D` · ink `#FFF6E0` · inkSoft `#C9B8E0`
- accent `#FF6B6B` · accent2 `#06D6A0` · accent3 `#FFD166` · accent4 `#4ECDC4`

**Desierto**:
- bg `#F4E4C1` · paper `#FBF3DC` · ink `#2D1B0E` · inkSoft `#6B4226`
- accent `#C1462C` · accent2 `#6B8E23` · accent3 `#E8A02A` · accent4 `#4A6B7C`

**Bugambilia**:
- bg `#FFF0F5` · paper `#FFFFFF` · ink `#3C153B` · inkSoft `#7B287D`
- accent `#E91E63` · accent2 `#9C27B0` · accent3 `#FF9800` · accent4 `#00BCD4`

### Typography
- **Display option 1 (default)**: Alfa Slab One (Google Fonts) — headings, números, nombres de carta
- **Display option 2**: Archivo Black
- **Display option 3**: Bagel Fat One
- **Body**: DM Sans 400/500/600/700 (o Inter como par alterno)

### Scale
- Card number: 18px
- Card name: clamp(28px, 7vw, 40px)
- Counter num: 24px
- Verse: 13px italic
- Caps labels: 10-12px letter-spacing 0.08em

### Shadows / Borders
- Borde estándar: 2-3px sólido var(--ink)
- Sombra dura: `3px 3px 0 var(--ink)` (botones), `5px 5px 0 var(--ink)` (card), `2px 2px 0 var(--ink)` (badges)
- Border-radius: 10-18px componentes, 14px controles, 24px sheets top

### Spacing
- Container padding: 18px horizontal
- Gap entre secciones: 14px
- Card padding: 16/14/14

---

## Card Data
Las 54 cartas tradicionales (números 1-54) con nombres ES/EN y versos folclóricos. Ver `cards.js`. Los versos son **folclor de dominio público**.

## Iconography
**Importante**: Las ilustraciones originales de Lotería de Don Clemente tienen copyright. Este diseño usa **íconos geométricos originales** (SVG simples) que sugieren cada carta sin recrear las ilustraciones tradicionales. Ver `icons.jsx`. Para producción, considera contratar a un ilustrador para crear arte original o licenciar arte folclórico moderno.

---

## Assets
Ningún asset externo (imágenes, logos). Todo es SVG inline + Google Fonts.

## Files in this handoff
- `index.html` — entry point con scaling de stage
- `cantor.jsx` — componente principal React (estado, lógica de canto, TTS, UI)
- `cards.js` — array de 54 cartas con nombres y versos
- `icons.jsx` — íconos SVG geométricos originales por carta
- `styles.css` — estilos completos
- `ios-frame.jsx` — frame de iPhone para presentación (no es parte del producto)
- `tweaks-panel.jsx` — panel de tweaks del entorno de diseño (no es parte del producto)

## Implementation Notes
- **Mobile-first**: el viewport target es ~390x844 (iPhone 13/14/15). El layout debe llenar la pantalla en móvil.
- **No requiere backend**: todo el estado es local del cliente.
- **TTS nativo del SO** es preferible al sintetizador del navegador en apps nativas — tiene voces es-MX mucho mejores.
- **Hit targets**: mínimo 44px en todos los botones (ya cumplido).
- **Accesibilidad**: agregar labels ARIA al re-implementar, especialmente para los switches y el botón principal de canto.
