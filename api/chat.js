import siteKnowledge from '../site_knowledge.json' with { type: 'json' };

// Simple in-memory IP rate limiter (prevents spam bombing on free keys)
const ipRateMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 8; // Max 8 requests/min per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRateMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
    ipRateMap.set(ip, record);
    return false;
  }

  record.count += 1;
  ipRateMap.set(ip, record);
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Clean up stale IP records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipRateMap.entries()) {
      if (now > data.resetTime) ipRateMap.delete(ip);
    }
  }, 5 * 60 * 1000);
}

// Strict system prompt grounded in real Seshank AI Labs architectures
const SYSTEM_PROMPT = `
You are the Technical AI Assistant for Seshank AI Labs.
Founder: Seshank (AI Agent Systems Architect, GCC & UK Corridor).

Core Specializations & Production Archetypes:
1. Enterprise RAG & AI Security: Two-gate zero-trust architecture combining NVIDIA NeMo Guardrails (Colang), Vertex AI text-embedding-004, Qdrant Cloud HNSW, FlashRank TinyBERT cross-encoder re-ranking, and automated RAGAS CI/CD. 100% PyRIT attacks and API secret leaks blocked.
2. Real-Time WebRTC Voice Agents: 891ms TTFT multimodal voice copilot powered by LiveKit Cloud WebRTC, Groq LPUs (gpt-oss-20b + Whisper Large V3), Deepgram Aura-2 neural voice, and LangGraph anomaly engines with zero hallucination.
3. Universal LLM Gateways & Model Routing: High-throughput transparent FastAPI proxy translating Anthropic Messages API into LiteLLM, running Claude Code CLI natively on Google Cloud Vertex AI (Gemini 2.5 Pro / Flash) with <3.8ms overhead and 68.4% cloud savings.
4. Deterministic Multi-Agent State Machines: Cyclic LangGraph workflows with strict Pydantic v2 byte validation, sub-200ms latency, and 42ms Redis semantic caching.

STRICT OPERATING RULES:
1. Keep answers SHORT and direct: Under 60-80 words (2 to 3 sentences max).
2. Talk technically and accurately about RAG, AI Security, Voice copilots, Model routing, and LangGraph state machines.
3. No generic corporate AI hype (never say 'revolutionize', 'disruptive', 'cutting-edge').
4. When asked about working together, consulting, code audits, or architectures, provide the direct Calendly link:
   "You can book a 20-min technical discovery call directly with Seshank here: https://calendly.com/seshankch7171/30min or email seshank@seshankailabs.com"
`;

// 1. Primary: Call Groq API
async function callGroq(messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY_NOT_SET');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
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
    const error = new Error(`Groq Error ${response.status}: ${errText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}

// 2. Failover: Call Google Gemini API
async function callGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY_NOT_SET');

  // Convert chat messages to Gemini's format
  const geminiContents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: 220,
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    // If 2.5-flash not found or blocked, try gemini-1.5-flash
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 220,
          temperature: 0.2
        }
      })
    });

    if (!fallbackRes.ok) {
      const errText = await fallbackRes.text();
      throw new Error(`Gemini Error ${fallbackRes.status}: ${errText}`);
    }

    const fbData = await fallbackRes.json();
    return fbData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

export default async function handler(req, res) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. IP Rate Limiting Check
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'anonymous';
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many messages sent. Please pause for 1 minute before asking again.'
    });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Valid messages array is required.' });
  }

  // 2. Sliding Window: Only keep last 6 messages (3 turns) to protect token budget
  const trimmedMessages = messages.slice(-6);

  // 3. Routing Engine: Groq Primary -> Gemini Failover
  try {
    const answer = await callGroq(trimmedMessages);
    return res.status(200).json({
      answer,
      provider: 'groq'
    });
  } catch (groqErr) {
    console.warn('[Router] Groq failed, switching to Gemini failover:', groqErr.message);

    try {
      const geminiAnswer = await callGemini(trimmedMessages);
      return res.status(200).json({
        answer: geminiAnswer,
        provider: 'gemini'
      });
    } catch (geminiErr) {
      console.error('[Router] Both Groq and Gemini failed:', geminiErr.message);
      return res.status(503).json({
        answer: "Our systems are experiencing high traffic. For immediate technical consultations, please book directly at https://calendly.com/seshankch7171/30min or email seshank@seshankailabs.com",
        provider: 'static_fallback'
      });
    }
  }
}
