# Card illustrations

The 54 illustrations in `public/cards/` were produced one by one from text-to-image
prompts. The complete prompts and card-to-file mapping are in
[`card-art-prompts.json`](./card-art-prompts.json).

The art follows the app's existing modern Mexican folk style: simple silhouettes,
warm ivory or dark brown ink, sparse cut-out details, and subtle paper texture.
Each transparent WebP is at most 640 × 640 pixels. The app supplies the original
colored panel, frame, card number, bilingual name, and optional verse.

`CardArtwork` displays the original SVG while an illustration loads or if its
request fails. All WebP assets are included in the service worker's precache so
the complete deck remains available offline after installation.

To replace an illustration, reuse its recorded prompt, review the output against
the other cards, and export a WebP while preserving transparency. Keep filenames
aligned with the `icon` values in `src/data/cards.ts`.
