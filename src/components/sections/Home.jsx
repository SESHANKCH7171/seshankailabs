import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDown, ShieldCheck, Crosshair, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { openSniperModal } from "../SniperDossierModal.jsx";

export default function Home() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-hero-animate]");
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-32 sm:px-8 lg:px-10 scroll-mt-28"
    >
      {/* Eyebrow */}
      <div data-hero-animate className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 border border-tactical-red/40 bg-tactical-redDim px-2.5 py-1 font-mono text-[11px] uppercase tracking-tactical text-tactical-red">
          <Crosshair size={12} className="text-tactical-red animate-pulse" />
          PILLAR 01: B2B SNIPER LEAD INTEL
        </span>
        <span className="inline-flex items-center gap-1.5 border border-industrial-line bg-industrial-panel px-2.5 py-1 font-mono text-[11px] uppercase tracking-tactical text-industrial-silver">
          <Sparkles size={12} className="text-ember-glow" />
          PILLAR 02: PRODUCTION AGENTIC AI
        </span>
      </div>

      {/* H1 */}
      <h1
        data-hero-animate
        className="mt-6 max-w-5xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl"
      >
        We Don&apos;t Build Chatbots.
      </h1>
      <h1
        data-hero-animate
        className="mt-2 max-w-5xl font-display text-4xl font-bold leading-[1.08] text-tactical-red sm:text-5xl lg:text-7xl"
      >
        We Architect Agentic Backends &amp; Sniper Lead Intelligence.
      </h1>

      {/* Sub-headline */}
      <p
        data-hero-animate
        className="mt-8 max-w-2xl text-lg leading-8 text-industrial-silver"
      >
        Two synergistic engineering pillars architected by Seshank Chinnapotula (M.Tech IIT Madras):
        browser-verified enterprise buyer dossiers with live &lt;30-day buying signals for deep-tech GTM —
        paired with deterministic, sub-200ms agentic infrastructure engineered with LangGraph, FastAPI, and NeMo Guardrails.
      </p>

      {/* Metric badges strip */}
      <div
        data-hero-animate
        className="mt-6 flex flex-wrap items-center gap-2.5 pt-2"
      >
        <div className="inline-flex items-center gap-2 border border-industrial-line bg-industrial-panel px-3 py-1.5 font-mono text-xs text-industrial-silver">
          <ShieldCheck size={14} className="text-tactical-red" />
          <span>&lt;2% Bounce Guarantee</span>
        </div>
        <div className="inline-flex items-center gap-2 border border-industrial-line bg-industrial-panel px-3 py-1.5 font-mono text-xs text-industrial-silver">
          <span className="h-1.5 w-1.5 rounded-full bg-ember-glow animate-pulse" />
          <span>&lt;30-Day Live Signals</span>
        </div>
        <div className="inline-flex items-center gap-2 border border-industrial-line bg-industrial-panel px-3 py-1.5 font-mono text-xs text-industrial-silver">
          <span className="text-tactical-red font-bold">0</span>
          <span>Fake Personas (100% Domain-Safe)</span>
        </div>
        <div className="inline-flex items-center gap-2 border border-industrial-line bg-industrial-panel px-3 py-1.5 font-mono text-xs text-industrial-silver">
          <span className="text-ember-glow font-bold">$0</span>
          <span>Upfront Retainer</span>
        </div>
      </div>

      {/* CTAs */}
      <div data-hero-animate className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => openSniperModal("Free 10-Account Sniper Dossier ($0)")}
          id="cta-sniper-dossier"
          className="focus-ring inline-flex items-center gap-3 border border-tactical-red bg-tactical-red px-6 py-4 font-mono text-sm uppercase tracking-tactical text-stealth-black shadow-tactical transition-all duration-300 hover:bg-transparent hover:text-tactical-red hover:shadow-ember"
          aria-label="Request your free 10-lead sniper dossier"
        >
          Request Your Free 10-Lead Sniper Dossier
          <ArrowUpRight size={18} />
        </button>
        <a
          href="#capabilities"
          id="cta-explore-arch"
          className="focus-ring inline-flex items-center gap-3 border border-industrial-line bg-industrial-panel px-6 py-4 font-mono text-sm uppercase tracking-tactical text-industrial-silver transition-all duration-300 hover:border-tactical-red hover:text-white"
          aria-label="Explore production agentic architectures"
        >
          Explore Agentic AI Systems
          <ArrowDown size={16} />
        </a>
        <a
          href="#lead-intelligence"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-tactical text-industrial-ash transition-colors hover:text-tactical-red"
          aria-label="Inspect 10-point sniper dossier breakdown"
        >
          Inspect Outbound Dossier Matrix &darr;
        </a>
      </div>

      {/* Secondary trust reassurance */}
      <p
        data-hero-animate
        className="mt-4 font-mono text-xs text-industrial-ash"
      >
        Zero upfront fees. Zero fake sender personas. Zero risk to your primary domain.
      </p>

      {/* Status strip */}
      <div
        data-hero-animate
        className="mt-12 flex flex-wrap items-center gap-3 border-t border-industrial-line/60 pt-6 font-mono text-xs uppercase tracking-tactical text-industrial-ash"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-tactical-red animate-ping" />
        <span>SYS STATUS: DELIVERING B2B BUYER DOSSIERS &amp; LOW-LATENCY AI BACKENDS · SESHANK (M.TECH IIT MADRAS)</span>
      </div>
    </section>
  );
}
