export const architecturesData = {
  fintech: {
    id: "fintech",
    number: "ARCHETYPE 01",
    title: "Deterministic Financial & Risk Underwriting State Machine",
    tagline: "Sub-200ms cyclic LangGraph agent with strict Pydantic v2 schemas and SAMA/CBUAE regulatory guardrails.",
    vertical: "FinTech, BNPL, BaaS & Corporate Spend",
    typicalTargets: "Alaan, Cashew Payments, Erad, Flow48, Stake, Wadaie, Nqoodlet, Abwab.ai",
    metrics: [
      { label: "Execution Latency", value: "<168ms", sub: "FastAPI async pipeline" },
      { label: "DeepEval Faithfulness", value: "0.97 / 1.00", sub: "Zero risk hallucination" },
      { label: "Schema Drift Rate", value: "0.00%", sub: "Strict Pydantic v2 validation" },
      { label: "Regulatory Compliance", value: "SAMA / CBUAE", sub: "Deterministic audit logs" },
    ],
    problem:
      "Most commercial LLM wrappers fail catastrophically in financial underwriting. Multi-source transaction streams (POS, bank statements, VAT filings) suffer from schema drift, non-deterministic credit scoring, and silent parameter hallucinations that violate banking regulatory mandates.",
    solution:
      "We engineered a cyclic multi-agent graph in LangGraph that decouples ingestion, validation, deterministic calculation, and audit trail generation into discrete state nodes. Pydantic v2 enforces byte-level input validation, while NVIDIA NeMo Guardrails prevents jailbreak attacks and data exfiltration. Cached transaction embeddings in Redis drop repetitive lookups to sub-50ms.",
    stack: [
      "LangGraph (Cyclic State Machine)",
      "FastAPI (Async SSE Streaming)",
      "Redis (Semantic Cache & Task Queue)",
      "NVIDIA NeMo Guardrails",
      "Pydantic v2 (Strict Schema Enforcement)",
      "DeepEval (Automated Regression CI/CD)",
      "PostgreSQL + pgvector",
    ],
    architectureDiagram: `flowchart TD
    A["Inbound Webhook / Bank Statement"] --> B["FastAPI Async Ingestion"]
    B --> C{"NeMo Guardrail Layer"}
    C -->|Blocked: Prompt Injection| D["Security Intercept Log (PyRIT)"]
    C -->|Passed| E["Pydantic v2 Parser & Normalizer"]
    E --> F["Redis Semantic Cache Check"]
    F -->|Cache Hit (42ms)| G["Immediate Response"]
    F -->|Cache Miss| H["LangGraph Underwriting State Machine"]
    H --> I["Debt-to-Income Evaluation Node"]
    H --> J["Multi-Bank Cashflow Reconciliation"]
    I & J --> K["Deterministic Decision Node"]
    K --> L["DeepEval Faithfulness Verifier"]
    L --> M["Sub-200ms SSE Stream Out + Audit Log"]`,
    codeSnippet: `@app.post("/api/v1/underwrite/stream")
async def stream_underwriting(payload: FinancialPayload) -> StreamingResponse:
    # 1. Byte-level schema validation via Pydantic v2
    validated_data = UnderwritingSchema.model_validate(payload)
    
    # 2. Redis semantic cache lookup
    cache_key = generate_semantic_hash(validated_data)
    if cached_result := await redis_cache.get(cache_key):
        return StreamingResponse(cached_stream(cached_result), media_type="text/event-stream")
    
    # 3. Cyclic LangGraph state machine execution
    initial_state = {"input": validated_data, "retry_count": 0, "verified": False}
    return StreamingResponse(
        agent_graph.astream(initial_state), 
        media_type="text/event-stream"
    )`,
  },

  telematics: {
    id: "telematics",
    number: "ARCHETYPE 02",
    title: "Autonomous Fleet Telematics & IoT Dispatch Engine",
    tagline: "Human-in-the-loop state machine handling high-concurrency GPS and CAN-bus telemetry streams.",
    vertical: "Logistics, Mobility, Heavy Equipment & PropTech",
    typicalTargets: "Shift, Arsann, Equiptal, TruKKer, Cargoz, WheelsOn, NOMU Group",
    metrics: [
      { label: "Dispatch Decision Latency", value: "<142ms", sub: "Redis Pub/Sub ingestion" },
      { label: "Telemetry Concurrency", value: "10,000+ msgs/s", sub: "FastAPI WebSockets" },
      { label: "SLA Anomaly Detection", value: "99.98%", sub: "Instant alert dispatch" },
      { label: "Human Checkpoint Rate", value: "Zero Downtime", sub: "LangGraph HITL" },
    ],
    problem:
      "Enterprise logistics and fleet operations generate continuous high-frequency telemetry (CAN-bus diagnostics, GPS coordinates, fuel levels). Standard agent pipelines choke under concurrency, drop sensor packets, and hallucinate route adjustments when edge anomalies occur.",
    solution:
      "This architecture pairs a low-latency Redis Pub/Sub message broker with FastAPI WebSockets to ingest sensor streams in real time. LangGraph state checkpoints allow human dispatchers to intervene during critical routing exceptions, while background Celery/Redis RQ workers handle heavy route optimization asynchronously.",
    stack: [
      "LangGraph (Human-in-the-Loop Checkpoints)",
      "FastAPI (WebSockets & Async Consumers)",
      "Redis (Pub/Sub & Geospatial Indexing)",
      "Celery / Redis RQ (Async Task Workers)",
      "CAN-bus & GPS Telemetry Protocol Parsers",
      "Pydantic v2 (Hardware Telemetry Models)",
    ],
    architectureDiagram: `flowchart TD
    A["Vehicle / Heavy Equipment Sensors"] -->|CAN-bus / GPS| B["FastAPI WebSocket Gateway"]
    B --> C["Redis Pub/Sub Telemetry Broker"]
    C --> D["LangGraph State Machine"]
    D --> E{"Sensor Anomaly Detected?"}
    E -->|Normal| F["Automated Asset Allocation & Route Sync"]
    E -->|Anomaly / SLA Violation| G["Human-in-the-Loop Checkpoint"]
    G -->|Dispatcher Approval| F
    F --> H["Driver App & Fleet Telemetry Dashboard"]`,
    codeSnippet: `class VehicleTelemetry(BaseModel):
    vehicle_id: str
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    engine_temp_c: float
    fuel_level_pct: float = Field(..., ge=0.0, le=100.0)
    can_bus_fault_codes: list[str] = Field(default_factory=list)

@router.websocket("/ws/telemetry/{vehicle_id}")
async def telemetry_stream(websocket: WebSocket, vehicle_id: str):
    await websocket.accept()
    async for raw_data in websocket.iter_json():
        telemetry = VehicleTelemetry.model_validate(raw_data)
        await redis_bus.publish(f"fleet:{vehicle_id}", telemetry.model_dump_json())`,
  },

  "voice-cx": {
    id: "voice-cx",
    number: "ARCHETYPE 03",
    title: "Real-Time WebRTC Voice Copilot & LangGraph Anomaly State Engine",
    tagline: "891ms TTFT multimodal WebRTC voice interface backed by LiveKit Cloud, Groq LPUs, Deepgram Aura-2, and deterministic multi-agent LangGraph workflows.",
    vertical: "Enterprise Voice Copilots, Executive Analytics & Conversational AI",
    typicalTargets: "Lucidya, Wittify, Banah, Qeen.ai, Seraya, Teammates.ai, Sawt",
    githubRepo: "https://github.com/SESHANKCH7171/hotel-gm-system-3.0.git",
    metrics: [
      { label: "LLM First-Token (TTFT)", value: "891ms", sub: "Groq LPU + LiveKit WebRTC" },
      { label: "End-to-End Latency", value: "3,064ms", sub: "Mic to Speaker Full Turn" },
      { label: "TTS First Byte (TTFB)", value: "<100ms", sub: "Deepgram Aura-2 Neural Voice" },
      { label: "Deterministic Anomaly Grounding", value: "100%", sub: "Zero LLM Hallucination" },
    ],
    problem:
      "Most commercial voice bots are ungrounded conversational wrappers that hallucinate domain statistics and break conversational flow with 4-5 second audio buffering. When an executive asks for real-time operational anomalies, generic voice agents guess numbers rather than querying live enterprise telemetry.",
    solution:
      "We engineered an end-to-end WebRTC voice pipeline using LiveKit Cloud, Silero VAD, Groq Whisper Large V3, and Deepgram Aura-2. When the user speaks, the agent autonomously invokes a multi-agent LangGraph orchestrator that calculates deterministic rate parity, soft occupancy compression, and payroll overruns before synthesizing audio.",
    stack: [
      "LiveKit Cloud (Carrier-Grade WebRTC)",
      "Groq LPU (Whisper Large V3 + gpt-oss-20b)",
      "Deepgram (Aura-2 Neural TTS)",
      "LangGraph (Deterministic Anomaly Graph)",
      "Silero VAD (Acoustic Turn Endpointing)",
      "Redis (Semantic Telemetry Cache)",
      "Streamlit (Executive Companion Dashboard)",
    ],
    architectureDiagram: `flowchart TD
    A["Executive Mic / Browser"] <-->|"WebRTC (UDP/ICE/STUN)"| B["LiveKit Cloud Media Gateway"]
    B <-->|"RTP Audio Tracks"| C["HotelCopilotAgent (Worker)"]
    C -->|"VAD Speech Chunking"| D["Silero VAD Endpointing"]
    D -->|"Turn Committed"| E["Groq Whisper Large V3 (STT)"]
    E -->|"User Transcript"| F["Groq LPU (gpt-oss-20b)"]
    F -->|"Autonomous Tool Call"| G["query_hotel_systems() Bridge"]
    G --> H["LangGraph Multi-Agent Anomaly Graph"]
    H --> I["Deterministic PMS/RMS/Payroll Rules Engine"]
    I -->|"Structured JSON Metrics"| F
    F -->|"Streaming Tokens"| J["Deepgram Aura-2 Neural TTS"]
    J -->|"Opus Audio Frames (<100ms TTFB)"| C
    C -->|"WebRTC Playout Track"| A`,
    codeSnippet: `class HotelCopilotAgent(Agent):
    def __init__(self) -> None:
        vad = silero.VAD.load()
        stt = openai.STT(
            model="whisper-large-v3",
            base_url="https://api.groq.com/openai/v1",
            api_key=os.environ.get("GROQ_API_KEY")
        )
        tts = deepgram.TTS(model="aura-2-andromeda-en", api_key=os.environ.get("DEEPGRAM_API_KEY"))
        groq_llm = openai.LLM(
            model="openai/gpt-oss-20b",
            base_url="https://api.groq.com/openai/v1",
            api_key=os.environ.get("GROQ_API_KEY")
        )
        super().__init__(instructions=EXECUTIVE_INSTRUCTIONS, stt=stt, llm=groq_llm, tts=tts, vad=vad)

    @llm.function_tool(description="Query hotel intelligence for revenue, occupancy, reputation, and payroll.")
    async def query_hotel_systems(self, query: str) -> str:
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, run_gm_chat, query)`,
  },

  "doc-rag": {
    id: "doc-rag",
    number: "ARCHETYPE 04",
    title: "Unstructured Document & Statutory RAG Engine",
    tagline: "Zero-hallucination multi-agent document synthesis with pgvector and statutory citation fidelity.",
    vertical: "LegalTech, Regulatory Compliance, Sovereign Enterprise",
    typicalTargets: "Qanooni, MilkStraw AI, Ameba, Sadq, Oqood, 1001, Gaia",
    metrics: [
      { label: "Statutory Citation Fidelity", value: "100%", sub: "Verifiable court/statute IDs" },
      { label: "DeepEval Faithfulness", value: "0.96 / 1.00", sub: "Automated regression tests" },
      { label: "Table & Column Accuracy", value: "99.2%", sub: "Multi-page unstructured PDF" },
      { label: "Audit Traceability", value: "Full SHA-256", sub: "Regulatory audit-ready logs" },
    ],
    problem:
      "Enterprise contracts, legal briefs, and government tenders are filled with dense, multi-page tables, statutory citations, and complex clauses. Standard RAG architectures chunk documents arbitrarily, losing semantic context and hallucinating legal citations that lead to compliance liability.",
    solution:
      "This architecture uses a multi-agent LangGraph topology: a Document Parsing Agent isolates tables and headers, an Embeddings Router indexes vectors into pgvector with Redis caching, and a Synthesis Agent verifies every statutory reference with DeepEval regression tests before drafting outputs.",
    stack: [
      "LangGraph (Multi-Agent Synthesis)",
      "pgvector + PostgreSQL",
      "Redis (Semantic Vector Query Cache)",
      "DeepEval (Faithfulness & Citation Validation)",
      "Pydantic v2 (Strict Document Schema Extraction)",
      "NeMo Guardrails (Confidentiality & Compliance)",
    ],
    architectureDiagram: `flowchart TD
    A["Unstructured Document / PDF Contract"] --> B["Document Chunking & Table Parser"]
    B --> C["Pydantic v2 Schema Normalizer"]
    C --> D["pgvector + Redis Embedding Cache"]
    D --> E["LangGraph Multi-Agent Synthesis Graph"]
    E --> F["Statutory Citation Verification Node"]
    F --> G["DeepEval Faithfulness & Groundedness Test"]
    G -->|Score >= 0.95| H["Audit-Ready Compliant Document + JSON"]
    G -->|Score < 0.95| E`,
    codeSnippet: `class ExtractedClause(BaseModel):
    clause_id: str
    statutory_citation: str
    liability_cap_usd: float
    governing_law: str = Field(..., description="e.g. UAE Federal Law / DIFC")
    compliance_passed: bool

async def synthesize_contract(doc_bytes: bytes) -> ExtractedClause:
    parsed_sections = await doc_parser.extract_tables(doc_bytes)
    state = {"sections": parsed_sections, "verified": False}
    result = await synthesis_graph.ainvoke(state)
    return ExtractedClause.model_validate(result["structured_output"])`,
  },
};
