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

  "terminal-bridge": {
    id: "terminal-bridge",
    number: "ARCHETYPE 02",
    title: "Universal LLM Terminal Bridge & Cloud Gateway",
    tagline: "High-performance transparent proxy translating Anthropic Messages API calls into LiteLLM format, running Claude Code CLI on Google Cloud Vertex AI & Gemini 2.5 Pro.",
    vertical: "Developer Tooling, Enterprise Cloud Migration & Sovereign AI",
    typicalTargets: "Google Cloud Enterprises, Vertex AI Customers, Engineering Teams, FinTech Platforms",
    githubRepo: "https://github.com/SESHANKCH7171/UNIVERSAL-LLM-TERMINAL-BRIDGE.git",
    metrics: [
      { label: "Proxy Latency Overhead", value: "<3.8ms", sub: "Sub-perceptual translation" },
      { label: "Cloud Spend Cut", value: "68.4%", sub: "Utilizing GCP enterprise commits" },
      { label: "Tool Call Pass Rate", value: "100.0%", sub: "Full file edits & test suites" },
      { label: "Context Headroom", value: "1,000,000+", sub: "Gemini 2.5 Pro full repo ingest" },
    ],
    problem:
      "Agentic developer tools like Claude Code (@anthropic-ai/claude-code) are tightly hardcoded to Anthropic's proprietary billing and API endpoints. Enterprises with hundreds of thousands in Google Cloud Platform commit credits or strict regional data boundary agreements cannot deploy Claude Code without violating data residency or burning unnecessary external SaaS budgets.",
    solution:
      "We engineered a transparent proxy server running on 127.0.0.1:8082 that intercepts Anthropic Messages API calls and translates schemas, tool calls, and real-time SSE streaming frames into LiteLLM protocols. Requests route seamlessly to Google Cloud Vertex AI (Gemini 2.5 Pro / Flash), Google AI Studio, or OpenAI with sub-4ms translation latency and zero CLI modifications.",
    stack: [
      "FastAPI (High-Throughput ASGI Proxy)",
      "LiteLLM (Multi-Cloud Orchestration Gateway)",
      "Google Cloud Vertex AI (ADC & Service Account JSON)",
      "Gemini 2.5 Pro & Gemini 2.5 Flash",
      "SSE Real-Time Event-Stream Translator",
      "Pydantic v2 (Message & Tool Schema Normalization)",
    ],
    architectureDiagram: `flowchart TD
    A["Claude Code CLI (@anthropic-ai/claude-code)"] -->|"ANTHROPIC_BASE_URL (Port 8082)"| B["FastAPI Universal Proxy Gateway"]
    B --> C["Schema & Tool Call Normalizer"]
    C --> D["Smart Model Mapping Engine"]
    D --> E["LiteLLM Multi-Cloud Gateway"]
    E -->|"Enterprise ADC / Service Account"| F["Google Cloud Vertex AI (Gemini 2.5 Pro / Flash)"]
    E -->|"API Key Auth"| G["Google AI Studio / OpenAI"]
    F & G -->|"Streaming Chunks"| H["Bi-Directional SSE Frame Translator"]
    H -->|"Sub-4ms Playout Frames"| A`,
    codeSnippet: `@app.post("/v1/messages")
async def messages_proxy(request: Request):
    body = await request.json()
    model_name = map_anthropic_model(body.get("model", "claude-3-5-sonnet"))
    is_streaming = body.get("stream", False)

    if not is_streaming:
        response = await litellm.acompletion(model=model_name, messages=body["messages"])
        return transform_to_anthropic_format(response)

    async def sse_event_translator():
        yield f"event: message_start\\ndata: {json.dumps(create_message_start(model_name))}\\n\\n"
        yield f"event: content_block_start\\ndata: {json.dumps({'type':'content_block_start','index':0,'content_block':{'type':'text','text':''}})}\\n\\n"

        response = await litellm.acompletion(model=model_name, messages=body["messages"], stream=True)
        async for chunk in response:
            content = chunk.choices[0].delta.content or ""
            if content:
                yield f"event: content_block_delta\\ndata: {json.dumps({'type':'content_block_delta','index':0,'delta':{'type':'text_delta','text':content}})}\\n\\n"

        yield f"event: content_block_stop\\ndata: {json.dumps({'type':'content_block_stop','index':0})}\\n\\n"
        yield f"event: message_delta\\ndata: {json.dumps({'type':'message_delta','delta':{'stop_reason':'end_turn'}})}\\n\\n"
        yield f"event: message_stop\\ndata: {json.dumps({'type':'message_stop'})}\\n\\n"

    return StreamingResponse(sse_event_translator(), media_type="text/event-stream")`,
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

  "enterprise-rag": {
    id: "enterprise-rag",
    number: "ARCHETYPE 04",
    title: "Hardened Enterprise Stripe RAG & AI Security Platform",
    tagline: "Zero-trust two-gate RAG architecture with NeMo Guardrails, Vertex AI text-embedding-004, Qdrant Cloud HNSW, and automated RAGAS CI/CD benchmarks.",
    vertical: "FinTech Payments, Regulated Cloud RAG, AI Security & Compliance",
    typicalTargets: "Stripe Partners, Tamara, Tabby, HyperPay, Paymob, Geidea, Checkout.com",
    githubRepo: "https://github.com/SESHANKCH7171/enterprise-rag-with-gcp.git",
    metrics: [
      { label: "Security Intercept Rate", value: "100.0%", sub: "DAN, secret leaks & Radar evasion" },
      { label: "RAGAS Faithfulness", value: "0.94 / 1.00", sub: "Grounded in Stripe API schemas" },
      { label: "Context Precision", value: "0.93 / 1.00", sub: "FlashRank TinyBERT re-ranking" },
      { label: "P50 Response Latency", value: "340ms", sub: "Vertex AI + Groq LPU pipeline" },
    ],
    problem:
      "Deploying RAG on enterprise financial APIs (such as Stripe payment intents, webhooks, chargeback disputes) introduces catastrophic vulnerabilities: adversarial prompts leaking live API secrets (sk_live_...), malicious queries evading Radar fraud rules, and unranked 80k-character context stuffing causing models to hallucinate nested JSON parameters.",
    solution:
      "We engineered a Two-Gate Zero-Trust pipeline. Gate 1 intercepts jailbreaks and secret probes using NVIDIA NeMo Guardrails with programmable Colang policies. Gate 2 executes a LangGraph state machine with two-stage retrieval: Vertex AI text-embedding-004 vectors indexed in Qdrant Cloud, followed by local zero-GPU FlashRank TinyBERT cross-encoder re-ranking. All answers route through Portkey AI Gateway with automated Groq failover.",
    stack: [
      "NVIDIA NeMo Guardrails (Colang Rules)",
      "Google Cloud Vertex AI (text-embedding-004)",
      "Qdrant Cloud (HNSW Vector DB)",
      "FlashRank (ms-marco-TinyBERT Cross-Encoder)",
      "LangGraph (Cyclic Orchestration)",
      "Portkey AI Gateway (Groq Primary/Fallback)",
      "RAGAS & Streamlit (Automated Regression CI/CD)",
      "Pydantic Logfire & LangSmith Telemetry",
    ],
    architectureDiagram: `flowchart TD
    A["Developer / Client REST Ingestion"] --> B{"Gate 1: NeMo Guardrails (Colang)"}
    B -->|Violation: Leak / DAN / Evasion| C["Security Intercept Log (403 Blocked)"]
    B -->|Passed| D["Gate 2: LangGraph State Machine"]
    D --> E{"Planner (Intent Router)"}
    E -->|Conversational| F["Direct Gateway Responder"]
    E -->|Documentation Query| G["Google Vertex AI text-embedding-004"]
    G --> H["Qdrant Cloud Vector DB (Top 20 Chunks)"]
    H --> I["FlashRank Local Cross-Encoder (TinyBERT)"]
    I --> J["Dynamic Context Pruner (<25k chars)"]
    J --> K["Portkey AI Gateway (Groq gpt-oss-120b)"]
    K -.->|Failover 429/503| L["Groq gpt-oss-20b Fallback"]
    K --> M["Logfire Spans + Validated Stripe Response"]`,
    codeSnippet: `# 1. Gate 1: Colang Safety Rails Check
rails_config = RailsConfig.from_path("./app/guardrails")
nemo_rails = LLMRails(rails_config)

async def verify_security_gate(prompt: str) -> bool:
    response = await nemo_rails.generate_async(prompt=prompt)
    if "I am programmed to be a secure Stripe assistant" in response.response:
        return False  # 403 Intercepted!
    return True

# 2. Gate 2: Two-Stage Re-Ranking Service
ranker = Ranker(model_name="ms-marco-TinyBERT-L-2-v2", cache_dir="/tmp/flashrank")

def rerank_and_prune(query: str, raw_chunks: list[dict], top_k: int = 4) -> str:
    rerank_req = RerankRequest(query=query, passages=raw_chunks)
    ranked = ranker.rerank(rerank_req)[:top_k]
    context = ""
    for r in ranked:
        if len(context) + len(r["text"]) < 25000:
            context += f"\\n\\n[SOURCE: {r['meta']['title']}]\\n{r['text']}"
    return context`,
  },
};

// Backwards-compatibility aliases for legacy bookmarks
architecturesData.telematics = architecturesData["terminal-bridge"];
architecturesData["doc-rag"] = architecturesData["enterprise-rag"];
