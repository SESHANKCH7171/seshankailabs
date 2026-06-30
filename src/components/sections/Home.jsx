import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";

export default function Home() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-hero-animate]");
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-32 sm:px-8 lg:px-10"
    >
      {/* Eyebrow */}
      <p
        data-hero-animate
        className="font-mono text-xs uppercase tracking-tactical text-industrial-ash"
      >
        NASHIK · MAHARASHTRA · AEROSPACE &amp; DEFENSE AI
      </p>

      {/* H1 */}
      <h1
        data-hero-animate
        className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl"
      >
        We Don&apos;t Build Chatbots.
      </h1>
      <h1
        data-hero-animate
        className="mt-2 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-tactical-red sm:text-5xl lg:text-7xl"
      >
        We Build Defense Growth Systems.
      </h1>

      {/* Sub-headline */}
      <p
        data-hero-animate
        className="mt-8 max-w-xl text-lg leading-8 text-industrial-silver"
      >
        From parsing 300-page RFPs to filing AS9100 audit docs — we automate the
        operational drag that keeps Tier-2 suppliers from winning bigger contracts.
      </p>

      {/* CTAs */}
      <div data-hero-animate className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="#contact"
          id="cta-book-call"
          className="focus-ring inline-flex items-center gap-3 border border-tactical-red bg-tactical-redDim px-6 py-4 font-mono text-sm uppercase tracking-tactical text-tactical-red shadow-tactical transition-all duration-300 hover:bg-tactical-red hover:text-stealth-black hover:shadow-ember"
          aria-label="Book a 20-minute discovery call"
        >
          BOOK A 20-MIN DISCOVERY CALL
          <ArrowUpRight size={18} />
        </a>
        <a
          href="#capabilities"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-tactical text-industrial-ash underline-offset-4 transition-colors hover:text-industrial-silver"
          aria-label="See what we do"
        >
          SEE WHAT WE DO
          <ArrowDown size={16} />
        </a>
      </div>

      {/* Status strip */}
      <div
        data-hero-animate
        className="mt-16 font-mono text-xs uppercase tracking-tactical text-industrial-ash"
      >
        <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-tactical-red" />
        SYS STATUS: OPERATIONAL · ACCEPTING 2 NEW CLIENTS · EST. 2024
      </div>
    </section>
  );
}
