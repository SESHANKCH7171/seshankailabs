export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_minmax(320px,0.6fr)] lg:gap-20 lg:px-10"
    >
      {/* Left column — text */}
      <div>
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          THE ARCHITECTURAL MOAT
        </p>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
          In production AI, models are commodities. Backend architecture is the moat.
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-industrial-silver">
          <p>
            Most teams hit a wall when transitioning generative AI from demo to
            production: prompt injections, unbounded latency, soaring inference costs,
            and catastrophic schema drift. A frontend prompt wrapper cannot survive
            enterprise concurrency.
          </p>
          <p>
            Seshank AI Labs builds deterministic, high-throughput agentic infrastructure.
            We combine cyclic state machines (LangGraph), asynchronous streaming microservices
            (FastAPI), low-latency semantic caching (Redis), and enterprise guardrails
            (NeMo &amp; DeepEval) to build AI systems that never fail silently.
          </p>
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
                Role Focus
              </span>
              <span className="text-white">AI Agent Systems Architect</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Core Stack
              </span>
              <span className="text-tactical-red">
                LangGraph · FastAPI · Redis · NeMo · DeepEval
              </span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Status
              </span>
              <span className="text-ember-glow">
                Open to Founding Roles &amp; Contracts (UAE / KSA / UK)
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
