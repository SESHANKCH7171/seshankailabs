import { useState } from "react";
import { Send, Mail } from "lucide-react";

const BOTTLENECK_OPTIONS = [
  "Token Latency & Inference Costs",
  "Agent Hallucination & Schema Drift",
  "Security / Jailbreak & Prompt Injection Defense",
  "Multi-Agent Orchestration & State Persistence",
  "Founding AI Role / Remote Contractor Engagement",
  "Other — Architectural Discussion",
];

const REFERRAL_OPTIONS = [
  "Direct Email / Outreach",
  "LinkedIn",
  "X (Twitter)",
  "GitHub / Open Source",
  "Founder / Investor Network",
];

const INITIAL_STATE = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  bottleneck: "",
  referral: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;

    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xjgqedjn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm(INITIAL_STATE);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    }

    setSending(false);
  };

  const inputClass =
    "w-full border border-industrial-line bg-stealth-deep px-4 py-3 font-mono text-sm text-industrial-silver placeholder:text-industrial-ash transition-colors focus:border-tactical-red focus:outline-none";

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:px-10"
    >
      {/* Eyebrow */}
      <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
        SECURE UPLINK · RESPONSE WITHIN 24H
      </p>

      {/* Heading */}
      <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        Initiate Architecture Inquiry
      </h2>

      {/* Sub-text */}
      <p className="mt-4 max-w-2xl text-base leading-8 text-industrial-silver">
        Direct technical conversation with the systems architect. Zero sales fluff.
        We&apos;ll evaluate your token latency, state graph architecture, or guardrail benchmarks.
      </p>

      {/* Fallback email */}
      <a
        href="mailto:seshank@seshankailabs.com"
        className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-industrial-ash transition-colors hover:text-tactical-red"
        aria-label="Email seshank@seshankailabs.com"
      >
        <Mail size={15} />
        Direct: seshank@seshankailabs.com
      </a>

      {/* Form / Success state */}
      {submitted ? (
        <div className="mt-8 max-w-2xl border border-tactical-red bg-tactical-redDim p-8">
          <p className="font-mono text-lg uppercase tracking-tactical text-tactical-red">
            UPLINK ESTABLISHED
          </p>
          <p className="mt-3 text-base text-industrial-silver">
            We&apos;ll respond within 24 hours.
          </p>
        </div>
      ) : (
        <div className="mt-8 max-w-2xl border border-industrial-line bg-industrial-panel p-6 sm:p-8">
          <div className="grid gap-5">
            {/* Name */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Name
              </span>
              <input
                required
                id="field-name"
                className={inputClass}
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            {/* Organization */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Organization
              </span>
              <input
                id="field-org"
                className={inputClass}
                value={form.organization}
                onChange={update("organization")}
                placeholder="Company or unit"
                autoComplete="organization"
              />
            </label>

            {/* Work Email */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Work Email
              </span>
              <input
                required
                id="field-email"
                type="email"
                className={inputClass}
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            {/* Phone Number */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Phone Number
              </span>

              <input
                id="field-phone"
                type="tel"
                className={inputClass}
                value={form.phone}
                onChange={update("phone")}
                placeholder="+91 XXXXX XXXXX"
                autoComplete="tel"
              />
            </label>
            {/* Bottleneck */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Biggest Bottleneck?
              </span>
              <select
                id="field-bottleneck"
                className={inputClass}
                value={form.bottleneck}
                onChange={update("bottleneck")}
              >
                <option value="" disabled>
                  Select bottleneck
                </option>
                {BOTTLENECK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* How did you hear about us */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                How did you hear about us?
              </span>
              <select
                id="field-referral"
                className={inputClass}
                value={form.referral}
                onChange={update("referral")}
              >
                <option value="" disabled>
                  Select source
                </option>
                {REFERRAL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            {/* Message */}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-tactical text-industrial-ash">
                Tell us about your project
              </span>

              <textarea
                id="field-message"
                className={inputClass}
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Briefly describe your project, challenge, or requirements..."
              />
            </label>
            {/* Submit */}
            <button
              type="button"
              id="btn-initiate-contact"
              onClick={handleSubmit}
              disabled={
                sending ||
                !form.name ||
                !form.email ||
                !form.message
              }
              className="focus-ring mt-2 inline-flex items-center justify-center gap-3 border border-tactical-red bg-tactical-red px-6 py-4 font-mono text-sm uppercase tracking-tactical text-stealth-black shadow-tactical transition-all duration-300 hover:bg-transparent hover:text-tactical-red disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Submit contact form"
            >
              {sending ? "TRANSMITTING..." : "INITIATE ARCHITECTURAL INQUIRY"}
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
