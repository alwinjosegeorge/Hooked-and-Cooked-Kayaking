# Hooked & Cooked – River Dine
## Keyword & Content SEO Strategy

---

## 1. Keyword Map (Page-by-Page)

Each page should own 1–2 primary keywords to avoid cannibalisation.

| Page              | Primary Keyword                    | Secondary Keywords                                                      | Search Intent        |
|-------------------|------------------------------------|-------------------------------------------------------------------------|----------------------|
| `/` (Home)        | kayaking in kochi                  | hooked and cooked river dine, outdoor activities kochi                  | Navigational/Info    |
| `/kayaking-tours` | backwater kayaking kerala          | kayaking in kerala, kadambrayar tourism, guided kayak tours kochi       | Commercial/Info      |
| `/eco-tourism`    | eco tourism activities kochi       | kadambrayar tourism, nature tours kochi, backwater nature experience    | Informational        |
| `/dining`         | seafood restaurants near kakkanad  | river dining kochi, kerala seafood restaurant, riverside restaurant     | Commercial/Local     |
| `/about`          | kadambrayar tourism                | hooked and cooked, eco resort kochi, river experience kerala            | Navigational         |

---

## 2. On-Page Optimisation Checklist

### Every page must have:
- [ ] **H1** containing the primary keyword (exactly once)
- [ ] **H2s** using secondary keywords naturally
- [ ] Primary keyword in the **first 100 words** of body copy
- [ ] **Image alt tags** describing the scene + location
  - Example: `alt="Guided kayaking tour on Kadambrayar backwaters, Kochi"`
- [ ] **Internal links** — each page links to `/book` and at least one other page
- [ ] **Page speed** — images compressed (WebP), lazy loading enabled

### Recommended body copy lengths:
| Page              | Minimum word count |
|-------------------|--------------------|
| Home              | 600 words          |
| `/kayaking-tours` | 900 words          |
| `/eco-tourism`    | 700 words          |
| `/dining`         | 600 words          |

---

## 3. Suggested H-Tag Structure

### Home Page (`/`)
```
H1: Kayaking in Kochi – Guided Backwater Tours & Riverside Dining
H2: Explore the Kadambrayar Backwaters
H2: Eco Tourism Activities Near Kochi
H2: Fresh Seafood Dining on the River
H2: How to Book Your Experience
```

### Kayaking Tours Page (`/kayaking-tours`)
```
H1: Backwater Kayaking Kerala – Guided Tours on the Kadambrayar River
H2: What to Expect on Your Kayaking Tour
H2: Kayaking in Kerala for Beginners & Families
H2: Eco Tourism Activities During Your Paddle
H2: Tour Packages & Pricing
H2: Frequently Asked Questions
```

### Dining Page (`/dining`)
```
H1: Seafood Restaurant Near Kakkanad – Riverside Dining at Hooked & Cooked
H2: Our Menu – Fresh Kerala Catch
H2: Dine by the River After Your Kayak Tour
H2: Reservations & Private Events
```

---

## 4. Local SEO – Geo Signals

### NAP Consistency (Name, Address, Phone)
Keep this EXACT format across your website, Google Business Profile, and all directories:

```
Hooked & Cooked – River Dine
[Your Street Address], Kakkanad
Kochi, Kerala – 682030
+91-XXXXXXXXXX
```

### Geo-targeting in content — use these place names naturally:
- Kochi / Cochin
- Kakkanad
- Kadambrayar
- Ernakulam
- Cheranalloor / Edathala (nearby areas for radius targeting)
- Kerala Backwaters

### Add to your footer (every page):
```html
<address>
  Hooked & Cooked – River Dine<br>
  [Street Address], Kakkanad, Kochi, Kerala 682030<br>
  <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a>
</address>
```

---

## 5. Google Business Profile (GBP) Setup Guide

Google Business Profile is your #1 geo-SEO asset for local search.

### Step-by-step:
1. Go to → https://business.google.com
2. Search for your business name. If it exists, claim it. Otherwise, create new.
3. **Category (Primary):** `Kayak & Canoe Rental` or `Tour Operator`
4. **Additional Categories:** `Seafood Restaurant`, `Eco Tourism`, `Outdoor Activity`
5. **Service Area:** Add Kochi, Kakkanad, Ernakulam, Cheranalloor
6. **Attributes to enable:**
   - Outdoor seating ✓
   - Good for groups ✓
   - Eco-certified (if applicable) ✓
   - Accepts reservations ✓
7. **Upload 10–20 photos:**
   - Kayaks on water
   - Guests paddling
   - Food/dining setup
   - Aerial/landscape of Kadambrayar
8. **Posts:** Publish a Google Post every 1–2 weeks (offers, events, tips)
9. **Q&A:** Seed 5 common questions yourself and answer them
   - "Is kayaking suitable for beginners?" → Yes, all tours are guided…
   - "Do you serve food?" → Yes, we offer fresh Kerala seafood…

### Keywords to use inside your GBP description:
> Hooked & Cooked – River Dine offers guided **kayaking tours in Kochi** along the scenic **Kadambrayar** backwaters, combined with fresh **seafood riverside dining near Kakkanad**. We specialise in **eco tourism activities** for families, couples, and groups exploring **backwater kayaking in Kerala**.

---

## 6. Directory & Citation Listings

Submit your NAP to these platforms for geo authority:

| Platform              | URL                                      | Priority |
|-----------------------|------------------------------------------|----------|
| Google Business       | business.google.com                      | ★★★★★    |
| TripAdvisor           | tripadvisor.in                           | ★★★★★    |
| Thrillophilia         | thrillophilia.com                        | ★★★★☆    |
| Kerala Tourism Portal | keralatourism.org                        | ★★★★☆    |
| Zomato                | zomato.com (for the dining side)         | ★★★★☆    |
| Swiggy                | swiggy.in (for the dining side)          | ★★★☆☆    |
| Justdial              | justdial.com                             | ★★★☆☆    |
| Sulekha               | sulekha.com                              | ★★★☆☆    |
| India.com Travel      | india.com/travel                         | ★★★☆☆    |
| Bing Places           | bingplaces.com                           | ★★★★☆    |

---

## 7. Technical SEO Checklist (Next.js Specific)

- [ ] `next/image` used for all images (automatic WebP + lazy load)
- [ ] `generateMetadata()` used on dynamic pages
- [ ] `canonical` tag set on every page via `alternates.canonical`
- [ ] `hreflang` tag added if you plan a Malayalam version: `<link rel="alternate" hreflang="ml" href="https://www.hookedandcooked.in/ml/"/>`
- [ ] Core Web Vitals passing (check via PageSpeed Insights)
- [ ] SSL/HTTPS active
- [ ] Google Search Console verified and sitemap submitted: `https://www.hookedandcooked.in/sitemap.xml`
- [ ] Bing Webmaster Tools verified

---

## 8. Quick Content Ideas to Target Long-Tail Keywords

These blog/page ideas can each rank for low-competition, high-intent searches:

| Content Title                                               | Target Keyword                              |
|-------------------------------------------------------------|---------------------------------------------|
| "Best Things to Do in Kakkanad on a Weekend"               | things to do in kakkanad                    |
| "Beginner's Guide to Kayaking in Kerala"                    | kayaking in kerala for beginners            |
| "Kadambrayar River – A Hidden Eco Tourism Gem Near Kochi"  | kadambrayar tourism                         |
| "Where to Eat Fresh Seafood Near Kochi Backwaters"         | seafood restaurants near kochi backwaters   |
| "Family-Friendly Outdoor Activities in Kochi"              | outdoor activities kochi family             |
