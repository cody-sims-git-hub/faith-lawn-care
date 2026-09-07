/**
 * The checks. Each rule is pure — it reads page records and returns findings —
 * so the same set works for any site and the config only supplies thresholds.
 *
 * `scope: "page"` rules run once per page. `scope: "site"` rules run once over
 * every page, for the checks that only make sense in aggregate (duplicates,
 * dead links, orphans, sitemap drift).
 */

const finding = (route, message) => ({ route, message });

/**
 * Resolve an href to the local route it targets, or null when it leaves the
 * site.
 *
 * Uses `URL` rather than string surgery so every form resolves by the same
 * rules a browser uses: absolute, root-relative, relative, and — the case
 * hand-rolled parsing gets wrong — protocol-relative (`//cdn.example.com/x`),
 * which looks root-relative but navigates to another origin entirely.
 */
function resolveInternal(href, site, fromRoute) {
  if (/^(mailto:|tel:|javascript:|data:|#)/i.test(href)) return null;

  let url;
  try {
    url = new URL(href, `${site}${fromRoute === "/" ? "/" : fromRoute}`);
  } catch {
    return null; // unparseable — not our problem to resolve
  }
  if (url.origin !== new URL(site).origin) return null;

  // .pathname already drops the query and hash.
  const path = url.pathname;
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export const rules = [
  // ---------------------------------------------------------------- per page
  {
    id: "title-missing",
    severity: "error",
    scope: "page",
    check: (page) => (page.title ? [] : [finding(page.route, "no <title>")]),
  },
  {
    id: "title-length",
    severity: "warn",
    scope: "page",
    check: (page, { thresholds: t }) => {
      if (!page.title) return [];
      const n = page.title.length;
      if (n >= t.titleMin && n <= t.titleMax) return [];
      return [
        finding(
          page.route,
          `title is ${n} chars (want ${t.titleMin}-${t.titleMax}): "${page.title}"`,
        ),
      ];
    },
  },
  {
    id: "description-missing",
    severity: "error",
    scope: "page",
    check: (page) =>
      page.description ? [] : [finding(page.route, 'no <meta name="description">')],
  },
  {
    id: "description-length",
    severity: "warn",
    scope: "page",
    check: (page, { thresholds: t }) => {
      if (!page.description) return [];
      const n = page.description.length;
      if (n >= t.descriptionMin && n <= t.descriptionMax) return [];
      return [
        finding(page.route, `description is ${n} chars (want ${t.descriptionMin}-${t.descriptionMax})`),
      ];
    },
  },
  {
    id: "h1-count",
    severity: "error",
    scope: "page",
    check: (page) =>
      page.h1Count === 1
        ? []
        : [finding(page.route, `${page.h1Count} <h1> elements (want exactly 1)`)],
  },
  {
    id: "canonical-missing",
    severity: "error",
    scope: "page",
    check: (page) => (page.canonical ? [] : [finding(page.route, "no canonical link")]),
  },
  {
    id: "canonical-mismatch",
    severity: "error",
    scope: "page",
    check: (page, { canonicalFor }) => {
      if (!page.canonical) return [];
      const want = canonicalFor(page.route);
      return page.canonical === want
        ? []
        : [finding(page.route, `canonical is ${page.canonical}, expected ${want}`)];
    },
  },
  {
    id: "lang-missing",
    severity: "error",
    scope: "page",
    check: (page) => (page.lang ? [] : [finding(page.route, "<html> has no lang attribute")]),
  },
  {
    id: "img-alt-missing",
    severity: "error",
    scope: "page",
    // alt="" is a deliberate, valid signal that an image is decorative, so only
    // a completely absent alt attribute counts as a defect.
    check: (page) =>
      page.images
        .filter((img) => !img.hasAlt)
        .map((img) => finding(page.route, `<img> has no alt attribute: ${img.src || "(no src)"}`)),
  },
  {
    id: "jsonld-invalid",
    severity: "error",
    scope: "page",
    check: (page) =>
      page.jsonLd.flatMap((block, i) => {
        try {
          JSON.parse(block);
          return [];
        } catch (err) {
          return [finding(page.route, `JSON-LD block ${i + 1} does not parse: ${err.message}`)];
        }
      }),
  },
  {
    id: "og-incomplete",
    severity: "warn",
    scope: "page",
    check: (page) => {
      const missing = ["title", "description", "image"].filter((k) => !page.og[k]);
      return missing.length ? [finding(page.route, `missing og:${missing.join(", og:")}`)] : [];
    },
  },

  // ---------------------------------------------------------------- per site
  {
    id: "title-duplicate",
    severity: "warn",
    scope: "site",
    check: (pages) => duplicates(pages, "title", "title"),
  },
  {
    id: "description-duplicate",
    severity: "warn",
    scope: "site",
    check: (pages) => duplicates(pages, "description", "description"),
  },
  {
    id: "internal-link-broken",
    severity: "error",
    scope: "site",
    check: (pages, { site, routes, assets }) => {
      const out = [];
      for (const page of pages) {
        const seen = new Set();
        for (const href of page.links) {
          const target = resolveInternal(href, site, page.route);
          if (target === null) continue;
          if (routes.has(target) || assets.has(target) || seen.has(target)) continue;
          seen.add(target);
          out.push(finding(page.route, `links to ${target}, which did not build`));
        }
      }
      return out;
    },
  },
  {
    id: "orphan-page",
    severity: "warn",
    scope: "site",
    check: (pages, { site, entryPoints }) => {
      const linkedTo = new Set();
      for (const page of pages) {
        for (const href of page.links) {
          const target = resolveInternal(href, site, page.route);
          if (target !== null) linkedTo.add(target);
        }
      }
      return pages
        .filter((p) => !linkedTo.has(p.route) && !entryPoints.includes(p.route))
        .map((p) => finding(p.route, "no other page links here"));
    },
  },
  {
    id: "sitemap-drift",
    severity: "warn",
    scope: "site",
    check: (pages, { sitemapRoutes, routes }) => {
      if (!sitemapRoutes) return [];
      const out = [];
      for (const route of routes) {
        if (!sitemapRoutes.has(route)) out.push(finding(route, "built but absent from the sitemap"));
      }
      for (const route of sitemapRoutes) {
        if (!routes.has(route)) out.push(finding(route, "in the sitemap but did not build"));
      }
      return out;
    },
  },
];

/** Group pages by a shared field value and report every collision. */
function duplicates(pages, field, label) {
  const byValue = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    byValue.set(value, [...(byValue.get(value) ?? []), page.route]);
  }
  return [...byValue]
    .filter(([, routes]) => routes.length > 1)
    .map(([value, routes]) =>
      finding(routes[0], `${label} shared with ${routes.slice(1).join(", ")}: "${value}"`),
    );
}
