# Seshank AI Labs | Website Build Specification v2.0
# Status: Pre-Revenue / Discovery Phase — Website is the First Sales Asset

---

## 0. Business Reality Check (Read This First)

**Founder context:** Seshank AI Labs is a solo-founder AI consultancy targeting B2B Aerospace & Defense in India. No paying clients yet. No direct CEO/client conversations yet. The founder has deep domain knowledge (Nashik manufacturing corridor, HAL Ozar, MIDC Satpur/Ambad ecosystem) and is building this website to **create inbound conversations**, not to close deals directly.

**What the website must do (in priority order):**
1. Signal credibility to a skeptical, risk-averse A&D buyer
2. Communicate 2–3 specific pain points the founder believes are real (tender parsing, AS9100 compliance docs, supply chain traceability)
3. Prompt one single action: book a 20-minute discovery call OR send an email
4. Survive a cold email click — someone opens it, lands here, has 45 seconds

**What the website must NOT do:**
- Oversell or promise outcomes without proof
- Use AI-hype language ("revolutionary", "cutting-edge", "disruptive")
- Look like a Vercel template or a ChatGPT-wrapper landing page
- Require the visitor to understand what "RAG" or "n8n" means

---

## 1. Tech Stack (Locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Vite + React 18 | Already scaffolded. Do not switch. |
| Styling | Tailwind CSS v3.4 | Use `tailwind.config.js` theme — no arbitrary color names outside config |
| Motion | GSAP 3.12 + ScrollTrigger | Import via `gsap/ScrollTrigger` |
| Icons | lucide-react | Already installed |
| Fonts | Orbitron (display), Inter (body), JetBrains Mono (data/mono) | Loaded via Google Fonts in `index.html` |
| Hosting target | Hostinger (seshankailabs.com) | Static build via `vite build` → `dist/` |

### Critical Tailwind Rule — Avoid the `text-titanium-blue` Bug

The existing codebase crashed because `text-titanium-blue` was used in `@apply` directives inside `src/styles/index.css` but was NOT defined in `tailwind.config.js`. **This is the #1 bug to prevent.**

**Rule:** Every color used in an `@apply` directive MUST exist in `tailwind.config.js → theme.extend.colors`. The current config defines:
- `stealth.black`, `stealth.deep`
- `tactical.red`, `tactical.redDim`, `tactical.redMid`
- `ember.glow`, `ember.glowDim`
- `industrial.silver`, `industrial.ash`, `industrial.panel`, `industrial.panelGlass`, `industrial.panelDeep`, `industrial.line`

**Anything else must be added to the config first OR used as a raw Tailwind color (slate, zinc, etc.) OR written as an inline `style` prop.**

---

## 2. Design Tokens & Visual DNA

### Color Palette (Final — Mapped to Current `tailwind.config.js`)

| Role | Token | Hex | Usage |
|---|---|---|---|
| Background | `stealth-black` | `#0A0A0A` | Page base, section backgrounds |
| Deep background | `stealth-deep` | `#060606` | Footer, modals, inset panels |
| Primary accent | `tactical-red` | `#FF1A1A` | CTAs, active states, borders on hover |
| Accent glow | `ember-glow` | `#FF4444` | Glow shadows, pulse animations |
| Accent dim | `tactical-redDim` | `rgba(255,26,26,0.12)` | Card backgrounds, subtle highlights |
| Body text | `industrial-silver` | `#B0B0B0` | Paragraphs, descriptions |
| Muted text | `industrial-ash` | `#7A7A7A` | Labels, eyebrows, timestamps |
| Panel | `industrial-panel` | `#111111` | Cards, nav, component backgrounds |
| Dividers | `industrial-line` | `#1E1E1E` | Borders, separators |

> **Note:** The original spec used `#00FF66` (Radar Green) as primary. The current `tailwind.config.js` has evolved to Tactical Red. Use Tactical Red. Don't reintroduce green unless the config is updated first.

### Typography

| Role | Font | Tailwind class | Notes |
|---|---|---|---|
| Hero display | Orbitron | `font-display` | Only for H1 and section taglines |
| Body / UI | Inter | `font-sans` | Everything else |
| Data / code / IDs | JetBrains Mono | `font-mono` | Asset IDs, numbers, technical labels |

### Spacing & Grid
- Max content width: `max-w-6xl` (72rem / 1152px)
- Section vertical padding: `py-24` minimum, `py-32` for hero
- Card gap: `gap-6` or `gap-8`
- Use CSS Grid for cards, Flexbox for nav/headers

---

## 3. Component File Architecture

```
src/
├── main.jsx                    # Entry point, mounts App
├── App.jsx                     # Root: nav + sections + footer
├── styles/
│   └── index.css               # Tailwind base/components/utilities + custom @layer
├── components/
│   ├── SiteChrome.jsx          # Navbar + Footer wrapper
│   ├── NavBar.jsx              # Top navigation with scroll-spy
│   ├── MotionAirframe.jsx      # GSAP canvas/SVG scroll animation (see §4)
│   └── sections/
│       ├── Home.jsx            # View 1: Hero
│       ├── About.jsx           # View 2: Who & Why
│       ├── ValueStack.jsx      # View 3: What We Do (3 cards)
│       ├── CaseStudies.jsx     # View 4: Proof / mock data table
│       └── Contact.jsx         # View 5: Command terminal contact
```

---

## 4. The Motion System: Scroll-Triggered Airframe

### What It Is
A persistent SVG layer (not canvas) rendering a wireframe of a fighter jet airframe with neural network overlay nodes. It lives in `MotionAirframe.jsx` and is positioned `fixed` or `sticky` on the right side of the viewport.

### Why SVG Not Canvas
- Easier to animate individual `<path>` and `<g>` elements with GSAP
- No pixel-density/DPI issues
- Accessible (add `aria-hidden="true"`)

### Scroll-Driven Behavior (GSAP ScrollTrigger)

| Scroll % | Airframe State |
|---|---|
| 0% (Home) | Fully assembled, slow ambient pulse in `#1E1E1E` with `ember-glow` outline |
| 25% (About) | Components pull apart on X-axis (exploded view). Wings +120px, tail −80px, nose cone +60px |
| 50% (ValueStack) | Active card's corresponding part glows in `tactical-red`. Nose → RAG card. Wing → Quality card. Engine → Supply chain card |
| 75% (CaseStudies) | Parts converge. Animated data packets (small circles) travel along SVG paths between components |
| 100% (Contact) | Fully assembled, rotates 15° forward-launch angle |

### GSAP Implementation Pattern
```jsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// In useEffect with cleanup:
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
  }, containerRef);
  return () => ctx.revert(); // cleanup
}, []);
```

### Mobile Behavior
- Below `md` breakpoint (768px): hide airframe entirely (`hidden md:block`)
- All section content must be full-width without airframe dependency

---

## 5. Section Specifications

### View 1: Home (Hero)
**Goal:** Pattern interrupt. Make a skeptical HAL procurement officer think "this person knows my world."

**Layout:**
```
[NAV]
[eyebrow: NASHIK · MAHARASHTRA · B2B A&D]
[H1: We Don't Build Chatbots.]
[H1: We Build Defense Growth Systems.]
[sub: 2-line value prop]
[CTA button] [secondary link: See What We Do ↓]
[background: scan-grid pattern, subtle]
[airframe: right side, assembled]
```

**Copy direction:**
- H1 must reference the specific pain, not the solution
- Sub-headline: "From parsing 300-page RFPs to filing AS9100 audit docs — we automate the operational drag that keeps Tier-2 suppliers from winning bigger contracts."
- CTA label: "Book a 20-Min Discovery Call" (not "Deploy Local Pilot" — too jargon-heavy for first touch)

### View 2: About (The Unfair Advantage)
**Goal:** Build trust without case studies. The founder's background IS the proof at this stage.

**Layout:** Two-column split on desktop, stacked on mobile.

**Left column content:**
- Eyebrow: "WHY THIS EXISTS"
- Positioned in the Nashik manufacturing corridor context
- Specific: Satpur/Ambad Tier-2 MSMEs → HAL Ozar pipeline
- Honest: "We're at the start. Our edge is domain depth and execution speed."
- Founder credential anchor: IIT Madras M.Tech + agentic AI systems experience

**Right column:** Airframe exploded-view animation playing here

### View 3: Value Stack (What We Do)
**Goal:** 3 specific capabilities, zero buzzwords, each tied to a real operational pain.

**Card A — Tender Intelligence Engine**
- Pain: "Your team spends 3 days manually reading a 300-page RFP"
- What we do: "We deploy a RAG pipeline that extracts all specifications, tolerance margins, and compliance requirements in under 10 minutes"
- Trigger: Nose cone on airframe glows

**Card B — Compliance Documentation Automation**
- Pain: "AS9100 / DGAQA audit prep takes weeks of manual documentation"
- What we do: "We automate the generation and formatting of quality management records, reducing audit prep time by 60–80%"
- Trigger: Wing section on airframe glows

**Card C — Supply Chain Visibility Agent**
- Pain: "You don't know where your sub-tier materials are until it's too late"
- What we do: "We build n8n-powered tracking agents across your MIDC supplier network, with live status dashboards"
- Trigger: Engine section on airframe glows

**Card layout:**
```
[border: industrial-line] [bg: tactical-redDim on hover]
[eyebrow: SYSTEM A/B/C in JetBrains Mono]
[Pain statement in industrial-silver]
[Divider]
[What we do in lighter weight]
[bottom: "How this works →" subtle link]
```

### View 4: Case Studies / Proof Layer
**Reality:** No real client work yet. Present this as a **"Live Demo / System Preview"** — not fake case studies.

**Honest framing:** "See the system in action with publicly available defense procurement data."

**Layout:** ATC-log style data table
```
[header: ASSET INTELLIGENCE FEED — LIVE DEMO MODE]
[table with columns: Asset ID | Document | Extracted Parameter | Confidence]
[Row 1: EOI/11BRD/ISC/2026-27 | Unified Engine Tester SKD-33 | Frequency Error: ±0.03% | 99.1%]
[Row 2: RFP/HAL/OZR/2025-18 | Component Inspection Checklist | Surface Finish Ra: 0.8μm | 98.4%]
[Row 3: DRDO/TENDER/2026/044 | Material Specification Sheet | Tensile Strength: 1250 MPa | 97.7%]
[animated: new rows appear on scroll with typewriter effect]
```

**Note:** Mark clearly as "Demo Mode — Populated with publicly available procurement documents"

### View 5: Contact (Command Terminal)
**Goal:** Low friction. One clear ask.

**Layout:** Minimalist command interface aesthetic
```
[eyebrow: SECURE UPLINK]
[H2: Ready to talk?]
[sub: 20 minutes. No pitch deck. Just a conversation about your operational bottlenecks.]
[Form fields:]
  - Name
  - Organization
  - Email
  - "What's your biggest operational bottleneck?" (dropdown):
      · Tender/RFP parsing time
      · AS9100 / DGAQA documentation
      · Supply chain visibility
      · Other
[Submit: "INITIATE CONTACT" — tactical-red border glow]
[below form: direct email link as fallback]
```

---

## 6. Navigation

**Type:** Fixed top navbar, transparent → blurred panel on scroll

**Links:** HOME · ABOUT · CAPABILITIES · PROOF · CONTACT

**Behavior:**
- Scroll-spy: highlight active section
- Mobile: hamburger → full-screen overlay with same links
- CTA in nav: "Book Call" button (tactical-red border)

---

## 7. Cold Email Integration Notes

The website will be the landing destination for cold outreach campaigns. Key implications:

**Above-the-fold in 45 seconds:** The hero section must communicate who, what, and why in one scan. No auto-playing videos, no loaders that delay content.

**Email warm-up phase (Days 1–30):** 2–3 emails/day maximum. The website must handle low-traffic gracefully and not look abandoned. Add a "Currently accepting 2 new clients" scarcity signal subtly in the hero or contact section.

**Reply prompt:** The contact form should have a field for "How did you hear about us?" to track email campaign effectiveness.

**Domain trust:** `seshankailabs.com` on Hostinger. Ensure the meta title, description, and OG tags are set in `index.html` for professional link previews in email clients.

```html
<!-- Add to index.html <head> -->
<meta property="og:title" content="Seshank AI Labs | Aerospace & Defense AI Systems" />
<meta property="og:description" content="Tender parsing, compliance automation, and supply chain intelligence for India's A&D supply chain." />
<meta property="og:image" content="/og-preview.png" />
<meta name="robots" content="index, follow" />
```

---

## 8. Known Bugs to Fix Before Building New Features

| Bug | File | Fix |
|---|---|---|
| `text-titanium-blue` undefined | `src/styles/index.css:56` | Replace with `text-[#66FCF1]` inline OR add `titanium: { blue: '#66FCF1' }` to `tailwind.config.js` colors |
| Mismatch: skill.md uses `#00FF66` accent, config uses `#FF1A1A` | Across codebase | Standardize on Tactical Red (`#FF1A1A`) as per current config. Update any hardcoded green references. |
| `app.py` is empty | Root | Either add a Flask/FastAPI backend for form handling or use a form service (Formspree, Netlify Forms). Remove if unused. |

---

## 9. What NOT to Build (Yet)

These would be premature until first discovery calls produce real requirements:

- ❌ User authentication or dashboards
- ❌ Real RAG pipeline integration on the frontend
- ❌ Pricing page (no validated pricing yet)
- ❌ Blog or content section (no content strategy yet)
- ❌ Client portal

**Build these instead after 3–5 discovery calls produce actual client language.**

---

## 10. Definition of Done

The website is complete when:
- [ ] All 5 sections render correctly on Chrome/Edge desktop and mobile Safari
- [ ] GSAP ScrollTrigger airframe animations run smoothly at 60fps
- [ ] No Tailwind `@apply` errors in the dev console
- [ ] Contact form submits (even if to Formspree placeholder)
- [ ] `vite build` produces a clean `dist/` with zero errors
- [ ] `index.html` has correct OG meta tags
- [ ] Lighthouse performance score ≥ 85 on mobile
- [ ] `prefers-reduced-motion` is respected (wrap all GSAP timelines in a media query check)
