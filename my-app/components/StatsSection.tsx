"use client";

import { useState, useEffect, useRef } from "react";

const stats = [
  { value: 565, label: "Domains Registered", icon: "🌐" },
  { value: 854, label: "Happy Clients", icon: "😊" },
  { value: 248, label: "Cloud Servers", icon: "☁️" },
  { value: 576, label: "Dedicated Servers Sold", icon: "🖥️" },
];

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ value, label, icon, delay, active }: {
  value: number; label: string; icon: string; delay: number; active: boolean;
}) {
  const count = useCounter(value, active);

  return (
    <div
      className={`group relative flex flex-col items-center justify-center text-center p-8 transition-all duration-700 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Vertical divider (except last) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-slate-200 dark:bg-cyan-500/10 last:hidden" />

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-cyan-50 dark:bg-cyan-400/5
        shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]" />

      {/* Top shimmer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="relative w-12 h-12 rounded-xl mb-4
        bg-cyan-50 dark:bg-cyan-400/10
        border border-cyan-100 dark:border-cyan-400/20
        flex items-center justify-center text-xl
        group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon}
      </div>

      {/* Counter */}
      <div
        className="relative text-5xl font-extrabold text-slate-900 dark:text-white tabular-nums leading-none mb-1"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {count.toLocaleString()}
        <span className="text-cyan-500 dark:text-cyan-400">+</span>
      </div>

      {/* Label */}
      <p className="relative text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView();

  return (
    <section className="relative bg-white dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10 overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan-100/40 dark:bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-slate-100/80 dark:bg-cyan-900/10 blur-3xl rounded-full" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-[5%] py-20">

        {/* Section label */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Our Numbers
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-2 text-slate-900 dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Trusted by thousands{" "}
            <span className="text-cyan-500 dark:text-cyan-400">worldwide</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200 dark:divide-cyan-500/10 border border-slate-200 dark:border-cyan-500/10 rounded-2xl overflow-hidden bg-white dark:bg-[#0b1930]/50">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              {...s}
              delay={i * 120}
              active={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}