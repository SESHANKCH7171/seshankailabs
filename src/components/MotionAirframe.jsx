import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function MotionAirframe() {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const root = document.querySelector("[data-scroll-root]");

    if (!layer || !root || window.matchMedia(REDUCED_MOTION).matches) {
      return undefined;
    }

    const ctx = gsap.context((self) => {
      const q = self.selector;

      /* ---- Grab architecture elements ---- */
      const container = q('[data-agent="container"]');
      const bgRings = q('[data-agent="bg-rings"]');
      const coreNode = q('[data-node="langgraph"]');
      const nodeFastAPI = q('[data-node="fastapi"]');
      const nodeNeMo = q('[data-node="nemo"]');
      const nodeRedis = q('[data-node="redis"]');
      const nodePgvector = q('[data-node="pgvector"]');
      const nodePydantic = q('[data-node="pydantic"]');
      const nodeDeepEval = q('[data-node="deepeval"]');
      const packets = q("[data-packet]");
      const beamLines = q('[data-agent="beam-line"]');

      /* ---- Initial state: Upright, stable, readable ---- */
      gsap.set(packets, { autoAlpha: 0.3, scale: 0.8 });

      /* ---- Master timeline scrubbed smoothly to scroll ---- */
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      /*
       * HIGH-PRECISION ARCHITECTURAL MOTION (ZERO TILT, ZERO FLIPPING)
       * The nodes and labels stay 100% upright and legible.
       * ONLY the faint background radar coordinate rings rotate subtly.
       */

      // 1. Subtle, slow background coordinate ring rotation (60° total across the entire page)
      tl.to(
        bgRings,
        {
          rotation: 60,
          duration: 4,
          transformOrigin: "300px 300px",
        },
        0
      )
        // 2. Gentle vertical floating parallax that keeps the schematic centered with viewport
        .to(
          container,
          {
            y: -30,
            duration: 4,
          },
          0
        )
        // Phase 1 (0% -> 25%): Hero to About - Gateway & Security activate
        .to(
          [nodeFastAPI, nodeNeMo],
          {
            filter: "url(#intenseGlow)",
            stroke: "#FF1A1A",
            duration: 0.8,
          },
          0.8
        )
        // Phase 2 (25% -> 50%): Capabilities - Core LangGraph & Redis semantic cache ignite
        .to(
          [coreNode, nodeRedis],
          {
            filter: "url(#intenseGlow)",
            stroke: "#FF1A1A",
            scale: 1.06,
            transformOrigin: "center center",
            duration: 0.8,
          },
          1.6
        )
        .to(
          beamLines,
          {
            stroke: "#FF4444",
            strokeWidth: 2,
            opacity: 0.85,
            duration: 0.8,
          },
          1.6
        )
        // Phase 3 (50% -> 75%): Telemetry & Proof - Streaming vector tokens pulse rapidly
        .to(
          packets,
          {
            autoAlpha: 1,
            scale: 1.4,
            duration: 0.6,
          },
          2.4
        )
        .to(
          [nodePydantic, nodeDeepEval, nodePgvector],
          {
            filter: "url(#intenseGlow)",
            stroke: "#FF1A1A",
            duration: 0.8,
          },
          2.6
        )
        // Phase 4 (75% -> 100%): Contact - Steady, fully synchronized production lock
        .to(
          container,
          {
            scale: 1.02,
            opacity: 0.9,
            duration: 0.8,
          },
          3.2
        );
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed right-2 top-1/2 z-0 h-[min(55vw,560px)] w-[min(55vw,560px)] -translate-y-1/2 opacity-85 sm:right-6 lg:right-10 xl:right-16"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        role="img"
        aria-label="Seshank AI Labs 6-Pillar Agentic Architecture Schematic"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Subtle ambient glow */}
          <filter id="ambientGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense tactical red glow */}
          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Master gradient */}
          <linearGradient id="beamGradient" x1="100" y1="100" x2="500" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4444" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#FF1A1A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FF4444" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* ====== MASTER CONTAINER (UPRIGHT AT ALL TIMES) ====== */}
        <g data-agent="container">
          {/* ── BACKGROUND GYROSCOPIC COORDINATE RINGS (SUBTLE SPIN ONLY) ── */}
          <g data-agent="bg-rings" opacity="0.25" stroke="#FF4444" strokeDasharray="5 7">
            <circle cx="300" cy="300" r="120" strokeWidth="1" />
            <circle cx="300" cy="300" r="215" strokeWidth="1" />
            <circle cx="300" cy="300" r="280" strokeWidth="1" />
            <line x1="300" y1="20" x2="300" y2="580" strokeDasharray="4 6" opacity="0.4" />
            <line x1="20" y1="300" x2="580" y2="300" strokeDasharray="4 6" opacity="0.4" />
          </g>

          {/* ── PERMANENT CONNECTING BEAMS & DATA HIGHWAYS ── */}
          <g data-agent="beams" stroke="url(#beamGradient)" strokeWidth="1.6" filter="url(#ambientGlow)" opacity="0.6">
            {/* Core to Top (FastAPI) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="300" y2="105" />
            {/* Core to Top-Right (NeMo) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="480" y2="195" />
            {/* Core to Bottom-Right (Redis) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="480" y2="405" />
            {/* Core to Bottom (pgvector) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="300" y2="495" />
            {/* Core to Bottom-Left (Pydantic) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="120" y2="405" />
            {/* Core to Top-Left (DeepEval) */}
            <line data-agent="beam-line" x1="300" y1="300" x2="120" y2="195" />

            {/* Perimeter Hexagonal Circuit Bus */}
            <polygon
              points="300,105 480,195 480,405 300,495 120,405 120,195"
              strokeDasharray="6 4"
              opacity="0.35"
            />
          </g>

          {/* ── ANIMATED DATA TOKEN PACKETS ── */}
          <g>
            <circle data-packet cx="300" cy="202" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="390" cy="247" r="3.2" fill="#FF4444" />
            <circle data-packet cx="390" cy="352" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="300" cy="397" r="3.2" fill="#FF4444" />
            <circle data-packet cx="210" cy="352" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="210" cy="247" r="3.2" fill="#FF4444" />
          </g>

          {/* ════════════════════════════════════════════════════════════════
              THE 6 CORE ARCHITECTURAL PILLARS (SYMBOLS + CLEAN LABELS)
             ════════════════════════════════════════════════════════════════ */}

          {/* ── 1. FASTAPI (TOP: ASYNC STREAMING GATEWAY) ── */}
          <g data-node="fastapi" filter="url(#ambientGlow)">
            <circle cx="300" cy="105" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Waveform streaming symbol */}
            <path d="M 288 105 L 294 97 L 300 113 L 306 99 L 312 105" stroke="#FF1A1A" strokeWidth="1.8" strokeLinecap="round" />
            <text x="300" y="65" textAnchor="middle" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              FASTAPI
            </text>
            <text x="300" y="77" textAnchor="middle" className="fill-ember-glow font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              ASYNC SSE GATEWAY
            </text>
          </g>

          {/* ── 2. NEMO GUARDRAILS (TOP-RIGHT: SECURITY DEFENSE) ── */}
          <g data-node="nemo" filter="url(#ambientGlow)">
            <circle cx="480" cy="195" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Shield security symbol */}
            <path d="M 480 183 L 491 188 V 199 C 491 206, 480 210, 480 210 C 480 210, 469 206, 469 199 V 188 Z" stroke="#FF1A1A" strokeWidth="1.8" />
            <text x="520" y="193" textAnchor="start" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              NEMO
            </text>
            <text x="520" y="205" textAnchor="start" className="fill-tactical-red font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              GUARDRAILS / PYRIT
            </text>
          </g>

          {/* ── 3. REDIS (BOTTOM-RIGHT: SEMANTIC CACHE & BUS) ── */}
          <g data-node="redis" filter="url(#ambientGlow)">
            <circle cx="480" cy="405" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Database tier / memory symbol */}
            <ellipse cx="480" cy="397" rx="13" ry="5" stroke="#FF1A1A" strokeWidth="1.5" />
            <path d="M 467 397 V 406 C 467 409, 493 409, 493 406 V 397" stroke="#FF1A1A" strokeWidth="1.5" />
            <path d="M 467 406 V 414 C 467 417, 493 417, 493 414 V 406" stroke="#FF1A1A" strokeWidth="1.5" />
            <text x="520" y="403" textAnchor="start" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              REDIS
            </text>
            <text x="520" y="415" textAnchor="start" className="fill-ember-glow font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              SEMANTIC CACHE
            </text>
          </g>

          {/* ── 4. PGVECTOR (BOTTOM: VECTOR PERSISTENCE & MEMORY) ── */}
          <g data-node="pgvector" filter="url(#ambientGlow)">
            <circle cx="300" cy="495" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Multi-dimensional vector grid symbol */}
            <rect x="290" y="485" width="20" height="20" stroke="#FF1A1A" strokeWidth="1.4" opacity="0.8" />
            <circle cx="300" cy="495" r="3.5" fill="#FF4444" />
            <text x="300" y="535" textAnchor="middle" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              PGVECTOR
            </text>
            <text x="300" y="547" textAnchor="middle" className="fill-industrial-silver font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              VECTOR PERSISTENCE
            </text>
          </g>

          {/* ── 5. PYDANTIC V2 (BOTTOM-LEFT: SCHEMA VALIDATION ENGINE) ── */}
          <g data-node="pydantic" filter="url(#ambientGlow)">
            <circle cx="120" cy="405" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Strict validation checkmark & hexagon symbol */}
            <polygon points="120,391 132,398 132,412 120,419 108,412 108,398" stroke="#FF1A1A" strokeWidth="1.4" opacity="0.6" />
            <path d="M 115 405 L 118 408 L 125 401" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" />
            <text x="80" y="403" textAnchor="end" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              PYDANTIC V2
            </text>
            <text x="80" y="415" textAnchor="end" className="fill-tactical-red font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              SCHEMA INTEGRITY
            </text>
          </g>

          {/* ── 6. DEEPEVAL (TOP-LEFT: AUTOMATED CI/CD REGRESSION HARNESS) ── */}
          <g data-node="deepeval" filter="url(#ambientGlow)">
            <circle cx="120" cy="195" r="28" fill="#0A0A0A" stroke="#FF4444" strokeWidth="1.8" />
            {/* Benchmark meter gauge symbol */}
            <path d="M 109 200 A 12 12 0 1 1 131 200" stroke="#FF1A1A" strokeWidth="1.6" />
            <line x1="120" y1="200" x2="128" y2="191" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" />
            <text x="80" y="193" textAnchor="end" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              DEEPEVAL
            </text>
            <text x="80" y="205" textAnchor="end" className="fill-ember-glow font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              CI/CD EVALUATIONS
            </text>
          </g>

          {/* ── CENTRAL MASTER ORCHESTRATOR: LANGGRAPH (CORE BRAIN) ── */}
          <g data-node="langgraph" filter="url(#ambientGlow)">
            {/* Outer coordinate collar */}
            <circle cx="300" cy="300" r="58" stroke="#FF4444" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.6" />
            {/* Main core circle */}
            <circle cx="300" cy="300" r="44" fill="#0A0A0A" stroke="#FF1A1A" strokeWidth="2.4" />
            <circle cx="300" cy="300" r="22" fill="#FF1A1A" fillOpacity="0.18" />
            <circle cx="300" cy="300" r="8" fill="#FF4444" />
            {/* Cyclic LangGraph flow arrows */}
            <path d="M 284 274 Q 315 266 325 284" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 325 284 L 325 274" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 316 326 Q 285 334 275 316" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 275 316 L 275 326" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
            {/* Central Badge Label */}
            <text x="300" y="348" textAnchor="middle" className="fill-white font-mono text-[10px] font-bold tracking-tactical uppercase" stroke="none">
              LANGGRAPH
            </text>
            <text x="300" y="359" textAnchor="middle" className="fill-tactical-red font-mono text-[8px] tracking-tactical uppercase" stroke="none">
              CYCLIC ORCHESTRATOR
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
