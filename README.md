# Faith Lawn Care — faithlawncarellc.com

Marketing site for **Faith Lawn Care LLC**, a full-service lawn care, landscaping,
and junk removal company based in Marianna, Florida, serving Jackson, Calhoun, and
Liberty counties and out to roughly two hours.

Built from the [`sdp-starter-kit`](https://github.com/cody-sims-git-hub/sdp-starter-kit)
`astro-static` template. Prerendered Astro, no runtime server, no database.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Astro** — static output (SSG) |
| Styling | **Tailwind CSS 4** via `@tailwindcss/vite`; tokens in `src/styles/global.css` |
| Design | **"Fresh & Bright"** — white ground, Figtree, vivid grass green, soft radii |
| Interactivity | **Alpine.js** — menus, the coverage map selection, the quote form |
| Icons | **`@lucide/astro`** (the maintained successor to `lucide-astro`) |
| Hosting | **Cloudflare Pages** |
| Form relay | **Cloudflare Pages Function** → Resend |

Deviation from the starter kit's default worth noting: it targets Hostinger over
SFTP with an Apache `.htaccess`. This site deploys to **Cloudflare Pages**
instead, so the host rules live in `public/_headers` and `public/_redirects` and
there is no `.htaccess`.

## Layout

```
functions/api/quote.ts   Pages Function: verifies Turnstile, relays to email
scripts/seo-audit/       On-page SEO gate (engine copied from the starter kit)
src/assets/              Source photos — Astro optimizes these at build time
src/components/          Section + UI components
src/layouts/Layout.astro Document shell: head, SEO, JSON-LD, chrome
src/lib/                 Content + config: services, areas, faq, structured data
src/pages/               File-based routes
src/styles/global.css    Design tokens, 3D primitives, motion
public/                  Static passthrough: favicon, robots, _headers, _redirects
```

### Where the content lives

Almost all copy is data, not markup. To change what the site says, edit:

- **`src/lib/services.ts`** — the twelve services. Drives the homepage grid, the
  `/services` index, every `/services/<slug>` page, the form's service picker,
  and the Service JSON-LD.
- **`src/lib/areas.ts`** — every town, with real coordinates and drive times.
  Drives the coverage map, the tier lists, and the `/service-areas/<slug>` pages.
- **`src/lib/faq.ts`** — the FAQ, which is also the FAQPage JSON-LD.
- **`src/lib/site-meta.ts`** — phone, hours, base city, canonical origin.

A town only gets its own page when it has a `localNote`. That is deliberate: a
page per town built from one template with the name swapped is a doorway page,
and a cluster of them gets treated as such.

## Commands

```bash
npm install
npm run dev              # local dev server
npm run build            # → dist/
npm run check            # typecheck the site
npm run check:functions  # typecheck the Pages Function (separate tsconfig)
npm run audit            # on-page SEO gate over dist/
npm run audit:selftest   # prove the audit's own rules still fire
```

`functions/` has its own `tsconfig.json` because `@cloudflare/workers-types` and
the DOM lib declare the same globals with different shapes; loading both into
one program produces a wall of false conflicts.

## Deployment

`.github/workflows/deploy.yml` validates every PR and push, and publishes to
Cloudflare Pages on a push to `main` only.

- **PRs** additionally run typecheck and the SEO audit. Those are PR-only on
  purpose: a lint must be able to block a merge but never a release.
- **`main`** builds and runs `wrangler pages deploy`, which uploads `dist/` as
  the site and `functions/` as Pages Functions in the same deploy.
- A failed production deploy opens (or comments on) a rolling `deploy-failure`
  issue, because a silent failed deploy otherwise leaves the site stale with a
  green checkmark on the merge.

`.github/workflows/security.yml` is the canonical SDP security gate — gitleaks
over full history plus a dependency audit. It is byte-identical to
`sdp-starter-kit/templates/ci/security.yml`; do not edit it here.

### Required configuration

**GitHub → repo Variables**

| Name | Value |
| --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile **site** key (public by design) |

**GitHub → repo Secrets**

| Name | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token with **Cloudflare Pages: Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Account owning the Pages project |

**Cloudflare Pages → project → Environment variables**

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | secret — Resend API key |
| `TURNSTILE_SECRET_KEY` | secret — pairs with the site key above |
| `LEAD_TO_EMAIL` | the inbox that receives quote requests |
| `LEAD_FROM_EMAIL` | a Resend-verified sender, e.g. `website@faithlawncarellc.com` |

If the Resend variables are missing, the form fails **loudly** — it tells the
visitor to call instead and logs the misconfiguration. It never silently
swallows a lead.

## Lead capture

The quote form posts to `/api/quote`. That Function verifies the Turnstile token
server-side, checks a honeypot field, and relays the request by email. **Nothing
is stored** — no database, no KV, no log of submission contents.

This shape exists because a static page cannot send email on its own: doing so
needs a credential, and a credential in the browser bundle is a public
credential. Keeping it in the Function is the entire point.

The form is a real `<form>` with a real `action` and `method`, so it still works
with JavaScript disabled (the Function replies with a redirect to `/thank-you`).
Alpine upgrades it to an inline fetch when JS is available.

## The coverage map

`src/components/CoverageMap.astro` is a real map, not a decorative diagram —
every node is the town's actual WGS84 position, projected at build time with the
X axis scaled by `cos(latitude)` so the Panhandle is not stretched sideways.

It is inline SVG plus CSS 3D transforms, with no WebGL and no map tiles. On a
rural mobile connection that is the difference between a map and a blank
rectangle. The SVG is `aria-hidden`; the authoritative content is the grouped
town list rendered underneath it, which works with no JavaScript, no pointer,
and no colour vision.

## Accessibility and performance notes

Things that will look like mistakes and are not:

- The hero `<Image>` carries explicit `width`/`height`. Without them Astro
  points the `src` fallback at the full 3051px original — a ~900kB LCP image.
- The hero `h1` uses `animate-rise`, not a fade. Chrome will not nominate text
  as an LCP candidate while it is `opacity: 0`, so fading it charges the whole
  animation duration to LCP.
- The Turnstile script tag has no SRI hash. Cloudflare ships rolling updates to
  it and documents that it is not pinnable; a hash there breaks the CAPTCHA.
- Scroll reveal is gated behind `html.js`, so with JavaScript off — and for
  crawlers — every element renders fully visible.
- `--field-bright` is never used for text. It is the vivid accent from the
  chosen design, and white on it measures 3.43:1 — a clear AA failure. Anything
  carrying words uses `--field` (5.06:1 both ways on white).
