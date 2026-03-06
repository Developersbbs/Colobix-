"use client";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Scale.", "Speed.", "Security.", "Success."];

/* ── Floating Particles Canvas ─────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 900),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.6,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,47,201,0.4)";
        ctx.fill();
        pts[i].x += pts[i].vx; pts[i].y += pts[i].vy;
        if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
        if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.7 }}
    />
  );
}

/* ── Stats card ────────────────────────────────────────────────────── */
function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; const glow = glowRef.current; if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(120px circle at ${x}% ${y}%, rgba(124,58,237,0.14), transparent 70%)`;
    glow.style.opacity = "1";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { if (glowRef.current) glowRef.current.style.opacity = "0"; }}
      className="stat-card"
      style={{ animation: `heroIn 0.7s ${0.5 + delay * 0.1}s both ease` }}
    >
      <div ref={glowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.25s", pointerEvents: "none", zIndex: 0 }} />
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Main Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [wordIdx, setWordIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);

  /* Typewriter */
  useEffect(() => {
    const word = WORDS[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    else { setDeleting(false); setWordIdx(i => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx]);

  /* Parallax glow blob */
  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 80;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 55;
    };
    const loop = () => {
      cx = lerp(cx, tx, 0.06); cy = lerp(cy, ty, 0.06);
      if (glowRef.current)
        glowRef.current.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("mousemove", onMove);
    loop();
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  /* Scroll parallax */
  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = containerRef.current; if (!el) return;
        const scrolled = window.scrollY;
        const orbs = el.querySelectorAll<HTMLDivElement>(".hero-orb");
        orbs.forEach((orb, i) => {
          orb.style.transform = `translateY(${scrolled * (0.08 + i * 0.04)}px)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const stats = [
    { num: "99.99%", label: "Uptime SLA" },
    { num: "12ms",   label: "Avg Latency" },
    { num: "40+",    label: "Data Centers" },
    { num: "10k+",   label: "Active Clients" },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5%, 5%) clamp(4rem, 8vw, 6rem)",
        overflow: "hidden",
        background: "linear-gradient(160deg, #ffffff 0%, #faf9ff 45%, #f0eaff 100%)",
        /* ── ensure cursor is always visible throughout the section ── */
        cursor: "auto",
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* Force cursor visibility for every child inside hero */
        #hero, #hero * {
          cursor: auto;
        }
        /* Re-apply correct cursors for interactive elements */
        #hero a,
        #hero button,
        #hero [role="button"] {
          cursor: pointer !important;
        }
        #hero .stat-card {
          cursor: default !important;
        }

        @keyframes floatA      { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-32px) scale(1.06)} 66%{transform:translate(-16px,16px) scale(0.95)} }
        @keyframes floatB      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-26px,-22px)} }
        @keyframes typeC       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroIn      { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes auroraA     { 0%,100%{transform:translate(0,0) scale(1) rotate(0deg)} 33%{transform:translate(70px,-50px) scale(1.18) rotate(10deg)} 66%{transform:translate(-35px,35px) scale(0.88) rotate(-7deg)} }
        @keyframes auroraB     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-55px,-45px) scale(1.22)} }
        @keyframes auroraC     { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(45px,65px) rotate(18deg)} }
        @keyframes beamSpin    { to { transform:rotate(360deg); } }
        @keyframes badgePulse  { 0%,100%{box-shadow:0 0 0 0 rgba(168,85,247,0.4)} 50%{box-shadow:0 0 0 6px rgba(168,85,247,0)} }
        @keyframes shimmerSlide{ 0%{left:-100%} 100%{left:200%} }

        /* ── CTA Buttons ── */
        .hero-cta-primary {
          position: relative; overflow: hidden;
          padding: clamp(12px, 2vw, 15px) clamp(22px, 4vw, 38px);
          border-radius: 13px;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          text-decoration: none; font-weight: 700; letter-spacing: -0.01em;
          background: linear-gradient(135deg, #2E124A 0%, #8B2FC9 55%, #6366F1 100%);
          color: #fff; border: none; cursor: pointer !important;
          box-shadow: 0 6px 28px rgba(124,58,237,0.45), 0 1px 0 rgba(255,255,255,0.12) inset;
          transition: box-shadow 0.3s, transform 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
          white-space: nowrap;
        }
        .hero-cta-primary::before {
          content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transform:skewX(-14deg);
        }
        .hero-cta-primary:hover { box-shadow:0 10px 44px rgba(124,58,237,0.6); transform:translateY(-2px); }
        .hero-cta-primary:hover::before { animation:shimmerSlide 0.65s ease forwards; }

        .hero-cta-secondary {
          padding: clamp(12px, 2vw, 15px) clamp(22px, 4vw, 38px);
          border-radius: 13px;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          font-weight: 600; text-decoration: none;
          color: #7c3aed;
          background: rgba(124,58,237,0.055);
          border: 1.5px solid rgba(124,58,237,0.22);
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
          display: inline-flex; align-items: center; gap: 8px;
          backdrop-filter: blur(8px);
          white-space: nowrap;
          cursor: pointer !important;
        }
        .hero-cta-secondary:hover {
          background: rgba(124,58,237,0.11);
          border-color: rgba(124,58,237,0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(124,58,237,0.15);
        }

        .cta-arrow { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); display:inline-block; }
        .hero-cta-primary:hover .cta-arrow,
        .hero-cta-secondary:hover .cta-arrow { transform: translateX(5px); }

        /* ── Stats ── */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: clamp(48px, 8vw, 88px);
          border: 1px solid rgba(124,58,237,0.12);
          border-radius: 22px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(20px);
          overflow: hidden;
          box-shadow: 0 6px 32px rgba(124,58,237,0.08), 0 1px 0 rgba(255,255,255,0.9) inset;
          width: 100%;
          max-width: 700px;
        }

        @media (max-width: 580px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
            border-radius: 16px;
          }
          .stat-card { border-right: 1px solid rgba(124,58,237,0.1) !important; }
          .stat-card:nth-child(2n) { border-right: none !important; }
          .stat-card:nth-child(1),
          .stat-card:nth-child(2) { border-bottom: 1px solid rgba(124,58,237,0.1); }
        }

        .stat-card {
          text-align: center;
          padding: clamp(14px, 2.5vw, 22px) clamp(12px, 3vw, 38px);
          position: relative; overflow: hidden;
          cursor: default !important;
          border-right: 1px solid rgba(124,58,237,0.1);
        }
        .stat-card:last-child { border-right: none; }

        .stat-num {
          font-size: clamp(1.35rem, 3vw, 2rem);
          font-weight: 800;
          color: #12002e;
          font-family: var(--font-heading);
          letter-spacing: -0.03em;
          position: relative; z-index: 1;
          line-height: 1.1;
        }
        .stat-label {
          font-size: clamp(8px, 1.2vw, 11px);
          color: #9d88c0;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 4px;
          position: relative; z-index: 1;
        }

        /* ── Heading ── */
        .hero-h1 {
          font-size: clamp(2.4rem, 8vw, 5.8rem);
          font-weight: 800;
          line-height: 1.04;
          max-width: 920px;
          margin-bottom: 14px;
          letter-spacing: -0.045em;
          color: #12002e;
          font-family: var(--font-heading);
          animation: heroIn 0.75s 0.1s both ease;
        }

        .hero-sub {
          color: #5b4d7a;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          max-width: 530px;
          margin-bottom: clamp(28px, 5vw, 48px);
          font-weight: 300;
          line-height: 1.8;
          animation: heroIn 0.75s 0.22s both ease;
          padding: 0 clamp(0px, 2vw, 20px);
        }

        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          animation: heroIn 0.75s 0.34s both ease;
        }
      `}</style>

      {/* Aurora */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-25%", left: "-15%", width: "65%", height: "65%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(168,85,247,0.13), transparent 70%)", filter: "blur(65px)", animation: "auroraA 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "20%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)", filter: "blur(75px)", animation: "auroraB 20s ease-in-out infinite", animationDelay: "-6s" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "25%", width: "55%", height: "55%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,47,201,0.09), transparent 70%)", filter: "blur(80px)", animation: "auroraC 24s ease-in-out infinite", animationDelay: "-12s" }} />
      </div>

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <ParticleField />
      </div>

      {/* Glow blob */}
      <div ref={glowRef} style={{
        position: "absolute",
        width: "min(750px, 110vw)", height: "min(750px, 110vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(124,58,237,0.09) 38%, transparent 68%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        pointerEvents: "none", filter: "blur(48px)", zIndex: 1, willChange: "transform",
      }} />

      {/* Floating orbs */}
      {[
        { size: "min(240px, 38vw)", top: "8%",    left: "3%",   color: "rgba(168,85,247,0.13)", dur: "8s",  delay: "0s" },
        { size: "min(180px, 30vw)", top: "12%",   right: "6%",  color: "rgba(124,58,237,0.1)",  dur: "11s", delay: "-3s" },
        { size: "min(110px, 20vw)", bottom: "18%",left: "10%",  color: "rgba(167,139,250,0.16)",dur: "7s",  delay: "-1s" },
        { size: "min(90px, 16vw)",  bottom: "22%",right: "12%", color: "rgba(196,181,253,0.22)",dur: "9s",  delay: "-5s" },
        { size: "min(60px, 12vw)",  top: "45%",   left: "2%",   color: "rgba(139,47,201,0.12)", dur: "13s", delay: "-7s" },
      ].map((orb, i) => (
        <div key={i} className="hero-orb" style={{
          position: "absolute", borderRadius: "50%",
          width: orb.size, height: orb.size,
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          top: (orb as any).top, left: (orb as any).left,
          right: (orb as any).right, bottom: (orb as any).bottom,
          animation: `${i % 2 === 0 ? "floatA" : "floatB"} ${orb.dur} ease-in-out infinite ${orb.delay}`,
          filter: "blur(22px)", pointerEvents: "none", zIndex: 1, willChange: "transform",
        }} />
      ))}

      {/* Beam ring */}
      <div style={{
        position: "absolute",
        width: "min(900px, 130vw)", height: "min(900px, 130vw)",
        borderRadius: "50%",
        border: "1px solid transparent",
        background: "conic-gradient(from 0deg, transparent 0deg, rgba(139,47,201,0.06) 45deg, transparent 90deg, transparent 360deg) border-box",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        animation: "beamSpin 18s linear infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

        {/* Badge */}
        <div style={{
          animation: "heroIn 0.6s ease forwards",
          display: "inline-flex", alignItems: "center", gap: 9,
          background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
          color: "#7c3aed",
          padding: "7px clamp(14px, 3vw, 20px)",
          borderRadius: 999,
          fontSize: "clamp(9px, 1.5vw, 11px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          marginBottom: "clamp(20px, 4vw, 34px)", backdropFilter: "blur(10px)",
          boxShadow: "0 2px 16px rgba(124,58,237,0.1)",
          maxWidth: "90vw",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#a855f7",
            display: "block", flexShrink: 0,
            animation: "badgePulse 2.2s ease-in-out infinite",
          }} />
          Enterprise-Grade Infrastructure
          <span style={{ opacity: 0.5, fontSize: 9 }}>✦</span>
        </div>

        {/* H1 */}
        <h1 className="hero-h1">
          The Server Platform
          <br />
          Built for{" "}
          <span style={{
            display: "inline-block", minWidth: "3ch",
            background: "linear-gradient(135deg, #2E124A 0%, #8B2FC9 50%, #6366F1 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {displayed}
            <span style={{ animation: "typeC 0.8s step-end infinite", WebkitTextFillColor: "rgba(139,47,201,0.7)", marginLeft: 2 }}>|</span>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero-sub">
          Colobix delivers blazing-fast, ultra-reliable server infrastructure for businesses that cannot afford downtime.
        </p>

        {/* CTAs */}
        <div className="cta-row">
          <a href="#pricing" className="hero-cta-primary">
            Start Project <span className="cta-arrow">→</span>
          </a>
          <a href="#features" className="hero-cta-secondary">
            Explore Features <span className="cta-arrow" style={{ opacity: 0.7 }}>→</span>
          </a>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          {stats.map((s, i) => (
            <StatCard key={s.label} num={s.num} label={s.label} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}