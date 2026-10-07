export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "proof", label: "Telemetry & Proof" },
  { id: "contact", label: "Contact" },
];

export const valueCards = [
  {
    id: "fintech",
    system: "ARCHETYPE 01",
    title: "Deterministic Financial & Risk Underwriting State Machine",
    pain: "LLM agents hallucinate risk scores and fail multi-source transaction ingestion.",
    capability:
      "Cyclic LangGraph state machine with strict Pydantic v2 schemas and NeMo Guardrails. Delivers deterministic debt scoring and SAMA/CBUAE regulatory compliance under 200ms.",
    tags: ["LANGGRAPH", "FASTAPI STREAMING", "FINTECH / BAAS", "SUB-200MS"],
  },
  {
    id: "terminal-bridge",
    system: "ARCHETYPE 02",
    title: "Universal LLM Terminal Bridge & Cloud Gateway",
    pain: "Agentic developer CLIs (Claude Code) are locked to Anthropic endpoints, locking out enterprise Google Cloud credits and IAM controls.",
    capability:
      "Transparent FastAPI proxy translating Anthropic Messages API protocols into LiteLLM format. Runs Claude Code CLI natively on Google Cloud Vertex AI (Gemini 2.5 Pro / Flash) with sub-4ms streaming translation.",
    tags: ["CLAUDE CODE", "VERTEX AI", "GEMINI 2.5 PRO", "FASTAPI PROXY", "LITELLM"],
  },
  {
    id: "voice-cx",
    system: "ARCHETYPE 03",
    title: "Low-Latency Arabic/English Voice & CX Agent Pipeline",
    pain: "Conversational audio lag (>500ms) and regional dialectal hallucination.",
    capability:
      "Async FastAPI streaming (SSE) with Redis semantic audio caching and DeepEval automated regression suites, slashing first-token conversational latency below 150ms.",
    tags: ["STREAMING SSE", "REDIS CACHING", "VOICE AI", "ARABIC NLP"],
  },
  {
    id: "enterprise-rag",
    system: "ARCHETYPE 04",
    title: "Hardened Enterprise Stripe RAG & AI Security Platform",
    pain: "Enterprise payment APIs suffer from prompt jailbreaks, live secret leakage (sk_live_*), Radar fraud evasion, and unranked context dilution.",
    capability:
      "Two-gate zero-trust architecture combining Colang-based NeMo Guardrails, Vertex AI text-embedding-004, Qdrant Cloud HNSW search, local FlashRank TinyBERT re-ranking, and automated RAGAS regression CI/CD.",
    tags: ["GCP VERTEX AI", "NEMO GUARDRAILS", "QDRANT CLOUD", "RAGAS REGRESSION", "PORTKEY"],
  },
];

export const demoData = [
  {
    id: "BENCH-PYRIT-01",
    doc: "NeMo Guardrails vs Adversarial Injections",
    param: "Microsoft PyRIT 50+ Automated Attacks",
    confidence: "100% Blocked (0 Breaches)",
  },
  {
    id: "LAT-REDIS-02",
    doc: "FastAPI + Redis Semantic Cache Layer",
    param: "Repeated Vector Embedding & Query",
    confidence: "42ms (Slashed from 850ms)",
  },
  {
    id: "EVAL-DEEP-03",
    doc: "LangGraph Financial Risk State Machine",
    param: "DeepEval Faithfulness & Groundedness",
    confidence: "0.97 / 1.00 Score",
  },
  {
    id: "STRM-SSE-04",
    doc: "High-Throughput Multi-Agent Token Stream",
    param: "Time-To-First-Token (TTFT) Under Concurrency",
    confidence: "148ms Median",
  },
  {
    id: "VALID-PYD-05",
    doc: "Multi-Tier Banking API Ingestion Webhook",
    param: "Pydantic v2 Schema Drift Regression",
    confidence: "0.00% Parameter Drift",
  },
];
