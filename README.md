# SOKO Café & Bakery — Landing Page (Next.js)

One-page landing site for SOKO, laid out after the reference scroll video:

1. **Hero**: giant SOKO cat wordmark with floating, parallax brand cut-outs and a tilted "Explore Menu" tag
2. **Story**: "Slow Coffee, Fresh Bakes" intro with drifting cards/bag
3. **Menu panel**: inset cream panel with a half-circle notch, 4 round product shots and prices, tilted CTA
4. **The SOKO Promise**: big serif statement with parallax packaging
5. **Gallery**: "Caught at SOKO" horizontal photo slider with an arrow
6. **Footer**: newsletter form, contact, links, big logo, legal bar

Also includes a fixed header that switches colour over light sections, a full-screen circular-reveal menu, and blur/fade-in reveals.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export goes to /out (upload anywhere)
```

Want a Node server build instead of a static export? Remove `output: "export"` in `next.config.mjs`.

## Palette (from the brand mockups)

| Token | Hex | Use |
|---|---|---|
| `--brown` | `#3E2200` | logo ink, main background |
| `--cream` | `#EAD1B3` | wordmark on dark, panels, footer |
| `--blush` | `#F8EEE7` | cat fill, tag buttons |
| `--orange` | `#D15A0E` | accent rule, hovers |
| `--cream-dark` | `#DCBF99` | footer legal bar |

Fonts (self-hosted through @fontsource, so no Google Fonts request): **Mali** for headings, **Spectral** for body text, **Quicksand** for small labels.

## Placeholders to replace

- Street address in the footer (`app/page.tsx`)
- Product names and prices in the `bakes` array (`app/page.tsx`)
- Newsletter submit: it only shows a thank-you message right now (`components/Newsletter.tsx`)
- Legal links (`href="#"`)

## Files

- `app/page.tsx`: all sections
- `app/globals.css`: styles, palette, responsive rules
- `components/Float.tsx`: parallax floating cut-outs
- `components/Reveal.tsx`: scroll-in blur/fade
- `components/Header.tsx`: fixed header and overlay menu
- `components/Gallery.tsx`: horizontal slider
- `public/img/`: logo variants (cream / brown / full colour), background-removed cut-outs, round product crops, gallery photos
