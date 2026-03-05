"use client";
import { useState, useEffect, useRef } from "react";

const points = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>,
    label: "Quick Customization",
    desc: "Swiftly customize your hosting environment with user-friendly tools, ensuring easy and rapid adjustments to meet your specific website needs.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/></svg>,
    label: "Server Linking",
    desc: "Effortlessly link servers for seamless communication, enhancing data flow, collaboration, and overall efficiency in your interconnected network environment.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>,
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
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext("2d")!;
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
      for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath(); ctx.strokeStyle = `rgba(124,58,237,${0.18 * (1 - dist / 110)})`; ctx.lineWidth = 1;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.5)"; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />;
}

function OrbitRings() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {[100, 150, 200, 250].map((r, i) => (
        <div key={r} style={{
          position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.15)",
          animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
        }}>
          <div style={{
            position: "absolute", width: 8, height: 8, borderRadius: "50%",
            background: "#a855f7", top: -4, left: "50%", transform: "translateX(-50%)",
            boxShadow: "0 0 10px rgba(168,85,247,0.8)",
          }} />
        </div>
      ))}
    </div>
  );
}

function ServerCube() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <style>{`
        @keyframes rotateCube{0%{transform:rotateX(20deg) rotateY(0deg)}100%{transform:rotateX(20deg) rotateY(360deg)}}
        .cube-scene{perspective:600px;width:100px;height:100px}
        .cube{width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:rotateCube 8s linear infinite}
        .face{position:absolute;width:100px;height:100px;border:1.5px solid rgba(124,58,237,0.4);background:rgba(124,58,237,0.04);display:flex;align-items:center;justify-content:center;font-size:11px;font-family:monospace;color:rgba(124,58,237,0.7)}
        .front{transform:translateZ(50px)}.back{transform:rotateY(180deg) translateZ(50px)}
        .left{transform:rotateY(-90deg) translateZ(50px)}.right{transform:rotateY(90deg) translateZ(50px)}
        .top{transform:rotateX(90deg) translateZ(50px)}.bottom{transform:rotateX(-90deg) translateZ(50px)}
      `}</style>
      <div className="cube-scene">
        <div className="cube">
          <div className="face front">SRV</div><div className="face back">CBX</div>
          <div className="face left">NET</div><div className="face right">CDN</div>
          <div className="face top">NVM</div><div className="face bottom">SSL</div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" style={{ position: "relative", background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.08)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -128, left: -128, width: 500, height: 500, borderRadius: "50%", background: "rgba(168,85,247,0.06)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.04)", filter: "blur(60px)" }} />
      </div>
      <div ref={ref} style={{ position: "relative", maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Left */}
          <div style={{ transition: "all 0.7s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}>
            <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>About Our Hosting</span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 20, color: "#1a0533", fontFamily: "var(--font-syne)", lineHeight: 1.15 }}>
              Infrastructure built <span style={{ color: "#7c3aed" }}>for scale</span>
            </h2>
            <p style={{ color: "#6b5a8a", fontSize: "1rem", lineHeight: 1.75, marginBottom: 40, maxWidth: 420 }}>
              Colobix delivers enterprise-grade hosting with the simplicity you need. From bare-metal to fully managed cloud, every plan is engineered for performance, security, and reliability.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 28 }}>
              {points.map((p, i) => (
                <li key={p.label} style={{
                  display: "flex", gap: 16,
                  transition: "all 0.7s", transitionDelay: inView ? `${150 + i * 100}ms` : "0ms",
                  opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
                }}>
                  <div style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                    background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
                    color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{p.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 700, color: "#1a0533", marginBottom: 4, fontSize: "0.95rem" }}>{p.label}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b5a8a", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 36 }}>
              <a href="#features" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 24px", borderRadius: 10, fontWeight: 600, fontSize: "0.875rem",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
                textDecoration: "none", boxShadow: "0 4px 15px rgba(124,58,237,0.3)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(124,58,237,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                View More
                <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>

          {/* Right */}
          <div style={{ transition: "all 0.7s 0.2s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}>
            <div style={{
              position: "relative", borderRadius: 20, border: "1px solid rgba(124,58,237,0.12)",
              background: "#f5f3ff", overflow: "hidden", height: 530,
            }}>
              <ParticleCanvas />
              <OrbitRings />
              <ServerCube />
              {/* Pulse rings */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <style>{`@keyframes pulseRing{0%{transform:scale(0.8);opacity:0.6}100%{transform:scale(2);opacity:0}}`}</style>
                {[60, 90, 120].map((r, i) => (
                  <div key={r} style={{
                    position: "absolute", width: r, height: r, borderRadius: "50%",
                    border: "1px solid rgba(124,58,237,0.4)",
                    animation: `pulseRing ${1.8 + i * 0.6}s cubic-bezier(0,0,0.2,1) infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }} />
                ))}
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 20px 6px rgba(124,58,237,0.4)", zIndex: 10 }} />
              </div>
              {/* Stats bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(124,58,237,0.1)" }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px",
                    borderRight: i < 3 ? "1px solid rgba(124,58,237,0.1)" : "none",
                    background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
                    transition: "all 0.5s", transitionDelay: inView ? `${500 + i * 80}ms` : "0ms",
                    opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
                  }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#7c3aed", fontFamily: "var(--font-syne)" }}>{s.value}</span>
                    <span style={{ fontSize: 10, color: "#9d89b8", marginTop: 2 }}>{s.label}</span>
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