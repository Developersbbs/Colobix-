"use client";
import { useRef, useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

const features = [
  { icon: "🖥️", title: "NVMe SSD Drives",    desc: "Top-notch dedicated servers with blazing NVMe SSD storage for unmatched I/O performance at every tier." },
  { icon: "🌐", title: "40 Gbps Network",      desc: "Guaranteed high-speed bandwidth with full-duplex 40Gbps uplinks and zero oversubscription." },
  { icon: "🛡️", title: "DDoS Protection",      desc: "Full-stack DDoS mitigation with 2Tbps+ scrubbing capacity distributed across all PoPs globally." },
  { icon: "📡", title: "Dedicated IP",          desc: "Every hosting plan includes a dedicated IP for maximum performance and complete routing control." },
  { icon: "⏱️", title: "99.9% Uptime SLA",     desc: "Multiple datacenter locations, N+1 cooling, diesel generators, and 24/7 NOC monitoring." },
  { icon: "💬", title: "24/7 Expert Support",   desc: "Real humans, real answers — sub-minute response times on chat, 24 hours a day, 365 days a year." },
];

/* ── Magnetic cursor pull ─────────────────────────────────────────────── */
function MagneticCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.12;
      const dy = (e.clientY - cy) * 0.12;
      const rx = (e.clientY - cy) / rect.height * -18;
      const ry = (e.clientX - cx) / rect.width * 18;
      el.style.transform = `translate(${dx}px, ${dy}px) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current; if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(.23,1,.32,1)";
    el.style.transform = "translate(0,0) perspective(700px) rotateX(0) rotateY(0) scale(1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 550);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform", "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Spotlight card ───────────────────────────────────────────────────── */
function FeatureCard({ f, i, visible }: { f: typeof features[0]; i: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; angle: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    // ripple
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rip => rip.id !== id)), 800);

    // burst particles
    const newParticles = Array.from({ length: 8 }, (_, k) => ({
      x, y, angle: (k / 8) * 360, id: id + k,
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => setParticles(p => p.filter(par => !newParticles.find(n => n.id === par.id))), 700);

    // card flash
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <MagneticCard>
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`reveal reveal-delay-${(i % 3) + 1} ${visible ? "visible" : ""}`}
        style={{
          padding: "2rem",
          borderRadius: 20,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          userSelect: "none",
          background: clicked
            ? "rgba(124,58,237,0.12)"
            : hovered
            ? "#f0ebff"
            : "#faf9ff",
          border: `1px solid ${hovered ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.1)"}`,
          boxShadow: hovered
            ? "0 0 0 1px rgba(124,58,237,0.15), 0 20px 60px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.8)"
            : "0 2px 16px rgba(124,58,237,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.3s",
        }}
      >
        {/* ── Spotlight glow that follows cursor ── */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
          background: "radial-gradient(280px circle at var(--mx) var(--my), rgba(124,58,237,0.13) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }} />

        {/* ── Animated border beam ── */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
          background: "transparent",
          boxShadow: hovered ? "inset 0 0 0 1px rgba(124,58,237,0.0)" : "none",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "-100%",
            width: "60%", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.8), transparent)",
            animation: hovered ? "beam-x 1.4s ease-in-out infinite" : "none",
          }} />
          <div style={{
            position: "absolute",
            top: "-100%", right: 0,
            width: "2px", height: "60%",
            background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.6), transparent)",
            animation: hovered ? "beam-y 1.4s ease-in-out 0.35s infinite" : "none",
          }} />
          <div style={{
            position: "absolute",
            bottom: 0, right: "-100%",
            width: "60%", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
            animation: hovered ? "beam-x-rev 1.4s ease-in-out 0.7s infinite" : "none",
          }} />
          <div style={{
            position: "absolute",
            bottom: "-100%", left: 0,
            width: "2px", height: "60%",
            background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.4), transparent)",
            animation: hovered ? "beam-y-rev 1.4s ease-in-out 1.05s infinite" : "none",
          }} />
        </div>

        {/* ── Ripple ── */}
        {ripples.map(rip => (
          <span key={rip.id} style={{
            position: "absolute", left: rip.x, top: rip.y,
            width: 8, height: 8, marginLeft: -4, marginTop: -4,
            borderRadius: "50%",
            background: "rgba(124,58,237,0.4)",
            pointerEvents: "none",
            animation: "ripple 0.75s ease-out forwards",
          }} />
        ))}

        {/* ── Burst particles ── */}
        {particles.map(p => (
          <span key={p.id} style={{
            position: "absolute",
            left: p.x, top: p.y,
            width: 5, height: 5,
            borderRadius: "50%",
            background: `hsl(${260 + p.angle / 6},80%,60%)`,
            pointerEvents: "none",
            transformOrigin: "center",
            animation: `particle-burst 0.65s ease-out forwards`,
            ["--angle" as any]: `${p.angle}deg`,
          }} />
        ))}

        {/* ── Icon ── */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, marginBottom: 20,
          background: hovered ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.07)",
          border: `1px solid ${hovered ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.12)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24,
          transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), background 0.25s",
          transform: hovered ? "scale(1.15) rotate(-8deg)" : "scale(1) rotate(0deg)",
        }}>
          {f.icon}
        </div>

        {/* ── Text ── */}
        <h3 style={{
          fontWeight: 700, color: "#12002e", fontSize: "1rem",
          marginBottom: 10, marginTop: 0, fontFamily: "var(--font-syne)",
          transition: "letter-spacing 0.3s",
          letterSpacing: hovered ? "0.01em" : "-0.01em",
        }}>
          {f.title}
        </h3>
        <p style={{
          color: "#5b4d7a", fontSize: "0.875rem", lineHeight: 1.7, margin: 0,
          transition: "color 0.3s",
          ...(hovered && { color: "#4a3a6e" }),
        }}>
          {f.desc}
        </p>

        {/* ── Bottom shimmer bar ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #7c3aed, #a855f7, transparent)",
          borderRadius: "0 0 20px 20px",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.45s cubic-bezier(.23,1,.32,1)",
        }} />
      </div>
    </MagneticCard>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Features() {
  const { ref, visible } = useReveal();

  return (
    <section id="features" style={{ background: "#fff", borderTop: "1px solid rgba(124,58,237,0.07)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes ripple {
          to { transform: scale(28); opacity: 0; }
        }
        @keyframes particle-burst {
          0%   { transform: rotate(var(--angle)) translateX(0px) scale(1); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(55px) scale(0); opacity: 0; }
        }
        @keyframes beam-x {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
        @keyframes beam-x-rev {
          0%   { right: -60%; }
          100% { right: 160%; }
        }
        @keyframes beam-y {
          0%   { top: -60%; }
          100% { top: 160%; }
        }
        @keyframes beam-y-rev {
          0%   { bottom: -60%; }
          100% { bottom: 160%; }
        }
        @keyframes float-blob {
          0%, 100% { transform: translateY(0) scale(1);    }
          50%       { transform: translateY(-22px) scale(1.05); }
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "float-blob 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", filter: "blur(50px)", animation: "float-blob 11s ease-in-out infinite reverse", pointerEvents: "none" }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 5%" }}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>Why Colobix</span>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}>
          Everything your<br /><span className="grad-text">infrastructure needs</span>
        </h2>
        <p className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ color: "#5b4d7a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 480, marginBottom: 60 }}>
          From dedicated bare-metal to fully managed cloud — the right solution for any workload.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}