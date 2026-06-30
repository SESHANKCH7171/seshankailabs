import { useState, useEffect, useCallback } from "react";
import { Menu, X, RadioTower } from "lucide-react";
import { sections } from "../data/sections.js";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ---- Scroll detection for navbar background ---- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- Scroll-spy via IntersectionObserver ---- */
  useEffect(() => {
    const observers = [];
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-industrial-line bg-industrial-panelGlass backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
            className="flex items-center gap-3 font-display text-sm tracking-tactical text-white"
            aria-label="Seshank AI Labs — Home"
          >
            <span className="grid h-9 w-9 place-items-center border border-tactical-red/50 bg-tactical-redDim text-tactical-red">
              <RadioTower size={17} strokeWidth={1.8} />
            </span>
            SESHANK AI LABS
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.id);
                }}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-tactical transition-colors ${
                  activeSection === s.id
                    ? "text-tactical-red"
                    : "text-industrial-ash hover:text-industrial-silver"
                }`}
              >
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="ml-4 border border-tactical-red px-4 py-2 font-mono text-xs uppercase tracking-tactical text-tactical-red transition-colors hover:bg-tactical-redDim"
              aria-label="Book a discovery call"
            >
              BOOK CALL
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="grid h-10 w-10 place-items-center text-industrial-silver md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-stealth-deep/98 backdrop-blur-lg">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="font-display text-sm tracking-tactical text-white">
              SESHANK AI LABS
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center text-industrial-silver"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.id);
                }}
                className={`font-mono text-lg uppercase tracking-tactical transition-colors ${
                  activeSection === s.id
                    ? "text-tactical-red"
                    : "text-industrial-ash"
                }`}
              >
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="mt-4 border border-tactical-red px-8 py-3 font-mono text-sm uppercase tracking-tactical text-tactical-red transition-colors hover:bg-tactical-redDim"
            >
              BOOK CALL
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
