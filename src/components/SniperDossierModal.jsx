import { useState, useEffect } from "react";
import { X, Send, ShieldCheck, CheckCircle2, ArrowUpRight, Crosshair, Mail } from "lucide-react";

export function openSniperModal(tier = "Free 10-Account Sniper Dossier ($0)") {
  window.dispatchEvent(
    new CustomEvent("open-sniper-dossier-modal", { detail: { tier } })
  );
}

export default function SniperDossierModal({ isOpen, onClose, initialTier = "Free 10-Account Sniper Dossier ($0)" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    targetIcp: "",
    selectedTier: initialTier,
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, selectedTier: initialTier }));
  }, [initialTier]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData.name || !formData.email) return;

    setSending(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://formspree.io/f/xjgqedjn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          source: "B2B Sniper Lead Intelligence Requisition",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          tier: formData.selectedTier,
          target_icp_and_stack: formData.targetIcp,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg("Submission failed. Please email seshank@seshankailabs.com directly.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please email seshank@seshankailabs.com directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full border border-industrial-line bg-stealth-deep px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-industrial-ash transition-colors focus:border-tactical-red focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stealth-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl border border-tactical-red/60 bg-industrial-panel p-6 sm:p-8 shadow-tactical max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 grid h-8 w-8 place-items-center text-industrial-ash transition-colors hover:text-white hover:bg-white/5"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center border border-tactical-red bg-tactical-redDim text-tactical-red shadow-tactical">
              <CheckCircle2 size={28} />
            </div>
            <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
              DOSSIER REQUISITION LOGGED
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              Uplink Established
            </h3>
            <p className="mt-3 text-sm text-industrial-silver leading-relaxed max-w-md mx-auto">
              Your parameters have been transmitted directly to Seshank Chinnapotula.
              I will audit your ICP and deliver your custom 10-account Google Sheet within 48 hours.
            </p>

            <div className="mt-6 border-t border-industrial-line pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:seshank@seshankailabs.com"
                className="font-mono text-xs text-industrial-ash hover:text-tactical-red transition-colors inline-flex items-center gap-1.5"
              >
                <Mail size={13} />
                seshank@seshankailabs.com
              </a>
              <span className="text-industrial-line hidden sm:inline">·</span>
              <a
                href="https://linkedin.com/in/seshankch"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-industrial-ash hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                LinkedIn: /in/seshankch
                <ArrowUpRight size={13} />
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 border border-industrial-line px-6 py-2.5 font-mono text-xs uppercase tracking-tactical text-white hover:border-tactical-red hover:text-tactical-red transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 border-b border-industrial-line pb-3">
              <Crosshair size={14} className="text-tactical-red" />
              <span className="font-mono text-[11px] uppercase tracking-tactical text-tactical-red font-bold">
                B2B SNIPER LEAD INTELLIGENCE · FORMSPREE UPLINK
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white">
              Request Your 10-Lead Sniper Dossier
            </h3>
            <p className="mt-1 text-xs text-industrial-silver leading-relaxed">
              Browser-verified inboxes (&lt;2% bounce guarantee), live &lt;30-day buying signals, and custom 4-touch sequences. Zero upfront cost.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Name & Email Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                    Your Name *
                  </span>
                  <input
                    required
                    className={inputClass}
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="e.g. Seshank Chinnapotula"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                    Work Email *
                  </span>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              {/* Company / Domain */}
              <label className="grid gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                  Company Name &amp; Domain *
                </span>
                <input
                  required
                  className={inputClass}
                  value={formData.company}
                  onChange={handleChange("company")}
                  placeholder="e.g. Seshank AI Labs (seshankailabs.com)"
                />
              </label>

              {/* Engagement Model Choice */}
              <label className="grid gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                  Engagement Model
                </span>
                <select
                  className={inputClass}
                  value={formData.selectedTier}
                  onChange={handleChange("selectedTier")}
                >
                  <option value="Free 10-Account Sniper Dossier ($0)">
                    Free Proof-of-Value Sample (10 Verified Accounts · $0)
                  </option>
                  <option value="Pay-Per-Qualified-Lead ($30/Lead - 15 Accounts: $450)">
                    Performance Batch — 15 Accounts ($450 · Pay Post-Inspection)
                  </option>
                  <option value="Pay-Per-Qualified-Lead ($30/Lead - 30 Accounts: $900)">
                    Performance Batch — 30 Accounts ($900 · Pay Post-Inspection)
                  </option>
                  <option value="14-Day Outbound Pipeline Sprint ($900 Fixed)">
                    14-Day Outbound Pipeline Sprint ($900 Fixed · 30–50 Accounts)
                  </option>
                  <option value="Monthly Pipeline Intelligence Engine ($2,500 - $3,397/mo)">
                    Monthly Pipeline Intelligence Engine (120–150 Accounts/mo)
                  </option>
                </select>
              </label>

              {/* Target ICP Requirements */}
              <label className="grid gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                  Target ICP &amp; Tech Stack Triggers
                </span>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={formData.targetIcp}
                  onChange={handleChange("targetIcp")}
                  placeholder="Target titles (e.g. CTOs, VPs of Eng, Heads of Data), company stage/size, or tech stack requirements (e.g. Snowflake, BigQuery, Cadence, Kubernetes)..."
                />
              </label>

              {errorMsg && (
                <p className="font-mono text-xs text-tactical-red">{errorMsg}</p>
              )}

              {/* Guarantee Strip */}
              <div className="flex items-center gap-2 border border-industrial-line bg-stealth-deep px-3 py-2">
                <ShieldCheck size={14} className="text-tactical-red shrink-0" />
                <span className="font-mono text-[11px] text-industrial-silver">
                  Strict &lt;2% hard bounce ceiling with 1-for-1 free replacement guarantee.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending || !formData.name || !formData.email}
                className="focus-ring mt-2 inline-flex items-center justify-center gap-2 w-full border border-tactical-red bg-tactical-red py-3.5 px-4 font-mono text-xs uppercase tracking-tactical text-stealth-black font-bold shadow-tactical hover:bg-transparent hover:text-tactical-red transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "TRANSMITTING TO SESHANK LABS..." : "TRANSMIT DOSSIER REQUISITION"}
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
