# App icons

Produced from the text-to-image prompts recorded below. The original full-size PNGs are kept here; production assets are resized PNG exports with no changes to the artwork.

| Source | Production exports |
| --- | --- |
| `pwa-source.png` | `public/icons/pwa-192.png`, `public/icons/pwa-512.png`, `public/apple-touch-icon.png` (180 × 180) |
| `maskable-source.png` | `public/icons/pwa-maskable-512.png` |
| `favicon-source.png` | `public/favicon-16.png`, `public/favicon-32.png`, `public/favicon.ico` (16, 32 and 48 pixels) |

The maskable variant includes extra red space around the entire rooster for launcher cropping. The favicon uses a simplified rooster head to stay legible in browser tabs.

`public/manifest.json` is the single source for the manifest used in development and production. Vite PWA also generates `manifest.webmanifest` from it to preserve both existing manifest URLs for previously installed apps, and precaches the manifests and production icons. Original source artwork stays outside `public/` and is not shipped to browsers.

## PWA generation prompt

```text
Use case: logo-brand
Asset type: production PWA app icon for "Lotería — El Cantor", a Mexican lotería card caller app.
Primary request: Create one beautiful original square app icon: a bold, friendly Mexican folk-art rooster, the recognizable "el gallo" lotería subject and a natural symbol for a caller. Deliver the actual icon artwork, not a mockup.
Scene/backdrop: completely opaque flat fiesta-red #D62828 background extending to all four square edges; no rounded outside corners, no white margins.
Subject: one stylized cream rooster in side profile facing right, proud upright singing pose with a gently open golden beak, clear comb, single dark eye, elegant sweeping green tail and minimal golden details. Use a compact unified silhouette, chunky shapes, confident dark #1A1410 outlines. The rooster is the sole focal point. No card rectangle around it.
Style/medium: polished contemporary Mexican folk print, bold flat cut-paper shapes, precise smooth edges, playful but refined; subtle hand-crafted shape character without fine texture. High contrast, memorable at small sizes.
Color palette: red #D62828 full-bleed background; warm cream #FFF8E7 primary silhouette; green #1F8A5B and golden yellow #FFB703 restrained accents; dark ink #1A1410 for eye and outlines.
Composition/framing: perfectly square 1024 by 1024; optically centered compact rooster fitting entirely within a central circle of diameter 76% of canvas width so its comb, beak, tail and feet survive circular app-icon masking; visually balanced plain red breathing room. Let the rooster fill this safe circle generously.
Text: none.
Constraints: one single finished icon only. Original illustration. No typography, letters, numbers, tiny decorative details, extra objects, border frames, gradients, photorealism, 3D bevel, drop shadows, device mockup, icon sheet, watermark or corner rounding.
```

## Favicon generation prompt

Reference image: `pwa-source.png`.

```text
Use case: logo-brand
Asset type: favicon for the same Mexican lotería caller app as the attached PWA rooster icon.
Input image: reference for brand identity, palette and illustration style.
Primary request: Create ONE square finished favicon artwork as a highly simplified close-up of this same singing rooster's head and upper neck, facing right. The favicon must remain recognizable at 16 by 16 pixels. This is a new companion asset derived from the attached illustration.
Subject: a single bold cream rooster head and cropped neck, a compact three-lobed red comb outlined in thick dark ink, one large solid dark circular eye with NO highlight, a golden open beak and one simple red wattle. Keep the head silhouette extremely simple and chunky. Do not include the body, feet, wings, tail, feather lines or fine decorative details.
Scene/backdrop: opaque uniform red #D62828 extending all the way to every square edge. No transparency and no rounded outside corners.
Style: same friendly flat Mexican folk graphic as reference, reduced to very few thick confident shapes for tiny browser tabs; completely flat solid colors, no grain.
Composition: square 1024 by 1024, large centered head with total head+comb+neck silhouette occupying roughly 80% of width and 82% of height, 9% margin on all sides. Beak points right. Optically balanced.
Palette: warm cream #FFF8E7, fiesta red #D62828, golden yellow #FFB703, dark ink #1A1410.
Constraints: no text, numbers, letters, frame, extra decorations, gradients, texture, cast shadows, photorealism, 3D, device mockup or contact sheet. One single finished favicon tile only.
```

## Maskable generation prompt

Edit target: `pwa-source.png`.

```text
Use case: precise-object-edit
Asset type: maskable Android PWA icon variant.
Input image: edit target, the full-body rooster app icon.
Primary request: Change only the framing: zoom OUT substantially so the entire unchanged rooster is much smaller and centered, surrounded by a wide uninterrupted red background on every side. Keep the existing rooster illustration, shapes, details, colors, pose and direction exactly the same. Do not crop any body part.
Composition: square canvas. The full rooster including comb, beak, tail and feet must fit inside the central 58% of the canvas width and central 64% of height. That means at least 18% empty red space ABOVE AND BELOW and at least 21% empty red space LEFT AND RIGHT. It must fit fully inside a centered circular safe area with radius 38% of canvas width. Do not draw the circle.
Background: extend the original red background smoothly all the way to each square edge. Completely opaque, no transparency, no outer rounded corners, no frames.
Constraints: identical rooster artwork, only smaller scale and more empty red breathing room. No extra objects, no text, no new decoration, no mockup. Deliver one finished square icon.
```
