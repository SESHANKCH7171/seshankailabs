import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ArchitectureDetailPage from "./pages/ArchitectureDetailPage.jsx";
import BlogIndexPage from "./pages/BlogIndexPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <main
        data-scroll-root
        className="scan-overlay relative min-h-screen overflow-hidden bg-stealth-black text-industrial-silver font-sans"
      >
        {/* Ambient Grid overlay */}
        <div className="fixed inset-0 bg-scan-grid bg-[length:40px_40px] opacity-40 pointer-events-none" />
        {/* Vignette gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-stealth-black/5 via-stealth-black/60 to-stealth-black pointer-events-none" />

        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/architectures/:id" element={<ArchitectureDetailPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Global Persistent Footer */}
        <footer className="relative z-10 border-t border-industrial-line bg-stealth-deep">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8 lg:px-10">
            <span className="font-display text-xs tracking-tactical text-industrial-ash">
              © 2026 SESHANK AI LABS
            </span>
            <span className="font-mono text-xs tracking-tactical text-industrial-ash">
              AI AGENT SYSTEMS ARCHITECT · GCC &amp; UK CORRIDOR
            </span>
            <a
              href="mailto:seshank@seshankailabs.com"
              className="font-mono text-xs text-industrial-ash transition-colors hover:text-tactical-red"
            >
              seshank@seshankailabs.com
            </a>
          </div>
        </footer>
      </main>
    </BrowserRouter>
  );
}
