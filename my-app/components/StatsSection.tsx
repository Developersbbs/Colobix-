"use client";
import { useEffect, useState, useRef } from "react";

function useInView(threshold = 0.1) {
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

function Counter({ target, active, decimals = 0 }: { target: number; active: boolean; decimals?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now(), dur = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(parseFloat((e * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick); else setN(target);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return <>{decimals > 0 ? n.toFixed(decimals) : n.toLocaleString()}</>;
}

const P = "#2E124A";
const A = "#8B2FC9";

// ── Hand-crafted SVG icons ─────────────────────────────────────────────────
const IconBolt = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M13 2.5L4 14h7.5L11 21.5 20 10h-7.5L13 2.5Z"
      fill="white" stroke="white" strokeWidth="1.3"
      strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconTrophy = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* cup body */}
    <path d="M8 3h8v7a4 4 0 0 1-8 0V3Z"
      stroke="#b45309" strokeWidth="1.4" strokeLinejoin="round"
      fill="rgba(180,83,9,0.08)" />
    {/* handles */}
    <path d="M8 5H5a2 2 0 0 0 0 4h3" stroke="#b45309" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M16 5h3a2 2 0 0 1 0 4h-3" stroke="#b45309" strokeWidth="1.3" strokeLinecap="round" />
    {/* stem */}
    <line x1="12" y1="14" x2="12" y2="18" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" />
    {/* base */}
    <path d="M9 18h6" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
    {/* star inside cup */}
    <path d="M12 6l.7 2h2l-1.6 1.2.6 2L12 10l-1.7 1.2.6-2L9.3 8h2L12 6Z"
      fill="#b45309" opacity="0.5" />
  </svg>
);
// ───────────────────────────────────────────────────────────────────────────

function ServerVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const logs = [
    { text: "→ srv-01 ONLINE  [78% CPU]", color: A },
    { text: "→ srv-02 ONLINE  [45% CPU]", color: "#22c55e" },
    { text: "→ srv-03 WARN    [91% CPU]", color: "#f59e0b" },
    { text: "→ net-gw SYNCED  [12ms]",    color: A },
    { text: "→ backup IDLE    [ready]",   color: "#22c55e" },
  ];
  return (
    <div style={{ width:"100%", height:"100%", padding:"18px 20px", display:"flex", flexDirection:"column", gap:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width:9, height:9, borderRadius:"50%", background:c }} />
        ))}
        <span style={{ marginLeft:8, fontFamily:"monospace", fontSize:9, color:"rgba(46,18,74,0.35)", letterSpacing:"0.08em" }}>colobix://live-monitor</span>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", animation:"svBlink 1.4s infinite" }} />
          <span style={{ fontFamily:"monospace", fontSize:8, color:"#15803d", fontWeight:700 }}>LIVE</span>
        </div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        {logs.map((line, i) => (
          <div key={i} style={{
            fontFamily:"monospace", fontSize:10,
            color: i===(tick%logs.length) ? line.color : "rgba(46,18,74,0.3)",
            transition:"color 0.35s ease", display:"flex", alignItems:"center", gap:5,
            padding:"3px 0", borderBottom: i<logs.length-1 ? "1px solid rgba(46,18,74,0.04)" : "none",
          }}>
            {i===(tick%logs.length) && <span style={{ color:line.color, animation:"svBlink 0.7s step-end infinite", fontSize:8 }}>▶</span>}
            {line.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid rgba(46,18,74,0.07)", display:"flex", gap:20 }}>
        {[["CPU","62%",A],["MEM","38%","#f59e0b"],["NET","12ms","#22c55e"]].map(([lbl,val,col]) => (
          <div key={lbl}>
            <div style={{ fontFamily:"monospace", fontSize:8, color:"rgba(46,18,74,0.3)", marginBottom:2 }}>{lbl}</div>
            <div style={{ fontFamily:"monospace", fontSize:12, color:col, fontWeight:700 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ id, label, value, suffix, desc, decimals=0, accent, hov, setHov, active, animDelay }: {
  id:string; label:string; value:number; suffix:string; desc:string;
  decimals?:number; accent:string; hov:string|null; setHov:(v:string|null)=>void; active:boolean; animDelay:number;
}) {
  const isHov = hov===id;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), animDelay);
    return () => clearTimeout(t);
  }, [active, animDelay]);

  return (
    <div onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)} style={{
      background: isHov ? "#fff" : "#faf8fc",
      border:`1px solid ${isHov ? accent+"30" : "rgba(46,18,74,0.08)"}`,
      borderRadius:16, padding:"20px 22px",
      boxShadow: isHov ? `0 12px 32px rgba(46,18,74,0.1), 0 0 0 1px ${accent}18` : "0 1px 4px rgba(46,18,74,0.04)",
      transform: visible ? (isHov ? "translateY(-4px)" : "translateY(0)") : "translateY(32px) scale(0.93)",
      opacity: visible ? 1 : 0,
      transition: visible
        ? "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s, box-shadow 0.32s, border-color 0.32s, background 0.32s"
        : "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s",
      cursor:"default", position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", top:0, right:0, width:64, height:64, background:`radial-gradient(circle at top right,${accent}18,transparent 70%)`, pointerEvents:"none", opacity:isHov?1:0, transition:"opacity 0.3s" }} />
      <p style={{ margin:"0 0 10px", fontSize:9, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.18em", color:"rgba(46,18,74,0.4)", fontFamily:"var(--font-body)" }}>{label}</p>
      <div style={{ fontSize:"2.5rem", fontWeight:700, fontFamily:"var(--font-heading)", letterSpacing:"-0.03em", lineHeight:1, color:P, display:"flex", alignItems:"flex-end", gap:2 }}>
        <Counter target={value} active={active} decimals={decimals} />
        <span style={{ fontSize:"0.42em", fontWeight:600, color:accent, marginBottom:"0.12em", fontFamily:"var(--font-body)" }}>{suffix}</span>
      </div>
      <p style={{ margin:"6px 0 0", fontSize:"0.72rem", color:"rgba(46,18,74,0.38)", fontFamily:"var(--font-body)", lineHeight:1.5 }}>{desc}</p>
      <div style={{ position:"absolute", bottom:0, left:0, height:2, borderRadius:"0 0 0 16px", width:isHov?"100%":"0%", background:`linear-gradient(90deg,${accent},transparent)`, transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView(0.1);
  const [hov, setHov] = useState<string|null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x:0, y:0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setLeftVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
    <section ref={sectionRef} style={{
      background: "linear-gradient(155deg, #ffffff 0%, #fdfbff 50%, #f9f6ff 100%)",
      borderTop:"1px solid rgba(46,18,74,0.06)", borderBottom:"1px solid rgba(46,18,74,0.06)",
      position:"relative", overflow:"hidden", cursor:"default",
    }}>
      <style>{`
        @keyframes svBlink      { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes stats-fadeUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stats-left   { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes stats-orbA   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-28px)} }
        @keyframes stats-orbB   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,22px)} }
        @keyframes stats-lineGrow { from{width:0} to{width:56px} }

        /* gradient text — CSS class avoids webkit background-clip block bug */
        .stats-gradient-word {
          background: linear-gradient(135deg, #2E124A 0%, #8B2FC9 50%, #6366F1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        
          display: inline;
        }

        .stats-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 28px;
          align-items: start;
        }
        .stats-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .stats-badges-row { display: flex; gap: 10px; margin-top: 12px; }
        .stats-inner { padding: 5.5rem 5%; }
        .stats-server-panel { display: block; }

        @media (max-width: 1024px) {
          .stats-main-grid { grid-template-columns: 1fr; gap: 24px; }
          .stats-inner { padding: 4rem 5%; }
        }
        @media (max-width: 768px) {
          .stats-server-panel { display: none; }
          .stats-main-grid { display: block; }
          .stats-card-grid { grid-template-columns: 1fr 1fr; }
          .stats-card-grid > * { grid-column: span 1 !important; }
        }
        @media (max-width: 480px) {
          .stats-card-grid { grid-template-columns: 1fr 1fr; }
          .stats-card-grid > * { grid-column: span 1 !important; }
          .stats-badges-row { flex-direction: column; }
        }
      `}</style>

      <div style={{ position:"absolute", width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,47,201,0.05),transparent 65%)", left:mousePos.x, top:mousePos.y, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:0, transition:"left 0.1s linear, top 0.1s linear" }} />
      <div style={{ position:"absolute", top:-80, right:-80, width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,47,201,0.07),transparent 70%)", filter:"blur(55px)", animation:"stats-orbA 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:-100, left:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(46,18,74,0.05),transparent 70%)", filter:"blur(50px)", animation:"stats-orbB 10s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />

      <div ref={ref} className="stats-inner" style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* ── HEADER — matching pricing section style ── */}
        <div style={{
          textAlign:"center", marginBottom:"3rem",
          animation: headerVisible ? "stats-fadeUp 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
          opacity: headerVisible ? undefined : 0,
        }}>
          {/* small-caps label */}
          <span style={{
            fontFamily:"var(--font-body)", fontSize:11, fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase" as const,
            color:A, display:"block", marginBottom:18,
          }}>
            Platform Overview · Q1 2025
          </span>

          {/* main heading */}
          <h2 style={{
            fontFamily:"var(--font-heading)",
            fontSize:"clamp(2.2rem,4vw,3.4rem)",
            fontWeight:800, color:P, margin:"0 0 16px",
            letterSpacing:"-0.035em", lineHeight:1.1,
          }}>
            Colobix{" "}
            <span className="stats-gradient-word">by the</span>
            {" "}numbers
          </h2>

          {/* subtext */}
          <p style={{
            fontFamily:"var(--font-body)", fontSize:"0.95rem",
            color: "#5b4d7a", margin:"0 auto 28px",
            letterSpacing:"0.01em", fontWeight:300,
            maxWidth: 400, lineHeight: 1.7,
          }}>
            Updated daily · All systems nominal
          </p>

          {/* decorative underline pill — same as pricing */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", height:2, width:56 }}>
              <div style={{
                position:"absolute", inset:0, borderRadius:99,
                background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",
                animation: headerVisible ? "stats-lineGrow 0.9s 0.5s both cubic-bezier(0.16,1,0.3,1)" : "none",
              }} />
              <div style={{
                position:"absolute", inset:0, borderRadius:99,
                background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",
                filter:"blur(6px)", opacity:0.45,
              }} />
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="stats-main-grid" style={{ marginTop:"2.5rem" }}>

          {/* Left — hidden on mobile */}
          <div
            className="stats-server-panel"
            style={{ animation: leftVisible ? "stats-left 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none", opacity: leftVisible ? undefined : 0 }}
          >
            <div style={{ background:"#faf8fc", border:"1px solid rgba(46,18,74,0.08)", borderRadius:18, overflow:"hidden", height:252, boxShadow:"0 4px 24px rgba(46,18,74,0.06), inset 0 1px 0 rgba(255,255,255,0.8)" }}>
              <ServerVisual />
            </div>

            <div className="stats-badges-row">
              {/* Uptime badge */}
              <div style={{ flex:1, background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 2px 8px rgba(34,197,94,0.06)", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor:"default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 8px 20px rgba(34,197,94,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform=""; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 8px rgba(34,197,94,0.06)"; }}
              >
                <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 0 3px rgba(34,197,94,0.2)", animation:"svBlink 2s infinite", flexShrink:0 }} />
                <div>
                  <p style={{ margin:0, fontFamily:"var(--font-body)", fontSize:9, color:"#15803d", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.12em" }}>Uptime</p>
                  <p style={{ margin:0, fontFamily:"var(--font-heading)", fontSize:"1.15rem", fontWeight:700, color:"#15803d", letterSpacing:"-0.02em" }}>99.99%</p>
                </div>
              </div>

              {/* Latency badge — ⚡ replaced with SVG bolt */}
              <div style={{ flex:1, background:"linear-gradient(135deg,#faf5ff,#ede9fe)", border:"1px solid rgba(139,47,201,0.15)", borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 2px 8px rgba(139,47,201,0.06)", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor:"default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 8px 20px rgba(139,47,201,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform=""; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 8px rgba(139,47,201,0.06)"; }}
              >
                <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${P},${A})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <IconBolt size={16} />
                </div>
                <div>
                  <p style={{ margin:0, fontFamily:"var(--font-body)", fontSize:9, color:"rgba(46,18,74,0.45)", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.12em" }}>Avg Latency</p>
                  <p style={{ margin:0, fontFamily:"var(--font-heading)", fontSize:"1.15rem", fontWeight:700, color:P, letterSpacing:"-0.02em" }}>12ms</p>
                </div>
              </div>
            </div>

            {/* Award card — 🏆 replaced with SVG trophy */}
            <div style={{ marginTop:12, background:"#faf8fc", border:"1px solid rgba(46,18,74,0.08)", borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 4px rgba(46,18,74,0.04)", cursor:"default", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 8px 24px rgba(46,18,74,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform=""; (e.currentTarget as HTMLDivElement).style.boxShadow="0 1px 4px rgba(46,18,74,0.04)"; }}
            >
              <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:"linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.05))", border:"1px solid rgba(245,158,11,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <IconTrophy size={20} />
              </div>
              <div>
                <p style={{ margin:"0 0 2px", fontFamily:"var(--font-body)", fontSize:9, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.14em", color:"#b45309" }}>Annual Achievement · 2024</p>
                <p style={{ margin:0, fontFamily:"var(--font-body)", fontSize:"0.78rem", color:"rgba(46,18,74,0.55)", lineHeight:1.5 }}>
                  <strong style={{ color:A }}>Top 10 Hosting Provider</strong> in APAC — uptime & support excellence
                </p>
              </div>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="stats-card-grid">
            {[
              { id:"clients", label:"Total Clients",     value:854,   suffix:"+", desc:"Businesses trusting Colobix",     accent:"#6366f1", decimals:0 },
              { id:"uptime",  label:"Uptime SLA",        value:99.99, suffix:"%", desc:"Guaranteed availability",          accent:"#22c55e", decimals:2 },
              { id:"domains", label:"Active Domains",    value:565,   suffix:"+", desc:"Hosted globally across all zones", accent:A,         decimals:0 },
              { id:"servers", label:"Dedicated Servers", value:576,   suffix:"+", desc:"Bare-metal · 40+ PoP locations",   accent:"#f59e0b", decimals:0 },
            ].map((s, i) => (
              <StatCard key={s.id} {...s} hov={hov} setHov={setHov} active={inView} animDelay={500 + i * 200} />
            ))}

            {/* wide network card */}
            <div style={{ gridColumn:"span 2", transform: inView ? "translateY(0)" : "translateY(40px)", opacity: inView ? 1 : 0, transition:"transform 1.1s 1.3s cubic-bezier(0.16,1,0.3,1), opacity 1.1s 1.3s" }}>
              <div onMouseEnter={() => setHov("net")} onMouseLeave={() => setHov(null)} style={{
                background: hov==="net" ? "#fff" : "#faf8fc",
                border:`1px solid ${hov==="net" ? "rgba(139,47,201,0.2)" : "rgba(46,18,74,0.08)"}`,
                borderRadius:16, padding:"18px 22px",
                boxShadow: hov==="net" ? "0 12px 32px rgba(46,18,74,0.1)" : "0 1px 4px rgba(46,18,74,0.04)",
                transform: hov==="net" ? "translateY(-3px)" : "translateY(0)",
                transition:"all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                cursor:"default", position:"relative", overflow:"hidden",
              }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:10 }}>
                  <div>
                    <p style={{ margin:"0 0 4px", fontFamily:"var(--font-body)", fontSize:9, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.18em", color:"rgba(46,18,74,0.4)" }}>Global Network</p>
                    <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                      <span style={{ fontFamily:"var(--font-heading)", fontSize:"2rem", fontWeight:700, color:P, letterSpacing:"-0.03em" }}>40+</span>
                      <span style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", color:A, fontWeight:500 }}>Points of Presence</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {["AS","EU","US","ME"].map(r => (
                      <div key={r} style={{ padding:"4px 10px", borderRadius:6, background: hov==="net" ? `${A}12` : "rgba(46,18,74,0.05)", border:`1px solid ${hov==="net" ? `${A}25` : "rgba(46,18,74,0.08)"}`, fontFamily:"var(--font-body)", fontSize:9, fontWeight:600, color: hov==="net" ? A : "rgba(46,18,74,0.4)", transition:"all 0.25s" }}>{r}</div>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:9, color:"rgba(46,18,74,0.3)", whiteSpace:"nowrap" as const, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Avg Latency</span>
                  <div style={{ flex:1, height:4, background:"rgba(46,18,74,0.06)", borderRadius:999, overflow:"hidden" }}>
                    <div style={{ height:"100%", width: inView ? "18%" : "0%", background:`linear-gradient(90deg,${A},#c084fc)`, borderRadius:999, transition:"width 1.5s 1.5s cubic-bezier(0.4,0,0.2,1)", boxShadow:`0 0 8px ${A}60` }} />
                  </div>
                  <span style={{ fontFamily:"var(--font-heading)", fontSize:"0.95rem", fontWeight:700, color:A, whiteSpace:"nowrap" as const }}>12ms</span>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, height:2, width: hov==="net" ? "100%" : "0%", background:`linear-gradient(90deg,${A},#c084fc,transparent)`, transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}