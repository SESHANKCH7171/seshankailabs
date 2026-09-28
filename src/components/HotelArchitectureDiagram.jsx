import React, { useState } from "react";
import {
  Mic,
  LayoutDashboard,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  Star,
  DollarSign,
  ArrowDown,
  Database,
  Volume2,
  Sparkles,
  Radio,
  Clock,
  Zap,
} from "lucide-react";

export default function HotelArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState("visual"); // "visual" | "voice-flow" | "raw"

  return (
    <div className="my-10 overflow-hidden rounded border border-industrial-line bg-industrial-panelDeep shadow-[0_0_30px_rgba(255,26,26,0.06)]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-industrial-line bg-industrial-panel p-4 px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded border border-tactical-red/40 bg-tactical-redDim text-tactical-red">
            <Layers size={16} />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold tracking-tactical text-white">
              HOTEL COPILOT 3.0 · SYSTEM TOPOLOGY
            </h4>
            <p className="font-mono text-[11px] text-industrial-ash">
              Dual Client Ingestion ➔ LangGraph Fan-Out State Graph ➔ LiveKit WebRTC
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-3 flex items-center gap-1 sm:mt-0 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "visual"
                ? "bg-tactical-red text-stealth-black font-bold"
                : "text-industrial-ash hover:text-white hover:bg-stealth-deep"
            }`}
          >
            System Graph
          </button>
          <button
            onClick={() => setActiveTab("voice-flow")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "voice-flow"
                ? "bg-tactical-red text-stealth-black font-bold"
                : "text-industrial-ash hover:text-white hover:bg-stealth-deep"
            }`}
          >
            Voice Pipeline (891ms)
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "raw"
                ? "bg-tactical-red text-stealth-black font-bold"
                : "text-industrial-ash hover:text-white hover:bg-stealth-deep"
            }`}
          >
            ASCII Spec
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="p-6 sm:p-8">
        {activeTab === "visual" && (
          <div className="space-y-6">
            {/* TIER 1: Dual Entrypoints */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Streamlit Card */}
              <div className="relative rounded-lg border border-industrial-line bg-industrial-panel p-5 transition-all hover:border-industrial-silver/40">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded border border-industrial-line bg-stealth-deep px-2.5 py-0.5 font-mono text-[10px] uppercase text-industrial-silver">
                    <LayoutDashboard size={12} className="text-industrial-ash" />
                    PORT 8501 · UI
                  </span>
                  <span className="font-mono text-[10px] text-industrial-ash">DIRECT STATE</span>
                </div>
                <h5 className="mt-3 font-display text-base font-bold text-white">
                  GM Dashboard (Streamlit)
                </h5>
                <p className="mt-1 text-xs text-industrial-silver">
                  Executive visual interface with real-time charts, brief synthesis, and memory history.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-industrial-ash">[Daily Brief]</span>
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-industrial-ash">[Chat]</span>
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-industrial-ash">[Live Data]</span>
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-industrial-ash">[SQLite Memory]</span>
                </div>
              </div>

              {/* WebRTC Voice Card */}
              <div className="relative rounded-lg border border-tactical-red/50 bg-tactical-redDim/20 p-5 shadow-[0_0_15px_rgba(255,26,26,0.08)] transition-all hover:border-tactical-red">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded border border-tactical-red/60 bg-tactical-redDim px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-tactical-red">
                    <Radio size={12} className="animate-pulse" />
                    WEBRTC AGENT
                  </span>
                  <span className="font-mono text-[10px] text-ember-glow">891MS TTFT</span>
                </div>
                <h5 className="mt-3 font-display text-base font-bold text-white">
                  🎙️ WebRTC Voice Copilot
                </h5>
                <p className="mt-1 text-xs text-industrial-silver">
                  Sub-second conversational audio worker connecting LiveKit Cloud with Groq &amp; Deepgram.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-tactical-red">[Silero VAD]</span>
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-ember-glow">[Groq Whisper V3]</span>
                  <span className="rounded bg-stealth-deep px-2 py-0.5 text-white">[Deepgram Aura-2]</span>
                </div>
              </div>
            </div>

            {/* Connecting Arrows Down to Center Engine */}
            <div className="flex justify-around py-1 text-industrial-ash">
              <div className="flex flex-col items-center">
                <div className="h-6 w-0.5 bg-industrial-line"></div>
                <ArrowDown size={14} className="text-industrial-ash" />
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-industrial-ash">
                  Direct Ingestion
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-6 w-0.5 bg-tactical-red/50"></div>
                <ArrowDown size={14} className="text-tactical-red animate-bounce" />
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-tactical-red font-semibold">
                  Tool: query_hotel_systems()
                </span>
              </div>
            </div>

            {/* TIER 2: Central LangGraph Anomaly State Engine */}
            <div className="rounded-lg border border-industrial-line bg-gradient-to-r from-industrial-panel via-stealth-deep to-industrial-panel p-6 shadow-tactical">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-industrial-line pb-3">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-tactical-red" />
                  <span className="font-display text-sm font-bold text-white">
                    LangGraph Multi-Agent Anomaly State Machine
                  </span>
                </div>
                <span className="rounded border border-ember-glow/40 bg-ember-glowDim px-2 py-0.5 font-mono text-[10px] text-ember-glow">
                  FAN-OUT ➔ DOMAIN NODES ➔ FAN-IN ➔ SYNTHESIS
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-industrial-silver">
                Decoupled cyclic state machine. The LLM does not perform math; each node deterministically
                retrieves telemetry, flags threshold breaches, and synthesizes executive recommendations.
              </p>

              {/* Fan-Out Connectors */}
              <div className="mt-5 grid grid-cols-4 gap-2 pt-2 text-center font-mono text-[9px] text-industrial-ash">
                <div className="flex flex-col items-center">
                  <span>BRANCH 01</span>
                  <ArrowDown size={12} className="text-tactical-red mt-1" />
                </div>
                <div className="flex flex-col items-center">
                  <span>BRANCH 02</span>
                  <ArrowDown size={12} className="text-ember-glow mt-1" />
                </div>
                <div className="flex flex-col items-center">
                  <span>BRANCH 03</span>
                  <ArrowDown size={12} className="text-industrial-silver mt-1" />
                </div>
                <div className="flex flex-col items-center">
                  <span>BRANCH 04</span>
                  <ArrowDown size={12} className="text-tactical-red mt-1" />
                </div>
              </div>

              {/* 4 Specialized Domain Nodes */}
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* Node 1: Revenue */}
                <div className="rounded border border-industrial-line bg-stealth-deep p-3.5 transition-all hover:border-tactical-red/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-tactical-red">01 · REVENUE</span>
                    <TrendingUp size={13} className="text-tactical-red" />
                  </div>
                  <h6 className="mt-1 font-display text-xs font-bold text-white">Revenue Node (RMS)</h6>
                  <p className="mt-1 font-mono text-[10px] text-industrial-ash">tools/rms_tools.py</p>
                  <div className="mt-2 border-t border-industrial-line/60 pt-2 font-mono text-[9px] text-industrial-silver">
                    <span className="text-tactical-red">Rule:</span> Comp-set rate parity gaps &gt;15%
                  </div>
                </div>

                {/* Node 2: Operations */}
                <div className="rounded border border-industrial-line bg-stealth-deep p-3.5 transition-all hover:border-ember-glow/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-ember-glow">02 · OPS</span>
                    <Activity size={13} className="text-ember-glow" />
                  </div>
                  <h6 className="mt-1 font-display text-xs font-bold text-white">Operations Node (PMS)</h6>
                  <p className="mt-1 font-mono text-[10px] text-industrial-ash">tools/pms_tools.py</p>
                  <div className="mt-2 border-t border-industrial-line/60 pt-2 font-mono text-[9px] text-industrial-silver">
                    <span className="text-ember-glow">Rule:</span> Soft dates (&lt;70% occ) &amp; pace drops
                  </div>
                </div>

                {/* Node 3: Reputation */}
                <div className="rounded border border-industrial-line bg-stealth-deep p-3.5 transition-all hover:border-industrial-silver/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-industrial-silver">03 · REPUTE</span>
                    <Star size={13} className="text-industrial-silver" />
                  </div>
                  <h6 className="mt-1 font-display text-xs font-bold text-white">Reputation Node</h6>
                  <p className="mt-1 font-mono text-[10px] text-industrial-ash">tools/review_tools.py</p>
                  <div className="mt-2 border-t border-industrial-line/60 pt-2 font-mono text-[9px] text-industrial-silver">
                    <span className="text-white">Rule:</span> Unresponded negative reviews &lt;3.0
                  </div>
                </div>

                {/* Node 4: Payroll */}
                <div className="rounded border border-industrial-line bg-stealth-deep p-3.5 transition-all hover:border-tactical-red/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-tactical-red">04 · PAYROLL</span>
                    <DollarSign size={13} className="text-tactical-red" />
                  </div>
                  <h6 className="mt-1 font-display text-xs font-bold text-white">Payroll Node</h6>
                  <p className="mt-1 font-mono text-[10px] text-industrial-ash">tools/payroll_tools.py</p>
                  <div className="mt-2 border-t border-industrial-line/60 pt-2 font-mono text-[9px] text-industrial-silver">
                    <span className="text-tactical-red">Rule:</span> Overtime variance &gt;10% of budget
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 3: Data Adapters & Storage */}
            <div className="rounded-lg border border-industrial-line bg-industrial-panel p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-tactical text-industrial-ash">
                <Database size={13} className="text-tactical-red" />
                <span>HOTEL TELEMETRY DATA ADAPTER LAYER (IN-MEMORY / PMS / RMS)</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 font-mono text-[10px]">
                <span className="rounded border border-industrial-line bg-stealth-deep px-3 py-1 text-industrial-silver">
                  PMS/RMS Telemetry Generator
                </span>
                <span className="rounded border border-industrial-line bg-stealth-deep px-3 py-1 text-industrial-silver">
                  Competitor Rate Scraper Engine
                </span>
                <span className="rounded border border-industrial-line bg-stealth-deep px-3 py-1 text-industrial-silver">
                  OTA Multi-Channel Reviews Feed
                </span>
                <span className="rounded border border-industrial-line bg-stealth-deep px-3 py-1 text-industrial-silver">
                  Timecard &amp; Departmental Clocking
                </span>
                <span className="rounded border border-tactical-red/30 bg-tactical-redDim px-3 py-1 text-tactical-red">
                  SQLite Memory (`memory/hotel_memory.py`)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Voice Flow (891ms Latency Waterfall) */}
        {activeTab === "voice-flow" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="rounded border border-industrial-line bg-stealth-deep p-4 text-industrial-silver">
              <div className="flex items-center justify-between pb-3 border-b border-industrial-line">
                <span className="text-white font-bold flex items-center gap-2">
                  <Zap size={14} className="text-tactical-red" />
                  SUB-SECOND WEBRTC AUDIO PIPELINE
                </span>
                <span className="text-tactical-red font-bold">TOTAL: 3,064MS END-TO-END</span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Step 1 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      1
                    </span>
                    <div>
                      <p className="text-white font-semibold">Silero Voice Activity Detection (VAD)</p>
                      <p className="text-[11px] text-industrial-ash">
                        Acoustic model detects turn completion; commits buffer after 600ms pause.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">600ms</span>
                </div>

                {/* Step 2 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      2
                    </span>
                    <div>
                      <p className="text-white font-semibold">Groq Whisper Large V3 (STT)</p>
                      <p className="text-[11px] text-industrial-ash">
                        Streams committed audio to Groq LPU; transcribes 13s utterance with ~0.0% WER.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">250ms</span>
                </div>

                {/* Step 3 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      3
                    </span>
                    <div>
                      <p className="text-white font-semibold">LLM Intent Parsing &amp; Tool Dispatch</p>
                      <p className="text-[11px] text-industrial-ash">
                        Groq gpt-oss-20b identifies query_hotel_systems() tool call.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">200ms</span>
                </div>

                {/* Step 4 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      4
                    </span>
                    <div>
                      <p className="text-white font-semibold">LangGraph Multi-Agent Anomaly Compute</p>
                      <p className="text-[11px] text-industrial-ash">
                        In-memory DataFrame analytics across RMS, PMS, Reviews, and Payroll.
                      </p>
                    </div>
                  </div>
                  <span className="text-tactical-red font-bold">900ms</span>
                </div>

                {/* Step 5 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      5
                    </span>
                    <div>
                      <p className="text-white font-semibold">Groq LLM Synthesis (TTFT: 891ms)</p>
                      <p className="text-[11px] text-industrial-ash">
                        Synthesizes structured metrics into concise executive verbal response.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">600ms</span>
                </div>

                {/* Step 6 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      6
                    </span>
                    <div>
                      <p className="text-white font-semibold">Deepgram Aura-2 Neural TTS (TTFB &lt;100ms)</p>
                      <p className="text-[11px] text-industrial-ash">
                        Converts first streaming tokens into natural human 48kHz Opus audio frames.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">150ms</span>
                </div>

                {/* Step 7 */}
                <div className="flex items-start justify-between p-3 rounded bg-industrial-panel border border-industrial-line">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded bg-stealth-deep text-[10px] text-tactical-red font-bold">
                      7
                    </span>
                    <div>
                      <p className="text-white font-semibold">LiveKit WebRTC Playout Jitter Buffer</p>
                      <p className="text-[11px] text-industrial-ash">
                        Delivered over UDP/RTP directly to browser audioContext; speaker plays out.
                      </p>
                    </div>
                  </div>
                  <span className="text-ember-glow font-bold">364ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Raw ASCII Spec */}
        {activeTab === "raw" && (
          <pre className="overflow-x-auto rounded border border-industrial-line bg-stealth-deep p-4 font-mono text-xs leading-relaxed text-industrial-silver">
{`┌─────────────────────────────────────────────────┐      ┌─────────────────────────────┐
│              GM Dashboard (Streamlit)           │      │  🎙️ WebRTC Voice Copilot   │
│  [Daily Brief] [Chat] [Live Data] [Memory]      │      │     (LiveKit + Voice Agent) │
└──────────────────┬──────────────────────────────┘      └──────────────┬──────────────┘
                   │                                                    │
                   └──────────────────┐           ┌─────────────────────┘
                                      ▼           ▼
                            ┌──────────────────┐
                            │  LangGraph pipeline │  fan-out → domain nodes → fan-in → synthesis
                            └──┬──┬──┬──┬────────┘
                               │  │  │  │
                       ┌───────┘  │  │  └──────────┐
                       ▼          ▼  ▼             ▼
                   ┌───────┐ ┌──────┐ ┌────────┐ ┌──────────┐
                   │Revenue│ │Ops   │ │Repute  │ │Payroll   │
                   │node   │ │node  │ │node    │ │node      │
                   └───┬───┘ └──┬───┘ └───┬────┘ └────┬─────┘
                       │        │          │           │
                       ▼        ▼          ▼           ▼
                     PMS/RMS  Arrivals   Reviews    Payroll
                     tools    tools      tools      tools`}
          </pre>
        )}
      </div>
    </div>
  );
}
