import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { valueCards } from "../../data/sections.js";

export default function ValueStack() {
  return (
    <section
      id="capabilities"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:px-10"
    >
      {/* Section header */}
      <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
        SYSTEM CAPABILITIES
      </p>
      <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        Four Archetypes. Complete Production Coverage.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-industrial-silver">
        Production-grade agentic architectures engineered for FinTech underwriting,
        autonomous fleet logistics, multilingual voice CX, and regulatory document intelligence.
      </p>

      {/* Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valueCards.map((card) => (
          <article
            key={card.id}
            data-feature={card.id}
            className="group relative overflow-hidden border border-industrial-line bg-industrial-panel p-8 transition-all duration-300 hover:border-tactical-redMid hover:bg-tactical-redDim hover:shadow-ember"
          >
            {/* Top glow bar */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tactical-red to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* System label */}
            <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
              {card.system}
            </p>

            {/* Title */}
            <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-white lg:text-xl">
              {card.title}
            </h3>

            {/* Pain statement */}
            <p className="mt-5 text-sm italic leading-7 text-industrial-ash">
              &ldquo;{card.pain}&rdquo;
            </p>

            {/* Divider */}
            <div className="my-5 h-px bg-industrial-line" />

            {/* Capability */}
            <p className="text-sm leading-7 text-industrial-silver">
              {card.capability}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-industrial-line bg-stealth-deep px-2 py-1 font-mono text-[10px] uppercase tracking-tactical text-industrial-ash"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Inspect Architecture Link */}
            <Link
              to={`/architectures/${card.id}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-tactical text-tactical-red transition-colors hover:text-white"
              aria-label={`Inspect ${card.title} architecture`}
            >
              INSPECT ARCHITECTURE
              <ArrowRight size={13} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
