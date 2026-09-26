import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { demoData } from "../../data/sections.js";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = ["BENCHMARK ID", "WORKLOAD ARCHITECTURE", "EVALUATION PARAMETER", "VERIFIED RESULT"];

export default function CaseStudies() {
  const tableRef = useRef(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll("[data-row]");
      gsap.from(rows, {
        opacity: 0,
        x: -12,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proof"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:px-10"
    >
      {/* Section header */}
      <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
        TELEMETRY &amp; PROOF
      </p>
      <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        Deterministic Architecture Benchmarks
      </h2>

      {/* Demo mode banner */}
      <div className="mt-4 inline-flex items-center gap-3 border border-industrial-line bg-industrial-panel px-4 py-2">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember-glow" />
        <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
          VERIFIED DATA — CONTINUOUS INTEGRATION &amp; PYRIT RED-TEAM TELEMETRY
        </span>
      </div>

      {/* Data table */}
      <div
        ref={tableRef}
        className="mt-8 overflow-hidden border border-industrial-line bg-industrial-panel"
      >
        {/* Table header */}
        <div className="hidden grid-cols-[1.1fr_1.3fr_1.3fr_1fr] border-b border-industrial-line px-5 py-3 md:grid">
          {COLUMNS.map((col) => (
            <span
              key={col}
              className="font-mono text-[11px] uppercase tracking-tactical text-ember-glow"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-industrial-line">
          {demoData.map((row) => (
            <div
              key={row.id}
              data-row
              className="group grid grid-cols-1 gap-2 px-5 py-4 text-sm transition-colors hover:bg-tactical-redDim/40 md:grid-cols-[1.1fr_1.3fr_1.3fr_1fr] md:gap-3"
            >
              <span className="font-mono text-tactical-red">{row.id}</span>
              <span className="text-industrial-silver">{row.doc}</span>
              <span className="font-mono text-ember-glow">{row.param}</span>
              <span className="font-mono text-white">{row.confidence}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA below table */}
      <div className="mt-8 max-w-2xl">
        <p className="text-base leading-8 text-industrial-silver">
          Every architecture is validated with automated DeepEval regression suites,
          adversarial PyRIT testing, and low-latency Redis semantic caching.
        </p>
        <a
          href="#contact"
          className="mt-5 inline-flex items-center gap-2 border border-tactical-red bg-tactical-redDim px-5 py-3 font-mono text-sm uppercase tracking-tactical text-tactical-red shadow-tactical transition-all duration-300 hover:bg-tactical-red hover:text-stealth-black"
          aria-label="Request custom architecture review"
        >
          DISCUSS ARCHITECTURE / REQUEST CODE
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
