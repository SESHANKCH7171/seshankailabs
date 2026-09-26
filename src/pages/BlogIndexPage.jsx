import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Calendar, BookOpen } from "lucide-react";
import { blogPosts } from "../data/blogPosts.js";

export default function BlogIndexPage() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-5 py-32 sm:px-8 lg:px-10">
      {/* Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-tactical text-tactical-red">
          PUBLICATIONS &amp; FIELD REPORTS
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
          Systems Engineering Dispatch
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-industrial-silver">
          Battlefield benchmarks, architectural post-mortems, and engineering insights on deploying production agentic AI systems.
        </p>
      </div>

      {/* Articles List */}
      <div className="mt-14 grid gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group relative border border-industrial-line bg-industrial-panel p-8 sm:p-10 transition-all duration-300 hover:border-tactical-red/60 hover:bg-tactical-redDim/20"
          >
            {/* Top gradient highlight */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tactical-red to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-industrial-ash">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-tactical-red" />
                {post.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-ember-glow" />
                {post.readTime}
              </span>
              <span>·</span>
              <span className="text-industrial-silver font-semibold">{post.author}</span>
            </div>

            {/* Title */}
            <h2 className="mt-4 font-display text-xl font-bold leading-snug text-white group-hover:text-tactical-red transition-colors sm:text-2xl">
              <Link to={`/blog/${post.slug}`} className="focus:outline-none">
                {post.title}
              </Link>
            </h2>

            {/* Summary */}
            <p className="mt-4 text-sm leading-relaxed text-industrial-silver">
              {post.summary}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-industrial-line bg-stealth-deep px-2.5 py-1 font-mono text-[10px] uppercase tracking-tactical text-industrial-ash"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read more CTA */}
            <div className="mt-8 pt-6 border-t border-industrial-line flex items-center justify-between">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-tactical text-tactical-red font-semibold hover:underline"
                aria-label={`Read full article: ${post.title}`}
              >
                READ TECHNICAL BREAKDOWN
                <ArrowUpRight size={14} />
              </Link>
              <BookOpen size={16} className="text-industrial-ash opacity-40 group-hover:opacity-100 group-hover:text-tactical-red transition-all" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
