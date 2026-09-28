import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight, Terminal, Layers } from "lucide-react";
import { blogPosts } from "../data/blogPosts.js";
import HotelArchitectureDiagram from "../components/HotelArchitectureDiagram.jsx";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-40 text-center">
        <p className="font-mono text-sm uppercase text-tactical-red">404 · ARTICLE UNRESOLVED</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Publication Not Found</h1>
        <p className="mt-4 text-industrial-silver">The requested engineering report does not exist or has been archived.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 border border-tactical-red px-6 py-3 font-mono text-sm text-tactical-red hover:bg-tactical-red hover:text-stealth-black transition-colors"
        >
          <ArrowLeft size={16} /> RETURN TO PUBLICATIONS
        </Link>
      </div>
    );
  }

  return (
    <article className="relative z-10 mx-auto max-w-4xl px-5 py-32 sm:px-8 lg:px-10">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-tactical text-industrial-ash hover:text-tactical-red transition-colors"
      >
        <ArrowLeft size={14} />
        BACK TO PUBLICATIONS
      </Link>

      {/* Title & Metadata */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-industrial-ash">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-tactical-red" />
            {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-ember-glow" />
            {post.readTime}
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Author info card */}
        <div className="mt-8 flex items-center justify-between border-y border-industrial-line py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border border-tactical-red/60 bg-tactical-redDim font-display text-xs font-bold text-tactical-red">
              SC
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-white">{post.author}</p>
              <p className="font-mono text-xs text-industrial-ash">{post.authorTitle} · M.Tech IIT Madras</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="hidden sm:inline-block border border-industrial-line bg-stealth-deep px-2 py-0.5 font-mono text-[9px] uppercase tracking-tactical text-industrial-ash"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Lead Paragraph */}
      <div className="mt-10 border-l-2 border-tactical-red bg-tactical-redDim/30 p-6 font-mono text-sm leading-relaxed text-industrial-silver">
        <span className="text-tactical-red font-semibold uppercase">[EXECUTIVE SUMMARY]: </span>
        {post.summary}
      </div>

      {/* Video Demonstration Embed */}
      {post.youtubeId && (
        <div className="mt-10 overflow-hidden rounded-lg border border-tactical-red/50 bg-industrial-panel shadow-[0_0_35px_rgba(255,26,26,0.12)]">
          <div className="flex items-center justify-between border-b border-industrial-line bg-industrial-panelDeep px-4 py-3 font-mono text-xs text-industrial-ash">
            <span className="flex items-center gap-2.5 font-bold tracking-tactical text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tactical-red opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-tactical-red"></span>
              </span>
              LIVE SYSTEM DEMONSTRATION · 1:49 MIN
            </span>
            <span className="rounded border border-tactical-red/40 bg-tactical-redDim px-2.5 py-0.5 text-[10px] font-semibold text-tactical-red">
              WEBRTC AUDIO + LANGGRAPH
            </span>
          </div>
          <div className="relative aspect-video w-full bg-stealth-deep">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0`}
              title="Hotel Copilot Live WebRTC Voice Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Render Content */}
      <div className="mt-12 space-y-8 font-sans text-base leading-8 text-industrial-silver">
        {post.content.split("\n\n").map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          // Headings
          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={idx} className="font-display text-2xl font-bold text-white pt-6 border-t border-industrial-line">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }

          if (trimmed.startsWith("---")) {
            return <hr key={idx} className="border-industrial-line my-8" />;
          }

          // Code blocks & Architecture Diagrams
          if (trimmed.startsWith("```")) {
            const lines = trimmed.split("\n");
            const lang = lines[0].replace("```", "").trim();
            const code = lines.slice(1, -1).join("\n");
            const isArchitecture = ["architecture", "diagram", "ascii"].includes(lang.toLowerCase());

            if (isArchitecture && (code.includes("LangGraph pipeline") || code.includes("GM Dashboard"))) {
              return <HotelArchitectureDiagram key={idx} />;
            }

            return (
              <div
                key={idx}
                className={`border bg-industrial-panel p-5 my-6 overflow-hidden ${
                  isArchitecture ? "border-ember-glow/40 shadow-[0_0_20px_rgba(245,158,11,0.05)]" : "border-industrial-line"
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-industrial-line font-mono text-[10px] uppercase text-industrial-ash">
                  <span className="flex items-center gap-2 text-white">
                    {isArchitecture ? (
                      <Layers size={14} className="text-ember-glow" />
                    ) : (
                      <Terminal size={12} className="text-tactical-red" />
                    )}
                    <span className="font-semibold tracking-tactical">
                      {isArchitecture ? "SYSTEM TOPOLOGY & PIPELINE GRAPH" : "PRODUCTION IMPLEMENTATION"}
                    </span>
                  </span>
                  <span className={`px-2 py-0.5 border text-[9px] ${
                    isArchitecture
                      ? "border-ember-glow/50 text-ember-glow bg-ember-glow/10"
                      : "border-industrial-line text-ember-glow bg-stealth-deep"
                  }`}>
                    {lang || "CODE"}
                  </span>
                </div>
                <pre
                  className={`overflow-x-auto font-mono text-xs leading-relaxed p-2 rounded bg-stealth-deep/80 ${
                    isArchitecture ? "text-industrial-silver font-semibold" : "text-tactical-red"
                  }`}
                >
                  <code>{code}</code>
                </pre>
              </div>
            );
          }

          // Tables
          if (trimmed.includes("|") && trimmed.includes("\n|")) {
            const tableRows = trimmed.split("\n").filter((r) => !r.includes("---"));
            const headers = tableRows[0].split("|").map((c) => c.trim()).filter(Boolean);
            const rows = tableRows.slice(1).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));

            return (
              <div key={idx} className="overflow-x-auto border border-industrial-line bg-industrial-panel my-6">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-industrial-line bg-stealth-deep text-ember-glow">
                    <tr>
                      {headers.map((h, i) => (
                        <th key={i} className="p-3.5 font-semibold tracking-tactical uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-line">
                    {rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-tactical-redDim/30">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3.5 text-industrial-silver">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          // List items
          if (trimmed.startsWith("- ")) {
            const items = trimmed.split("\n- ").map((item) => item.replace(/^- /, ""));
            return (
              <ul key={idx} className="space-y-2 list-disc list-inside text-industrial-silver">
                {items.map((it, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                ))}
              </ul>
            );
          }

          // Standard paragraph
          return (
            <p
              key={idx}
              className="text-base leading-relaxed text-industrial-silver"
              dangerouslySetInnerHTML={{
                __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
              }}
            />
          );
        })}
      </div>

      {/* Article footer callout */}
      <div className="mt-16 border border-tactical-red/60 bg-tactical-redDim p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">Tackling High Latency or GPU Bills?</h3>
          <p className="mt-2 text-sm leading-relaxed text-industrial-silver max-w-xl">
            Seshank AI Labs deploys custom async gateways, semantic cache hierarchies, and guardrails to optimize agentic pipelines.
          </p>
        </div>
        <Link
          to="/#contact"
          className="shrink-0 inline-flex items-center gap-3 border border-tactical-red bg-tactical-red px-6 py-4 font-mono text-xs uppercase tracking-tactical text-stealth-black font-semibold hover:bg-transparent hover:text-tactical-red transition-all"
        >
          DISCUSS ARCHITECTURE <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
