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

      /* ---- Grab agent architecture nodes ---- */
      const core = q('[data-agent="core"]');
      const gateway = q('[data-agent="gateway"]');
      const guardrail = q('[data-agent="guardrail"]');
      const cache = q('[data-agent="cache"]');
      const toolWorker = q('[data-agent="tool_worker"]');
      const validator = q('[data-agent="validator"]');
      const evaluator = q('[data-agent="evaluator"]');
      const edges = q('[data-agent="edges"]');
      const bus = q('[data-agent="bus"]');
      const hud = q('[data-agent="hud"]');
      const packets = q("[data-packet]");
      const allSatellites = [gateway, guardrail, cache, toolWorker, validator, evaluator];

      /* ---- Initial state ---- */
      gsap.set([core, ...allSatellites], {
        transformBox: "fill-box",
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });
      gsap.set(packets, { autoAlpha: 0, scale: 0.5 });
      gsap.set(hud, { opacity: 0.85 });

      /* ---- Master timeline scrubbed to scroll ---- */
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
       * PHASE 1 — DECOMPOSITION & GRAPH EXPANSION (scroll 0 % → 25 %)
       * Central state machine expands outwards into modular distributed agents.
       */
      tl.to(core, { rotation: 360, scale: 1.08, duration: 1 }, 0)
        .to(gateway, { x: -45, y: -50, scale: 1.05, duration: 1 }, 0)
        .to(guardrail, { x: 55, y: -45, scale: 1.05, duration: 1 }, 0)
        .to(cache, { x: 70, y: 15, scale: 1.05, duration: 1 }, 0)
        .to(toolWorker, { x: 45, y: 55, scale: 1.05, duration: 1 }, 0)
        .to(validator, { x: -50, y: 50, scale: 1.05, duration: 1 }, 0)
        .to(evaluator, { x: -65, y: 10, scale: 1.05, duration: 1 }, 0)
        .to(edges, { opacity: 0.75, strokeWidth: 1.8, duration: 1 }, 0);

      /*
       * PHASE 2 — SECURITY DEFLECTION & LATENCY CACHE HIT (scroll 25 % → 50 %)
       * NeMo Guardrails shields prompt injections; Redis intercepts repeated embeddings.
       */
      tl.to(
          guardrail,
          { stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 1 },
          1,
        )
        .to(
          cache,
          { stroke: "#FF4444", filter: "url(#redGlow)", duration: 1 },
          1.15,
        )
        .to(
          core,
          { rotation: 720, stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 1 },
          1,
        )
        .to(bus, { strokeDashoffset: -60, duration: 1 }, 1);

      /*
       * PHASE 3 — CYCLIC STATE CONVERGENCE & VECTOR TOKEN STREAM (scroll 50 % → 75 %)
       * Streaming token packets flow along LangGraph cyclic edges between workers & core.
       */
      tl.to(
          allSatellites,
          {
            x: 0,
            y: 0,
            scale: 1,
            stroke: "#FF4444",
            filter: "url(#glowFilter)",
            duration: 1,
          },
          2,
        )
        .to(core, { rotation: 1080, scale: 1, duration: 1 }, 2)
        .to(packets, { autoAlpha: 1, scale: 1.2, stagger: 0.1, duration: 0.7 }, 2.2);

      /*
       * PHASE 4 — PRODUCTION CORE LOCK & DEPLOYMENT (scroll 75 % → 100 %)
       * Nodes lock into unified high-availability production core.
       */
      tl.to(
          layer,
          { rotate: 15, scale: 1.04, xPercent: 2, yPercent: -2, duration: 1 },
          3,
        )
        .to(packets, { autoAlpha: 0.3, duration: 0.4 }, 3.5)
        .to(
          [core, ...allSatellites],
          { stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 0.6 },
          3.4,
        );
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed right-[-16rem] top-1/2 z-0 h-[min(72vw,760px)] w-[min(92vw,920px)] -translate-y-1/2 opacity-80 sm:right-[-8rem] lg:right-[-2rem]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 920 620"
        role="img"
        aria-label="Interactive Multi-Agent State Machine Architecture Wireframe"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Base glow — subtle warm red */}
          <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense glow — active / highlighted nodes */}
          <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient across the entire agentic topology */}
          <linearGradient
            id="agentGraphFade"
            x1="120"
            x2="840"
            y1="60"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF4444" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#FF1A1A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FF4444" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* ====== MASTER AGENTIC GRAPH GROUP ====== */}
        <g
          stroke="url(#agentGraphFade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        >
          {/* ── BACKGROUND ORBITAL RINGS & STATE HORIZONS ── */}
          <g opacity="0.25" strokeDasharray="6 6">
            <circle cx="480" cy="310" r="160" />
            <circle cx="480" cy="310" r="240" />
            <circle cx="480" cy="310" r="310" />
          </g>

          {/* ── INTERCONNECTING GRAPH EDGES & CYCLIC STATE LOOPS ── */}
          <g data-agent="edges" opacity="0.45">
            {/* Core to Gateway */}
            <path d="M 480 310 Q 380 230 300 170" />
            {/* Core to Guardrail */}
            <path d="M 480 310 Q 580 230 670 180" />
            {/* Core to Cache */}
            <path d="M 480 310 Q 610 320 730 320" />
            {/* Core to Tool Worker */}
            <path d="M 480 310 Q 580 410 650 470" />
            {/* Core to Validator */}
            <path d="M 480 310 Q 390 410 310 460" />
            {/* Core to Evaluator */}
            <path d="M 480 310 Q 350 310 230 310" />

            {/* Cyclic LangGraph feedback loops between nodes */}
            <path
              d="M 300 170 C 480 120, 520 120, 670 180"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <path
              d="M 670 180 C 740 230, 750 270, 730 320"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <path
              d="M 730 320 C 740 400, 710 440, 650 470"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <path
              d="M 650 470 C 500 520, 430 520, 310 460"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <path
              d="M 310 460 C 240 420, 210 370, 230 310"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <path
              d="M 230 310 C 230 240, 260 200, 300 170"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          </g>

          {/* ── HIGH-SPEED VECTOR BUS ── */}
          <path
            data-agent="bus"
            d="M 480 230 C 560 230, 620 280, 620 310 C 620 340, 560 390, 480 390 C 400 390, 340 340, 340 310 C 340 280, 400 230, 480 230 Z"
            strokeDasharray="12 8"
            opacity="0.5"
          />

          {/* ── CENTRAL ORCHESTRATOR NODE (LANGGRAPH CYCLIC CORE) ── */}
          <g data-agent="core">
            {/* Outer coordinate ring with tick marks */}
            <circle cx="480" cy="310" r="76" strokeWidth="1.2" opacity="0.6" />
            <circle cx="480" cy="310" r="54" strokeWidth="2.2" />
            <circle cx="480" cy="310" r="28" fill="#FF1A1A" fillOpacity="0.16" />
            <circle cx="480" cy="310" r="10" fill="#FF4444" />
            {/* Core crosshairs */}
            <line x1="480" y1="220" x2="480" y2="400" strokeDasharray="6 4" opacity="0.4" />
            <line x1="390" y1="310" x2="570" y2="310" strokeDasharray="6 4" opacity="0.4" />
            {/* Cyclic arrows in core */}
            <path d="M 460 270 Q 500 260 515 285" strokeWidth="1.8" />
            <path d="M 515 285 L 515 272" strokeWidth="1.8" />
            <path d="M 500 350 Q 460 360 445 335" strokeWidth="1.8" />
            <path d="M 445 335 L 445 348" strokeWidth="1.8" />
            {/* Telemetry text label */}
            <text
              x="480"
              y="410"
              textAnchor="middle"
              className="fill-industrial-silver font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [LANGGRAPH_ORCHESTRATOR]
            </text>
          </g>

          {/* ── NODE 1: FASTAPI ASYNC GATEWAY & SSE ROUTER ── */}
          <g data-agent="gateway">
            <circle cx="300" cy="170" r="32" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            <circle cx="300" cy="170" r="16" strokeDasharray="4 2" />
            {/* Streaming waveform icon */}
            <path d="M 288 170 L 294 162 L 300 178 L 306 164 L 312 170" strokeWidth="1.6" />
            <text
              x="300"
              y="126"
              textAnchor="middle"
              className="fill-ember-glow font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [GATEWAY: FASTAPI_STREAM]
            </text>
          </g>

          {/* ── NODE 2: NEMO GUARDRAILS & PYRIT DEFENSE SHIELD ── */}
          <g data-agent="guardrail">
            <circle cx="670" cy="180" r="34" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            {/* Shield geometry */}
            <path d="M 670 162 L 685 170 V 186 C 685 196, 670 202, 670 202 C 670 202, 655 196, 655 186 V 170 Z" strokeWidth="1.6" />
            <text
              x="670"
              y="134"
              textAnchor="middle"
              className="fill-tactical-red font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [SECURITY: NEMO_GUARDRAILS]
            </text>
          </g>

          {/* ── NODE 3: REDIS SEMANTIC CACHE & EMBEDDING BUS ── */}
          <g data-agent="cache">
            <circle cx="730" cy="320" r="34" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            {/* Cache database cylinder stack */}
            <ellipse cx="730" cy="310" rx="16" ry="6" strokeWidth="1.4" />
            <path d="M 714 310 V 322 C 714 326, 746 326, 746 322 V 310" strokeWidth="1.4" />
            <path d="M 714 322 V 334 C 714 338, 746 338, 746 334 V 322" strokeWidth="1.4" />
            <text
              x="730"
              y="374"
              textAnchor="middle"
              className="fill-industrial-silver font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [MEMORY: REDIS_CACHE]
            </text>
          </g>

          {/* ── NODE 4: TOOL WORKER (SQL / API / ERP AGENT) ── */}
          <g data-agent="tool_worker">
            <circle cx="650" cy="470" r="32" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            {/* Autonomous execution brackets */}
            <path d="M 640 462 L 634 470 L 640 478" strokeWidth="1.5" />
            <path d="M 660 462 L 666 470 L 660 478" strokeWidth="1.5" />
            <line x1="645" y1="475" x2="655" y2="465" strokeWidth="1.5" />
            <text
              x="650"
              y="522"
              textAnchor="middle"
              className="fill-industrial-silver font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [WORKER: TOOL_EXECUTOR]
            </text>
          </g>

          {/* ── NODE 5: PYDANTIC V2 SCHEMA VALIDATOR ── */}
          <g data-agent="validator">
            <circle cx="310" cy="460" r="32" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            {/* Verification check and hexagon */}
            <polygon points="310,442 325,451 325,469 310,478 295,469 295,451" strokeWidth="1.4" opacity="0.7" />
            <path d="M 304 460 L 308 464 L 316 456" strokeWidth="1.8" />
            <text
              x="310"
              y="512"
              textAnchor="middle"
              className="fill-industrial-silver font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [SCHEMA: PYDANTIC_V2]
            </text>
          </g>

          {/* ── NODE 6: DEEPEVAL REGRESSION BENCHMARK HARNESS ── */}
          <g data-agent="evaluator">
            <circle cx="230" cy="310" r="32" strokeWidth="1.8" fill="#0A0A0A" fillOpacity="0.8" />
            {/* Benchmark meter gauge */}
            <path d="M 218 316 A 14 14 0 1 1 242 316" strokeWidth="1.6" />
            <line x1="230" y1="316" x2="238" y2="306" strokeWidth="1.8" />
            <text
              x="230"
              y="362"
              textAnchor="middle"
              className="fill-ember-glow font-mono text-[9px] tracking-tactical uppercase"
              stroke="none"
            >
              [EVALS: DEEPEVAL]
            </text>
          </g>

          {/* ── ANIMATED STREAMING TOKEN PACKETS (DATA VECTORS) ── */}
          <g>
            <circle data-packet cx="390" cy="240" r="3.5" fill="#FF1A1A" />
            <circle data-packet cx="575" cy="245" r="3.5" fill="#FF4444" />
            <circle data-packet cx="605" cy="315" r="3.5" fill="#FF1A1A" />
            <circle data-packet cx="565" cy="390" r="3.5" fill="#FF4444" />
            <circle data-packet cx="395" cy="385" r="3.5" fill="#FF1A1A" />
            <circle data-packet cx="355" cy="310" r="3.5" fill="#FF4444" />
            <circle data-packet cx="485" cy="180" r="2.8" fill="#FF1A1A" />
            <circle data-packet cx="710" cy="250" r="2.8" fill="#FF4444" />
            <circle data-packet cx="710" cy="395" r="2.8" fill="#FF1A1A" />
            <circle data-packet cx="480" cy="495" r="2.8" fill="#FF4444" />
            <circle data-packet cx="265" cy="390" r="2.8" fill="#FF1A1A" />
            <circle data-packet cx="260" cy="240" r="2.8" fill="#FF4444" />
          </g>

          {/* ── TELEMETRY HUD MONITOR CARD ── */}
          <g data-agent="hud" opacity="0.8">
            <rect
              x="620"
              y="30"
              width="240"
              height="80"
              fill="#0A0A0A"
              fillOpacity="0.88"
              stroke="#1E1E1E"
              strokeWidth="1"
            />
            <line x1="620" y1="30" x2="645" y2="30" stroke="#FF1A1A" strokeWidth="2.5" />
            <text x="635" y="48" className="fill-industrial-ash font-mono text-[9px] uppercase tracking-tactical" stroke="none">
              AGENTIC SYSTEM RUNTIME
            </text>
            <text x="635" y="66" className="fill-white font-mono text-[11px] uppercase tracking-tactical font-semibold" stroke="none">
              TTFT: 148MS · 0 BREACHES
            </text>
            <text x="635" y="84" className="fill-tactical-red font-mono text-[9px] uppercase tracking-tactical" stroke="none">
              LANGGRAPH PERSISTENCE: REDIS
            </text>
            <text x="635" y="98" className="fill-ember-glow font-mono text-[9px] uppercase tracking-tactical" stroke="none">
              SCHEMA DRIFT: 0.00% PASS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
