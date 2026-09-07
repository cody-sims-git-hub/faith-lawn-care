# AGENTS.md — Faith Lawn Care

Client marketing site. Astro static → Cloudflare Pages. Read `README.md` first;
this file is only the things that bite.

## Decisions already made — do not revisit

- **Astro SSG.** No SSR, no adapter, no runtime server. The only server-side
  code in the repo is `functions/api/quote.ts`.
- **Cloudflare Pages**, not Hostinger. This is a deliberate deviation from the
  starter kit's SFTP default; host rules live in `public/_headers` and
  `public/_redirects`. There is no `.htaccess` and adding one does nothing.
- **Dark-only palette.** Tokens live once in `src/styles/global.css` on `:root`
  with no light variant. Do not add a light theme or a `dark:` variant scheme.
- **Email-only lead capture.** Nothing is stored. Do not add a database, KV,
  D1, or a lead table — the client explicitly does not want stored leads.
- **3D via CSS transforms + inline SVG.** Not Three.js, not a map library. The
  audience is on rural Panhandle mobile connections and the site is held to
  Lighthouse ≥ 90 mobile. Do not introduce a WebGL or map-tile dependency.

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
