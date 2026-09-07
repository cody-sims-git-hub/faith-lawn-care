/**
 * Just enough HTML parsing for the audit — no dependencies.
 *
 * A full parser would be more correct in general, but the input here is
 * machine-generated Astro output, and the extractions we need are narrow. What
 * naive regex actually gets wrong is `>` inside a quoted attribute value, so the
 * tag matchers below explicitly alternate over quoted spans rather than
 * scanning for the next `>`. That, plus a real attribute tokenizer, covers the
 * failure modes that would otherwise produce false positives — and a gate
 * nobody trusts is worse than no gate.
 */

/** Attribute values may be double-quoted, single-quoted, or bare. */
const ATTR_RE = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;

/** Body of an opening tag, treating quoted spans as opaque so `>` inside is safe. */
const tagRe = (name) => new RegExp(`<${name}\\b((?:[^>"']|"[^"]*"|'[^']*')*)>`, "gi");

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'", nbsp: " " };

/** Decode the handful of entities that actually show up in titles and meta. */
export function decode(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, ref) => {
    if (ref[0] === "#") {
      const code = ref[1] === "x" || ref[1] === "X" ? parseInt(ref.slice(2), 16) : Number(ref.slice(1));
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[ref] ?? whole;
  });
}

/** Remove comments so commented-out markup never trips a rule. */
export function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

/**
 * Blank out `<script>` and `<style>` bodies, keeping their tags.
 *
 * Their contents are raw text, not markup: an inline script or a JSON-LD
 * description can legitimately contain the string "<h1>" or "<img …>", and
 * counting those as real elements would fire blocking `h1-count`,
 * `img-alt-missing` and `internal-link-broken` errors on a perfectly valid
 * page. Extract JSON-LD BEFORE calling this — it reads the same bodies.
 */
export function maskRawText(html) {
  return html.replace(
    /(<(script|style)\b(?:[^>"']|"[^"]*"|'[^']*')*>)[\s\S]*?(<\/\2\s*>)/gi,
    "$1$3",
  );
}

/** Parse a tag's attribute string into a lowercase-keyed object. */
export function parseAttrs(attrString) {
  const attrs = {};
  for (const [, name, rawValue] of attrString.matchAll(ATTR_RE)) {
    const value = rawValue == null ? "" : rawValue.replace(/^["']|["']$/g, "");
    attrs[name.toLowerCase()] = decode(value);
  }
  return attrs;
}

/**
 * Every opening tag of `name`, as attribute objects.
 *
 * A valueless or empty attribute still lands as a key, so `"alt" in attrs`
 * distinguishes `<img alt="">` (deliberate, decorative, valid) from an `<img>`
 * with no alt at all (a real defect).
 */
export function findTags(html, name) {
  return [...html.matchAll(tagRe(name))].map((m) => ({ attrs: parseAttrs(m[1]) }));
}

/** Inner text of the first `<name>…</name>`, or null. */
export function innerText(html, name) {
  const m = html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1].replace(/\s+/g, " ").trim()) : null;
}

/** Count opening tags of `name`. */
export function countTags(html, name) {
  return [...html.matchAll(tagRe(name))].length;
}

/** Raw bodies of every JSON-LD script block. */
export function jsonLdBlocks(html) {
  const re =
    /<script\b(?:[^>"']|"[^"]*"|'[^']*')*type\s*=\s*["']application\/ld\+json["'](?:[^>"']|"[^"]*"|'[^']*')*>([\s\S]*?)<\/script>/gi;
  return [...html.matchAll(re)].map((m) => m[1].trim());
}

/**
 * Reduce a page's HTML to the facts the rules care about, so each rule reads a
 * record instead of re-parsing the document.
 */
export function extractPage({ html, route, file }) {
  const withoutComments = stripComments(html);
  // JSON-LD lives inside script bodies, so read it before those are masked.
  const jsonLd = jsonLdBlocks(withoutComments);
  const clean = maskRawText(withoutComments);
  const metas = findTags(clean, "meta");

  const metaBy = (key, value) =>
    metas.find((t) => (t.attrs[key] ?? "").toLowerCase() === value)?.attrs.content ?? null;

  return {
    route,
    file,
    title: innerText(clean, "title"),
    description: metaBy("name", "description"),
    canonical: findTags(clean, "link").find((t) => (t.attrs.rel ?? "").toLowerCase() === "canonical")
      ?.attrs.href ?? null,
    lang: findTags(clean, "html")[0]?.attrs.lang ?? null,
    h1Count: countTags(clean, "h1"),
    images: findTags(clean, "img").map((t) => ({ src: t.attrs.src ?? "", hasAlt: "alt" in t.attrs })),
    links: findTags(clean, "a")
      .map((t) => t.attrs.href)
      .filter(Boolean),
    jsonLd,
    og: {
      title: metaBy("property", "og:title"),
      description: metaBy("property", "og:description"),
      image: metaBy("property", "og:image"),
    },
  };
}
