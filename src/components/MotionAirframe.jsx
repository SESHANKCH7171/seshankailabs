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

      /* ---- Grab part groups ---- */
      const allJetParts = q("[data-jet]");
      const fuselage = q('[data-jet="fuselage"]');
      const nose = q('[data-jet="nose"]');
      const wings = q('[data-jet="wings"]');
      const engines = q('[data-jet="engines"]');
      const tail = q('[data-jet="tail"]');
      const canopy = q('[data-jet="canopy"]');
      const brain = q('[data-jet="brain"]');
      const packets = q("[data-packet]");

      /* ---- Initial state ---- */
      gsap.set([...allJetParts, brain], {
        transformBox: "fill-box",
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });
      gsap.set(packets, { autoAlpha: 0, scale: 0.5 });

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
       * PHASE 1 — EXPLODE (scroll 0 % → 25 %)
       * Parts fly apart on X / Y; brain begins rotating.
       */
      tl.to(nose, { x: 120, y: -30, rotate: 8, duration: 1 }, 0)
        .to(wings, { x: -60, y: 18, rotate: -4, scaleY: 1.12, duration: 1 }, 0)
        .to(engines, { x: -100, y: 60, rotate: -7, duration: 1 }, 0)
        .to(tail, { x: -130, y: -25, rotate: -12, duration: 1 }, 0)
        .to(canopy, { x: 55, y: -60, scale: 1.18, duration: 1 }, 0)
        .to(fuselage, { x: -15, y: 12, rotate: 2, duration: 1 }, 0)
        .to(brain, { rotation: 360, y: -40, scale: 1.1, duration: 1 }, 0);

      /*
       * PHASE 2 — HIGHLIGHT (scroll 25 % → 50 %)
       * Parts hold exploded; specific components glow red as
       * user passes the "What We Do" feature cards.
       */
      tl.to(
          [nose, canopy],
          { stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 1 },
          1,
        )
        .to(
          [engines, tail],
          { stroke: "#FF4444", filter: "url(#redGlow)", duration: 1 },
          1.15,
        )
        .to(
          brain,
          { rotation: 720, stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 1 },
          1,
        );

      /*
       * PHASE 3 — CONVERGE (scroll 50 % → 75 %)
       * Parts float back; data-packet nodes appear flowing
       * between brain and mechanical sections.
       */
      tl.to(
          allJetParts,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            scaleY: 1,
            stroke: "#FF4444",
            filter: "url(#glowFilter)",
            duration: 1,
          },
          2,
        )
        .to(packets, { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.7 }, 2.2)
        .to(brain, { rotation: 1080, x: 0, y: 0, scale: 1, duration: 1 }, 2);

      /*
       * PHASE 4 — REASSEMBLE & LAUNCH (scroll 75 % → 100 %)
       * Full assembly, 45° forward-launch vector rotation.
       */
      tl.to(
          layer,
          { rotate: 45, xPercent: 4, yPercent: -3, duration: 1 },
          3,
        )
        .to(packets, { autoAlpha: 0, duration: 0.4 }, 3.5)
        .to(
          [...allJetParts, brain],
          { stroke: "#FF1A1A", filter: "url(#redGlow)", duration: 0.6 },
          3.4,
        );
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed right-[-16rem] top-1/2 z-0 h-[min(72vw,760px)] w-[min(92vw,920px)] -translate-y-1/2 opacity-75 sm:right-[-8rem] lg:right-[-2rem]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 920 620"
        role="img"
        aria-label="Interactive fighter jet and AI brain wireframe"
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

          {/* Intense glow — active / highlighted parts */}
          <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient across the entire airframe */}
          <linearGradient
            id="airframeFade"
            x1="120"
            x2="840"
            y1="60"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF4444" stopOpacity="0.92" />
            <stop offset="0.5" stopColor="#FF1A1A" stopOpacity="0.48" />
            <stop offset="1" stopColor="#FF4444" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* ====== MASTER GROUP ====== */}
        <g
          stroke="url(#airframeFade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        >
          {/* ── FUSELAGE ── */}
          <g data-jet="fuselage">
            {/* Main body contour */}
            <path d="M 185 310 Q 290 284 460 278 Q 580 272 690 310 Q 580 348 460 342 Q 290 336 185 310 Z" />
            {/* Upper structural rib */}
            <path d="M 245 294 L 630 282" opacity="0.3" />
            {/* Lower structural rib */}
            <path d="M 245 326 L 630 338" opacity="0.3" />
            {/* Center spine */}
            <path d="M 205 310 L 680 310" opacity="0.2" strokeDasharray="8 5" />
            {/* Frame stations */}
            <path d="M 350 282 V 338" opacity="0.15" />
            <path d="M 500 276 V 344" opacity="0.15" />
          </g>

          {/* ── NOSE CONE (Radar/Sensor Dome) ── */}
          <g data-jet="nose">
            <path d="M 690 310 Q 745 288 830 310 Q 745 332 690 310" />
            <path d="M 830 310 L 880 310" />
            {/* Radome crosshair */}
            <circle cx="788" cy="310" r="26" />
            <circle cx="788" cy="310" r="11" />
            <path d="M 762 310 H 814" opacity="0.7" />
            <path d="M 788 284 V 336" opacity="0.7" />
            {/* Signal emanation arcs */}
            <path d="M 840 286 Q 868 310 840 334" opacity="0.4" />
            <path d="M 856 268 Q 898 310 856 352" opacity="0.22" />
          </g>

          {/* ── WINGS (Delta/Swept — unified group) ── */}
          <g data-jet="wings">
            {/* Left wing (bottom in top-down) */}
            <path d="M 425 342 L 285 496 L 262 500 L 385 352" />
            <path d="M 405 348 L 316 466" opacity="0.35" />
            <path d="M 370 360 L 340 420" opacity="0.2" />
            <circle cx="274" cy="498" r="3" />

            {/* Right wing (top in top-down) */}
            <path d="M 425 278 L 285 124 L 262 120 L 385 268" />
            <path d="M 405 272 L 316 154" opacity="0.35" />
            <path d="M 370 260 L 340 200" opacity="0.2" />
            <circle cx="274" cy="122" r="3" />

            {/* Wing pylons */}
            <rect x="340" y="438" width="8" height="14" rx="2" opacity="0.35" />
            <rect x="340" y="168" width="8" height="14" rx="2" opacity="0.35" />
          </g>

          {/* ── ENGINES (Twin nacelles) ── */}
          <g data-jet="engines">
            {/* Left engine */}
            <path d="M 260 330 Q 218 340 188 348 Q 168 352 162 342 Q 156 332 164 322" />
            <circle cx="180" cy="340" r="18" />
            <circle cx="180" cy="340" r="8" opacity="0.55" />
            <path d="M 160 344 L 128 350" opacity="0.3" />
            <path d="M 160 336 L 128 330" opacity="0.3" />

            {/* Right engine */}
            <path d="M 260 290 Q 218 280 188 272 Q 168 268 162 278 Q 156 288 164 298" />
            <circle cx="180" cy="280" r="18" />
            <circle cx="180" cy="280" r="8" opacity="0.55" />
            <path d="M 160 276 L 128 270" opacity="0.3" />
            <path d="M 160 284 L 128 290" opacity="0.3" />

            {/* Inter-engine fairing */}
            <path d="M 195 298 L 195 322" opacity="0.25" />
          </g>

          {/* ── TAIL (Vertical stabilizers + horizontal stabs) ── */}
          <g data-jet="tail">
            {/* Upper vertical stabilizer */}
            <path d="M 225 290 L 198 228 L 246 272" />
            <path d="M 212 258 L 230 280" opacity="0.4" />

            {/* Lower vertical stabilizer */}
            <path d="M 225 330 L 198 392 L 246 348" />
            <path d="M 212 362 L 230 340" opacity="0.4" />

            {/* Horizontal stabilizers */}
            <path d="M 215 296 L 168 252" opacity="0.45" />
            <path d="M 215 324 L 168 368" opacity="0.45" />

            {/* Fin tips */}
            <circle cx="198" cy="228" r="2.5" />
            <circle cx="198" cy="392" r="2.5" />
          </g>

          {/* ── CANOPY (Cockpit glass) ── */}
          <g data-jet="canopy">
            <ellipse cx="568" cy="310" rx="40" ry="17" />
            <ellipse cx="572" cy="310" rx="24" ry="10" opacity="0.45" />
            {/* HUD diamond */}
            <path
              d="M 548 310 L 558 302 L 578 302 L 588 310 L 578 318 L 558 318 Z"
              opacity="0.28"
            />
          </g>

          {/* ── AI ROBOTIC BRAIN (Neural mesh) ── */}
          <g data-jet="brain">
            {/* Brain hull — angular / robotic */}
            <path d="M 405 98 L 425 66 L 465 50 L 505 66 L 525 98 L 530 136 L 515 164 L 488 176 L 442 176 L 415 164 L 400 136 Z" />
            {/* Inner structure lines */}
            <path d="M 425 78 L 448 68 L 482 68 L 505 78" opacity="0.4" />
            <path d="M 415 130 L 515 130" opacity="0.3" />
            <path d="M 442 176 L 460 130 L 488 176" opacity="0.25" />

            {/* Neural nodes (7 outer + 1 central) */}
            <circle cx="425" cy="82" r="5.5" />
            <circle cx="465" cy="58" r="5.5" />
            <circle cx="505" cy="82" r="5.5" />
            <circle cx="522" cy="125" r="5.5" />
            <circle cx="498" cy="162" r="5.5" />
            <circle cx="432" cy="162" r="5.5" />
            <circle cx="408" cy="125" r="5.5" />
            {/* Central cortex node */}
            <circle cx="465" cy="118" r="7" />

            {/* Synapse ring connections */}
            <path d="M 425 82 L 465 58" opacity="0.45" />
            <path d="M 465 58 L 505 82" opacity="0.45" />
            <path d="M 505 82 L 522 125" opacity="0.45" />
            <path d="M 522 125 L 498 162" opacity="0.45" />
            <path d="M 498 162 L 432 162" opacity="0.45" />
            <path d="M 432 162 L 408 125" opacity="0.45" />
            <path d="M 408 125 L 425 82" opacity="0.45" />

            {/* Central hub connections */}
            <path d="M 465 118 L 425 82" opacity="0.22" />
            <path d="M 465 118 L 465 58" opacity="0.22" />
            <path d="M 465 118 L 505 82" opacity="0.22" />
            <path d="M 465 118 L 522 125" opacity="0.22" />
            <path d="M 465 118 L 498 162" opacity="0.22" />
            <path d="M 465 118 L 432 162" opacity="0.22" />
            <path d="M 465 118 L 408 125" opacity="0.22" />
          </g>

          {/* ── Structural reference lines (Fuselage to Brain) ── */}
          <g opacity="0.18">
            <path d="M 465 176 L 465 278" strokeDasharray="4 4" />
            <path d="M 280 310 L 750 310" />
            <path d="M 325 244 C 420 270 540 270 710 238" />
            <path d="M 325 376 C 420 350 540 350 710 382" />
          </g>

          {/* ── DATA PACKETS (appear in Phase 3) ── */}
          <g data-packet>
            <circle cx="465" cy="210" r="4.5" fill="#FF1A1A" stroke="none" />
            <path d="M 465 195 L 465 278" opacity="0.5" strokeDasharray="3 4" />
          </g>
          <g data-packet>
            <circle cx="520" cy="195" r="4.5" fill="#FF1A1A" stroke="none" />
            <path d="M 518 185 L 568 282" opacity="0.5" strokeDasharray="3 4" />
          </g>
          <g data-packet>
            <circle cx="410" cy="195" r="4.5" fill="#FF1A1A" stroke="none" />
            <path d="M 412 185 L 355 288" opacity="0.5" strokeDasharray="3 4" />
          </g>
          <g data-packet>
            <circle cx="535" cy="150" r="4.5" fill="#FF1A1A" stroke="none" />
            <path d="M 535 158 L 640 290" opacity="0.5" strokeDasharray="3 4" />
          </g>
        </g>
      </svg>
    </div>
  );
}
