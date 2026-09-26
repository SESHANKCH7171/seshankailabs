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
      const masterGraph = q('[data-agent="master-graph"]');
      const core = q('[data-agent="core"]');
      const innerRings = q('[data-agent="inner-rings"]');
      const outerRings = q('[data-agent="outer-rings"]');
      const nodeGlows = q('[data-agent="node-glow"]');
      const packets = q("[data-packet]");
      const energyBeams = q('[data-agent="energy-beam"]');

      /* ---- Initial state: Centered transformation origin ---- */
      gsap.set(masterGraph, {
        transformBox: "view-box",
        transformOrigin: "480px 310px",
        willChange: "transform, opacity",
      });

      gsap.set(core, {
        transformBox: "fill-box",
        transformOrigin: "50% 50%",
      });

      gsap.set(packets, { autoAlpha: 0.2, scale: 0.8 });

      /* ---- Master timeline scrubbed smoothly to scroll ---- */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      /*
       * UNIFIED HARMONIC MOTION (NO TILTING, NO DISCONNECTED LINES)
       * The master graph rotates smoothly around its central core as one connected body.
       */
      tl.to(
        masterGraph,
        {
          rotation: 240, // Smooth orbital rotation across the whole page scroll
          duration: 4,
        },
        0
      )
        // Counter-rotation of core for high-tech gyroscopic effect
        .to(
          core,
          {
            rotation: -360,
            scale: 1.15,
            duration: 4,
          },
          0
        )
        // Independent subtle spin on inner precision ring
        .to(
          innerRings,
          {
            rotation: -180,
            duration: 4,
            transformBox: "view-box",
            transformOrigin: "480px 310px",
          },
          0
        )
        // Phase 1 (0% -> 25%): Hero to About - Subtle breathing expansion
        .to(
          outerRings,
          {
            scale: 1.05,
            opacity: 0.45,
            duration: 1,
            transformBox: "view-box",
            transformOrigin: "480px 310px",
          },
          0
        )
        // Phase 2 (25% -> 50%): Capabilities - High energy red pulse
        .to(
          nodeGlows,
          {
            stroke: "#FF1A1A",
            fill: "#FF1A1A",
            fillOpacity: 0.25,
            filter: "url(#redGlow)",
            duration: 0.8,
          },
          1
        )
        .to(
          energyBeams,
          {
            strokeWidth: 2.2,
            opacity: 0.8,
            duration: 0.8,
          },
          1
        )
        // Phase 3 (50% -> 75%): Telemetry - Streaming data packets activate
        .to(
          packets,
          {
            autoAlpha: 1,
            scale: 1.4,
            stagger: {
              each: 0.08,
              repeat: -1,
              yoyo: true,
            },
            duration: 0.6,
          },
          2
        )
        // Phase 4 (75% -> 100%): Contact - Steady, grounded lock (NO TILT)
        .to(
          masterGraph,
          {
            scale: 0.96, // Slight clean pull-back into focal lock
            opacity: 0.75,
            duration: 1,
          },
          3
        )
        .to(
          nodeGlows,
          {
            stroke: "#FF4444",
            filter: "url(#glowFilter)",
            duration: 1,
          },
          3
        );
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed right-[-14rem] top-1/2 z-0 h-[min(72vw,740px)] w-[min(90vw,900px)] -translate-y-1/2 opacity-75 sm:right-[-7rem] lg:right-[-1rem] xl:right-[1rem]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 960 620"
        role="img"
        aria-label="Interactive Multi-Agent Cybernetic Systems Core"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Base ambient glow */}
          <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense red highlight glow */}
          <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Master Cybernetic Red Gradient */}
          <linearGradient
            id="cyberFade"
            x1="160"
            x2="800"
            y1="80"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF4444" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#FF1A1A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FF4444" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* ====== UNIFIED MASTER GRAPH (CONNECTED AS ONE COHESIVE SYSTEM) ====== */}
        <g
          data-agent="master-graph"
          stroke="url(#cyberFade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        >
          {/* ── PRECISION RADAR HORIZONS & COORDINATE RINGS ── */}
          <g data-agent="outer-rings" opacity="0.3" strokeDasharray="6 6">
            <circle cx="480" cy="310" r="140" />
            <circle cx="480" cy="310" r="230" />
            <circle cx="480" cy="310" r="300" />
          </g>

          {/* ── GYROSCOPIC INNER DEGREE TICKS ── */}
          <g data-agent="inner-rings" opacity="0.4" strokeDasharray="3 7">
            <circle cx="480" cy="310" r="185" strokeWidth="1.2" />
            {/* Cardinal cross lines */}
            <line x1="480" y1="120" x2="480" y2="500" strokeDasharray="8 6" opacity="0.25" />
            <line x1="290" y1="310" x2="670" y2="310" strokeDasharray="8 6" opacity="0.25" />
          </g>

          {/* ── PERMANENT CONNECTING EDGES (NEVER DETACH) ── */}
          <g data-agent="energy-beam" opacity="0.55">
            {/* Core to Top-Left Node (Streaming Gateway) */}
            <line x1="480" y1="310" x2="315" y2="185" strokeWidth="1.6" />
            {/* Core to Top-Right Node (Guardrail Shield) */}
            <line x1="480" y1="310" x2="645" y2="185" strokeWidth="1.6" />
            {/* Core to Right Node (Memory/Cache) */}
            <line x1="480" y1="310" x2="710" y2="310" strokeWidth="1.6" />
            {/* Core to Bottom-Right Node (Worker Agent) */}
            <line x1="480" y1="310" x2="645" y2="435" strokeWidth="1.6" />
            {/* Core to Bottom-Left Node (Validator) */}
            <line x1="480" y1="310" x2="315" y2="435" strokeWidth="1.6" />
            {/* Core to Left Node (Evaluation Benchmark) */}
            <line x1="480" y1="310" x2="250" y2="310" strokeWidth="1.6" />

            {/* Perimeter Constellation Arcs (Connecting the outer nodes into a loop) */}
            <path
              d="M 315 185 L 645 185 L 710 310 L 645 435 L 315 435 L 250 310 Z"
              strokeDasharray="6 4"
              opacity="0.35"
            />
          </g>

          {/* ── PULSING TOKEN PACKETS ALONG THE VECTORS ── */}
          <g>
            <circle data-packet cx="397" cy="247" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="562" cy="247" r="3.2" fill="#FF4444" />
            <circle data-packet cx="595" cy="310" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="562" cy="372" r="3.2" fill="#FF4444" />
            <circle data-packet cx="397" cy="372" r="3.2" fill="#FF1A1A" />
            <circle data-packet cx="365" cy="310" r="3.2" fill="#FF4444" />
          </g>

          {/* ── 6 SATELLITE CYBERNETIC NODES (MINIMALIST ICON GLYPHS, ZERO TEXT) ── */}

          {/* Node 1: Top-Left (FastAPI Streaming Gateway — Waveform Glyph) */}
          <g data-agent="node-glow">
            <circle cx="315" cy="185" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <circle cx="315" cy="185" r="14" strokeDasharray="3 3" opacity="0.6" />
            <path d="M 305 185 L 310 178 L 315 192 L 320 180 L 325 185" strokeWidth="1.6" />
          </g>

          {/* Node 2: Top-Right (NeMo Guardrail — Shield Glyph) */}
          <g data-agent="node-glow">
            <circle cx="645" cy="185" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <path d="M 645 174 L 655 179 V 190 C 655 197, 645 201, 645 201 C 645 201, 635 197, 635 190 V 179 Z" strokeWidth="1.6" />
          </g>

          {/* Node 3: Right (Redis Memory Bus — Database Cylinder Glyph) */}
          <g data-agent="node-glow">
            <circle cx="710" cy="310" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <ellipse cx="710" cy="303" rx="12" ry="4.5" strokeWidth="1.4" />
            <path d="M 698 303 V 311 C 698 314, 722 314, 722 311 V 303" strokeWidth="1.4" />
            <path d="M 698 311 V 319 C 698 322, 722 322, 722 319 V 311" strokeWidth="1.4" />
          </g>

          {/* Node 4: Bottom-Right (Tool Worker Agent — Code Terminal Bracket Glyph) */}
          <g data-agent="node-glow">
            <circle cx="645" cy="435" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <path d="M 638 428 L 633 435 L 638 442" strokeWidth="1.6" />
            <path d="M 652 428 L 657 435 L 652 442" strokeWidth="1.6" />
            <line x1="642" y1="440" x2="648" y2="430" strokeWidth="1.5" />
          </g>

          {/* Node 5: Bottom-Left (Pydantic Schema Validator — Hexagon Check Glyph) */}
          <g data-agent="node-glow">
            <circle cx="315" cy="435" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <polygon points="315,422 326,429 326,441 315,448 304,441 304,429" strokeWidth="1.4" opacity="0.6" />
            <path d="M 310 435 L 313 438 L 320 431" strokeWidth="1.8" />
          </g>

          {/* Node 6: Left (DeepEval Benchmark Gauge Glyph) */}
          <g data-agent="node-glow">
            <circle cx="250" cy="310" r="28" fill="#0A0A0A" fillOpacity="0.85" strokeWidth="1.8" />
            <path d="M 240 315 A 11 11 0 1 1 260 315" strokeWidth="1.6" />
            <line x1="250" y1="315" x2="257" y2="307" strokeWidth="1.8" />
          </g>

          {/* ── CENTRAL ORCHESTRATOR CORE (LANGGRAPH STATE ENGINE) ── */}
          <g data-agent="core">
            {/* Concentric rings */}
            <circle cx="480" cy="310" r="68" strokeWidth="1.2" opacity="0.6" />
            <circle cx="480" cy="310" r="50" strokeWidth="2.2" />
            <circle cx="480" cy="310" r="26" fill="#FF1A1A" fillOpacity="0.18" />
            <circle cx="480" cy="310" r="10" fill="#FF4444" />
            {/* Center target crosshair */}
            <line x1="480" y1="230" x2="480" y2="390" strokeDasharray="5 4" opacity="0.35" />
            <line x1="400" y1="310" x2="560" y2="310" strokeDasharray="5 4" opacity="0.35" />
            {/* Cyclic LangGraph flow arrows */}
            <path d="M 462 278 Q 498 270 510 290" strokeWidth="1.8" />
            <path d="M 510 290 L 510 280" strokeWidth="1.8" />
            <path d="M 498 342 Q 462 350 450 330" strokeWidth="1.8" />
            <path d="M 450 330 L 450 340" strokeWidth="1.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}
