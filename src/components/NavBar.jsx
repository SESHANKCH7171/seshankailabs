import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";
import { sections } from "../data/sections.js";

function HexNexusLogo() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    >
      {/* Outer Hexagon */}
      <polygon
        points="16,3 28,10 28,24 16,31 4,24 4,10"
        stroke="#FF1A1A"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className="opacity-90"
      />
      {/* Tri-Radial Vector Routing Paths */}
      <line x1="16" y1="17" x2="28" y2="10" stroke="#FF4444" strokeWidth="1.3" strokeDasharray="2 2" />
      <line x1="16" y1="17" x2="16" y2="31" stroke="#FF4444" strokeWidth="1.3" strokeDasharray="2 2" />
      <line x1="16" y1="17" x2="4" y2="10" stroke="#FF4444" strokeWidth="1.3" strokeDasharray="2 2" />
      {/* Three Satellite Vertex Nodes */}
      <circle cx="28" cy="10" r="1.8" fill="#FF1A1A" />
      <circle cx="16" cy="31" r="1.8" fill="#FF1A1A" />
      <circle cx="4" cy="10" r="1.8" fill="#FF1A1A" />
      {/* Central Orchestrator Core */}
      <circle cx="16" cy="17" r="4.5" fill="#0A0A0A" stroke="#FF1A1A" strokeWidth="1.4" />
      <circle cx="16" cy="17" r="2.2" fill="#FF4444" className="animate-pulse" />
    </svg>
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isBlog = location.pathname.startsWith("/blog");
  const isArchitecture = location.pathname.startsWith("/architectures");

  /* ---- Scroll detection for navbar background ---- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- Scroll-spy via IntersectionObserver (only on home) ---- */
  useEffect(() => {
    if (!isHome) return undefined;
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
  }, [isHome]);

  const handleNavClick = useCallback(
    (id) => {
      setMobileOpen(false);
      if (isHome) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${id}`);
      }
    },
    [isHome, navigate]
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "border-b border-industrial-line bg-industrial-panelGlass backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 font-display text-sm tracking-tactical text-white"
            aria-label="Seshank AI Labs — Home"
          >
            <span className="grid h-9 w-9 place-items-center border border-tactical-red/50 bg-tactical-redDim text-tactical-red shadow-tactical">
              <HexNexusLogo />
            </span>
            SESHANK AI LABS
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {isHome ? (
              sections.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => handleNavClick(s.id)}
                  className={`px-3 py-2 font-mono text-xs uppercase tracking-tactical transition-colors ${
                    activeSection === s.id && !isBlog
                      ? "text-tactical-red"
                      : "text-industrial-ash hover:text-industrial-silver"
                  }`}
                >
                  {s.label}
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className="px-3 py-2 font-mono text-xs uppercase tracking-tactical text-industrial-ash hover:text-tactical-red transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft size={13} />
                  LAB HOME
                </Link>
                <button
                  type="button"
                  onClick={() => handleNavClick("capabilities")}
                  className={`px-3 py-2 font-mono text-xs uppercase tracking-tactical transition-colors ${
                    isArchitecture ? "text-tactical-red" : "text-industrial-ash hover:text-industrial-silver"
                  }`}
                >
                  ARCHITECTURES
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick("proof")}
                  className="px-3 py-2 font-mono text-xs uppercase tracking-tactical text-industrial-ash hover:text-industrial-silver transition-colors"
                >
                  TELEMETRY
                </button>
              </>
            )}

            {/* Dedicated Blog Link */}
            <Link
              to="/blog"
              className={`px-3 py-2 font-mono text-xs uppercase tracking-tactical transition-colors ${
                isBlog ? "text-tactical-red font-semibold" : "text-industrial-ash hover:text-industrial-silver"
              }`}
            >
              PUBLICATIONS
            </Link>

            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="ml-4 border border-tactical-red px-4 py-2 font-mono text-xs uppercase tracking-tactical text-tactical-red transition-colors hover:bg-tactical-redDim"
              aria-label="Contact systems lab"
            >
              GET IN TOUCH
            </button>
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
          <div className="flex items-center justify-between px-5 py-4 sm:px-8 border-b border-industrial-line">
            <span className="flex items-center gap-3 font-display text-sm tracking-tactical text-white">
              <span className="grid h-8 w-8 place-items-center border border-tactical-red/50 bg-tactical-redDim text-tactical-red shadow-tactical">
                <HexNexusLogo />
              </span>
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
          <nav className="flex flex-1 flex-col items-center justify-center gap-7">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="font-mono text-lg uppercase tracking-tactical text-white"
            >
              LAB HOME
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick("capabilities")}
              className="font-mono text-lg uppercase tracking-tactical text-industrial-ash hover:text-tactical-red"
            >
              ARCHITECTURES
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("proof")}
              className="font-mono text-lg uppercase tracking-tactical text-industrial-ash hover:text-tactical-red"
            >
              TELEMETRY &amp; PROOF
            </button>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className={`font-mono text-lg uppercase tracking-tactical ${
                isBlog ? "text-tactical-red" : "text-industrial-ash hover:text-tactical-red"
              }`}
            >
              PUBLICATIONS &amp; BLOG
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="mt-4 border border-tactical-red px-8 py-3 font-mono text-sm uppercase tracking-tactical text-tactical-red hover:bg-tactical-redDim"
            >
              GET IN TOUCH
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
