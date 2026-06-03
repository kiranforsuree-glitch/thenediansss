# The Nedians — Study in Italy

A premium, production-ready, multi-page website for **The Nedians**, a student
consultancy specialising exclusively in *Study in Italy*. Built with **pure
HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step.

---

## Project Overview
- **Name:** The Nedians
- **Goal:** Guide international students through studying in Italy — university
  discovery, eligibility matching, scholarships, document prep and consultation
  booking — in a polished, trustworthy, accessible interface.
- **Tech:** HTML / CSS / JS only (multi-page application). `localStorage` acts as
  a lightweight client-side "CMS"/database for saved universities, comparisons,
  checklist progress, eligibility results, the student dashboard and bookings.

## Design System
| Token | Value |
|-------|-------|
| Primary (Deep Navy) | `#0B1C3E` |
| Accent (Gold) | `#C9A84C` |
| Background (Off-white) | `#F8F7F4` |
| Surface | `#FFFFFF` |
| Heading text | `#1A1A2E` |
| Body text | `#4A4A6A` |
| Success | `#1D9E75` |
| Error | `#D85A30` |
| Heading font | Inter (600–700) |
| Body font | Plus Jakarta Sans |

Glassmorphism cards, micro-animations, count-up stats, scroll-reveal
(IntersectionObserver), confetti on eligibility match, and a full **dark / light
mode** toggle. `prefers-reduced-motion` is respected. Icons via FontAwesome 6
(no emojis).

## Pages (functional entry points)
| Page | File | Notes |
|------|------|-------|
| Home | `index.html` | Hero, count-up stats, featured universities, how-it-works, programs, testimonials, FAQ, CTA |
| Study in Italy | `study-in-italy.html` | Why Italy, city grid, intake calendar |
| Universities DB | `universities.html` | Search + filters (city / level / language / tuition / sort) |
| University detail | `university.html?slug=SLUG` | Dynamic page — programs, requirements, map, save, related |
| Programs | `programs.html` (`?level=`) | Level tabs + filters |
| Eligibility checker | `eligibility.html` | 5-step wizard, progress bar, matching logic, confetti |
| Scholarships | `scholarships.html` | Filters + deadline countdowns |
| Compare | `compare.html` | Select up to 3 universities, side-by-side table |
| Checklist generator | `checklist.html` | Personalised document checklist + TXT download |
| Blog | `blog.html` | Category tabs + search |
| Blog post | `post.html?slug=SLUG` | Article, share buttons, related |
| Booking | `booking.html` | Consultation booking form + WhatsApp |
| Contact | `contact.html` | Form, map, contact info |
| About | `about.html` | Story, team, trust badges, stats |
| Dashboard | `dashboard.html` | Login gate; saved unis, comparisons, checklist progress, consultation history |
| 404 | `404.html` | Friendly not-found page |

### Valid university slugs
`sapienza-rome`, `politecnico-milano`, `university-bologna`,
`politecnico-torino`, `federico-ii-naples`, `bocconi-milan`

### Valid blog slugs
`italy-admission-guide-2026`, `student-visa-italy`, `top-scholarships-italy`,
`student-life-bologna`, `milan-city-guide`, `ielts-or-moi`

## Data Architecture
- **Data layer:** `js/data.js` — central content object (`SITE`, `IMG`, `CITIES`,
  `UNIVERSITIES`, `PROGRAMS`, `SCHOLARSHIPS`, `TESTIMONIALS`, `FAQS`, `BLOGS`,
  `TEAM`, `CHECKLIST_ITEMS`). Edit this single file to update site content.
- **Persistence (simulated DB):** browser `localStorage`, namespaced `ned_*`
  (saved universities, comparison list, checklist progress, eligibility results,
  student account, consultation bookings, theme preference).
- **Images:** Creative-Commons-filtered photos of Rome, Milan, Bologna, Turin,
  Naples, students and libraries.

## File Structure
```
thenedians/
├── index.html + 15 other .html pages + 404.html
├── css/style.css        # full design system, dark mode, all components
├── js/data.js           # content / CMS data layer
├── js/app.js            # shared: navbar, footer, floaters, modal, toast,
│                        #   validation, theme, count-up, reveal, countdown, confetti
├── js/pages.js          # all 17 page render functions
├── assets/favicon.svg
└── README.md
```

## How to Run Locally
No build step required — it's static. Serve the folder with any static server:
```bash
cd thenedians
python3 -m http.server 3000
# open http://localhost:3000
```
Then visit `http://localhost:3000/index.html`.

## User Guide
1. **Find a university** — use the Universities database filters or run the
   **Eligibility Checker** (5 quick steps) to get matched automatically.
2. **Save & compare** — save universities (heart icon) and open **Compare** for a
   side-by-side table.
3. **Plan your documents** — the **Checklist Generator** builds a personalised
   list and exports a `.txt`.
4. **Book a consultation** — via the Booking page or the floating WhatsApp button.
5. **Track everything** — log in on the **Dashboard** to see saved universities,
   comparisons, checklist progress and consultation history.

All data is stored in your browser (`localStorage`), so it persists between visits
on the same device.

## Deployment
- **Platform:** Any static host (Cloudflare Pages, Netlify, GitHub Pages, etc.)
- **Status:** ✅ Complete & tested (all 17 pages load with zero console errors)
- **Tech Stack:** HTML5 + CSS3 + Vanilla JS + FontAwesome 6 + Google Fonts
- **Last Updated:** 2026-06-03

## Not Yet Implemented (future ideas)
- Real backend / authentication (currently client-side `localStorage`)
- Real email/WhatsApp delivery for form submissions
- Server-side CMS for non-technical content editing
- Payment integration for paid services
