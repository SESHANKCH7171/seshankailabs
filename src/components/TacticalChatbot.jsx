import { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck, 
  RefreshCw,
  Minus,
  Crosshair,
  Cpu,
  Radio
} from "lucide-react";

const QUICK_PROMPTS = [
  "How do you automate AS9100 compliance?",
  "Can you parse multi-hundred-page defense tenders?",
  "What agent architectures do you build?",
  "Book a 20-min technical discovery call"
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Systems online. I am the Seshank AI Labs technical assistant. Ask about our defense AI agent architectures, compliance pipelines, or book a consultation with Seshank.",
  provider: "system"
};

export default function TacticalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (response.ok && data.answer) {
        setMessages([...newMessages, { 
          role: "assistant", 
          content: data.answer, 
          provider: data.provider 
        }]);
      } else {
        setMessages([...newMessages, { 
          role: "assistant", 
          content: data.answer || data.error || "System encountered an error. Please schedule directly via Calendly.", 
          isError: true 
        }]);
      }
    } catch (err) {
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "Network error connecting to API. You can book directly with Seshank here: https://calendly.com/seshankch7171/30min",
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render text with clickable links or calendly badge
  const renderMessageContent = (content) => {
    const calendlyRegex = /(https:\/\/calendly\.com\/seshankch7171\/30min)/g;
    const parts = content.split(calendlyRegex);

    return (
      <div className="space-y-2">
        <p className="leading-relaxed">
          {parts.map((part, i) => {
            if (part === "https://calendly.com/seshankch7171/30min") {
              return (
                <a
                  key={i}
                  href="https://calendly.com/seshankch7171/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-tactical-red hover:underline font-semibold"
                >
                  Schedule Call <ArrowUpRight className="h-3 w-3" />
                </a>
              );
            }
            return part;
          })}
        </p>

        {content.includes("calendly.com") && (
          <a
            href="https://calendly.com/seshankch7171/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-between rounded border border-tactical-red/40 bg-tactical-red/10 px-3 py-2 text-xs font-mono text-white transition-all hover:border-tactical-red hover:bg-tactical-red/20 group"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-tactical-red" />
              <span>Book 20-Min Technical Discovery</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-industrial-ash transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tactical-red" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Tactical Trigger Button with Concept 5 Composite Reticle */}
      {!isOpen && (
        <div className="relative flex flex-col items-end">
          {/* Floating 'CHAT WITH ME' Attention Pill */}
          <div className="mb-2 flex items-center gap-1.5 rounded-full border border-tactical-red/60 bg-stealth-black/95 px-3 py-1 shadow-[0_0_15px_rgba(255,26,26,0.35)] backdrop-blur-md animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tactical-red opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tactical-red" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-white">
              CHAT WITH ME
            </span>
          </div>

          {/* Main Dual-Composite Tactical Reticle Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3.5 rounded-2xl border border-tactical-red/40 bg-stealth-deep/95 p-2.5 pr-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-tactical-red hover:shadow-[0_0_30px_rgba(255,26,26,0.4)] active:scale-95"
            aria-label="Chat with AI Architect"
          >
            {/* Concept 5: Dual Composite Reticle Badge */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-industrial-line bg-industrial-panelDeep/90 shadow-inner group-hover:border-tactical-red/80 transition-colors">
              {/* Outer HUD Reticle Crosshair (rotates on hover) */}
              <Crosshair className="absolute h-9 w-9 text-tactical-red/40 transition-transform duration-700 ease-out group-hover:rotate-90 group-hover:text-tactical-red/90" />

              {/* Inner Glowing AI Chip / Agent Core */}
              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-md bg-tactical-red/10 text-tactical-red group-hover:bg-tactical-red group-hover:text-black transition-all shadow-[0_0_10px_rgba(255,26,26,0.2)]">
                <Cpu className="h-3.5 w-3.5" />
              </div>

              {/* Corner Tactical Tick Accents */}
              <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 border-t border-l border-tactical-red opacity-80" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 border-t border-r border-tactical-red opacity-80" />
              <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b border-l border-tactical-red opacity-80" />
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b border-r border-tactical-red opacity-80" />
            </div>

            {/* Tactical Label Details */}
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] font-bold tracking-widest text-tactical-red uppercase">
                AI SYSTEMS ARCHITECT
              </span>
              <span className="font-display text-xs font-bold tracking-wider text-industrial-silver group-hover:text-white transition-colors">
                CHAT WITH ME
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Industrial Glass Chat Modal */}
      {isOpen && (
        <div className="flex h-[540px] w-[350px] sm:w-[400px] flex-col overflow-hidden rounded-xl border border-industrial-line bg-stealth-deep/95 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-industrial-line bg-industrial-panelDeep/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-tactical-red/40 bg-tactical-red/10 text-tactical-red">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display text-xs font-bold tracking-wider text-white">
                  <span>SESHANK AI LABS</span>
                  <span className="rounded bg-tactical-red/20 px-1 py-0.2 font-mono text-[9px] text-tactical-red">
                    AI AGENT
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-industrial-ash">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE // AEROSPACE &amp; DEFENSE</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-industrial-ash hover:bg-industrial-panel hover:text-white transition-colors"
                title="Close"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-industrial-ash hover:bg-tactical-red/20 hover:text-tactical-red transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Container (when only initial message is present) */}
          {messages.length === 1 && (
            <div className="border-b border-industrial-line/60 bg-industrial-panelGlass/50 p-3">
              <p className="mb-2 font-mono text-[10px] tracking-wider text-industrial-ash uppercase">
                // SUGGESTED INQUIRIES
              </p>
              <div className="flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(prompt)}
                    className="flex items-center justify-between rounded border border-industrial-line/70 bg-stealth-black/60 px-2.5 py-1.5 text-left font-mono text-xs text-industrial-silver hover:border-tactical-red/60 hover:text-white transition-all text-ellipsis"
                  >
                    <span>{prompt}</span>
                    <ArrowUpRight className="h-3 w-3 text-industrial-ash" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-industrial-line">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] text-industrial-ash">
                    <span>{isUser ? "OPERATOR" : "SYSTEM // ARCHITECT"}</span>
                    {msg.provider && (
                      <span className="text-[9px] text-industrial-ash/60">
                        [{msg.provider}]
                      </span>
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-xs ${
                      isUser
                        ? "bg-tactical-red text-white font-mono rounded-br-none"
                        : "border border-industrial-line bg-industrial-panel text-industrial-silver rounded-bl-none shadow-md"
                    } ${msg.isError ? "border-amber-500/50 bg-amber-950/20 text-amber-200" : ""}`}
                  >
                    {isUser ? msg.content : renderMessageContent(msg.content)}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="mb-1 font-mono text-[10px] text-industrial-ash">
                  SYSTEM // COMPUTING
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-industrial-line bg-industrial-panel px-3.5 py-2.5 text-xs text-industrial-silver">
                  <span className="h-1.5 w-1.5 rounded-full bg-tactical-red animate-ping" />
                  <span className="font-mono text-xs text-industrial-ash">Generating technical response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <div className="border-t border-industrial-line bg-industrial-panelDeep p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about defense AI architectures..."
                className="flex-1 rounded border border-industrial-line bg-stealth-black px-3 py-2 font-mono text-xs text-white placeholder-industrial-ash focus:border-tactical-red focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded border border-tactical-red bg-tactical-red text-white transition-all hover:bg-tactical-red/80 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-industrial-ash">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                Air-gapped &amp; deterministic guardrails
              </span>
              <a
                href="https://calendly.com/seshankch7171/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tactical-red hover:underline"
              >
                Direct Booking ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
