"use client";

import { useState, useEffect, useRef } from "react";

const points = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    label: "Quick Customization",
    desc: "Swiftly customize your hosting environment with user-friendly tools, ensuring easy and rapid adjustments to meet your specific website needs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    label: "Server Linking",
    desc: "Effortlessly link servers for seamless communication, enhancing data flow, collaboration, and overall efficiency in your interconnected network environment.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: "Universal Accessibility",
    desc: "Ensure universal accessibility with inclusive design, making products and services available to everyone, regardless of abilities or disabilities.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+", label: "Global PoPs" },
  { value: "2 Tbps", label: "DDoS Cap" },
  { value: "24/7", label: "Support" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Particle Network Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const COUNT = 38;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      // dots
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.55)";
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />;
}

/* ── Orbit Rings ── */
function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[100, 150, 200, 250].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-cyan-400/20 dark:border-cyan-400/15"
          style={{
            width: r * 2, height: r * 2,
            animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
          }}
        >
          {/* dot on ring */}
          <div
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(6,182,212,0.7)]"
            style={{ top: -4, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── 3D CSS Cube ── */
function ServerCube() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes rotateCube {
          0%   { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
        .cube-scene { perspective: 600px; width: 100px; height: 100px; }
        .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
          animation: rotateCube 8s linear infinite; }
        .face {
          position: absolute; width: 100px; height: 100px;
          border: 1.5px solid rgba(6,182,212,0.5);
          background: rgba(6,182,212,0.06);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-family: monospace; color: rgba(6,182,212,0.7);
          backdrop-filter: blur(2px);
        }
        .front  { transform: translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .right  { transform: rotateY(90deg) translateZ(50px); }
        .top    { transform: rotateX(90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }
      `}</style>
      <div className="cube-scene">
        <div className="cube">
          <div className="face front">SRV</div>
          <div className="face back">CBX</div>
          <div className="face left">NET</div>
          <div className="face right">CDN</div>
          <div className="face top">NVM</div>
          <div className="face bottom">SSL</div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="relative bg-white dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-100/60 dark:bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-slate-100/80 dark:bg-cyan-900/10 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto px-[5%] py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">
              About Our Hosting
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold mt-3 mb-5 leading-tight tracking-tight text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Infrastructure built{" "}
              <span className="text-cyan-500 dark:text-cyan-400">for scale</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-10 max-w-md">
              Colobix delivers enterprise-grade hosting with the simplicity you need.
              From bare-metal to fully managed cloud, every plan is engineered for
              performance, security, and reliability.
            </p>

            <ul className="space-y-6">
              {points.map((p, i) => (
                <li
                  key={p.label}
                  className={`flex gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: inView ? `${150 + i * 100}ms` : "0ms" }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-100 dark:border-cyan-400/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                      {p.label}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              
               <a href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-cyan-500 hover:bg-cyan-400 text-white transition-colors duration-200 shadow-md shadow-cyan-500/20"
              >
                View More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: all animations layered ── */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-50 dark:bg-[#0b1930]/70 overflow-hidden"
              style={{ height: 530 }}>

              {/* Layer 1 — Particle network (bottom) */}
              <ParticleCanvas />

              {/* Layer 2 — Orbit rings (middle) */}
              <OrbitRings />

              {/* Layer 3 — Rotating 3D cube (centre) */}
              <ServerCube />

              {/* Layer 4 — Lottie-style glowing pulse ring (top accent) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[60, 90, 120].map((r, i) => (
                  <div
                    key={r}
                    className="absolute rounded-full border border-cyan-400/30"
                    style={{
                      width: r, height: r,
                      animation: `ping ${1.8 + i * 0.6}s cubic-bezier(0,0,0.2,1) infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
                {/* core glow dot */}
                <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_24px_8px_rgba(6,182,212,0.5)] z-10" />
              </div>

              {/* Stats pinned at bottom */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-slate-200 dark:border-cyan-500/10">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center py-4 border-r last:border-r-0 border-slate-200 dark:border-cyan-500/10
                      bg-white/80 dark:bg-[#0b1930]/80 backdrop-blur-sm
                      transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: inView ? `${500 + i * 80}ms` : "0ms" }}
                  >
                    <span className="text-lg font-extrabold text-cyan-500 dark:text-cyan-400" style={{ fontFamily: "var(--font-syne)" }}>
                      {s.value}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}