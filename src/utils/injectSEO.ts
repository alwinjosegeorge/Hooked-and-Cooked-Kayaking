// ============================================================
// visitkadambrayar.com — SEO Head Injector
// /src/utils/injectSEO.ts
//
// Call once from main.tsx BEFORE ReactDOM.createRoot()
// This writes all <meta>, <link>, and JSON-LD <script> tags
// directly into <head> at runtime.
// ============================================================

import { siteConfig, allKeywords } from "./seo.config";
import { allSchemas } from "./structured-data";

// ── Helper: set or create a <meta> tag ────────────────────
function setMeta(
  selector: string,
  attribute: string,
  value: string,
  content: string
): void {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// ── Helper: set or create a <link> tag ────────────────────
function setLink(rel: string, href: string, extra?: Record<string, string>): void {
  // For hreflang alternates, don't de-duplicate — create fresh each time
  if (extra?.hreflang) {
    const el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("href", href);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
    return;
  }
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

// ── Helper: inject a JSON-LD <script> block ───────────────
function injectJsonLd(schema: Record<string, unknown>): void {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ── Main injector — call once from main.tsx ───────────────
export function injectSEO(): void {
  const {
    name, description, url, ogImage,
    twitterHandle, phone, email, geo, // ← FIX: twitterHandle now exists in siteConfig
  } = siteConfig;

  // ── Page title ──────────────────────────────────────────
  document.title =
    "Hooked & Cooked Boat Club | Kayaking in Kochi, Kadambrayar";

  // ── Core meta ───────────────────────────────────────────
  setMeta('meta[name="description"]',          "name", "description",          description);
  setMeta('meta[name="keywords"]',             "name", "keywords",             allKeywords.join(", "));
  setMeta('meta[name="author"]',               "name", "author",               name);
  setMeta('meta[name="robots"]',               "name", "robots",               "index, follow, max-image-preview:large, max-snippet:-1");
  setMeta('meta[name="theme-color"]',          "name", "theme-color",          "#0a4f3c");

  // ── Geo meta ────────────────────────────────────────────
  setMeta('meta[name="geo.region"]',           "name", "geo.region",           "IN-KL");
  setMeta('meta[name="geo.placename"]',        "name", "geo.placename",        "Kakkanad, Kochi, Kerala, India");
  setMeta('meta[name="geo.position"]',         "name", "geo.position",         `${geo.latitude};${geo.longitude}`);
  setMeta('meta[name="ICBM"]',                 "name", "ICBM",                 `${geo.latitude}, ${geo.longitude}`);

  // ── Language / region ───────────────────────────────────
  setMeta('meta[http-equiv="content-language"]', "http-equiv", "content-language", "en-IN");

  // ── Open Graph ──────────────────────────────────────────
  setMeta('meta[property="og:type"]',          "property", "og:type",          "website");
  setMeta('meta[property="og:locale"]',        "property", "og:locale",        "en_IN");
  setMeta('meta[property="og:site_name"]',     "property", "og:site_name",     name);
  setMeta('meta[property="og:url"]',           "property", "og:url",           url);
  setMeta('meta[property="og:title"]',         "property", "og:title",         "Hooked & Cooked – River Dine | Kayaking & Riverside Dining, Kochi Kerala");
  setMeta('meta[property="og:description"]',   "property", "og:description",   "Guided backwater kayaking on the Kadambrayar river + fresh seafood riverside dining near Kakkanad, Kochi. Book your Kerala eco-tourism adventure today.");
  setMeta('meta[property="og:image"]',         "property", "og:image",         `${url}${ogImage}`);
  setMeta('meta[property="og:image:width"]',   "property", "og:image:width",   "1200");
  setMeta('meta[property="og:image:height"]',  "property", "og:image:height",  "630");
  setMeta('meta[property="og:image:alt"]',     "property", "og:image:alt",     "Guided kayaking on the Kadambrayar backwaters, Kochi Kerala – Hooked & Cooked River Dine");
  setMeta('meta[property="og:phone_number"]',  "property", "og:phone_number",  phone);
  setMeta('meta[property="og:email"]',         "property", "og:email",         email);

  // ── Twitter / X Card ────────────────────────────────────
  setMeta('meta[name="twitter:card"]',         "name", "twitter:card",         "summary_large_image");
  setMeta('meta[name="twitter:site"]',         "name", "twitter:site",         twitterHandle);
  setMeta('meta[name="twitter:creator"]',      "name", "twitter:creator",      twitterHandle);
  setMeta('meta[name="twitter:title"]',        "name", "twitter:title",        "Hooked & Cooked – River Dine | Kayaking in Kochi, Kerala");
  setMeta('meta[name="twitter:description"]',  "name", "twitter:description",  "Paddle the Kadambrayar backwaters & dine riverside near Kakkanad. Guided eco-tourism kayaking tours in Kochi, Kerala.");
  setMeta('meta[name="twitter:image"]',        "name", "twitter:image",        `${url}${ogImage}`);

  // ── Canonical ────────────────────────────────────────────
  setLink("canonical", url);

  // ── hreflang ────────────────────────────────────────────
  setLink("alternate", url, { hreflang: "en-IN" });
  setLink("alternate", url, { hreflang: "x-default" });

  // ── JSON-LD schemas ──────────────────────────────────────
  allSchemas.forEach(injectJsonLd);
}
