import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, ShieldCheck, Terminal, Layers } from "lucide-react";
import { architecturesData } from "../data/architectures.js";

export default function ArchitectureDetailPage() {
  const { id } = useParams();
  const arch = architecturesData[id];

  if (!arch) {
    return (
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-40 text-center">
        <p className="font-mono text-sm uppercase text-tactical-red">404 · SYSTEM UNRESOLVED</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Architecture Blueprint Not Found</h1>
        <p className="mt-4 text-industrial-silver">The requested system archetype is currently unmapped.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 border border-tactical-red px-6 py-3 font-mono text-sm text-tactical-red hover:bg-tactical-red hover:text-stealth-black transition-colors"
        >
          <ArrowLeft size={16} /> RETURN TO SYSTEMS LAB
        </Link>
      </div>
    );
  }

  return (
    <article className="relative z-10 mx-auto max-w-5xl px-5 py-32 sm:px-8 lg:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs uppercase tracking-tactical text-industrial-ash">
        <Link to="/" className="transition-colors hover:text-tactical-red">LAB ROOT</Link>
        <span>/</span>
        <Link to="/#capabilities" className="transition-colors hover:text-tactical-red">ARCHITECTURES</Link>
        <span>/</span>
        <span className="text-white">{arch.id}</span>
      </nav>

      {/* Header */}
      <div className="mt-8">
        <span className="inline-block border border-tactical-red/50 bg-tactical-redDim px-3 py-1 font-mono text-xs font-semibold uppercase tracking-tactical text-tactical-red">
          {arch.number}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
          {arch.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-industrial-silver">
          {arch.tagline}
        </p>

        {/* Target ecosystems */}
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-industrial-ash uppercase">TARGET DOMAIN:</span>
          <span className="border border-industrial-line bg-industrial-panel px-3 py-1 text-white">{arch.vertical}</span>
          <span className="text-industrial-ash uppercase ml-3">REPRESENTATIVE TARGETS:</span>
          <span className="border border-industrial-line bg-industrial-panel px-3 py-1 text-ember-glow">{arch.typicalTargets}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {arch.metrics.map((m) => (
          <div key={m.label} className="border border-industrial-line bg-industrial-panel p-5">
            <p className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">{m.label}</p>
            <p className="mt-2 font-mono text-2xl font-bold text-tactical-red">{m.value}</p>
            <p className="mt-1 font-mono text-[10px] text-industrial-silver">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Problem & Solution Breakdown */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="border border-industrial-line bg-industrial-panel p-8">
          <div className="flex items-center gap-3 text-ember-glow font-mono text-xs uppercase tracking-tactical">
            <ShieldCheck size={18} />
            <span>THE PRODUCTION PROBLEM</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-industrial-silver">
            {arch.problem}
          </p>
        </div>

        <div className="border border-industrial-line bg-industrial-panel p-8">
          <div className="flex items-center gap-3 text-tactical-red font-mono text-xs uppercase tracking-tactical">
            <Cpu size={18} />
            <span>THE ENGINEERED ARCHITECTURE</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-industrial-silver">
            {arch.solution}
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">PRODUCTION STACK COMPONENTS</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {arch.stack.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 border border-industrial-line bg-stealth-deep px-4 py-2 font-mono text-xs uppercase text-industrial-silver"
            >
              <CheckCircle2 size={13} className="text-tactical-red" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="mt-16 border border-industrial-line bg-industrial-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-tactical text-ember-glow">
          <Layers size={18} />
          <span>SYSTEM TOPOLOGY &amp; STATE MACHINE SPECIFICATION</span>
        </div>
        <pre className="mt-6 overflow-x-auto rounded border border-industrial-line bg-stealth-deep p-5 font-mono text-xs leading-relaxed text-industrial-silver">
          {arch.architectureDiagram}
        </pre>
      </div>

      {/* Code Implementation Snippet */}
      <div className="mt-12 border border-industrial-line bg-industrial-panel p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-tactical text-industrial-ash">
          <span className="flex items-center gap-2 text-white">
            <Terminal size={16} className="text-tactical-red" />
            <span>PRODUCTION FASTAPI &amp; LANGGRAPH INTEGRATION</span>
          </span>
          <span className="text-[11px] text-ember-glow">PYTHON 3.11+ / ASYNC</span>
        </div>
        <pre className="mt-5 overflow-x-auto rounded border border-industrial-line bg-stealth-deep p-5 font-mono text-xs leading-relaxed text-tactical-red">
          <code>{arch.codeSnippet}</code>
        </pre>
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-16 border border-tactical-red/60 bg-tactical-redDim p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">Deploying Similar Systems on Your Roadmap?</h3>
          <p className="mt-2 text-sm leading-relaxed text-industrial-silver max-w-xl">
            Seshank AI Labs builds and audits production agentic pipelines for high-growth startups in the GCC and UK.
          </p>
        </div>
        <Link
          to="/#contact"
          className="shrink-0 inline-flex items-center gap-3 border border-tactical-red bg-tactical-red px-6 py-4 font-mono text-xs uppercase tracking-tactical text-stealth-black font-semibold hover:bg-transparent hover:text-tactical-red transition-all"
        >
          DISCUSS ARCHITECTURE <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
