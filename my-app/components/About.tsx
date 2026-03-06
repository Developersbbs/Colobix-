"use client";
import { useRef, useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const points = [
  { icon: "⚙️", label: "Quick Customization", desc: "Swiftly customize your environment with intuitive tools — rapid adjustments to meet any specific need." },
  { icon: "🔗", label: "Server Linking", desc: "Effortlessly link servers for seamless communication, enhancing data flow and network efficiency." },
  { icon: "🌍", label: "Universal Accessibility", desc: "Ensure global accessibility with inclusive design, available to all users regardless of location or ability." },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+",   label: "Global PoPs" },
  { value: "2 Tbps",label: "DDoS Cap" },
  { value: "24/7",  label: "Support" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - d / 100)})`; ctx.lineWidth = 0.8; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.4)"; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

export default function About() {
  const { ref, visible } = useReveal();
  return (
    <section id="about" style={{ background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.07)", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulseRing{0%{transform:scale(0.8);opacity:0.7}100%{transform:scale(2.2);opacity:0}}`}</style>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)", filter: "blur(40px)" }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        {/* Left */}
        <div>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>About Our Hosting</span>
          </div>
          <h2 className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 12, marginBottom: 24, color: "#12002e", fontFamily: "var(--font-syne)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Infrastructure built<br /><span className="grad-text">for scale</span>
          </h2>
          <p className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ color: "#5b4d7a", lineHeight: 1.8, marginBottom: 40, maxWidth: 420, fontSize: "1rem" }}>
            Colobix delivers enterprise-grade hosting with simplicity. From bare-metal to fully managed cloud, every plan is engineered for performance, security, and reliability.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            {points.map((p, i) => (
              <li key={p.label} className={`reveal reveal-delay-${i + 2} ${visible ? "visible" : ""}`} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "scale(1) rotate(0)"; }}
                >{p.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, color: "#12002e", marginBottom: 4, fontSize: "0.95rem", fontFamily: "var(--font-syne)" }}>{p.label}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#5b4d7a", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={`reveal reveal-delay-5 ${visible ? "visible" : ""}`} style={{ marginTop: 36 }}>
            <a href="#features" className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, fontSize: "0.875rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }}>
              View Features
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>

        {/* Right — animated visualization */}
        <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`}>
          <div style={{ position: "relative", height: 520, borderRadius: 24, border: "1px solid rgba(124,58,237,0.1)", background: "linear-gradient(135deg,#faf9ff,#f5f0ff)", overflow: "hidden", boxShadow: "0 24px 80px rgba(124,58,237,0.1)" }}>
            <ParticleCanvas />
            {/* Orbit rings */}
            {[120, 170, 220].map((r, i) => (
              <div key={r} style={{
                position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%",
                border: "1px solid rgba(124,58,237,0.12)",
                top: "50%", left: "50%", marginLeft: -r, marginTop: -r - 60,
                animation: `spin ${10 + i * 5}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }}>
                <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "#a855f7", top: -4, left: "50%", marginLeft: -4, boxShadow: "0 0 12px rgba(168,85,247,0.8)" }} />
              </div>
            ))}
            {/* Pulse rings */}
            <div style={{ position: "absolute", top: "calc(50% - 60px)", left: "50%", transform: "translate(-50%,-50%)" }}>
              {[40, 70, 100].map((r, i) => (
                <div key={r} style={{ position: "absolute", width: r, height: r, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.4)", top: "50%", left: "50%", marginTop: -r / 2, marginLeft: -r / 2, animation: `pulseRing ${2 + i * 0.7}s ease-out infinite`, animationDelay: `${i * 0.4}s` }} />
              ))}
              <div style={{ position: "relative", width: 16, height: 16, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 0 4px rgba(124,58,237,0.2), 0 0 24px rgba(124,58,237,0.6)" }} />
            </div>
            {/* Stats bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(124,58,237,0.08)", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ textAlign: "center", padding: "14px 8px", borderRight: i < 3 ? "1px solid rgba(124,58,237,0.08)" : "none" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#7c3aed", fontFamily: "var(--font-syne)" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#9d88c0", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}