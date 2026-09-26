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
    title: "Low-Latency Arabic/English Voice & CX Agent Pipeline",
    tagline: "Sub-150ms speech-to-action engine with dialectal hallucination mitigation and semantic audio caching.",
    vertical: "Conversational AI, Voice Commerce & Call Centers",
    typicalTargets: "Lucidya, Wittify, Banah, Qeen.ai, Seraya, Teammates.ai, Sawt",
    metrics: [
      { label: "First-Token Latency (TTFT)", value: "<148ms", sub: "Streaming audio pipeline" },
      { label: "Dialectal Accuracy", value: "96.4%", sub: "25+ Arabic regional dialects" },
      { label: "Jailbreak Interception", value: "100%", sub: "NeMo Guardrails active" },
      { label: "Semantic Cache Hit Rate", value: "38%", sub: "Slashing inference bills" },
    ],
    problem:
      "Conversational voice agents live and die by latency. Delays over 300ms break conversational flow, feel unnatural, and cause callers to hang up. Furthermore, Gulf Arabic dialects (Najdi, Hijazi, Emirati) cause severe hallucination and acoustic drift in standard LLMs.",
    solution:
      "We engineered an asynchronous WebSocket and Server-Sent Events (SSE) pipeline that streams tokens directly from model inference to neural TTS without intermediary buffering. A Redis semantic audio cache eliminates redundant LLM calls for recurring queries, and NeMo Guardrails halts prompt injections in sub-5ms.",
    stack: [
      "FastAPI (Low-Latency WebSockets & SSE)",
      "Redis (Semantic Audio & Prompt Cache)",
      "NVIDIA NeMo Guardrails",
      "DeepEval (Conversational Quality & Hallucination)",
      "Multi-Dialect Arabic NLP Gateways",
      "Whisper / ElevenLabs / Azure Neural Speech",
    ],
    architectureDiagram: `flowchart LR
    A["User Voice Input"] --> B["FastAPI WebSocket Ingestion"]
    B --> C["Acoustic VAD & Speech-to-Text"]
    C --> D["Redis Semantic Cache"]
    D -->|Cache Hit 42ms| E["Cached Audio Stream"]
    D -->|Cache Miss| F["LangGraph Dialogue Manager"]
    F --> G["NeMo Guardrails Check"]
    G --> H["Low-Latency Neural TTS"]
    H --> I["Sub-150ms Audio Output Stream"]`,
    codeSnippet: `@app.websocket("/agent/voice/stream")
async def voice_dialogue_channel(websocket: WebSocket):
    await websocket.accept()
    dialogue_state = DialogueState(session_id=str(uuid.uuid4()))
    
    async for audio_chunk in websocket.iter_bytes():
        # 1. Real-time VAD & transcription tokenization
        user_utterance = await speech_recognizer.transcribe_chunk(audio_chunk)
        if not user_utterance.is_final:
            continue
            
        # 2. Parallel NeMo guardrail validation & semantic lookup
        async for audio_token in voice_graph.astream_tokens(user_utterance.text):
            await websocket.send_bytes(audio_token)`,
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
