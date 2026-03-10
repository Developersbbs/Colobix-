"use client";
import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Hand-crafted SVG icons ──────────────────────────────────────────────────
const IconServer = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="5.5" rx="1.5" stroke="#7c3aed" strokeWidth="1.4" fill="rgba(124,58,237,0.06)" />
    <rect x="2" y="10.5" width="20" height="5.5" rx="1.5" stroke="#7c3aed" strokeWidth="1.4" fill="rgba(124,58,237,0.06)" />
    <circle cx="5.5" cy="5.75" r="1" fill="#7c3aed" />
    <circle cx="5.5" cy="13.25" r="1" fill="#7c3aed" />
    <line x1="9" y1="5.75" x2="15" y2="5.75" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="9" y1="13.25" x2="15" y2="13.25" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7 19.5h10M12 16.5v3" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconNetwork = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="#7c3aed" strokeWidth="1.4" fill="rgba(124,58,237,0.06)" />
    <circle cx="4"  cy="6"  r="2" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.06)" />
    <circle cx="20" cy="6"  r="2" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.06)" />
    <circle cx="4"  cy="18" r="2" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.06)" />
    <circle cx="20" cy="18" r="2" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.06)" />
    <line x1="6"  y1="7"  x2="10" y2="10.5" stroke="#7c3aed" strokeWidth="1.2" />
    <line x1="18" y1="7"  x2="14" y2="10.5" stroke="#7c3aed" strokeWidth="1.2" />
    <line x1="6"  y1="17" x2="10" y2="13.5" stroke="#7c3aed" strokeWidth="1.2" />
    <line x1="18" y1="17" x2="14" y2="13.5" stroke="#7c3aed" strokeWidth="1.2" />
  </svg>
);

const IconShield = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5L4 6v6c0 4.8 3.6 8.8 8 10 4.4-1.2 8-5.2 8-10V6L12 2.5Z"
      stroke="#7c3aed" strokeWidth="1.4" strokeLinejoin="round"
      fill="rgba(124,58,237,0.06)" />
    <path d="M8.5 12l2.5 2.5 5-5" stroke="#7c3aed" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconIP = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* signal waves */}
    <path d="M5.5 17.5A9 9 0 0 1 5.5 6.5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M18.5 6.5A9 9 0 0 1 18.5 17.5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M8.5 14.5a5 5 0 0 1 0-5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M15.5 9.5a5 5 0 0 1 0 5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="12" r="1.8" fill="#7c3aed" />
  </svg>
);

const IconUptime = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#7c3aed" strokeWidth="1.4" fill="rgba(124,58,237,0.06)" />
    {/* clock hands */}
    <line x1="12" y1="12" x2="12" y2="7.5" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" />
    <line x1="12" y1="12" x2="15.5" y2="14" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.2" fill="#7c3aed" />
    {/* tick mark at top */}
    <line x1="12" y1="3.5" x2="12" y2="4.8" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconSupport = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* headset arc */}
    <path d="M5 11V10a7 7 0 0 1 14 0v1" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    {/* ear cups */}
    <rect x="3" y="11" width="3.5" height="5.5" rx="1.5" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.08)" />
    <rect x="17.5" y="11" width="3.5" height="5.5" rx="1.5" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.08)" />
    {/* mic arm */}
    <path d="M19 16.5v1a3 3 0 0 1-3 3h-2.5" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <circle cx="13.5" cy="20.5" r="1" stroke="#7c3aed" strokeWidth="1.2" fill="rgba(124,58,237,0.1)" />
  </svg>
);
// ────────────────────────────────────────────────────────────────────────────

const features = [
  { icon: <IconServer />, title: "NVMe SSD Drives",    desc: "Top-notch dedicated servers with blazing NVMe SSD storage for unmatched I/O performance at every tier." },
  { icon: <IconNetwork />, title: "40 Gbps Network",   desc: "Guaranteed high-speed bandwidth with full-duplex 40Gbps uplinks and zero oversubscription." },
  { icon: <IconShield />, title: "DDoS Protection",    desc: "Full-stack DDoS mitigation with 2Tbps+ scrubbing capacity distributed across all PoPs globally." },
  { icon: <IconIP />,     title: "Dedicated IP",       desc: "Every hosting plan includes a dedicated IP for maximum performance and complete routing control." },
  { icon: <IconUptime />, title: "99.9% Uptime SLA",   desc: "Multiple datacenter locations, N+1 cooling, diesel generators, and 24/7 NOC monitoring." },
  { icon: <IconSupport />, title: "24/7 Expert Support", desc: "Real humans, real answers — sub-minute response times on chat, 24 hours a day, 365 days a year." },
];

const cardAnimations = [
  "feat-fromLeft",
  "feat-fromTop",
  "feat-fromRight",
  "feat-fromBottom",
  "feat-zoomSpin",
  "feat-flipIn",
];

function MagneticCard({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
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
      el.style.transform = `translate(${dx}px,${dy}px) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  const onLeave = () => {
    if (isMobile) return;
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

function FeatureCard({ f, i, inView, isMobile }: { f: typeof features[0]; i: number; inView: boolean; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; angle: number; id: number }[]>([]);
  const [clicked, setClicked] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setCardVisible(true), 300 + i * 280);
    return () => clearTimeout(t);
  }, [inView, i]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rip => rip.id !== id)), 800);
    const newParticles = Array.from({ length: 8 }, (_, k) => ({
      x, y, angle: (k / 8) * 360, id: id + k,
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => setParticles(p => p.filter(par => !newParticles.find(n => n.id === par.id))), 700);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div style={{
      opacity: cardVisible ? 1 : 0,
      animation: cardVisible ? `${cardAnimations[i]} 1.1s cubic-bezier(0.16,1,0.3,1) both` : "none",
      transition: "opacity 0.3s",
    }}>
      <MagneticCard isMobile={isMobile}>
        <div
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: isMobile ? "1.4rem" : "2rem",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            userSelect: "none" as const,
            background: clicked
              ? "rgba(124,58,237,0.12)"
              : hovered ? "#f0ebff" : "#faf9ff",
            border: `1px solid ${hovered ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.1)"}`,
            boxShadow: hovered
              ? "0 0 0 1px rgba(124,58,237,0.15), 0 20px 60px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.8)"
              : "0 2px 16px rgba(124,58,237,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.3s",
          }}
        >
          {/* spotlight */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
            background: "radial-gradient(280px circle at var(--mx) var(--my), rgba(124,58,237,0.13) 0%, transparent 70%)",
            opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
          }} />

          {/* border beams */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "-100%", width: "60%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.8), transparent)", animation: hovered ? "feat-beam-x 1.4s ease-in-out infinite" : "none" }} />
            <div style={{ position: "absolute", top: "-100%", right: 0, width: "2px", height: "60%", background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.6), transparent)", animation: hovered ? "feat-beam-y 1.4s ease-in-out 0.35s infinite" : "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: "-100%", width: "60%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)", animation: hovered ? "feat-beam-xr 1.4s ease-in-out 0.7s infinite" : "none" }} />
            <div style={{ position: "absolute", bottom: "-100%", left: 0, width: "2px", height: "60%", background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.4), transparent)", animation: hovered ? "feat-beam-yr 1.4s ease-in-out 1.05s infinite" : "none" }} />
          </div>

          {/* ripples */}
          {ripples.map(rip => (
            <span key={rip.id} style={{ position: "absolute", left: rip.x, top: rip.y, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: "rgba(124,58,237,0.4)", pointerEvents: "none", animation: "feat-ripple 0.75s ease-out forwards" }} />
          ))}

          {/* particles */}
          {particles.map(p => (
            <span key={p.id} style={{ position: "absolute", left: p.x, top: p.y, width: 5, height: 5, borderRadius: "50%", background: `hsl(${260 + p.angle / 6},80%,60%)`, pointerEvents: "none", animation: "feat-particle 0.65s ease-out forwards", ["--angle" as any]: `${p.angle}deg` }} />
          ))}

          {/* icon — SVG in a refined container */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, marginBottom: 20,
            background: hovered ? "rgba(124,58,237,0.11)" : "rgba(124,58,237,0.06)",
            border: `1px solid ${hovered ? "rgba(124,58,237,0.28)" : "rgba(124,58,237,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), background 0.25s, border-color 0.25s",
            transform: hovered ? "scale(1.15) rotate(-8deg)" : "scale(1) rotate(0deg)",
          }}>
            {f.icon}
          </div>

          <h3 style={{
            fontWeight: 700, color: "#12002e", fontSize: "1rem",
            marginBottom: 10, marginTop: 0, fontFamily: "var(--font-heading)",
            letterSpacing: hovered ? "0.01em" : "-0.01em", transition: "letter-spacing 0.3s",
          }}>
            {f.title}
          </h3>

          <p style={{ color: hovered ? "#4a3a6e" : "#5b4d7a", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, transition: "color 0.3s" }}>
            {f.desc}
          </p>

          {/* shimmer bar */}
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
    </div>
  );
}

export default function Features() {
  const { ref, inView } = useInView();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setHeaderVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView]);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{
        background: "linear-gradient(155deg, #ffffff 0%, #fdfbff 50%, #f9f6ff 100%)",
        borderTop: "1px solid rgba(124,58,237,0.07)",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <style>{`
        @keyframes feat-fromLeft   { from{opacity:0;transform:translateX(-120px) scale(0.9)}  to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes feat-fromTop    { from{opacity:0;transform:translateY(-100px) scale(0.9)}  to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes feat-fromRight  { from{opacity:0;transform:translateX(120px) scale(0.9)}   to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes feat-fromBottom { from{opacity:0;transform:translateY(100px) scale(0.9)}   to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes feat-zoomSpin   { from{opacity:0;transform:scale(0.5) rotate(-12deg)}      to{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes feat-flipIn     { from{opacity:0;transform:perspective(800px) rotateY(90deg) scale(0.8)} to{opacity:1;transform:perspective(800px) rotateY(0deg) scale(1)} }
        @keyframes feat-titleUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes feat-beam-x     { 0%{left:-60%}    100%{left:160%} }
        @keyframes feat-beam-xr    { 0%{right:-60%}   100%{right:160%} }
        @keyframes feat-beam-y     { 0%{top:-60%}     100%{top:160%} }
        @keyframes feat-beam-yr    { 0%{bottom:-60%}  100%{bottom:160%} }
        @keyframes feat-ripple     { to{transform:scale(28);opacity:0} }
        @keyframes feat-particle   { 0%{transform:rotate(var(--angle)) translateX(0) scale(1);opacity:1} 100%{transform:rotate(var(--angle)) translateX(55px) scale(0);opacity:0} }
        @keyframes feat-orbFloat   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(28px,-32px) scale(1.06)} }
        @keyframes feat-lineGrow   { from{width:0} to{width:56px} }

        .feat-gradient-word {
          background: linear-gradient(135deg, #2E124A 0%, #8B2FC9 50%, #6366F1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
       
          display: inline;
        }

        /* ── Responsive grid ── */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .feat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .feat-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        .feat-inner {
          padding: 7rem 5%;
        }

        @media (max-width: 768px) {
          .feat-inner {
            padding: 4rem 5%;
          }
        }
      `}</style>

      {/* ambient orbs */}
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "feat-orbFloat 14s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", filter: "blur(50px)", animation: "feat-orbFloat 10s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

      <div ref={ref} className="feat-inner" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HEADER — matching pricing section style ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>

          {/* small caps label */}
          <div style={{
            animation: headerVisible ? "feat-titleUp 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            <span style={{
              color: "#7c3aed",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.22em",
              display: "block",
              marginBottom: 18,
            }}>
              Why Colobix
            </span>
          </div>

          {/* main heading */}
          <h2 style={{
            fontSize: isMobile ? "clamp(1.9rem,7vw,2.5rem)" : "clamp(2.2rem,4vw,3.4rem)",
            fontWeight: 800,
            marginTop: 0,
            marginBottom: 16,
            color: "#12002e",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            animation: headerVisible ? "feat-titleUp 1.1s 0.14s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            Everything your{" "}
            <span className="feat-gradient-word">infrastructure</span>
            {" "}needs
          </h2>

          {/* subtext */}
          <p style={{
            color: "#5b4d7a",
            fontWeight: 300,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            maxWidth: 460,
            margin: "0 auto 28px",
            lineHeight: 1.7,
            animation: headerVisible ? "feat-titleUp 1.1s 0.28s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            From dedicated bare-metal to fully managed cloud — the right solution for any workload.
          </p>

          {/* decorative underline — exactly like the pricing image */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobile ? 36 : 56,
            animation: headerVisible ? "feat-titleUp 1.1s 0.38s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            <div style={{ position: "relative", height: 4, width: 56 }}>
              {/* main bar */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 99,
                background: "linear-gradient(90deg, #2E124A, #8B2FC9, #6366F1)",
                animation: headerVisible ? "feat-lineGrow 0.9s 0.5s both cubic-bezier(0.16,1,0.3,1)" : "none",
              }} />
              {/* soft glow behind */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 99,
                background: "linear-gradient(90deg, #2E124A, #8B2FC9, #6366F1)",
                filter: "blur(6px)", opacity: 0.5,
              }} />
            </div>
          </div>

        </div>

        {/* cards grid */}
        <div className="feat-grid">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} inView={inView} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}