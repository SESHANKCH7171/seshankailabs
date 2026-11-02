import siteKnowledge from '../site_knowledge.json' with { type: 'json' };

// Normalize messages so conversation ALWAYS starts with 'user' and alternates cleanly
function sanitizeMessages(rawMessages) {
  if (!Array.isArray(rawMessages)) return [];

  // 1. Keep only 'user' and 'assistant' roles with non-empty text
  const filtered = rawMessages
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim().length > 0)
    .map(m => ({ role: m.role, content: m.content.trim() }));

  // 2. Find first 'user' message index (discard any initial assistant greetings)
  const firstUserIdx = filtered.findIndex(m => m.role === 'user');
  if (firstUserIdx === -1) return [];

  const fromFirstUser = filtered.slice(firstUserIdx);

  // 3. Ensure strict alternating sequence (user -> assistant -> user)
  const sanitized = [];
  for (const msg of fromFirstUser) {
    if (sanitized.length === 0) {
      sanitized.push(msg);
    } else {
      const prev = sanitized[sanitized.length - 1];
      if (prev.role === msg.role) {
        // Merge consecutive same-role contents
        prev.content += `\n${msg.content}`;
      } else {
        sanitized.push(msg);
      }
    }
  }

  // 4. Sliding window: keep max last 6 turns
  return sanitized.slice(-6);
}

const SYSTEM_PROMPT = `
You are the Technical AI Assistant for Seshank AI Labs.
Founder: Seshank (AI Agent Systems Architect · GCC & UK Corridor).

STRICT WEBSITE KNOWLEDGE BASE:
1. Archetype 01: Deterministic Financial & Risk Underwriting State Machine
   - Cyclic LangGraph state machine, Pydantic v2 byte validation, sub-200ms latency, 42ms Redis semantic cache, DeepEval score 0.97/1.00.
2. Archetype 02: Universal LLM Terminal Bridge & Cloud Gateway
   - Transparent FastAPI proxy translating Anthropic Messages API into LiteLLM, running Claude Code CLI natively on Google Cloud Vertex AI & Gemini 2.5 Pro with <3.8ms overhead and 68.4% cloud spend savings.
3. Archetype 03: Real-Time WebRTC Voice Copilot
   - 891ms TTFT multimodal voice pipeline (LiveKit Cloud, Groq Whisper V3, Deepgram Aura-2, LangGraph anomaly state engine, 100% deterministic grounding).
4. Archetype 04: Hardened Enterprise Stripe RAG & AI Security Platform
   - Two-gate zero-trust architecture (NVIDIA NeMo Guardrails Colang, GCP Vertex AI text-embedding-004, Qdrant Cloud HNSW, FlashRank TinyBERT cross-encoder, 100% PyRIT attacks and API secret leaks blocked).

STRICT OPERATING RULES:
1. ONLY answer questions about Seshank AI Labs' architectures, telemetry benchmarks, and engineering capabilities.
2. If the user asks about unrelated topics (e.g. general sales tricks, cold outreach, generic chat), politely redirect:
   "Seshank AI Labs specializes in engineering deterministic AI agent systems, hardened enterprise RAG, and WebRTC voice copilots. To discuss how our architectures apply to your platform, schedule a 20-min call with Seshank: https://calendly.com/seshankch7171/30min"
3. Keep answers concise: Under 60 words (2-3 sentences max). No corporate buzzwords.
4. Always provide the Calendly link when discussing collaboration or custom builds:
   https://calendly.com/seshankch7171/30min
`;

// Helper: Groq API Call
async function callGroq(messages, modelName = 'openai/gpt-oss-20b') {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY_NOT_SET');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 220,
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    const error = new Error(`Groq ${modelName} Error ${response.status}: ${errText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty response from Groq');
  return reply;
}

// Helper: Gemini API Call
async function callGemini(messages, modelName = 'gemini-3.5-flash-lite') {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY_NOT_SET');

  // Gemini contents MUST start with user and strictly alternate
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        maxOutputTokens: 220,
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    const error = new Error(`Gemini ${modelName} Error ${response.status}: ${errText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!reply) throw new Error('Empty response from Gemini');
  return reply;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages: rawMessages } = req.body || {};
  const cleanMessages = sanitizeMessages(rawMessages);

  if (cleanMessages.length === 0) {
    return res.status(200).json({
      answer: "I am ready to assist. Ask about our Enterprise RAG architectures, NeMo Guardrails, WebRTC Voice Copilots, or schedule a technical call: https://calendly.com/seshankch7171/30min",
      provider: 'programmed_fallback'
    });
  }

  // Multi-tier Waterfall Routing:
  // Tier 1: Groq Llama 3.3 70B (High Intelligence)
  // Tier 2: Groq Llama 3.1 8B (14,400 RPD backup - ultra fast)
  // Tier 3: Gemini 1.5 Flash (1,000,000 TPM backup)
  // Tier 4: Programmed Deterministic Calendly Response (Zero 500 errors)

  // 1. Try Groq Primary (Llama 3.3 70B or gpt-oss-20b)
  try {
    const answer = await callGroq(cleanMessages, 'openai/gpt-oss-20b');
    return res.status(200).json({ answer, provider: 'groq' });
  } catch (groqPrimaryErr) {
    console.warn('[Router] Groq Tier 1 failed:', groqPrimaryErr.message);

    // 2. Try Groq Tier 2 (Llama 3.1 8B - ultra-high daily quota)
    try {
      const answer = await callGroq(cleanMessages, 'llama-3.1-8b-instant');
      return res.status(200).json({ answer, provider: 'groq-8b' });
    } catch (groqBackupErr) {
      console.warn('[Router] Groq Tier 2 failed:', groqBackupErr.message);

      // 3. Try Gemini Failover (Gemini 1.5 Flash - 1M TPM buffer)
      try {
        const answer = await callGemini(cleanMessages, 'gemini-3.5-flash-lite');
        return res.status(200).json({ answer, provider: 'gemini' });
      } catch (geminiErr) {
        console.warn('[Router] Gemini Tier 3 failed:', geminiErr.message);

        // 4. Deterministic Programmed Conversion Response (Never crash)
        return res.status(200).json({
          answer: "Our systems are experiencing peak inquiry volume. To discuss your enterprise agent architecture, RAG security, or voice copilot requirements directly, please book a 20-min session with Seshank here: https://calendly.com/seshankch7171/30min or email seshank@seshankailabs.com",
          provider: 'direct_booking'
        });
      }
    }
  }
}
