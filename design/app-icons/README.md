# App icons

Generated with the built-in Image Gen tool. The selected retro microphone now sits in front of a moon lotería card, with the exact lowercase name `el cantor` underneath. The palette remains warm cream and dark forest green, with sage green inside the card.

Original full-size PNGs are kept here; production assets are resized PNG exports with no changes to the artwork. `microphone-reference.png` preserves the approved microphone used as the input for this edit.

| Source | Production exports |
| --- | --- |
| `pwa-source.png` | `public/icons/pwa-cantor-192.png`, `public/icons/pwa-cantor-512.png`, `public/apple-touch-icon-cantor.png` (180 × 180) |
| `maskable-source.png` | `public/icons/pwa-cantor-maskable-512.png` |
| `favicon-source.png` | `public/favicon-cantor-16.png`, `public/favicon-cantor-32.png`, `public/favicon.ico` (16, 32 and 48 pixels) |

The maskable variant adds green space around the complete design, including the name, for launcher cropping. The favicon preserves the microphone and background card with simpler shapes; the wording stays in the larger PWA and Apple icons because it cannot be legible in a 16-pixel browser tab. New PNG filenames allow browsers and launchers to discover the replacement artwork without reusing previous icon URLs. The conventional `favicon.ico` fallback also contains the new design.

`public/manifest.json` is the single source for the manifest used in development and production. Vite PWA also generates `manifest.webmanifest` from it to preserve both existing manifest URLs for previously installed apps, and precaches the manifests and production icons. Original source artwork stays outside `public/` and is not shipped to browsers.

## PWA edit prompt

Edit target: `microphone-reference.png`.

```text
Use case: precise-object-edit
Asset type: final PWA icon for a Mexican lotería caller.
Input image: edit target, the approved cream retro microphone on a forest-green square.
Primary request: Add the exact words "el cantor" below the microphone, and add ONE lotería card behind the microphone. Preserve the chosen microphone identity and the old-radio aesthetic.
Foreground: keep the same upright rounded retro microphone, paired horizontal dark-green grille openings, cream U-shaped yoke, short stem and rounded base. Scale it down enough to fit the new composition, without redesigning its silhouette.
Background card: one recognizable portrait Mexican lotería card, tilted slightly counterclockwise behind the upright microphone. Warm ivory paper with a dark forest-green inset printed border and a muted sage-green inner field. A small original simple crescent-moon illustration may peek out at the exposed upper-left corner of the card; most of the card's central art is naturally hidden by the microphone. Give the cream microphone a clean forest-green separation edge where necessary so it reads clearly in front of the card. Only one card, no fan or stack. This is an original folk-print card, not a reproduction of a commercial deck.
Typography: beneath the microphone and card, on the green background, centered bold warm-cream retro slab-serif lettering on ONE straight line. Exact text, all lowercase: "el cantor". Spell it e-l, a space, c-a-n-t-o-r. The text must be large, beautifully spaced, crisp and legible, about 62% of the canvas width. This is the only visible wording anywhere in the artwork; no card title or card number.
Layout: square canvas. The card and microphone occupy the upper central portion, and "el cantor" forms a clear separate baseline below them with a comfortable gap. Keep generous outer margins; no object or letter touches an edge. The entire combined design fits within about 74% of canvas width and 78% of height.
Palette: deep forest green #153C34 full-bleed opaque background, warm cream #FFF3D6 microphone and letters, muted sage green only within the card. Preserve the established colors and flat graphic style.
Background must be a COMPLETELY OPAQUE GREEN SQUARE including all corners; the colored square is part of the artwork, never a transparent cutout.
Constraints: polished flat vintage graphic, simple clean silhouettes, no photorealism, gradients, glossy metal, 3D, drop shadows, grain, mockups, extra labels, decorative stars, rooster, watermarks or rounded outer canvas corners. Deliver one finished square icon.
```

## Favicon generation prompt

Reference image: `pwa-source.png`.

```text
Use case: logo-brand
Asset type: browser favicon companion to the provided "el cantor" app icon.
Input image: reference for the approved cream retro microphone, moon lotería card and dark-green palette.
Primary request: Adapt the microphone and single background lotería card to an extremely small 16x16 pixel browser tab icon. Preserve the same identity but simplify the artwork to bold recognizable silhouettes.
Design: one large upright cream retro microphone in front of ONE slightly counterclockwise tilted cream-edged lotería card with a sage-green interior. The card peeks out visibly to the upper-left. The microphone head has only THREE pairs of thick dark-green grille openings; short cream yoke and a short stem with a small base. Use strong dark-green separation between the microphone and card. Reduce the moon on the card to one simple crescent with no face or fine detail.
The favicon is the compact pictorial mark: omit the wordmark in this tiny variant so the microphone and card are legible at 16 pixels. The main PWA image retains the full wording.
Composition: square, centered compact mark about 70% of canvas width and 80% of height. Flat two-tone cream and green with sage only inside the card, thick forms, generous negative space, crisp edges.
Background: the ENTIRE canvas is a COMPLETELY OPAQUE forest-green #153C34 square, including every corner and interior gap. The green tile is part of the artwork, not a transparent cutout.
Constraints: no typography, extra cards, rooster, stars, extra objects, textures, shading, gradients, thin lines, transparent pixels, outer rounded corners, mockup or watermark. One finished square favicon only.
```

## Maskable generation prompt

Edit target: `pwa-source.png`.

```text
Use case: precise-object-edit
Asset type: Android maskable variant of the provided "el cantor" microphone-and-card app icon.
Input image: edit target.
Primary request: Change ONLY scale and framing. Keep the exact cream microphone, moon lotería card behind it, forest-green/sage/cream palette, and the exact lowercase words "el cantor" below. Reduce the size of the complete design and center it on a larger uninterrupted green field.
The ENTIRE composition including every letter and every card corner must fit inside an invisible centered circle with diameter 76% of canvas width. In particular, the leftmost "e" and rightmost "r" at the bottom must have ample space from the circular crop. Aim for the full composition to span about 50% of canvas width and 60% of height. Do not draw the safe-area circle.
Preserve all relative layout and proportions from the reference. Keep a clear gap between the microphone base and the wording. Text exactly: "el cantor", on one line, fully visible and unchanged.
The ENTIRE square background is COMPLETELY OPAQUE forest green #153C34 with no alpha or transparent areas; extend it seamlessly to all four corners. The square green background is part of the artwork.
Constraints: no new decoration, no new wording, no spelling or case changes, no removal of the moon card, no outer rounded corners, no mockup. One finished square icon.
```
