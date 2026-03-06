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

const IconBolt = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3L4.5 13.5H11.5L11 21L19.5 10.5H12.5L13 3Z" fill={color} stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconGlobe = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M3 9h18M3 15h18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 3C9.5 6 8.5 9 8.5 12s1 6 3.5 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 3C14.5 6 15.5 9 15.5 12s-1 6-3.5 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconShield = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L4 6.5V12c0 4.2 3.2 7.8 8 9 4.8-1.2 8-4.8 8-9V6.5L12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.08" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChat = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3V6a2 2 0 0 1 2-2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.08" />
    <path d="M15 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2l-2 2v-7" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill={color} fillOpacity="0.06" />
  </svg>
);

const IconBoltSm = ({ color = "#7c3aed" }: { color?: string }) => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <path d="M13 3L4.5 13.5H11.5L11 21L19.5 10.5H12.5L13 3Z" fill={color} stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconGlobeSm = ({ color = "#7c3aed" }: { color?: string }) => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
    <path d="M3 9h18M3 15h18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 3C9.5 6 8.5 9 8.5 12s1 6 3.5 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 3C14.5 6 15.5 9 15.5 12s-1 6-3.5 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconShieldSm = ({ color = "#7c3aed" }: { color?: string }) => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <path d="M12 3L4 6.5V12c0 4.2 3.2 7.8 8 9 4.8-1.2 8-4.8 8-9V6.5L12 3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const stats = [
  { value: "99.9%", label: "Uptime SLA",  icon: <IconBolt size={22} color="#7c3aed" /> },
  { value: "40+",   label: "Global PoPs", icon: <IconGlobe size={22} color="#7c3aed" /> },
  { value: "2Tbps", label: "DDoS Cap",    icon: <IconShield size={22} color="#7c3aed" /> },
  { value: "24/7",  label: "Support",     icon: <IconChat size={22} color="#7c3aed" /> },
];

const milestones = [
  { year: "2019", title: "Founded",          desc: "Started with a single data center and a vision for enterprise-grade simplicity." },
  { year: "2021", title: "Global Expansion", desc: "Scaled to 20+ PoPs across 4 continents, serving thousands of businesses." },
  { year: "2023", title: "2 Tbps Shield",    desc: "Deployed industry-leading DDoS mitigation across our entire network." },
  { year: "2025", title: "10k+ Clients",     desc: "Trusted by over 10,000 businesses worldwide with 99.9% uptime guaranteed." },
];

export default function About() {
  const { ref, inView } = useInView();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setLineWidth(100), 400);
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
      id="about"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8f2ff 35%, #f2e8ff 65%, #ede2fc 100%)",
        borderTop: "1px solid rgba(124,58,237,0.08)",
        position: "relative", overflow: "hidden", minHeight: "100vh",
        display: "flex", alignItems: "center",
        cursor: "auto",
      }}
    >
      <style>{`
        @keyframes abt-fadeUp    { from{opacity:0;transform:translateY(60px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes abt-fadeLeft  { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes abt-fadeRight { from{opacity:0;transform:translateX(70px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes abt-scaleIn   { from{opacity:0;transform:scale(0.8)}        to{opacity:1;transform:scale(1)} }
        @keyframes abt-blurUp    { from{opacity:0;filter:blur(16px);transform:translateY(40px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
        @keyframes abt-orbA      { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-45px) scale(1.1)} 66%{transform:translate(-25px,25px) scale(0.92)} }
        @keyframes abt-orbB      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,-28px)} }
        @keyframes abt-float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes abt-scan      { 0%{top:-2px;opacity:0.8} 80%{opacity:0.8} 100%{top:100%;opacity:0} }
        @keyframes abt-spinCW    { to{transform:rotate(360deg)} }
        @keyframes abt-spinCCW   { to{transform:rotate(-360deg)} }
        @keyframes abt-pulse     { 0%{transform:scale(0.85);opacity:0.9} 100%{transform:scale(2.6);opacity:0} }
        @keyframes abt-dotGlow   { 0%,100%{box-shadow:0 0 0 4px rgba(124,58,237,0.2),0 0 20px rgba(124,58,237,0.5)} 50%{box-shadow:0 0 0 8px rgba(124,58,237,0.08),0 0 40px rgba(124,58,237,0.8)} }
        @keyframes abt-tagFloat  { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(-2deg)} }
        @keyframes abt-tagFloat2 { 0%,100%{transform:translateY(0) rotate(2deg)}  50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes abt-tagFloat3 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes abt-shimmer   { 0%{left:-100%} 100%{left:200%} }

        /* Dot glow ring — opacity-only, no layout impact */
        @keyframes abt-dotRing   { 0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0;transform:translate(-50%,-50%) scale(2.2)} }

        .abt-stat-card { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); cursor: default; }
        .abt-stat-card:hover { transform: translateY(-8px) scale(1.04) !important; }

        .abt-cta { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); position:relative; overflow:hidden; }
        .abt-cta:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 16px 48px rgba(124,58,237,0.5) !important; }
        .abt-cta::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); transform:skewX(-14deg); }
        .abt-cta:hover::after { animation: abt-shimmer 0.7s ease forwards; }

        /* ── Responsive layout ── */
        .abt-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: start;
        }
        .abt-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .abt-visual-card { height: 320px; }
        .abt-right-col { display: block; }

        @media (max-width: 1024px) {
          .abt-main-grid { gap: 3.5rem; }
        }

        @media (max-width: 768px) {
          .abt-main-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .abt-visual-card { height: 260px; }
          .abt-right-col { display: none; }
        }

        @media (max-width: 480px) {
          .abt-stat-grid { gap: 8px; }
          .abt-cta-row { flex-direction: column; }
          .abt-cta-row a { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* aurora orbs */}
      <div style={{ position:"absolute", top:-150, right:-100, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.11),transparent 70%)", filter:"blur(60px)", animation:"abt-orbA 16s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:-120, left:-80, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.09),transparent 70%)", filter:"blur(55px)", animation:"abt-orbB 12s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", top:"50%", left:"40%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(196,181,253,0.07),transparent 70%)", filter:"blur(45px)", animation:"abt-orbA 20s ease-in-out infinite reverse", pointerEvents:"none", zIndex:0 }} />

      <div ref={ref} style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "4rem 5%" : "7rem 5%", position:"relative", zIndex:1, width:"100%" }}>

        {/* TOP LABEL */}
        <div style={{
          display:"flex", alignItems:"center", gap:16, marginBottom: isMobile ? 40 : 64,
          animation: inView ? "abt-blurUp 1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
          opacity: inView ? undefined : 0,
        }}>
          <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)", flex:1 }} />
          <span style={{ color:"#7c3aed", fontSize:11, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.22em", whiteSpace:"nowrap" as const }}>✦ About Our Hosting ✦</span>
          <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)", flex:1 }} />
        </div>

        {/* MAIN GRID */}
        <div className="abt-main-grid">

          {/* LEFT COLUMN */}
          <div>
            <div style={{ marginBottom: isMobile ? 24 : 40 }}>
              <h2 style={{
                fontSize:"clamp(2.2rem,5vw,4.2rem)", fontWeight:800,
                color:"#12002e", fontFamily:"var(--font-heading)",
                lineHeight:1.05, letterSpacing:"-0.04em", margin:0,
                animation: inView ? "abt-fadeLeft 1s 0.15s both cubic-bezier(0.16,1,0.3,1)" : "none",
                opacity: inView ? undefined : 0,
              }}>
                We build the
                <br />
                <span style={{ background:"linear-gradient(135deg,#2E124A 0%,#8B2FC9 50%,#6366F1 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  backbone
                </span>
                <br />
                of the internet
              </h2>
              <div style={{ height:3, background:"rgba(124,58,237,0.1)", borderRadius:99, marginTop:24, overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:99,
                  background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",
                  width:`${lineWidth}%`,
                  transition:"width 1.4s 0.5s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow:"0 0 12px rgba(139,47,201,0.5)",
                }} />
              </div>
            </div>

            <p style={{
              color:"#5b4d7a", lineHeight:1.9, marginBottom: isMobile ? 32 : 48,
              maxWidth:460, fontSize:"1.05rem", fontWeight:300,
              animation: inView ? "abt-fadeUp 1s 0.28s both cubic-bezier(0.16,1,0.3,1)" : "none",
              opacity: inView ? undefined : 0,
            }}>
              Colobix delivers enterprise-grade hosting with simplicity. From bare-metal to fully managed cloud, every plan is engineered for performance, security, and reliability — at any scale.
            </p>

            {/* TIMELINE — FIX: each row is position:relative, dot sits inside it, glow uses opacity/scale only (no box-shadow transitions that cause reflow) */}
            <div style={{
              marginBottom: isMobile ? 32 : 48,
              animation: inView ? "abt-fadeUp 1s 0.4s both cubic-bezier(0.16,1,0.3,1)" : "none",
              opacity: inView ? undefined : 0,
            }}>
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.18em", color:"#9d88c0", marginBottom:24 }}>Our Journey</p>

              {/* Outer wrapper — contains the vertical line + all rows */}
              <div style={{ position:"relative" }}>

                {/* Vertical line — contained inside this wrapper, won't shift anything */}
                <div style={{
                  position:"absolute", left:10, top:8, bottom:8, width:1.5,
                  background:"rgba(124,58,237,0.15)", borderRadius:99, overflow:"hidden",
                  pointerEvents:"none",
                }}>
                  <div style={{
                    width:"100%",
                    background:"linear-gradient(180deg,#7c3aed,#a855f7)",
                    height: inView ? "100%" : "0%",
                    transition:"height 1.8s 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }} />
                </div>

                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    style={{
                      position:"relative",
                      display:"flex", gap:20, alignItems:"flex-start",
                      paddingLeft:32,
                      marginBottom: i < milestones.length - 1 ? 28 : 0,
                      opacity: inView ? 1 : 0,
                      transition:`opacity 0.5s ${0.7 + i * 0.12}s`,
                    }}
                  >
                    {/* Static dot — no transitions, no animation */}
                    <div style={{
                      position:"absolute",
                      left:6, top:5,
                      width:10, height:10, borderRadius:"50%",
                      background:"#7c3aed",
                      border:"2px solid rgba(124,58,237,0.3)",
                      flexShrink:0,
                    }} />

                    <div style={{ flex:1, padding:"2px 0 2px 4px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                        <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:"#7c3aed" }}>{m.year}</span>
                        <span style={{ fontWeight:700, fontSize:"0.9rem", color:"#12002e", fontFamily:"var(--font-heading)" }}>{m.title}</span>
                      </div>
                      <p style={{ fontSize:"0.82rem", color:"#5b4d7a", lineHeight:1.7, margin:0 }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="abt-cta-row"
              style={{
                animation: inView ? "abt-fadeUp 1s 0.55s both cubic-bezier(0.16,1,0.3,1)" : "none",
                opacity: inView ? undefined : 0,
                display:"flex", gap:14, flexWrap:"wrap" as const,
              }}
            >
              <a href="#features" className="abt-cta" style={{
                display:"inline-flex", alignItems:"center", gap:10,
                padding:"14px 32px", borderRadius:13, fontSize:"0.9rem",
                textDecoration:"none",
                background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)",
                color:"#fff", fontWeight:700,
                boxShadow:"0 6px 28px rgba(124,58,237,0.35)",
                letterSpacing:"0.01em",
              }}>
                Explore Features
                <svg style={{ width:16, height:16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#contact" style={{
                display:"inline-flex", alignItems:"center", gap:10,
                padding:"14px 32px", borderRadius:13, fontSize:"0.9rem",
                textDecoration:"none", fontWeight:600,
                color:"#7c3aed", background:"rgba(124,58,237,0.07)",
                border:"1.5px solid rgba(124,58,237,0.2)",
                transition:"all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(124,58,237,0.13)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.45)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(124,58,237,0.07)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.2)"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                Talk to Sales
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — hidden on mobile */}
          <div
            className="abt-right-col"
            style={{
              animation: inView ? "abt-fadeRight 1s 0.3s both cubic-bezier(0.16,1,0.3,1)" : "none",
              opacity: inView ? undefined : 0,
            }}
          >
            {/* VISUAL CARD */}
            <div
              className="abt-visual-card"
              style={{
                position:"relative", borderRadius:28,
                border:"1px solid rgba(124,58,237,0.14)",
                background:"linear-gradient(145deg,#fdfbff,#f5f0ff,#ede8fb)",
                overflow:"hidden", marginBottom:24,
                boxShadow:"0 32px 80px rgba(124,58,237,0.12)",
                animation: inView ? "abt-float 5s 1s ease-in-out infinite" : "none",
              }}
            >
              <div style={{ position:"absolute", left:0, right:0, height:1.5, background:"linear-gradient(90deg,transparent,rgba(139,47,201,0.5),transparent)", zIndex:10, animation:"abt-scan 4s linear infinite", pointerEvents:"none" }} />
              {[90, 135, 175].map((r, i) => (
                <div key={r} style={{
                  position:"absolute", width:r*2, height:r*2, borderRadius:"50%",
                  border:`1px solid rgba(124,58,237,${0.1 + i*0.04})`,
                  top:"42%", left:"50%", marginLeft:-r, marginTop:-r,
                  animation:`${i%2===0?"abt-spinCW":"abt-spinCCW"} ${14+i*7}s linear infinite`,
                }}>
                  <div style={{ position:"absolute", width:9, height:9, borderRadius:"50%", background:"#a855f7", top:-4.5, left:"50%", marginLeft:-4.5, boxShadow:"0 0 12px rgba(168,85,247,0.9),0 0 24px rgba(168,85,247,0.4)" }} />
                </div>
              ))}
              <div style={{ position:"absolute", top:"42%", left:"50%", transform:"translate(-50%,-50%)" }}>
                {[38, 66, 94].map((r, i) => (
                  <div key={r} style={{ position:"absolute", width:r, height:r, borderRadius:"50%", border:"1.5px solid rgba(124,58,237,0.4)", top:"50%", left:"50%", marginTop:-r/2, marginLeft:-r/2, animation:`abt-pulse ${2.4+i*0.8}s ease-out infinite`, animationDelay:`${i*0.5}s` }} />
                ))}
                <div style={{ width:16, height:16, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#a855f7)", animation:"abt-dotGlow 2.2s ease-in-out infinite", position:"relative" }} />
              </div>
              {[
                { label:"99.9% Uptime", icon:<IconBoltSm color="#7c3aed" />, style:{ top:"12%", left:"8%", animation:"abt-tagFloat 4s ease-in-out infinite" } },
                { label:"Global CDN",   icon:<IconGlobeSm color="#7c3aed" />, style:{ top:"10%", right:"8%", animation:"abt-tagFloat2 5s ease-in-out infinite" } },
                { label:"DDoS Protected", icon:<IconShieldSm color="#7c3aed" />, style:{ bottom:"22%", left:"6%", animation:"abt-tagFloat3 3.5s ease-in-out infinite" } },
              ].map(tag => (
                <div key={tag.label} style={{
                  position:"absolute", ...tag.style as any,
                  display:"flex", alignItems:"center", gap:7,
                  background:"rgba(255,255,255,0.88)", backdropFilter:"blur(14px)",
                  border:"1px solid rgba(124,58,237,0.16)", borderRadius:11,
                  padding:"8px 14px", fontSize:11, fontWeight:700, color:"#2E124A",
                  boxShadow:"0 6px 20px rgba(124,58,237,0.1)", whiteSpace:"nowrap" as const,
                }}>
                  {tag.icon}{tag.label}
                </div>
              ))}
            </div>

            {/* STAT CARDS */}
            <div className="abt-stat-grid">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="abt-stat-card"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    padding:"20px", borderRadius:18,
                    background: hoveredStat===i ? "#fff" : "rgba(255,255,255,0.7)",
                    border:`1px solid ${hoveredStat===i ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.1)"}`,
                    backdropFilter:"blur(12px)",
                    boxShadow: hoveredStat===i ? "0 12px 36px rgba(124,58,237,0.14)" : "0 2px 12px rgba(124,58,237,0.05)",
                    animation: inView ? `abt-scaleIn 0.8s ${0.5 + i * 0.12}s both cubic-bezier(0.34,1.56,0.64,1)` : "none",
                    opacity: inView ? undefined : 0,
                    position:"relative", overflow:"hidden",
                  }}
                >
                  <div style={{ position:"absolute", top:0, right:0, width:60, height:60, background:"radial-gradient(circle at top right,rgba(124,58,237,0.1),transparent 70%)", opacity: hoveredStat===i ? 1 : 0, transition:"opacity 0.3s", pointerEvents:"none" }} />
                  <div style={{ marginBottom:10 }}>{s.icon}</div>
                  <div style={{ fontSize:"1.6rem", fontWeight:800, color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.03em", lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:11, color:"#9d88c0", marginTop:5, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>{s.label}</div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#7c3aed,#a855f7,transparent)", transform: hoveredStat===i ? "scaleX(1)" : "scaleX(0)", transformOrigin:"left", transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}