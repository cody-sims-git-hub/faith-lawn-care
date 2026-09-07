# AGENTS.md — Faith Lawn Care

Client marketing site. Astro static → Cloudflare Pages. Read `README.md` first;
this file is only the things that bite.

## Decisions already made — do not revisit

- **Astro SSG.** No SSR, no adapter, no runtime server. The only server-side
  code in the repo is `functions/api/quote.ts`.
- **Cloudflare Pages**, not Hostinger. This is a deliberate deviation from the
  starter kit's SFTP default; host rules live in `public/_headers` and
  `public/_redirects`. There is no `.htaccess` and adding one does nothing.
- **Modelled on mysecurtek.com**, at the client's direction: dark utility
  bar, white sticky header with a scroll-progress line, dark gradient hero over
  a dimmed photo, pill eyebrow with a live dot, two-tone headline, pill
  buttons, a stat row, gold dash eyebrows on light sections. Translated from
  that site's navy to this business's forest green.

  **The colour rules that matter** (all in `src/styles/global.css`):

  | Token | Value | Use |
  | --- | --- | --- |
  | `--forest` | #0d3b1e | hero ground; headings on white (12.2:1) |
  | `--grass` | #1b7f3d | links/buttons on white (5.06:1 both ways) |
  | `--grass-lit` | #2e9e4f | FILL/mark only — 3.4:1, never carries text |
  | `--gold` | #e6b23c | DARK grounds only (6.5:1 on forest) and fills |
  | `--gold-ink` | #8a6a16 | the gold voice on LIGHT grounds (5.0:1 on white) |

  Two gold tokens is not redundancy. The bright gold is 1.9:1 on white and is
  effectively invisible as text there — the reference site actually ships that
  bug, and we copy the look, not the contrast failure. Gold fills also take
  `--forest-deep` labels, never white: white on gold is 2.1:1.
- **Email-only lead capture.** Nothing is stored. Do not add a database, KV,
  D1, or a lead table — the client explicitly does not want stored leads.
- **The map is inline SVG over real Census geometry.** Not Three.js, not a map
  library, no tiles. The audience is on rural Panhandle mobile connections and
  the site is held to Lighthouse ≥ 90 mobile. Do not introduce a WebGL or
  map-tile dependency.

- **No decorative effects.** Pointer-tracked tilt, sheen, glows, frosted glass,
  float/pulse animations, and hover-scale on buttons were all removed — they
  were what made earlier passes read as machine-made. Scroll reveal is the only
  motion. Do not reintroduce them.

## Content is data

Do not hand-write copy into templates. Edit `src/lib/services.ts`,
`src/lib/areas.ts`, `src/lib/faq.ts`, or `src/lib/site-meta.ts` — the pages,
navigation, sitemap, and JSON-LD all derive from those. Structured data is built
from the same objects the page renders, so it cannot drift; keep it that way.

**A town gets its own page only if it has a `localNote`.** Generating a page per
town from one template with the name swapped creates doorway pages. If you want
a new town page, write genuinely town-specific content for it first.

## Before you push

```bash
npm run build && npm run check && npm run check:functions
npm run audit:selftest && npm run audit
```

`npm run audit` must report **no findings**. It gates PRs, and it catches the
things that are invisible in review: canonical mismatches, duplicate titles,
broken internal links, images with no alt, JSON-LD that does not parse, orphan
pages, and sitemap drift.

Title and description lengths are audited (30–60 / 120–158). If you change page
metadata, re-run the audit — SERP truncation is a real cost, not a nitpick.

## Traps

- `functions/` is excluded from the root `tsconfig.json` on purpose and has its
  own. `@cloudflare/workers-types` and the DOM lib declare the same globals
  differently; one program containing both produces a wall of false errors.
- Lucide **removed brand icons**. There is no `Facebook` export — use
  `src/components/FacebookIcon.astro`. Several names are also deprecated
  aliases (`Home`→`House`, `Waves`→`WavesHorizontal`, `Loader2`→`LoaderCircle`,
  `AlertCircle`→`CircleAlert`); `npm run check` reports these as hints.
- `ServiceIcon.astro` maps icon names explicitly rather than using a namespace
  import. A namespace import defeats tree-shaking and pulls the entire lucide
  set into the bundle.
- Astro `<Image>` needs explicit `width`/`height` or the `src` fallback points
  at the full-size original.
- The canonical for `/` is the bare origin with **no trailing slash**. This has
  to agree in three places: `Layout.astro`, `astro.config.mjs`
  (`trailingSlash: 'never'`), and `scripts/seo-audit/seo-audit.config.mjs`
  (`canonicalFor`). Change one and the audit fails every page.
- `.github/workflows/security.yml` is byte-identical to the starter kit's
  canonical copy. Do not edit it in this repo.

## Where the client's own material came from

The brand — palette, service list, tagline, phone — is taken from the company's
flyer and Facebook group, not invented. `src/assets/` holds their own photos.
When they send new photos, add them to `src/assets/` and to the `shots` array in
`src/pages/gallery.astro`.
