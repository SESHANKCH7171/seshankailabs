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
    id: "telematics",
    system: "ARCHETYPE 02",
    title: "Autonomous Fleet Telematics & IoT Dispatch Engine",
    pain: "High-concurrency live GPS & CAN-bus telemetry streams choke standard agent pipelines.",
    capability:
      "Human-in-the-loop state checkpoints powered by Redis Pub/Sub and FastAPI WebSockets for real-time asset dispatch, sensor anomaly detection, and automated SLA resolution.",
    tags: ["REDIS PUB/SUB", "WEBSOCKETS", "LOGISTICS & MOBILITY", "IOT PIPELINES"],
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
    id: "doc-rag",
    system: "ARCHETYPE 04",
    title: "Unstructured Document & Statutory RAG Engine",
    pain: "Multi-page legal contracts and commercial invoices suffer from hallucinated citations.",
    capability:
      "Multi-agent synthesis graph with pgvector semantic caching and DeepEval faithfulness verification. Extracts complex tables with zero hallucination and complete audit-ready logs.",
    tags: ["DEEPEVAL REGRESSION", "NEMO GUARDRAILS", "LEGALTECH & COMPLIANCE"],
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
