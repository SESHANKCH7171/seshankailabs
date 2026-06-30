# OPUS 4.6 MASTER PROMPT — Seshank AI Labs Website Build
# Paste this into Anthropic's API (claude-opus-4-6) or Antigravity

---

## ROLE & MANDATE

You are a senior full-stack engineer and principal product designer at a boutique creative technology studio. You have been hired to build the complete website for **Seshank AI Labs** — a pre-revenue B2B AI consultancy targeting India's Aerospace & Defense supply chain. This is a real business with no clients yet. The website is their first sales asset and will be the landing page for cold email outreach to defense manufacturers in the Nashik corridor (Satpur/Ambad MIDC, HAL Ozar).

You are not building a portfolio piece. You are building a tool that makes a skeptical Tier-1 defense procurement manager think "this person understands my world" within 45 seconds.

---

## TECH STACK (NON-NEGOTIABLE)

The project is already scaffolded. You are writing into an existing codebase:

- **Framework:** Vite + React 18 (JSX, ES Modules)
- **Styling:** Tailwind CSS v3.4 with a custom `tailwind.config.js` (provided below)
- **Animation:** GSAP 3.12 + ScrollTrigger plugin
- **Icons:** lucide-react (already installed)
- **Fonts:** Orbitron (display), Inter (body), JetBrains Mono (data) — loaded via Google Fonts in `index.html`
- **Build target:** `vite build` → static `dist/` → deploy to Hostinger

---

## CURRENT TAILWIND CONFIG (EXACT — DO NOT DEVIATE)

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stealth: { black: "#0A0A0A", deep: "#060606" },
        tactical: {
          red: "#FF1A1A",
          redDim: "rgba(255, 26, 26, 0.12)",
          redMid: "rgba(255, 26, 26, 0.35)",
        },
        ember: {
          glow: "#FF4444",
          glowDim: "rgba(255, 68, 68, 0.14)",
        },
        industrial: {
          silver: "#B0B0B0",
          ash: "#7A7A7A",
          panel: "#111111",
          panelGlass: "rgba(17, 17, 17, 0.78)",
          panelDeep: "#080808",
          line: "#1E1E1E",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        tactical: "0 0 24px rgba(255, 26, 26, 0.3)",
        ember: "0 0 32px rgba(255, 68, 68, 0.2)",
      },
      backgroundImage: {
        "scan-grid":
          "linear-gradient(rgba(255,26,26,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,26,26,0.025) 1px, transparent 1px)",
      },
      letterSpacing: { tactical: "0.08em" },
    },
  },
  plugins: [],
};
```

**CRITICAL RULE:** Every color used inside a Tailwind `@apply` directive in CSS files MUST be a key defined in this config. Never use `text-titanium-blue`, `text-radar-green`, or any color not listed above. If you need a one-off color, use an inline Tailwind arbitrary value like `text-[#66FCF1]` or a `style` prop in JSX. This is the #1 bug in the existing codebase — do not repeat it.

---

## FILE STRUCTURE TO PRODUCE

Output every file completely. Do not truncate. Do not use placeholder comments like `// ... rest of component`. Output the full code for each file.

```
src/
├── main.jsx
├── App.jsx
├── styles/
│   └── index.css
├── components/
│   ├── NavBar.jsx
│   ├── MotionAirframe.jsx
│   └── sections/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── ValueStack.jsx
│       ├── CaseStudies.jsx
│       └── Contact.jsx
```

Also output the corrected root files:
- `index.html` (with correct OG meta tags)
- `tailwind.config.js` (unchanged, for reference)

---

## DESIGN BRIEF

**Aesthetic:** "Tactical Stealth Industrial" — the visual language of a defense operations center. Not sci-fi. Not startup-gradient. Think: MIL-SPEC documentation meets modern type design. High contrast. Sparse. Every element earns its place.

**Color system (from config above):**
- Background: `stealth-black` (#0A0A0A)
- Cards/panels: `industrial-panel` (#111111)
- Body text: `industrial-silver` (#B0B0B0)
- Muted/labels: `industrial-ash` (#7A7A7A)
- Borders/dividers: `industrial-line` (#1E1E1E)
- Primary accent: `tactical-red` (#FF1A1A)
- Glow effects: `ember-glow` (#FF4444) with box-shadow-tactical/ember
- Background texture: `bg-scan-grid` with `bg-[length:40px_40px]`

**Typography rules:**
- `font-display` (Orbitron): H1 only, and major section taglines — use sparingly
- `font-sans` (Inter): All body, UI, descriptions
- `font-mono` (JetBrains Mono): Eyebrow labels, data values, asset IDs, technical specs
- Letter spacing for eyebrows: `tracking-tactical` (0.08em) + uppercase

---

## SECTION-BY-SECTION REQUIREMENTS

### SECTION 1: NavBar (NavBar.jsx)

- Fixed top, full width
- Initial state: `bg-transparent`
- On scroll > 20px: `bg-industrial-panelGlass backdrop-blur-md border-b border-industrial-line`
- Logo: "SESHANK AI LABS" in `font-display text-sm tracking-tactical text-white`
- Nav links: HOME · ABOUT · CAPABILITIES · PROOF · CONTACT
  - `font-mono text-xs tracking-tactical text-industrial-ash uppercase`
  - Smooth scroll to section IDs on click
  - Active state: `text-tactical-red`
- Right CTA: "BOOK CALL" button
  - `border border-tactical-red text-tactical-red font-mono text-xs px-4 py-2 hover:bg-tactical-redDim transition-colors`
- Mobile: hamburger icon (lucide-react `Menu`) → full-screen overlay

### SECTION 2: Home.jsx (Hero)

Layout: Full viewport height. Background: `bg-stealth-black bg-scan-grid bg-[size:40px_40px]`

**Text content (exact copy — do not paraphrase):**

```
Eyebrow (font-mono, text-industrial-ash, tracking-tactical, uppercase, text-xs):
NASHIK · MAHARASHTRA · AEROSPACE & DEFENSE AI

H1 line 1 (font-display, text-white, large):
We Don't Build Chatbots.

H1 line 2 (font-display, text-tactical-red):
We Build Defense Growth Systems.

Sub-headline (font-sans, text-industrial-silver, max-w-xl):
From parsing 300-page RFPs to filing AS9100 audit docs — we automate the operational drag that keeps Tier-2 suppliers from winning bigger contracts.

Primary CTA: "BOOK A 20-MIN DISCOVERY CALL"
  - style: border border-tactical-red text-tactical-red with glow shadow on hover
  - href: #contact

Secondary CTA: "SEE WHAT WE DO ↓"
  - style: text-industrial-ash underline-offset hover:text-industrial-silver
  - href: #capabilities

Bottom-left data strip (font-mono text-xs text-industrial-ash):
SYS STATUS: OPERATIONAL · ACCEPTING 2 NEW CLIENTS · EST. 2024
```

**Animation:** On mount, stagger-in the eyebrow → H1 line 1 → H1 line 2 → sub → CTAs using GSAP `from` with `y: 20, opacity: 0, duration: 0.6, stagger: 0.15`

### SECTION 3: About.jsx

**ID:** `about`

**Layout:** Two-column grid on `md:` breakpoint. Left: text content. Right: `MotionAirframe.jsx` component (pass `phase="about"` prop).

**Left column copy (exact):**

```
Eyebrow: WHY THIS EXISTS

H2: Domain depth is the only moat.

Body paragraph 1:
India's Tier-2 defense manufacturers — the machining shops, sensor assemblers, 
and composite fabricators in Satpur, Ambad, and Igatpuri — are operationally 
capable but administratively overwhelmed. They lose tenders not because of poor 
engineering, but because of documentation lag and compliance complexity.

Body paragraph 2:
We built Seshank AI Labs to close that gap. Not with generic AI tools, but with 
systems calibrated for the specific documents, standards, and procurement 
workflows that govern Indian defense manufacturing — AS9100, DGAQA, DRDO 
tenders, HAL subcontracting norms.

Credential block (panel bg, border-industrial-line, font-mono):
FOUNDER: [Your name]
BACKGROUND: M.Tech — IIT Madras
DOMAIN: Aerospace & Defense AI Systems
LOCATION: Nashik, Maharashtra
STATUS: Actively building · Open to discovery conversations
```

### SECTION 4: ValueStack.jsx

**ID:** `capabilities`

**Layout:** Eyebrow + H2, then 3-column card grid (stacked on mobile)

**Section header:**
```
Eyebrow: CAPABILITIES
H2: Three systems. One mission.
Sub: We automate the three highest-friction points in defense supply chain operations.
```

**Card A — SYSTEM 01: Tender Intelligence Engine**
```
Pain (text-industrial-ash): "Your team reads a 300-page RFP. It takes 3 days."
Capability: We deploy a RAG pipeline that extracts every specification, 
tolerance margin, and compliance clause in under 10 minutes. Machine-readable. 
Searchable. Auditable.
Tag (font-mono, text-xs): RAG · DOCUMENT INTELLIGENCE · DRDO / HAL RFPS
Airframe trigger: nose-cone glow on scroll-into-view
```

**Card B — SYSTEM 02: Compliance Documentation Engine**
```
Pain: "AS9100 and DGAQA audit prep takes weeks of manual formatting."
Capability: We automate generation of quality management records, inspection 
reports, and audit-ready documentation — reducing prep time by 60–80%.
Tag: AS9100 · DGAQA · QUALITY MANAGEMENT
Airframe trigger: wing glow
```

**Card C — SYSTEM 03: Supply Chain Visibility Agent**
```
Pain: "You don't know where your sub-tier materials are until it's already late."
Capability: Autonomous n8n-powered tracking agents monitor raw material flow 
across your MIDC supplier network with live status dashboards and exception alerts.
Tag: N8N · SUPPLY CHAIN · MIDC NETWORK
Airframe trigger: engine glow
```

**Card styling:**
```
bg-industrial-panel border border-industrial-line rounded-none p-8
hover: border-tactical-redMid bg-tactical-redDim transition-all duration-300
box-shadow-ember on hover
```

### SECTION 5: CaseStudies.jsx

**ID:** `proof`

**IMPORTANT FRAMING:** No real clients yet. Present as "System Demo" with public procurement data. Add a `font-mono text-xs text-industrial-ash` label: `DEMO MODE — PUBLIC PROCUREMENT DATA`

**Layout:** ATC log table style

**Table header:**
```
ASSET INTELLIGENCE FEED
[DEMO MODE — POPULATED WITH PUBLICLY AVAILABLE PROCUREMENT DOCUMENTS]
```

**Table columns:** ASSET ID · DOCUMENT TYPE · EXTRACTED PARAMETER · CONFIDENCE

**Table rows (static mock data):**
```js
const demoData = [
  { id: "EOI/11BRD/ISC/2026-27", doc: "Unified Engine Tester SKD-33", param: "Frequency Error Margin: ±0.03%", confidence: "99.1%" },
  { id: "RFP/HAL/OZR/2025-18", doc: "Component Inspection Checklist", param: "Surface Finish Ra: 0.8μm", confidence: "98.4%" },
  { id: "DRDO/TENDER/2026/044", doc: "Material Specification Sheet", param: "Tensile Strength: 1250 MPa", confidence: "97.7%" },
  { id: "MoD/MSME/2026/TIER2/09", doc: "Supplier Qualification Audit", param: "Dimensional Tolerance: ±0.005mm", confidence: "96.9%" },
  { id: "BEL/SUPPLY/2025/EOI-33", doc: "PCB Procurement RFQ", param: "IPC Class III Compliance", confidence: "99.8%" },
];
```

**Animation:** Rows appear one by one on scroll with a typewriter-style reveal. Use GSAP `from` with `opacity: 0, x: -10, stagger: 0.1`.

**Below table:** "This is what our system does with your actual documents. Book 20 minutes and we'll run a live demo on one of your RFPs." → CTA to #contact

### SECTION 6: Contact.jsx

**ID:** `contact`

**Layout:** Full-width section, centered, max-w-2xl

**Copy:**
```
Eyebrow: SECURE UPLINK · RESPONSE WITHIN 24H

H2: Ready to talk?

Sub: 20 minutes. No pitch deck. No jargon. Just a direct conversation about 
the operational bottleneck costing you the most time right now.

Secondary: Or email directly: contact@seshankailabs.com
```

**Form fields (use controlled React state, no HTML `<form>` submit):**
```jsx
// Fields:
// 1. Name — text input
// 2. Organization — text input  
// 3. Work Email — email input
// 4. Biggest bottleneck? — <select>:
//    "Tender / RFP Parsing Time"
//    "AS9100 / DGAQA Documentation"
//    "Supply Chain Visibility"
//    "Other — I'll explain in the call"
// 5. How did you hear about us? — <select>:
//    "Cold Email"  
//    "LinkedIn"
//    "Referral"
//    "Search / Other"

// Submit button: "INITIATE CONTACT"
// On submit: POST to Formspree endpoint (placeholder: https://formspree.io/f/YOUR_FORM_ID)
// Show success state: "UPLINK ESTABLISHED — We'll respond within 24 hours."
```

**Input styling:**
```
bg-stealth-deep border border-industrial-line text-industrial-silver font-mono text-sm
focus: border-tactical-red outline-none ring-0
placeholder: text-industrial-ash
rounded-none (no border radius anywhere)
```

---

## THE MOTION AIRFRAME (MotionAirframe.jsx)

Build an inline SVG component representing a simplified fighter jet airframe wireframe (top-down or 3/4 view). Use simple `<path>` and `<line>` elements. It does not need to be photorealistic — the aesthetic is engineering schematic / blueprint.

**Structure the SVG with named `<g>` groups:**
```jsx
<g id="nose-cone">...</g>
<g id="cockpit">...</g>
<g id="fuselage">...</g>
<g id="left-wing">...</g>
<g id="right-wing">...</g>
<g id="engine">...</g>
<g id="tail">...</g>
<g id="neural-nodes">...</g>  // Small circles at key structural points
```

**Default styling:** All strokes in `#1E1E1E` (industrial-line), with a `#FF4444` glow outline at low opacity.

**Props interface:**
```tsx
// phase: "home" | "about" | "capabilities-rag" | "capabilities-quality" | "capabilities-supply" | "proof" | "contact"
// activeCard: number (0, 1, 2 for ValueStack cards)
```

**GSAP ScrollTrigger inside MotionAirframe:**
- Register plugin once at component mount
- Create a ScrollTrigger timeline pinned to the right viewport column
- Animate each `<g>` group's `transform` attribute based on scroll progress
- On destroy: `ctx.revert()`

---

## QUALITY STANDARDS

**Performance:**
- No `useEffect` without cleanup functions
- No inline GSAP animations outside `gsap.context()` — always use context for cleanup
- Lazy-load sections below the fold using `React.lazy` + `Suspense` if bundle size > 200KB

**Accessibility:**
- All interactive elements have `aria-label`
- SVG airframe has `aria-hidden="true"` and `role="presentation"`
- Color is never the only way information is conveyed
- `prefers-reduced-motion` check:
  ```js
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) { /* run GSAP animations */ }
  ```

**Tailwind discipline:**
- Zero `@apply` directives using undefined color keys
- No arbitrary values for colors that exist in the config
- Mobile-first: every layout starts with stacked/single-column, expands with `md:` and `lg:`

**Code discipline:**
- No `console.log` in production code
- No hardcoded `px` values where Tailwind spacing utilities exist
- All section components export a single default function
- `App.jsx` is the only file that imports all sections

---

## DELIVERY FORMAT

Output each file as a separate code block with the filename as the header comment on line 1.

Example:
```jsx
// src/App.jsx
import React from 'react';
// ... full file content
```

Do not truncate any file. Do not use `// ... rest of implementation`. Output complete, production-ready code for every file listed in the file structure above.

After all files, add a **"Bug Fixes Applied"** section listing every issue from the existing codebase that you corrected.

---

## CONTEXT THE MODEL NEEDS TO STAY GROUNDED

- This founder has not yet spoken to a single paying client. The website must invite conversation, not close a sale.
- The Nashik A&D manufacturing corridor is real: Satpur MIDC, Ambad MIDC, HAL Nasik Division (MiG-21 overhaul), HAL Ozar (LCA Tejas assembly), MIDHANI, Mahindra Aerospace. These are real reference points that signal credibility to the target audience.
- "RAG" should not appear in the website copy visible to clients. Use "document intelligence" or "intelligent document processing" instead.
- "n8n" should not appear in client-facing copy. Use "automated workflow agents" instead.
- The founder's cold email campaign starts at 2–3 emails/day for the first 30 days to warm up the domain. The website must load fast and render correctly the first time, every time.

---

BEGIN OUTPUT NOW. Start with `src/main.jsx`, then proceed in the file order listed above.
