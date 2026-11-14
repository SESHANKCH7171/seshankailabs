export const comparisonMatrix = [
  {
    dimension: "Buying Signal Freshness",
    generic: "Relies on static 30M+ contact databases, old funding news, or removed job postings from months ago.",
    sniper: "Strict <30-Day Recency Ceiling: Every single source URL is live-verified on Greenhouse, Ashby, Lever, or company engineering pages before delivery.",
  },
  {
    dimension: "Technical & Stack Audit",
    generic: "Scrapes generic LinkedIn bios and writes surface-level AI flattery.",
    sniper: "3-State Past/Current Tool Audit: Identifies the target's exact stack (BigQuery, Snowflake, Postgres, Looker, Cadence, Kubernetes) and diagnoses why their current tool or build-vs-buy workflow is bottlenecked.",
  },
  {
    dimension: "Sender Identity & Domain Safety",
    generic: "Blasts cold emails from fake personas on shared burner domains (~38% inbox placement), destroying buyer trust when a prospect replies.",
    sniper: "100% Authentic & Domain-Safe: Delivered in a clean 2-Tab Google Sheet so your team sends from your own warmed workspace, secondary domain, or LinkedIn with full control.",
  },
  {
    dimension: "Email Verification & Bounce Guarantee",
    generic: "Unverified catch-all dumps that trigger 8%–15% hard bounces and blacklist your domain.",
    sniper: "Multi-Step SMTP & MailTester Verification: Guaranteed <2% hard-bounce ceiling with an automatic 1-for-1 free replacement on any bounced address.",
  },
  {
    dimension: "Commercial Model",
    generic: "Rigid monthly SaaS subscriptions or opaque credit top-ups regardless of lead quality.",
    sniper: "Performance-Aligned: Start with 10 free leads, then pay $30 per verified qualified account post-inspection or $900 for a 14-day 30-account sprint.",
  },
];

export const dossierTabFeatures = {
  tab1: {
    id: "tab1",
    label: "Tab 1 — Verified Sniper Buyer Dossiers",
    subtext: "10 to 30 Browser-Verified Accounts with Live Buying Signals & Stack Audits",
    features: [
      {
        title: "Target Company & Verified Domain",
        description: "Filtered strictly for high-ACV fit, excluding existing clients, portfolio conflicts, and locked-in competitors.",
        badge: "STRICT TAM FILTER",
      },
      {
        title: "Operational Buyer & Verified Email ID",
        description: "Exact C-Suite, VP of Engineering, CTO, CFO, or Head of Data verified via Anymail Finder + MailTester SMTP handshake (<2% bounce ceiling).",
        badge: "SMTP HANDSHAKE VERIFIED",
      },
      {
        title: "Live <30-Day Buying Signal & Verbatim Evidence",
        description: "Direct clickable link and verbatim quote from an active open job requisition or technical roadmap proving immediate need.",
        badge: "<30-DAY RECENCY CEILING",
      },
      {
        title: "The Unmet Gap & Exclusivity Moat (Pros vs. Cons)",
        description: "Engineering-level breakdown of why legacy tools (Looker, Tableau, Metabase, Synopsys, Cadence, manual spreadsheets) left a gap and why your product wins.",
        badge: "DEEP-TECH GAP AUDIT",
      },
    ],
    sampleRows: [
      {
        company: "AccelerateSilicon Inc.",
        domain: "acceleratesilicon.ai",
        contact: "Dr. Elena Rostova",
        title: "VP of Silicon Engineering",
        email: "elena.rostova@acceleratesilicon.ai",
        verification: "SMTP Handshake Passed (0.0% Catch-All)",
        signal: "Greenhouse req: 'Principal 3D IC Thermal Architect' posted 11 days ago: 'Facing routing bottlenecks on legacy Cadence Innovus thermal sign-off for chiplet packaging.'",
        gapAudit: "Currently locked to Cadence Innovus 22.1; manual multi-die thermal iteration cycles take 14+ days. Client's unified 3D sign-off engine cuts turnaround to 6 hours.",
        status: "ICP Tier 1 · Tapeout Q3",
      },
      {
        company: "Monolith FinData",
        domain: "monolithdata.io",
        contact: "Marcus Vance",
        title: "Head of Data Engineering",
        email: "m.vance@monolithdata.io",
        verification: "SMTP Handshake Passed (0.0% Catch-All)",
        signal: "Ashby req: 'Staff Data Platform Engineer' posted 6 days ago: 'Replacing brittle Looker semantic layers and self-serve SQL queries across Snowflake & BigQuery.'",
        gapAudit: "High Looker maintenance burden with business executives bypassing data team. Client's natural-language conversational semantic layer maps directly to their 14 schemas.",
        status: "ICP Tier 1 · Series B",
      },
    ],
  },
  tab2: {
    id: "tab2",
    label: "Tab 2 — Multi-Touch Outbound Playbook",
    subtext: "Precision Founder-to-Buyer Email & LinkedIn Outreach Matrix",
    features: [
      {
        title: "Timezone & Local Hub Routing",
        description: "Precision send windows mapped across US corridors (EST, CST, MST, PST) and UAE/GCC corridors (GST / AST).",
        badge: "TIMEZONE CALIBRATED",
      },
      {
        title: "Touchpoint 1: Peer-to-Peer Cold Email (<65 Words)",
        description: "Hyper-concise, plain-text email referencing the prospect's exact live hiring/stack bottleneck with zero em dashes and zero spam triggers.",
        badge: "<65 WORDS · PLAIN TEXT",
      },
      {
        title: "Touchpoint 1B: LinkedIn Connection Note (<300 Chars)",
        description: "Role-calibrated founder/operator note ready to paste into LinkedIn or Sales Navigator without sounding like sales spam.",
        badge: "<300 CHARACTERS",
      },
      {
        title: "Touchpoints 2 & 3: Technical Benchmark & Breakup",
        description: "Day 4 technical benchmark bump and Day 8 low-friction trial breakup that focus on engineering ROI and shadow pilots.",
        badge: "LOW-FRICTION SHADOW PILOT",
      },
    ],
    sampleSequence: {
      account: "AccelerateSilicon Inc. (Dr. Elena Rostova — VP Silicon Eng)",
      timezone: "PST (Send Window: 08:45 AM PST Tuesday / Wednesday)",
      touchpoint1: {
        channel: "Cold Email (Founder-to-VP)",
        subject: "acceleratesilicon / 3d ic thermal sign-off",
        body: `Elena,\n\nSaw your Greenhouse posting for a Principal 3D IC Thermal Architect dealing with multi-die tapeout bottlenecks.\n\nMost teams on legacy Cadence Innovus burn 10+ days per thermal iteration. We built an accelerated sign-off engine that cuts thermal convergence down to 6 hours.\n\nOpen to reviewing the benchmark run on a 3-die test vehicle?`,
        wordCount: "54 words",
      },
      touchpoint1b: {
        channel: "LinkedIn Connection Note",
        note: `Elena — saw you're expanding AccelerateSilicon's 3D IC packaging team. Built an accelerated thermal sign-off benchmark for multi-die tapeouts on legacy Innovus flows. Would love to share the architecture run if relevant.`,
        charCount: "228 chars",
      },
      touchpoint2: {
        channel: "Day 4 Benchmark Follow-Up",
        subject: "Re: acceleratesilicon / 3d ic thermal sign-off",
        body: `Elena — quick benchmark data point: on a 4nm optical interconnect chiplet, runtime went from 38 hours to 4.2 hours with zero grid-mesh distortion.\n\nHappy to send the 2-page technical breakdown if your physical design team wants to inspect the math.`,
        wordCount: "43 words",
      },
    },
  },
};

export const caseStudyBlueprints = [
  {
    id: "eda-chips",
    vertical: "DEEP-TECH · HARDWARE & AI INFRA",
    clientType: "YC-Backed AI EDA & 3D IC Semiconductor Startup",
    location: "San Francisco, CA",
    targetBuyerPersona: "VPs of Silicon Engineering, Directors of Physical Design, and SoC Architects at Series A–D AI accelerator and optical interconnect chip startups.",
    verifiedSignalMined: "Active <30-day physical design, RTL-to-GDSII, and 3D thermal sign-off job requisitions where lean teams face tapeout bottlenecks on legacy Synopsys / Cadence flows.",
    outcome: "Delivered 10 browser-verified semiconductor accounts with past EDA tool audits, hiring verification links, and 4-touch outreach sequences.",
    metrics: [
      { label: "Accounts Delivered", value: "10 Verified" },
      { label: "Bounce Rate", value: "0.0% (0 Bounces)" },
      { label: "Sequence Word Count", value: "<60 words avg" },
    ],
    tags: ["AI EDA / 3D IC", "SERIES A-D CHIPS", "CADENCE / SYNOPSYS GAP", "4-TOUCH MATRIX"],
  },
  {
    id: "conversational-bi",
    vertical: "ENTERPRISE SAAS · DATA & ANALYTICS",
    clientType: "Enterprise Conversational AI & BI Platform",
    location: "New York, NY",
    targetBuyerPersona: "CTOs, CFOs, and VPs of Data at mid-market Fintech, E-Commerce, Healthcare, Legal Tech, and PropTech companies (50–1,000 employees).",
    verifiedSignalMined: "Live Greenhouse and Ashby requisitions explicitly seeking 'natural-language Q&A on governed BI data', 'self-serve reporting across BigQuery, GA4, and Stripe', or 'build-versus-buy BI evaluations'.",
    outcome: "Mapped 100% of leads to the startup's 14 native connectors (BigQuery, Snowflake, PostgreSQL, Databricks, Stripe, GA4, Sheets) and 6 pre-trained industry models.",
    metrics: [
      { label: "Connectors Mapped", value: "14 Native" },
      { label: "Signal Recency", value: "<14 Days Live" },
      { label: "Primary Domain Safe", value: "100%" },
    ],
    tags: ["CONVERSATIONAL BI", "DATA STACK AUDIT", "14 NATIVE CONNECTORS", "GREENHOUSE / ASHBY"],
  },
  {
    id: "voice-ai-concierge",
    vertical: "VOICE AI · HEALTHCARE & HIGH-TICKET OPS",
    clientType: "Enterprise Voice AI & High-Ticket Concierge Automation",
    location: "US & GCC Corridor",
    targetBuyerPersona: "COOs, VPs of Patient/Customer Operations, and Heads of Revenue across multi-location healthcare, real estate, and financial services.",
    verifiedSignalMined: "Active hiring surges for bilingual contact-center and intake coordinators where manual call queues leak high-LTV inbound leads.",
    outcome: "Delivered verified operational decision-makers with custom WhatsApp, LinkedIn, and email conversion sequences mapped to US & GCC local hub timezones.",
    metrics: [
      { label: "Routing Corridors", value: "US & GCC" },
      { label: "Multi-Touch Channels", value: "Email + LI + WA" },
      { label: "Bounce Ceiling", value: "<2% Guaranteed" },
    ],
    tags: ["VOICE AI / WEBRTC", "US & GCC HUBS", "WHATSAPP & LINKEDIN", "INTAKE BOTTLENECKS"],
  },
];

export const pricingTiers = [
  {
    tier: "1",
    modelName: "Proof-of-Value Sample",
    badge: "FREE PROOF OF CAPABILITY",
    price: "$0",
    period: "Free Audit",
    upfront: "$0 Upfront · $0 Retainer",
    included: [
      "10 Browser-Verified Sniper Accounts in a live 2-Tab Google Sheet",
      "SMTP-verified decision-maker emails (Anymail Finder + MailTester)",
      "Live <30-day hiring/roadmap signals with direct clickable ATS links",
      "Past & current tool gap audit (Pros vs. Cons & competitor moats)",
      "Full 4-touch founder-to-buyer Email & LinkedIn sequence matrix",
    ],
    bestFor: "Technical founders who want to inspect research depth, stack accuracy, and zero-bounce delivery before committing a dollar.",
    cta: "Claim 10 Free Accounts",
    href: "mailto:seshank@seshankailabs.com?subject=10%20free%20sniper%20accounts%20for%20our%20team",
    isPopular: false,
  },
  {
    tier: "2",
    modelName: "Pay-Per-Qualified-Lead",
    badge: "PERFORMANCE BATCH · ZERO RETAINER",
    price: "$30",
    period: "per Verified Lead",
    subprice: "$450 for 15 accounts · $900 for 30 accounts",
    upfront: "Billed strictly after client inspection",
    included: [
      "Full 10-Point Sniper Dossier per account",
      "Strict ICP qualification based on your bespoke technical criteria",
      "<2% hard-bounce ceiling with automatic 1-for-1 free replacement",
      "4-touch custom Email (<65w) and LinkedIn (<300 chars) sequences",
      "Delivered in batches of 15 or 30 for seamless pipeline integration",
      "Zero risk: pay only if every account meets your agreed checklist",
    ],
    bestFor: "Founders and GTM leaders who require performance-based pricing tied strictly to inspected, ICP-qualified leads.",
    cta: "Request Performance Batch",
    href: "mailto:seshank@seshankailabs.com?subject=Pay-per-qualified-lead%20batch%20request%20($30/lead)",
    isPopular: true,
  },
  {
    tier: "3",
    modelName: "Monthly Pipeline Engine",
    badge: "ENTERPRISE GTM ACCELERATOR",
    price: "$2,500",
    period: "to $3,397 / mo",
    subprice: "Or 14-Day Sprint: $900 fixed (30–50 accounts)",
    upfront: "Dedicated weekly batch delivery",
    included: [
      "120 to 150 Verified Sniper Accounts per month (30–35 weekly)",
      "Continuous ATS & tech-stack signal monitoring across target TAM",
      "Full multi-touch copy refreshes tailored to real-time market shifts",
      "Multi-timezone send orchestration (US corridors & GCC hubs)",
      "14-Day Outbound Sprint option available ($900 fixed for 30–50 accounts)",
      "Direct weekly sync with Seshank (Founder & Systems Architect)",
    ],
    bestFor: "Funded Seed to Series B startups aggressively scaling outbound across multiple verticals, geographies, or connector ecosystems.",
    cta: "Deploy Pipeline Engine",
    href: "mailto:seshank@seshankailabs.com?subject=Monthly%20pipeline%20intelligence%20inquiry",
    isPopular: false,
  },
];

export const leadIntelFaqs = [
  {
    question: "How do you verify email addresses, and what bounce rate do you guarantee?",
    answer:
      "Every decision-maker email is verified through a multi-step SMTP handshake and catch-all filter (Anymail Finder + MailTester) and cross-checked between Tab 1 and Tab 2 before delivery. I guarantee a hard-bounce rate under 2%, and any address that ever bounces is replaced 1-for-1 free of charge.",
  },
  {
    question: "Do you send emails from our primary domain or use fake AI personas?",
    answer:
      "Never. I do not touch your primary domain or blast prospects from fake personas on burner domains. I operate strictly as your B2B Lead Intelligence & Outbound Research Partner—delivering the verified decision-maker data, live hiring/stack signals, and custom sequences in a clean 2-Tab Google Sheet (or CSV) so your team can send from your own warmed workspace, secondary domain, or LinkedIn accounts with 100% control.",
  },
  {
    question: "Why shouldn't we just use a $100/month automated AI SDR tool like Explee or Apollo?",
    answer:
      "Automated AI SDRs pull from static contact databases, rely on generic LinkedIn bio summaries, and frequently land in spam (~38% inbox placement) using fake sender names. High-ACV enterprise buyers (CTOs, CISOs, CFOs, VPs of Engineering) ignore generic templates. Our dossiers audit live <30-day job requisitions (Greenhouse, Ashby, Lever), identify the exact legacy tools (Looker, Metabase, Cadence, Databricks) causing internal bottlenecks, and give you peer-level technical copy that earns real replies.",
  },
  {
    question: "How does the Pay-Per-Qualified-Lead model work?",
    answer:
      "There are zero retainers and zero upfront fees. We agree on your exact ICP checklist (target industries, company size, tech stack/connectors, and buyer titles) upfront. I deliver a batch of 15 ($450) or 30 ($900) verified Sniper accounts, and you only pay after inspecting the sheet to confirm every lead meets your criteria. Any non-compliant or bounced lead is swapped immediately.",
  },
];

