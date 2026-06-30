export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_minmax(320px,0.6fr)] lg:gap-20 lg:px-10"
    >
      {/* Left column — text */}
      <div>
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          WHY THIS EXISTS
        </p>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Domain depth is the only moat.
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-industrial-silver">
          <p>
            India&apos;s Tier-2 defense manufacturers — the machining shops, sensor
            assemblers, and composite fabricators in Satpur, Ambad, and Igatpuri —
            are operationally capable but administratively overwhelmed. They lose
            tenders not because of poor engineering, but because of documentation
            lag and compliance complexity.
          </p>
          <p>
            We built Seshank AI Labs to close that gap. Not with generic AI tools,
            but with systems calibrated for the specific documents, standards, and
            procurement workflows that govern Indian defense manufacturing —
            AS9100, DGAQA, DRDO tenders, HAL subcontracting norms.
          </p>
        </div>

        {/* Credential panel */}
        <div className="mt-10 max-w-md border border-industrial-line bg-industrial-panel p-6">
          <div className="space-y-2 font-mono text-sm">
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Founder
              </span>
              <span className="text-white">Seshank</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Background
              </span>
              <span className="text-white">M.Tech — IIT Madras</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Domain
              </span>
              <span className="text-white">Aerospace &amp; Defense AI Systems</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Location
              </span>
              <span className="text-white">Nashik, Maharashtra</span>
            </div>
            <div className="flex gap-4">
              <span className="w-28 shrink-0 uppercase tracking-tactical text-industrial-ash">
                Status
              </span>
              <span className="text-ember-glow">
                Actively building · Open to discovery conversations
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
