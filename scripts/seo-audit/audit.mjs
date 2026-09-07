#!/usr/bin/env node
/**
 * On-page SEO audit over the BUILT site.
 *
 * Runs against dist/**\/*.html rather than source, so it checks what actually
 * ships — layouts, partials, and generated routes included.
 *
 * Deliberately NOT wired into `npm run build`: the deploy pipeline must never
 * be able to fail on a lint, matching how the share-image tooling stays out of
 * the build path. The gate belongs in CI on a pull request, where it blocks a
 * merge instead of a release.
 *
 * Usage:
 *   npm run audit
 *   npm run audit -- --list          # show rule ids and default severities
 *   npm run audit -- --json          # machine-readable findings
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { extractPage } from "./html.mjs";
import { rules } from "./rules.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const config = (await import(pathToFileURL(join(HERE, "seo-audit.config.mjs")).href)).default;

const asJson = process.argv.includes("--json");

if (process.argv.includes("--list")) {
  console.log("rule                    default  scope");
  for (const r of rules) console.log(`  ${r.id.padEnd(22)} ${r.severity.padEnd(7)} ${r.scope}`);
  process.exit(0);
}

// --- collect the build ------------------------------------------------------
const distDir = join(ROOT, config.distDir);
if (!existsSync(distDir)) {
  console.error(`No build at ${config.distDir}/ — run \`npm run build\` first.`);
  process.exit(1);
}

const allFiles = readdirSync(distDir, { recursive: true, withFileTypes: true })
  .filter((e) => e.isFile())
  .map((e) => relative(distDir, join(e.parentPath ?? e.path, e.name)).split(sep).join("/"));

/** dist-relative file path -> the URL path it serves at. */
function toRoute(file) {
  const path = file.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  const route = `/${path}`.replace(/\/+$/, "");
  return route === "" ? "/" : route;
}

const matchesIgnore = (route) =>
  config.ignore.some((p) => (p.endsWith("*") ? route.startsWith(p.slice(0, -1)) : route === p));

const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const pages = htmlFiles
  .map((file) =>
    extractPage({ html: readFileSync(join(distDir, file), "utf8"), route: toRoute(file), file }),
  )
  .filter((p) => !matchesIgnore(p.route))
  .sort((a, b) => a.route.localeCompare(b.route));

const routes = new Set(pages.map((p) => p.route));
// Non-HTML files are valid link targets too, so a link to /og-image.jpg or a
// PDF isn't reported as broken.
const assets = new Set(allFiles.filter((f) => !f.endsWith(".html")).map((f) => `/${f}`));

/** Routes listed in the sitemap, or null when the check is disabled. */
let sitemapRoutes = null;
if (config.sitemap) {
  const sitemapPath = join(distDir, config.sitemap);
  if (existsSync(sitemapPath)) {
    const xml = readFileSync(sitemapPath, "utf8");
    sitemapRoutes = new Set(
      [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)]
        .map(([, loc]) => loc.trim().replace(config.site, ""))
        .map((path) => (path.length > 1 ? path.replace(/\/$/, "") : "/"))
        .map((path) => path || "/")
        .filter((route) => !matchesIgnore(route)),
    );
  } else {
    console.warn(`note: ${config.sitemap} not found in ${config.distDir}/ — skipping drift check\n`);
  }
}

// --- run --------------------------------------------------------------------
const ctx = {
  site: config.site,
  thresholds: config.thresholds,
  entryPoints: config.entryPoints,
  canonicalFor: (route) => config.canonicalFor(route, config.site),
  routes,
  assets,
  sitemapRoutes,
};

const findings = [];
for (const rule of rules) {
  const severity = config.rules?.[rule.id] ?? rule.severity;
  if (severity === "off") continue;
  const raw = rule.scope === "site" ? rule.check(pages, ctx) : pages.flatMap((p) => rule.check(p, ctx));
  for (const f of raw) findings.push({ ...f, rule: rule.id, severity });
}

const errors = findings.filter((f) => f.severity === "error");
const warnings = findings.filter((f) => f.severity === "warn");

// --- report -----------------------------------------------------------------
if (asJson) {
  console.log(JSON.stringify({ pages: pages.length, findings }, null, 2));
} else {
  console.log(`SEO audit — ${pages.length} pages in ${config.distDir}/\n`);

  const byRoute = new Map();
  for (const f of findings) byRoute.set(f.route, [...(byRoute.get(f.route) ?? []), f]);

  for (const [route, list] of [...byRoute].sort()) {
    console.log(`  ${route}`);
    for (const f of list.sort((a, b) => a.severity.localeCompare(b.severity))) {
      console.log(`    ${f.severity === "error" ? "ERROR" : "warn "}  ${f.rule.padEnd(22)} ${f.message}`);
    }
    console.log();
  }

  if (!findings.length) console.log("  no findings\n");
  console.log(`  ${errors.length} error(s), ${warnings.length} warning(s) across ${pages.length} pages`);
}

const shouldFail =
  (config.failOn === "error" && errors.length > 0) ||
  (config.failOn === "warn" && findings.length > 0);

process.exit(shouldFail ? 1 : 0);
