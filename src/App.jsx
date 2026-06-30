import { MotionAirframe } from "./components/MotionAirframe.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./components/sections/Home.jsx";
import About from "./components/sections/About.jsx";
import ValueStack from "./components/sections/ValueStack.jsx";
import CaseStudies from "./components/sections/CaseStudies.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <main
      data-scroll-root
      className="scan-overlay relative min-h-screen overflow-hidden bg-stealth-black text-industrial-silver"
    >
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-scan-grid bg-[length:40px_40px] opacity-40" />
      {/* Vignette gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-stealth-black/5 via-stealth-black/60 to-stealth-black" />

      <NavBar />
      <MotionAirframe />

      <div className="relative z-10">
        <Home />
        <About />
        <ValueStack />
        <CaseStudies />
        <Contact />

        {/* Footer */}
        <footer className="border-t border-industrial-line bg-stealth-deep">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8 lg:px-10">
            <span className="font-display text-xs tracking-tactical text-industrial-ash">
              © 2026 SESHANK AI LABS
            </span>
            <span className="font-mono text-xs tracking-tactical text-industrial-ash">
              NASHIK · MAHARASHTRA · INDIA
            </span>
            <a
              href="mailto:seshank@seshankailabs.com"
              className="font-mono text-xs text-industrial-ash transition-colors hover:text-tactical-red"
            >
              seshank@seshankailabs.com
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
