#!/usr/bin/env node
/**
 * Self-test: every rule must fire on deliberately broken input.
 *
 * A gate that silently finds nothing is worse than no gate, so this asserts
 * each rule actually triggers rather than trusting a clean run. Run it with
 * `npm run audit:selftest`.
 */

import { extractPage } from "./html.mjs";
import { rules } from "./rules.mjs";

const ctx = {
  site: "https://example.com",
  thresholds: { titleMin: 30, titleMax: 60, descriptionMin: 120, descriptionMax: 158 },
  entryPoints: ["/"],
  canonicalFor: (route) => (route === "/" ? "https://example.com/" : `https://example.com${route}`),
  routes: new Set(["/", "/good"]),
  assets: new Set(["/logo.png"]),
  sitemapRoutes: new Set(["/", "/good", "/ghost"]),
};

const page = (route, html) => extractPage({ html, route, file: `${route}.html` });

/** A page that violates nothing, used as the baseline and for duplicate tests. */
const CLEAN = `<!doctype html><html lang="en"><head>
<title>A perfectly reasonable page title for testing</title>
<meta name="description" content="${"x".repeat(130)}">
<link rel="canonical" href="https://example.com/good">
<meta property="og:title" content="t"><meta property="og:description" content="d">
<meta property="og:image" content="https://example.com/logo.png">
<script type="application/ld+json">{"@type":"Thing"}</script>
</head><body><h1>One heading</h1>
<img src="/logo.png" alt="described"><img src="/deco.png" alt="">
<a href="/good">ok</a><a href="https://elsewhere.test/x">external</a><a href="mailto:a@b.c">mail</a>
</body></html>`;

const cases = {
  "title-missing": [page("/good", CLEAN.replace(/<title>.*?<\/title>/, ""))],
  "title-length": [page("/good", CLEAN.replace(/<title>.*?<\/title>/, "<title>Tiny</title>"))],
  "description-missing": [page("/good", CLEAN.replace(/<meta name="description"[^>]*>/, ""))],
  "description-length": [
    page("/good", CLEAN.replace(/content="x{130}"/, 'content="too short"')),
  ],
  "h1-count": [page("/good", CLEAN.replace("<h1>One heading</h1>", "<h1>a</h1><h1>b</h1>"))],
  "canonical-missing": [page("/good", CLEAN.replace(/<link rel="canonical"[^>]*>/, ""))],
  "canonical-mismatch": [
    page("/good", CLEAN.replace('href="https://example.com/good"', 'href="https://example.com/wrong"')),
  ],
  "lang-missing": [page("/good", CLEAN.replace('<html lang="en">', "<html>"))],
  "img-alt-missing": [page("/good", CLEAN.replace('<img src="/logo.png" alt="described">', '<img src="/logo.png">'))],
  "jsonld-invalid": [page("/good", CLEAN.replace('{"@type":"Thing"}', "{not json"))],
  "og-incomplete": [page("/good", CLEAN.replace(/<meta property="og:image"[^>]*>/, ""))],
  "title-duplicate": [page("/", CLEAN), page("/good", CLEAN)],
  "description-duplicate": [page("/", CLEAN), page("/good", CLEAN)],
  "internal-link-broken": [page("/good", CLEAN.replace('href="/good"', 'href="/does-not-exist"'))],
  // /good is linked from nothing here, and is not an entry point.
  "orphan-page": [page("/good", CLEAN.replace('<a href="/good">ok</a>', ""))],
  // ctx.sitemapRoutes contains /ghost, which never built.
  "sitemap-drift": [page("/good", CLEAN)],
};

let failed = 0;

// 1. Every rule must fire on its broken fixture.
for (const rule of rules) {
  const pages = cases[rule.id];
  if (!pages) {
    console.log(`  MISSING FIXTURE  ${rule.id}`);
    failed++;
    continue;
  }
  const found =
    rule.scope === "site" ? rule.check(pages, ctx) : pages.flatMap((p) => rule.check(p, ctx));
  if (found.length === 0) {
    console.log(`  DID NOT FIRE     ${rule.id}`);
    failed++;
  } else {
    console.log(`  fires            ${rule.id.padEnd(22)} ${found[0].message.slice(0, 60)}`);
  }
}

// 2. And the clean page must trip nothing, so we know the rules aren't just
//    always-on. Sitemap drift is excluded: its fixture lives in ctx, not the page.
console.log("");
const clean = [page("/", CLEAN.replace('href="https://example.com/good"', 'href="https://example.com/"'))];
for (const rule of rules) {
  if (rule.id === "sitemap-drift") continue;
  const found =
    rule.scope === "site" ? rule.check(clean, ctx) : clean.flatMap((p) => rule.check(p, ctx));
  if (found.length) {
    console.log(`  FALSE POSITIVE   ${rule.id}: ${found[0].message}`);
    failed++;
  }
}

// 3. Regressions — inputs that are VALID but previously produced blocking
//    false positives. These matter more than the fixtures above: a false
//    error trains people to ignore the gate.
console.log("");
const byId = Object.fromEntries(rules.map((r) => [r.id, r]));
const quiet = (label, ruleId, pages) => {
  const found =
    byId[ruleId].scope === "site"
      ? byId[ruleId].check(pages, ctx)
      : pages.flatMap((p) => byId[ruleId].check(p, ctx));
  if (found.length) {
    console.log(`  REGRESSED        ${label}: ${found[0].message}`);
    failed++;
  } else {
    console.log(`  no false positive ${label}`);
  }
};

// Script and style bodies are raw text: markup inside them is a string, not
// an element. Counting it fired bogus h1-count / img-alt-missing errors.
const scripty = [
  page(
    "/good",
    CLEAN.replace(
      "</head>",
      `<script>const tpl = "<h1>not a heading</h1><img src='/x.png'>";</script>
       <style>/* <h1> in a comment */</style></head>`,
    ),
  ),
];
quiet("markup inside <script>/<style> ignored (h1)", "h1-count", scripty);
quiet("markup inside <script>/<style> ignored (img)", "img-alt-missing", scripty);
// JSON-LD is read before masking, so it must still be validated.
quiet("JSON-LD still parsed after masking", "jsonld-invalid", scripty);

// A protocol-relative href looks root-relative but navigates to another
// origin; treating it as a local route reported it as a broken link.
quiet("protocol-relative external link treated as external", "internal-link-broken", [
  page("/good", CLEAN.replace('<a href="/good">ok</a>', '<a href="//cdn.example.net/a.js">cdn</a>')),
]);

console.log(
  failed === 0
    ? `\n  all ${rules.length} rules fire on bad input, stay quiet on good input, and hold on known regressions`
    : `\n  ${failed} problem(s)`,
);
process.exit(failed ? 1 : 0);
