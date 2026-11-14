import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Crosshair,
  Mail,
  Linkedin,
  Copy,
  Check,
  Zap,
  Clock,
  Layers,
  Database,
  Search,
} from "lucide-react";
import {
  comparisonMatrix,
  dossierTabFeatures,
  caseStudyBlueprints,
  pricingTiers,
  leadIntelFaqs,
} from "../../data/outbound.js";

export default function LeadIntelligence() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [openFaq, setOpenFaq] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopySequence = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="lead-intelligence"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:px-10"
    >
      {/* =========================================================================
          SECTION A: HERO & VALUE PROPOSITION
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 pb-20">
        <div className="inline-flex items-center gap-2 border border-tactical-red/40 bg-tactical-redDim px-3 py-1 font-mono text-xs uppercase tracking-tactical text-tactical-red">
          <Crosshair size={13} className="text-tactical-red animate-pulse" />
          <span>FOR SEED TO SERIES B TECHNICAL FOUNDERS &amp; GTM LEADERS</span>
        </div>

        <h2 className="mt-6 max-w-4xl font-display text-3xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
          Stop Burning Your TAM with Static Scrapers and Fake AI SDRs.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-industrial-silver">
          I build engineer-grade B2B buyer dossiers for deep-tech, AI infrastructure,
          data, and regulated enterprise startups. Every account is backed by a live{" "}
          <span className="text-white font-medium">&lt;30-day buying signal</span>, a past-tool gap audit, an{" "}
          <span className="text-white font-medium">SMTP-verified decision-maker inbox</span> (&lt;2% bounce guarantee),
          and custom founder-to-buyer outreach copy.
        </p>

        {/* 4 High-Contrast Metric Badges */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="border border-industrial-line bg-industrial-panel p-4">
            <div className="flex items-center gap-2 text-tactical-red">
              <ShieldCheck size={18} />
              <span className="font-mono text-sm font-semibold">&lt;2% Bounce</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
              Multi-Step SMTP &amp; MailTester
            </p>
          </div>

          <div className="border border-industrial-line bg-industrial-panel p-4">
            <div className="flex items-center gap-2 text-ember-glow">
              <Clock size={18} />
              <span className="font-mono text-sm font-semibold">&lt;30-Day Signals</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
              Greenhouse / Ashby / Lever
            </p>
          </div>

          <div className="border border-industrial-line bg-industrial-panel p-4">
            <div className="flex items-center gap-2 text-white">
              <Target size={18} className="text-tactical-red" />
              <span className="font-mono text-sm font-semibold">0 Fake Personas</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
              100% Primary Domain Safe
            </p>
          </div>

          <div className="border border-industrial-line bg-industrial-panel p-4">
            <div className="flex items-center gap-2 text-white">
              <Zap size={18} className="text-ember-glow" />
              <span className="font-mono text-sm font-semibold">$0 Upfront Retainer</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
              Pay Only Post-Inspection
            </p>
          </div>
        </div>

        {/* Action Button & Subtext */}
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href="mailto:seshank@seshankailabs.com?subject=10%20free%20sniper%20accounts%20for%20our%20team"
            className="focus-ring inline-flex items-center gap-3 border border-tactical-red bg-tactical-red px-6 py-4 font-mono text-sm uppercase tracking-tactical text-stealth-black shadow-tactical transition-all duration-300 hover:bg-transparent hover:text-tactical-red hover:shadow-ember"
          >
            Get 10 Verified Sniper Accounts Free
            <ArrowUpRight size={18} />
          </a>
          <span className="font-mono text-xs text-industrial-ash">
            Zero upfront fees. Zero fake sender personas. Zero risk to your primary domain.
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION B: COMPARISON MATRIX (Seshank AI Labs vs Generic AI SDRs)
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 py-20">
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          THE STRATEGIC CONTRAST
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-4xl">
          Why Generic AI SDRs Fail Deep-Tech Startups
        </h3>
        <p className="mt-3 max-w-2xl text-base text-industrial-silver">
          High-ACV technical buyers (CTOs, CISOs, VPs of Engineering) smell template automation in 3 seconds.
          Here is how Seshank AI Labs replaces mass spam with surgical research.
        </p>

        {/* Comparison Table */}
        <div className="mt-10 overflow-x-auto border border-industrial-line bg-industrial-panel">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-industrial-line bg-stealth-deep">
                <th className="p-4 font-mono text-xs uppercase tracking-tactical text-industrial-ash w-1/4">
                  Evaluation Dimension
                </th>
                <th className="p-4 font-mono text-xs uppercase tracking-tactical text-industrial-ash w-[37.5%]">
                  Generic AI SDRs &amp; Static DBs (Explee, Apollo, 11x)
                </th>
                <th className="p-4 font-mono text-xs uppercase tracking-tactical text-tactical-red w-[37.5%] bg-tactical-redDim/30">
                  Seshank AI Labs (Sniper Lead Intelligence)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-line font-sans text-sm">
              {comparisonMatrix.map((item, idx) => (
                <tr key={idx} className="transition-colors hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-xs uppercase tracking-tactical font-semibold text-white">
                    {item.dimension}
                  </td>
                  <td className="p-4 text-industrial-ash leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <XCircle size={16} className="text-industrial-ash shrink-0 mt-0.5" />
                      <span>{item.generic}</span>
                    </div>
                  </td>
                  <td className="p-4 text-industrial-silver leading-relaxed bg-tactical-redDim/20 border-l border-tactical-red/20">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-tactical-red shrink-0 mt-0.5" />
                      <span className="text-white font-normal">{item.sniper}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          SECTION C: WHAT YOU GET INSIDE EVERY 2-TAB SNIPER DOSSIER
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
              THE DELIVERABLE BLUEPRINT
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-4xl">
              Inside the 10-Point Sniper Dossier
            </h3>
            <p className="mt-3 max-w-2xl text-base text-industrial-silver">
              Every engagement delivers a pristine 2-Tab Google Sheet (or CSV). Zero software to install,
              zero browser plugins, and full exportability to your CRM or sending workspace.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex border border-industrial-line bg-industrial-panel p-1">
            <button
              type="button"
              onClick={() => setActiveTab("tab1")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-tactical transition-all ${
                activeTab === "tab1"
                  ? "border border-tactical-red bg-tactical-redDim text-tactical-red font-semibold shadow-tactical"
                  : "text-industrial-ash hover:text-white"
              }`}
            >
              <FileSpreadsheet size={14} />
              Tab 1: Buyer Dossiers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tab2")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-tactical transition-all ${
                activeTab === "tab2"
                  ? "border border-tactical-red bg-tactical-redDim text-tactical-red font-semibold shadow-tactical"
                  : "text-industrial-ash hover:text-white"
              }`}
            >
              <Mail size={14} />
              Tab 2: Outbound Playbook
            </button>
          </div>
        </div>

        {/* 2-Card Deliverable Architecture Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Card 1: Tab 1 Breakdown */}
          <div
            className={`border p-6 transition-all duration-300 ${
              activeTab === "tab1"
                ? "border-tactical-red/60 bg-tactical-redDim/20 shadow-tactical"
                : "border-industrial-line bg-industrial-panel"
            }`}
          >
            <div className="flex items-center justify-between border-b border-industrial-line pb-4">
              <span className="font-mono text-xs uppercase tracking-tactical text-tactical-red font-bold">
                DELIVERABLE TAB 01
              </span>
              <span className="border border-industrial-line px-2 py-0.5 font-mono text-[10px] uppercase text-industrial-ash">
                10–30 ACCOUNTS
              </span>
            </div>
            <h4 className="mt-4 font-display text-xl font-bold text-white">
              10 to 30 Verified Sniper Buyer Dossiers
            </h4>
            <p className="mt-2 text-sm text-industrial-ash">
              Filtered strictly for high-ACV fit, excluding clients, portfolio conflicts, and locked competitors.
            </p>

            <ul className="mt-6 space-y-4">
              {dossierTabFeatures.tab1.features.map((feat, idx) => (
                <li key={idx} className="border-t border-industrial-line/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-white">
                      {feat.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-tactical text-tactical-red">
                      {feat.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-industrial-silver">
                    {feat.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Tab 2 Breakdown */}
          <div
            className={`border p-6 transition-all duration-300 ${
              activeTab === "tab2"
                ? "border-tactical-red/60 bg-tactical-redDim/20 shadow-tactical"
                : "border-industrial-line bg-industrial-panel"
            }`}
          >
            <div className="flex items-center justify-between border-b border-industrial-line pb-4">
              <span className="font-mono text-xs uppercase tracking-tactical text-ember-glow font-bold">
                DELIVERABLE TAB 02
              </span>
              <span className="border border-industrial-line px-2 py-0.5 font-mono text-[10px] uppercase text-industrial-ash">
                4-TOUCH SEQUENCE MATRIX
              </span>
            </div>
            <h4 className="mt-4 font-display text-xl font-bold text-white">
              Multi-Touch Outbound Playbook &amp; Copy
            </h4>
            <p className="mt-2 text-sm text-industrial-ash">
              Precision founder-to-buyer outreach matrix calibrated by timezone and local business etiquette.
            </p>

            <ul className="mt-6 space-y-4">
              {dossierTabFeatures.tab2.features.map((feat, idx) => (
                <li key={idx} className="border-t border-industrial-line/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-white">
                      {feat.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-tactical text-ember-glow">
                      {feat.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-industrial-silver">
                    {feat.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live Interactive Deliverable Inspector Preview */}
        <div className="mt-10 border border-industrial-line bg-stealth-deep overflow-hidden">
          <div className="flex items-center justify-between border-b border-industrial-line bg-industrial-panel px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-tactical-red/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-white">
                SESHANK_AI_LABS_SNIPER_DOSSIER_LIVE_SAMPLE.xlsx
              </span>
            </div>
            <span className="border border-tactical-red/40 bg-tactical-redDim px-2 py-0.5 font-mono text-[10px] uppercase tracking-tactical text-tactical-red">
              {activeTab === "tab1" ? "VIEWING TAB 1: BUYER AUDIT" : "VIEWING TAB 2: OUTREACH COPY"}
            </span>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="text-xs font-mono text-industrial-ash flex items-center gap-2">
                <Database size={13} className="text-tactical-red" />
                <span>INSPECTING 2 ANONYMIZED LIVE PROOF ROWS (SAMPLE EXTRACT):</span>
              </div>

              <div className="grid gap-4">
                {dossierTabFeatures.tab1.sampleRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="border border-industrial-line bg-industrial-panel/80 p-4 transition-colors hover:border-tactical-redMid"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-industrial-line/60 pb-3">
                      <div>
                        <span className="font-display text-base font-bold text-white">
                          {row.company}
                        </span>
                        <span className="ml-2 font-mono text-xs text-tactical-red">
                          ({row.domain})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="border border-emerald-500/40 bg-emerald-950/40 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                          {row.verification}
                        </span>
                        <span className="border border-industrial-line px-2 py-0.5 font-mono text-[10px] text-industrial-ash">
                          {row.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                      <div>
                        <span className="font-mono text-industrial-ash uppercase block">
                          Operational Decision-Maker:
                        </span>
                        <span className="font-semibold text-white">
                          {row.contact} · {row.title}
                        </span>
                        <span className="block font-mono text-industrial-silver mt-0.5">
                          {row.email}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-industrial-ash uppercase block">
                          Live &lt;30d Hiring / Technical Signal:
                        </span>
                        <span className="text-industrial-silver italic">
                          &ldquo;{row.signal}&rdquo;
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 border-t border-industrial-line/50 pt-2 text-xs">
                      <span className="font-mono text-tactical-red uppercase block">
                        Legacy Tool Gap Audit &amp; Angle:
                      </span>
                      <p className="mt-1 text-industrial-silver">
                        {row.gapAudit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-mono text-xs text-industrial-ash">
                  TARGET:{" "}
                  <span className="text-white">
                    {dossierTabFeatures.tab2.sampleSequence.account}
                  </span>
                </div>
                <div className="font-mono text-xs text-tactical-red">
                  ROUTING: {dossierTabFeatures.tab2.sampleSequence.timezone}
                </div>
              </div>

              {/* Touchpoint 1 */}
              <div className="border border-industrial-line bg-industrial-panel p-4">
                <div className="flex items-center justify-between border-b border-industrial-line/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-tactical-red" />
                    <span className="font-mono text-xs uppercase font-bold text-white">
                      Touchpoint 1: Peer-to-Peer Cold Email
                    </span>
                    <span className="border border-industrial-line px-1.5 py-0.2 font-mono text-[10px] text-industrial-ash">
                      {dossierTabFeatures.tab2.sampleSequence.touchpoint1.wordCount}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopySequence(
                        dossierTabFeatures.tab2.sampleSequence.touchpoint1.body,
                        1
                      )
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-industrial-ash hover:text-tactical-red"
                  >
                    {copiedIndex === 1 ? <Check size={12} /> : <Copy size={12} />}
                    {copiedIndex === 1 ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="mt-2 font-mono text-xs text-tactical-red">
                  Subject: {dossierTabFeatures.tab2.sampleSequence.touchpoint1.subject}
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-industrial-silver">
                  {dossierTabFeatures.tab2.sampleSequence.touchpoint1.body}
                </pre>
              </div>

              {/* Touchpoint 1B: LinkedIn Note */}
              <div className="border border-industrial-line bg-industrial-panel p-4">
                <div className="flex items-center justify-between border-b border-industrial-line/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Linkedin size={13} className="text-sky-400" />
                    <span className="font-mono text-xs uppercase font-bold text-white">
                      Touchpoint 1B: LinkedIn Connection Note
                    </span>
                    <span className="border border-industrial-line px-1.5 py-0.2 font-mono text-[10px] text-industrial-ash">
                      {dossierTabFeatures.tab2.sampleSequence.touchpoint1b.charCount}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopySequence(
                        dossierTabFeatures.tab2.sampleSequence.touchpoint1b.note,
                        2
                      )
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-industrial-ash hover:text-tactical-red"
                  >
                    {copiedIndex === 2 ? <Check size={12} /> : <Copy size={12} />}
                    {copiedIndex === 2 ? "COPIED" : "COPY"}
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-industrial-silver">
                  {dossierTabFeatures.tab2.sampleSequence.touchpoint1b.note}
                </p>
              </div>

              {/* Touchpoint 2 */}
              <div className="border border-industrial-line bg-industrial-panel p-4">
                <div className="flex items-center justify-between border-b border-industrial-line/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-ember-glow" />
                    <span className="font-mono text-xs uppercase font-bold text-white">
                      Touchpoint 2: Day 4 Technical Benchmark Follow-Up
                    </span>
                    <span className="border border-industrial-line px-1.5 py-0.2 font-mono text-[10px] text-industrial-ash">
                      {dossierTabFeatures.tab2.sampleSequence.touchpoint2.wordCount}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopySequence(
                        dossierTabFeatures.tab2.sampleSequence.touchpoint2.body,
                        3
                      )
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-industrial-ash hover:text-tactical-red"
                  >
                    {copiedIndex === 3 ? <Check size={12} /> : <Copy size={12} />}
                    {copiedIndex === 3 ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="mt-2 font-mono text-xs text-ember-glow">
                  Subject: {dossierTabFeatures.tab2.sampleSequence.touchpoint2.subject}
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-industrial-silver">
                  {dossierTabFeatures.tab2.sampleSequence.touchpoint2.body}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION D: LIVE ANONYMIZED DOSSIER BLUEPRINTS (Proof of Work)
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 py-20">
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          PROOF OF WORK
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-4xl">
          Recent Live Dossier Blueprints
        </h3>
        <p className="mt-3 max-w-2xl text-base text-industrial-silver">
          Real research depth executed across deep-tech verticals. Each account was verified
          in real browsers by an engineer who understands compiler pipelines, chip tapeouts, and vector databases.
        </p>

        {/* 3 Blueprints Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudyBlueprints.map((blueprint) => (
            <article
              key={blueprint.id}
              className="group flex flex-col justify-between border border-industrial-line bg-industrial-panel p-6 transition-all duration-300 hover:border-tactical-redMid hover:bg-tactical-redDim/20 hover:shadow-ember"
            >
              <div>
                <div className="flex items-center justify-between border-b border-industrial-line pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-tactical text-tactical-red">
                    {blueprint.vertical}
                  </span>
                  <span className="font-mono text-[10px] text-industrial-ash">
                    {blueprint.location}
                  </span>
                </div>

                <h4 className="mt-4 font-display text-lg font-bold text-white leading-snug">
                  {blueprint.clientType}
                </h4>

                <div className="mt-5 space-y-4 text-xs leading-relaxed">
                  <div>
                    <span className="font-mono uppercase text-industrial-ash block">
                      Target Buyer Persona:
                    </span>
                    <p className="mt-1 text-white font-medium">
                      {blueprint.targetBuyerPersona}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono uppercase text-tactical-red block">
                      Verified Signal Mined:
                    </span>
                    <p className="mt-1 text-industrial-silver italic">
                      &ldquo;{blueprint.verifiedSignalMined}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="font-mono uppercase text-ember-glow block">
                      Engineered Outcome:
                    </span>
                    <p className="mt-1 text-industrial-silver">
                      {blueprint.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-industrial-line/80 pt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {blueprint.metrics.map((m, idx) => (
                    <div key={idx} className="border border-industrial-line/50 bg-stealth-deep p-2">
                      <span className="font-mono text-xs font-bold text-white block">
                        {m.value}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-tactical text-industrial-ash block mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {blueprint.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-industrial-line px-2 py-0.5 font-mono text-[10px] uppercase text-industrial-ash"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION E: TRANSPARENT, FOUNDER-ALIGNED ENGAGEMENT MODELS
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 py-20">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
            NO RETROGRADE AGENCY TRAPS
          </p>
          <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-4xl">
            Founder-Friendly Pricing &amp; Engagement Models
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base text-industrial-silver">
            Whether you need a free proof of capability, a strictly performance-based batch,
            or a dedicated pipeline engine — every tier is backed by our &lt;2% bounce ceiling.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative flex flex-col justify-between border p-6 sm:p-8 transition-all duration-300 ${
                tier.isPopular
                  ? "border-tactical-red bg-tactical-redDim/25 shadow-tactical"
                  : "border-industrial-line bg-industrial-panel hover:border-industrial-silver"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 right-6 border border-tactical-red bg-tactical-red px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-tactical text-stealth-black">
                  MOST POPULAR FOR EARLY TEAMS
                </div>
              )}

              <div>
                <span className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
                  TIER 0{tier.tier} · {tier.badge}
                </span>

                <h4 className="mt-3 font-display text-2xl font-bold text-white">
                  {tier.modelName}
                </h4>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs text-industrial-ash">
                    {tier.period}
                  </span>
                </div>

                {tier.subprice && (
                  <p className="mt-1 font-mono text-xs text-ember-glow">
                    {tier.subprice}
                  </p>
                )}

                <div className="mt-3 border-y border-industrial-line/80 py-2 font-mono text-xs text-industrial-silver">
                  {tier.upfront}
                </div>

                <ul className="mt-6 space-y-3 font-sans text-xs text-industrial-silver">
                  {tier.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-tactical-red shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-industrial-line/80 pt-6">
                <p className="font-mono text-[11px] text-industrial-ash leading-relaxed mb-5">
                  <span className="text-white font-medium">Best For: </span>
                  {tier.bestFor}
                </p>

                <a
                  href={tier.href}
                  className={`focus-ring flex items-center justify-center gap-2 w-full py-3.5 px-4 font-mono text-xs uppercase tracking-tactical transition-all duration-300 ${
                    tier.isPopular
                      ? "border border-tactical-red bg-tactical-red text-stealth-black font-bold hover:bg-transparent hover:text-tactical-red shadow-tactical"
                      : "border border-industrial-line bg-stealth-deep text-white hover:border-tactical-red hover:text-tactical-red"
                  }`}
                >
                  {tier.cta}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION F: TECHNICAL FAQ (Pre-Handling CEO Objections)
      ========================================================================= */}
      <div className="border-b border-industrial-line/80 py-20">
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          PRE-HANDLING CRITICAL OBJECTIONS
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-4xl">
          Frequently Asked Questions
        </h3>
        <p className="mt-3 max-w-2xl text-base text-industrial-silver">
          Direct answers to the questions technical CEOs and Heads of Sales ask before
          outsourcing research or testing outbound.
        </p>

        {/* Accordion FAQ */}
        <div className="mt-10 divide-y divide-industrial-line border border-industrial-line bg-industrial-panel">
          {leadIntelFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="transition-colors hover:bg-white/[0.01]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <span className="text-tactical-red shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-industrial-silver">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION G: FOUNDER UPLINK & DIRECT CONNECTION BANNER
      ========================================================================= */}
      <div className="pt-20">
        <div className="border border-industrial-line bg-gradient-to-br from-industrial-panel to-stealth-deep p-8 sm:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-tactical-red/30 bg-tactical-redDim px-2.5 py-1 font-mono text-xs uppercase tracking-tactical text-tactical-red">
                <Sparkles size={12} />
                FOUNDER-LED TECHNICAL AUTHORITY
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Ready to Test 10 Browser-Verified Sniper Accounts?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-industrial-silver">
                Send me your ICP parameters (industries, buyer titles, and key stack triggers).
                I will build a custom 10-account sample dossier in a live 2-Tab Google Sheet within 48 hours — zero cost.
              </p>
              <div className="mt-4 font-mono text-xs text-industrial-ash">
                Architected directly by <span className="text-white">Seshank Chinnapotula</span> (M.Tech IIT Madras).
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="mailto:seshank@seshankailabs.com?subject=Free%2010-Lead%20Sniper%20Dossier%20Request"
                className="focus-ring inline-flex items-center justify-center gap-2 border border-tactical-red bg-tactical-red px-6 py-3.5 font-mono text-xs uppercase tracking-tactical text-stealth-black font-bold shadow-tactical hover:bg-transparent hover:text-tactical-red transition-all"
              >
                <Mail size={14} />
                Email: seshank@seshankailabs.com
              </a>
              <a
                href="https://linkedin.com/in/seshankch"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 border border-industrial-line bg-industrial-panel px-6 py-3.5 font-mono text-xs uppercase tracking-tactical text-white hover:border-tactical-red hover:text-tactical-red transition-all"
              >
                <Linkedin size={14} className="text-sky-400" />
                Connect on LinkedIn
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

