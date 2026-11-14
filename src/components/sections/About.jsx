export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_minmax(320px,0.6fr)] lg:gap-20 lg:px-10 scroll-mt-28"
    >
      {/* Left column — text */}
      <div>
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          THE ARCHITECTURAL MOAT &amp; FOUNDER AUTHORITY
        </p>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
          In production AI &amp; deep-tech GTM, execution precision is the moat.
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-industrial-silver">
          <p>
            Whether scaling go-to-market pipelines or shipping production AI, high-tech startups
            face the same critical failure mode: superficial wrappers. Static lead scrapers burn target
            accounts with generic AI spam, while naive prompt wrappers collapse under enterprise latency and schema drift.
          </p>
          <p>
            Seshank AI Labs operates at the intersection of two synergistic engineering pillars:
          </p>
          <ul className="space-y-3 font-mono text-xs leading-relaxed text-industrial-silver border-l-2 border-tactical-red/60 pl-4 py-1">
            <li>
              <span className="text-white font-semibold">01. B2B Sniper Lead Intelligence:</span> Browser-verified
              buyer dossiers backed by live &lt;30-day ATS signals, tool gap audits, and &lt;65-word peer-to-peer sequences with a &lt;2% bounce guarantee.
            </li>
            <li>
              <span className="text-white font-semibold">02. Production Agentic AI Backends:</span> Deterministic
              cyclic state machines (LangGraph), asynchronous streaming microservices (FastAPI), Redis semantic caching, and NeMo Guardrails that never fail silently.
            </li>
          </ul>
        </div>

        {/* Credential panel */}
        <div className="mt-10 max-w-md border border-industrial-line bg-industrial-panel p-6">
          <div className="space-y-2 font-mono text-sm">
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Founder
              </span>
              <span className="text-white">Seshank Chinnapotula</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Background
              </span>
              <span className="text-white">M.Tech — IIT Madras</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Dual Focus
              </span>
              <span className="text-white">
                B2B Lead Intelligence &amp; AI Systems
              </span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Tech Stack
              </span>
              <span className="text-tactical-red">
                LangGraph · FastAPI · Redis · NeMo · LiveKit
              </span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                GTM Moat
              </span>
              <span className="text-ember-glow">
                &lt;2% Bounce Guarantee · &lt;30-Day Signals
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — airframe animates here on desktop */}
      <div className="hidden lg:block" aria-hidden="true" />
    </section>
  );
}
