// ─────────────────────────────────────────────────────────────────────────────
// SEO audit config — the one file that changes per site.
//
// The engine (html.mjs / rules.mjs / audit.mjs) is site-agnostic and is copied
// verbatim from sdp-starter-kit; everything specific to this build lives here.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  /** Build output to audit, relative to the project root. */
  distDir: "dist",

  /** Canonical origin, no trailing slash. */
  site: "https://faithlawncarellc.com",

  /**
   * Sitemap inside distDir, or null to skip the drift check. We point at the
   * flat sitemap rather than @astrojs/sitemap's index wrapper, matching what
   * robots.txt advertises.
   */
  sitemap: "sitemap-0.xml",

  /** "error" | "warn" | "never" — what severity makes the run exit non-zero. */
  failOn: "error",

  thresholds: {
    titleMin: 30,
    titleMax: 60,
    descriptionMin: 120,
    descriptionMax: 158,
  },

  /** Routes skipped entirely. Exact match, or a trailing "*" for a prefix. */
  ignore: ["/404"],

  /**
   * Routes allowed to have nothing linking to them. /thank-you is reachable
   * only after a form submission, so nothing on the site links to it by design.
   */
  entryPoints: ["/", "/thank-you"],

  /**
   * Where a page's canonical should point.
   *
   * Canonical URLs here carry NO trailing slash — including the root, which is
   * emitted as the bare origin (see src/layouts/Layout.astro). This has to
   * agree with the layout exactly or every page fails the canonical rule.
   */
  canonicalFor(route, site) {
    return route === "/" ? site : `${site}${route}`;
  },

  /** Per-rule severity overrides: "error" | "warn" | "off". */
  rules: {},
};
