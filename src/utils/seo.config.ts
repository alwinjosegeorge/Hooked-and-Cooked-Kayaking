// ============================================================
// visitkadambrayar.com — SEO Config
// /src/utils/seo.config.ts
// Hooked & Cooked – River Dine
// ============================================================

export const siteConfig = {
  name: "Hooked & Cooked Boat Club",
  shortName: "Hooked & Cooked",
  url: "https://visitkadambrayar.com",
  description:
    "Guided backwater kayaking tours on the Kadambrayar river, Kochi. Fresh seafood riverside dining, eco-tourism activities near Kakkanad, Ernakulam, Kerala.",
  ogImage: "/og-image.jpg",
  instagramHandle: "kayakingkadambrayar",
  facebookHandle: "H & C Boat Club- Kadambrayar Backwater Kayaking Kochi",
  twitterHandle: "@hookedandcooked", // ← FIX: was missing, caused runtime crash in injectSEO.ts

  phone: "+91-90726 11622",
  email: "hookedandcooked.riverdine@gmail.com", // ← FIX: removed leading/trailing spaces

  address: {
    street: "Kadambrayar", // ← FIX: removed extra spaces
    locality: "Kakkanad",
    region: "Kerala",
    postalCode: "683562",
    country: "IN",
    countryName: "India",
  },
  geo: {
    latitude: "10.036456",  // ← FIX: removed trailing comma and space
    longitude: "76.386922",
  },
  social: {
    instagram: "https://www.instagram.com/kayakingkadambrayar",
    facebook: "https://www.facebook.com/share/18Wc6VxtKn/",
    googleMaps: "https://maps.app.goo.gl/ooykfEihpaaLdGJ66",
    // tripadvisor removed — add back once you have a real URL
  },
} as const;

// ============================================================
// MASTER KEYWORD LIST
// ============================================================

export const seoKeywords = {

  // ── Brand ─────────────────────────────────────────────────
  brand: [
    "hooked and cooked river dine",
    "hooked and cooked kochi",
    "visit kadambrayar",
    "visitkadambrayar.com",
  ],

  // ── Kayaking — Primary ────────────────────────────────────
  kayakingPrimary: [
    "kayaking in kerala",
    "kayaking in kochi",
    "kayaking in ernakulam",
    "backwater kayaking kerala",
    "guided kayaking tours kerala",
    "kayaking tours kochi",
    "river kayaking kerala",
    "kayaking near infopark",
    "kayaking in infopark",
    "kayak in kerala",
    "kayak in kochi",
    "kayak in ernakulam",
    "backwater kayak kerala",
    "guided kayaking tours kerala",
    "kayak tours kochi",
    "river kayak kerala",
  ],

  // ── Kayaking — City Variants ──────────────────────────────
  kayakingCities: [
    "kayaking in alleppey",
    "kayaking in alappuzha",
    "kayaking in kottayam",
    "kayaking in thrissur",
    "kayaking in munnar",
    "kayaking in varkala",
    "kayaking in kozhikode",
    "kayaking in trivandrum",
    "kayaking in thiruvananthapuram",
    "kayaking in kollam",
    "kayaking in palakkad",
    "kayaking in wayanad",
    "kayaking in kannur",
    "kayaking in kasaragod",
    "kayaking in pathanamthitta",
    "kayaking near kakkanad",
    "kayaking near aluva",
    "kayaking near perumbavoor",
    "kayaking in cheranalloor",
    "kayaking in edathala",
  ],

  // ── Kadambrayar Specific ──────────────────────────────────
  kadambrayar: [
    "kadambrayar tourism",
    "kadambrayar river tour",
    "kadambrayar kayaking",
    "kadambrayar backwaters",
    "kadambrayar eco tourism",
    "kadambrayar boat tour",
    "kadambrayar nature tour",
    "kadambrayar kochi",
  ],

  // ── Backwaters ────────────────────────────────────────────
  backwaters: [
    "backwater kayaking kochi",
    "backwater tour kochi",
    "backwater experience ernakulam",
    "kerala backwater kayaking",
    "mangrove kayaking kerala",
    "kerala canal kayaking",
    "backwater adventure kerala",
  ],

  // ── Eco Tourism ───────────────────────────────────────────
  ecoTourism: [
    "eco tourism activities kochi",
    "eco tourism kerala",
    "eco tourism ernakulam",
    "nature activities kochi",
    "outdoor activities kochi",
    "adventure activities kochi",
    "nature tour kochi",
    "green tourism kerala",
    "sustainable tourism kochi",
    "wildlife kayaking kerala",
    "mangrove tour kerala",
  ],

  // ── Dining ────────────────────────────────────────────────
  dining: [
    "seafood restaurants near kakkanad",
    "seafood restaurant kochi",
    "riverside dining kochi",
    "river dining kerala",
    "outdoor dining kochi",
    "seafood dining ernakulam",
    "waterfront restaurant kochi",
    "fresh seafood kochi",
    "kerala seafood restaurant",
    "restaurant near kakkanad",
    "unique dining experience kochi",
    "nature dining kochi",
  ],

  // ── Experiences & Activities ──────────────────────────────
  experiences: [
    "things to do in kochi",
    "things to do in infopark",
    "things to do in kakkanad",
    "outdoor activities ernakulam",
    "adventure tourism kerala",
    "family activities kochi",
    "couple activities kochi",
    "team outing kochi",
    "corporate outing kochi",
    "weekend getaway kochi",
    "day trip from kochi",
    "unique experiences kerala",
  ],

  // ── Long Tail ─────────────────────────────────────────────
  longTail: [
    "kayaking for beginners kerala",
    "kayaking for families kochi",
    "guided kayak tour near kochi",
    "best kayaking spots in kerala",
    "backwater kayaking near kochi",
    "river tour near ernakulam",
    "eco friendly tour kochi",
    "adventure activities near kakkanad",
    "best things to do in ernakulam",
    "hidden gems near kochi",
    "offbeat tourism kochi",
    "nature tourism near kochi",
  ],
} as const;

// Flat array of all keywords for meta tags
export const allKeywords: string[] = Object.values(seoKeywords).flat();
