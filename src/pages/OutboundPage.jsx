import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Crosshair, ShieldCheck, Mail, Linkedin } from "lucide-react";
import LeadIntelligence from "../components/sections/LeadIntelligence.jsx";
import Contact from "../components/sections/Contact.jsx";
import { openSniperModal } from "../components/SniperDossierModal.jsx";

export default function OutboundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative z-10 pt-20">
      {/* Route header indicator */}
      <div className="border-b border-industrial-line bg-stealth-deep/90 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-tactical text-industrial-ash hover:text-tactical-red transition-colors"
            >
              <ArrowLeft size={13} />
              Return to Labs Home
            </Link>
            <span className="text-industrial-line">/</span>
            <span className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
              Outbound Intelligence Portal
            </span>
          </div>

          <button
            type="button"
            onClick={() => openSniperModal("Free 10-Account Sniper Dossier ($0)")}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-tactical text-white hover:text-tactical-red transition-colors"
          >
            Claim 10 Free Accounts &rarr;
          </button>
        </div>
      </div>

      {/* Main Lead Intelligence Component */}
      <LeadIntelligence />

      {/* Contact Form for direct outbound inquiry */}
      <div className="border-t border-industrial-line">
        <Contact />
      </div>
    </div>
  );
}

