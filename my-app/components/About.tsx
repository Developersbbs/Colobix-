"use client";
import { useRef, useEffect, useState } from "react";

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

/* ══════════════════════════════════════════════════
   CANVAS — Data-center network topology animation
   Nodes = servers; edges = live traffic; packets fly
   ══════════════════════════════════════════════════ */
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    /* ── resize to container ── */
    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const ctx = canvas.getContext("2d")!;

    /* ── static node layout (% of canvas size) ── */
    const nodeDefs = [
      // Core switches
      { xr: 0.50, yr: 0.50, role: "core",   label: "CORE-01" },
      { xr: 0.50, yr: 0.28, role: "core",   label: "CORE-02" },
      // Edge / distribution
      { xr: 0.22, yr: 0.38, role: "edge",   label: "EDGE-A" },
      { xr: 0.78, yr: 0.38, role: "edge",   label: "EDGE-B" },
      { xr: 0.22, yr: 0.65, role: "edge",   label: "EDGE-C" },
      { xr: 0.78, yr: 0.65, role: "edge",   label: "EDGE-D" },
      // Servers
      { xr: 0.10, yr: 0.25, role: "server", label: "SRV-01" },
      { xr: 0.36, yr: 0.18, role: "server", label: "SRV-02" },
      { xr: 0.64, yr: 0.18, role: "server", label: "SRV-03" },
      { xr: 0.90, yr: 0.25, role: "server", label: "SRV-04" },
      { xr: 0.10, yr: 0.78, role: "server", label: "SRV-05" },
      { xr: 0.36, yr: 0.84, role: "server", label: "SRV-06" },
      { xr: 0.64, yr: 0.84, role: "server", label: "SRV-07" },
      { xr: 0.90, yr: 0.78, role: "server", label: "SRV-08" },
    ];

    /* ── edges ── */
    const edges = [
      [0,1],[0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],
      [2,6],[2,7],[2,4],
      [3,8],[3,9],[3,5],
      [4,10],[4,11],
      [5,12],[5,13],
    ];

    /* ── packets ── */
    interface Packet { from:number; to:number; prog:number; speed:number; color:string }
    const packets: Packet[] = [];
    const COLORS = ["rgba(139,47,201,0.9)","rgba(99,102,241,0.9)","rgba(168,85,247,0.8)"];
    const addPacket = () => {
      const ei = Math.floor(Math.random() * edges.length);
      const [a,b] = edges[ei];
      const fwd = Math.random() > 0.5;
      packets.push({ from: fwd?a:b, to: fwd?b:a, prog:0, speed: 0.008+Math.random()*0.01, color: COLORS[Math.floor(Math.random()*COLORS.length)] });
    };
    for(let i=0;i<6;i++) addPacket();

    let t = 0;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);

      /* ── compute node pixel positions ── */
      const nodes = nodeDefs.map(n => ({ ...n, x: n.xr*W, y: n.yr*H }));

      /* ── subtle grid ── */
      ctx.strokeStyle = "rgba(124,58,237,0.04)";
      ctx.lineWidth = 1;
      const gStep = Math.min(W,H) / 8;
      for(let x=0;x<W;x+=gStep){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for(let y=0;y<H;y+=gStep){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* ── edges ── */
      edges.forEach(([ai,bi]) => {
        const a = nodes[ai], b = nodes[bi];
        const grad = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
        grad.addColorStop(0,"rgba(139,47,201,0.15)");
        grad.addColorStop(0.5,"rgba(99,102,241,0.2)");
        grad.addColorStop(1,"rgba(139,47,201,0.15)");
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke();
      });

      /* ── packets ── */
      for(let pi=packets.length-1; pi>=0; pi--) {
        const pk = packets[pi];
        pk.prog += pk.speed;
        if(pk.prog>=1){ packets.splice(pi,1); addPacket(); continue; }
        const a = nodes[pk.from], b = nodes[pk.to];
        const x = a.x + (b.x-a.x)*pk.prog;
        const y = a.y + (b.y-a.y)*pk.prog;
        /* trail */
        for(let tr=1;tr<=4;tr++){
          const tp = Math.max(0,pk.prog - tr*0.025);
          const tx = a.x + (b.x-a.x)*tp;
          const ty = a.y + (b.y-a.y)*tp;
          ctx.beginPath(); ctx.arc(tx,ty, 2.5-tr*0.4, 0, Math.PI*2);
          ctx.fillStyle = pk.color.replace("0.9",`${0.18-tr*0.04}`); ctx.fill();
        }
        /* dot */
        ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2);
        ctx.fillStyle = pk.color; ctx.shadowColor=pk.color; ctx.shadowBlur=8; ctx.fill();
        ctx.shadowBlur=0;
      }

      /* ── nodes ── */
      nodes.forEach((n,i) => {
        const pulse = 0.5+0.5*Math.sin(t*0.035 + i*0.7);
        const isCore = n.role==="core";
        const isEdge = n.role==="edge";
        const r = isCore ? 10 : isEdge ? 7 : 5;
        const glowR = r + 4 + pulse*5;

        /* glow ring */
        const grd = ctx.createRadialGradient(n.x,n.y,r,n.x,n.y,glowR);
        grd.addColorStop(0,`rgba(139,47,201,${isCore?0.25:0.12})`);
        grd.addColorStop(1,"rgba(139,47,201,0)");
        ctx.beginPath(); ctx.arc(n.x,n.y,glowR,0,Math.PI*2);
        ctx.fillStyle=grd; ctx.fill();

        /* node fill */
        const nGrd = ctx.createRadialGradient(n.x-r*0.3,n.y-r*0.3,0,n.x,n.y,r);
        if(isCore){
          nGrd.addColorStop(0,"#a855f7");
          nGrd.addColorStop(1,"#7c3aed");
        } else if(isEdge){
          nGrd.addColorStop(0,"rgba(250,247,253,0.98)");
          nGrd.addColorStop(1,"rgba(240,232,255,0.9)");
        } else {
          nGrd.addColorStop(0,"rgba(250,247,253,0.9)");
          nGrd.addColorStop(1,"rgba(245,240,255,0.8)");
        }
        ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
        ctx.fillStyle=nGrd; ctx.fill();

        /* border */
        ctx.strokeStyle = isCore ? "rgba(168,85,247,0.8)" : "rgba(124,58,237,0.35)";
        ctx.lineWidth = isCore ? 1.5 : 1;
        ctx.stroke();

        /* inner dot for edge/server */
        if(!isCore){
          ctx.beginPath(); ctx.arc(n.x,n.y,r*0.38,0,Math.PI*2);
          ctx.fillStyle=isEdge?"#8B2FC9":"rgba(139,47,201,0.5)"; ctx.fill();
        }

        /* label */
        ctx.font = `bold ${isCore?9:7.5}px monospace`;
        ctx.fillStyle = isCore?"rgba(255,255,255,0.9)":"rgba(46,18,74,0.55)";
        ctx.textAlign="center";
        ctx.fillText(n.label, n.x, n.y + r + 10);
      });

      t++;
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frameRef.current); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} style={{ position:"absolute", inset:0 }}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Hand-crafted SVG icons
   ══════════════════════════════════════════════════ */
const IconUptime = ({ size=22, color="currentColor" }:{size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.5"/>
    <line x1="12" y1="12" x2="12" y2="7.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="15.5" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.2" fill={color}/>
    <path d="M5.5 18 Q3.5 16 3.5 12" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.4"/>
  </svg>
);
const IconNetwork = ({ size=22, color="currentColor" }:{size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5"  r="2.2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4"/>
    <circle cx="5"  cy="18" r="2.2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4"/>
    <circle cx="19" cy="18" r="2.2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4"/>
    <line x1="12" y1="7.2" x2="5.8"  y2="15.8" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="12" y1="7.2" x2="18.2" y2="15.8" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="7.2" y1="18" x2="16.8" y2="18"   stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconShield = ({ size=22, color="currentColor" }:{size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5 L20 6 V12.5 C20 16.8 16.4 20.5 12 22 C7.6 20.5 4 16.8 4 12.5 V6 Z"
      fill={color} fillOpacity="0.09" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <polyline points="8.5,12 11,14.5 15.5,10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSupport = ({ size=22, color="currentColor" }:{size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4.5 14 V12 C4.5 7.86 7.86 4.5 12 4.5 C16.14 4.5 19.5 7.86 19.5 12 V14"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <rect x="3" y="13.5" width="3" height="5" rx="1.5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4"/>
    <rect x="18" y="13.5" width="3" height="5" rx="1.5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4"/>
    <path d="M21 18.5 C21 20 19.5 21 18 21 H14.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <circle cx="14.5" cy="21" r="1" fill={color}/>
  </svg>
);

/* small versions for floating tags */
const IcoUptimeSm = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8"/>
    <line x1="12" y1="12" x2="12" y2="7.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="15.5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.2" fill={color}/>
  </svg>
);
const IcoNetworkSm = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5"  r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6"/>
    <circle cx="5"  cy="18" r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6"/>
    <circle cx="19" cy="18" r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6"/>
    <line x1="12" y1="7.5" x2="5.8"  y2="15.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="12" y1="7.5" x2="18.2" y2="15.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="7.5" y1="18" x2="16.5" y2="18"   stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IcoShieldSm = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5 L20 6 V12.5 C20 16.8 16.4 20.5 12 22 C7.6 20.5 4 16.8 4 12.5 V6 Z"
      fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    <polyline points="8.5,12 11,14.5 15.5,10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* feature icons */
const FiPerf = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <polyline points="13,2 6,13 12,13 11,22 18,11 12,11" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);
const FiLock = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2.5" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8 11 V8 C8 5.24 16 5.24 16 8 V11" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    <circle cx="12" cy="16" r="1.4" fill={color}/>
  </svg>
);
const FiServer = ({color="#7c3aed"}:{color?:string}) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4"  width="18" height="5" rx="1.5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
    <rect x="3" y="11" width="18" height="5" rx="1.5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5"  r="1" fill={color}/>
    <circle cx="17.5" cy="13.5" r="1" fill={color}/>
    <line x1="6" y1="6.5"  x2="13" y2="6.5"  stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="6" y1="13.5" x2="13" y2="13.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

/* ── data ── */
const stats = [
  { value:"99.9%", label:"Uptime SLA",     icon:<IconUptime  size={20} color="#7c3aed"/> },
  { value:"40+",   label:"Global PoPs",    icon:<IconNetwork size={20} color="#7c3aed"/> },
  { value:"2Tbps", label:"DDoS Cap",       icon:<IconShield  size={20} color="#7c3aed"/> },
  { value:"24/7",  label:"Expert Support", icon:<IconSupport size={20} color="#7c3aed"/> },
];
const milestones = [
  { icon:<FiPerf/>,   title:"Blazing Performance",     desc:"Anycast routing and NVMe-backed infrastructure deliver sub-10 ms response times from any location on the globe." },
  { icon:<FiLock/>,   title:"Enterprise Security",     desc:"Always-on DDoS mitigation, WAF, and full-tunnel TLS encryption protect your workloads automatically, with zero config." },
  // { icon:<FiServer/>, title:"Flexible Infrastructure", desc:"From shared hosting to bare-metal dedicated servers and managed Kubernetes — scale resources up or down in seconds." },
];

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */
export default function About() {
  const { ref, inView } = useInView();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number|null>(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (inView) { const t = setTimeout(() => setLineWidth(100), 400); return () => clearTimeout(t); }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background:"linear-gradient(135deg,#ffffff 0%,#f8f2ff 35%,#f2e8ff 65%,#ede2fc 100%)",
        borderTop:"1px solid rgba(124,58,237,0.08)",
        position:"relative", overflow:"hidden",
        display:"flex", alignItems:"center",
      }}
    >
      <style>{`
        @keyframes abt-fadeUp    { from{opacity:0;transform:translateY(50px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes abt-fadeLeft  { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes abt-fadeRight { from{opacity:0;transform:translateX(60px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes abt-scaleIn   { from{opacity:0;transform:scale(0.85)}       to{opacity:1;transform:scale(1)} }
        @keyframes abt-blurUp    { from{opacity:0;filter:blur(14px);transform:translateY(30px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
        @keyframes abt-orbA      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(35px,-40px) scale(1.08)} }
        @keyframes abt-orbB      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-22px)} }
        @keyframes abt-tagFloat  { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-7px) rotate(-1.5deg)} }
        @keyframes abt-tagFloat2 { 0%,100%{transform:translateY(0) rotate(1.5deg)}  50%{transform:translateY(-9px) rotate(1.5deg)} }
        @keyframes abt-tagFloat3 { 0%,100%{transform:translateY(0) rotate(-1deg)}   50%{transform:translateY(-5px) rotate(-1deg)} }
        @keyframes abt-shimmer   { 0%{left:-100%} 100%{left:200%} }
        @keyframes abt-scanLine  { 0%{top:0%;opacity:0.6} 100%{top:100%;opacity:0} }

        .abt-cta {
          transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          position:relative; overflow:hidden;
        }
        .abt-cta:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 14px 40px rgba(124,58,237,0.45) !important; }
        .abt-cta::after { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:skewX(-14deg); }
        .abt-cta:hover::after { animation:abt-shimmer 0.65s ease forwards; }

        .abt-stat-card { transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .abt-stat-card:hover { transform:translateY(-6px) scale(1.03) !important; }

        /* ── layout ── */
        .abt-outer  { max-width:1280px; margin:0 auto; padding:5rem 5%; width:100%; position:relative; zIndex:1; }
        .abt-grid   { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
        .abt-right  { display:flex; flex-direction:column; gap:16px; min-width:0; }
        .abt-canvas-wrap {
          position:relative; border-radius:20px; overflow:hidden;
          border:1px solid rgba(124,58,237,0.13);
          background:linear-gradient(145deg,#fdfbff,#f5f0ff,#ede8fb);
          box-shadow:0 20px 60px rgba(124,58,237,0.1);
          aspect-ratio: 1 / 0.72;
          width:100%;
        }
        .abt-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }

        @media (max-width:900px) {
          .abt-outer  { padding:3.5rem 5% 4rem; }
          .abt-grid   { grid-template-columns:1fr; gap:2.5rem; }
          .abt-right  { display:none; }   /* hide on mobile — left col is enough */
        }
        @media (max-width:540px) {
          .abt-cta-row { flex-direction:column !important; }
          .abt-cta-row a { width:100%; justify-content:center !important; }
        }
      `}</style>

      {/* aurora orbs */}
      <div style={{position:"absolute",top:-120,right:-80,width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,0.1),transparent 70%)",filter:"blur(55px)",animation:"abt-orbA 16s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"absolute",bottom:-100,left:-60,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.08),transparent 70%)",filter:"blur(50px)",animation:"abt-orbB 12s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>

      <div ref={ref} className="abt-outer">

        {/* SECTION LABEL */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:isMobile?36:56,animation:inView?"abt-blurUp 0.9s 0s both cubic-bezier(0.16,1,0.3,1)":"none",opacity:inView?undefined:0}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.35),transparent)",flex:1}}/>
          <span style={{color:"#7c3aed",fontSize:10,fontWeight:700,textTransform:"uppercase" as const,letterSpacing:"0.22em",whiteSpace:"nowrap" as const}}>✦ About Our Hosting ✦</span>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.35),transparent)",flex:1}}/>
        </div>

        {/* MAIN GRID */}
        <div className="abt-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Heading */}
            <div style={{marginBottom:28}}>
              <h2 style={{
                fontSize:"clamp(2rem,4.5vw,3.8rem)", fontWeight:800,
                color:"#12002e", fontFamily:"var(--font-heading)",
                lineHeight:1.06, letterSpacing:"-0.04em", margin:0,
                animation:inView?"abt-fadeLeft 0.9s 0.12s both cubic-bezier(0.16,1,0.3,1)":"none",
                opacity:inView?undefined:0,
              }}>
                We build the<br/>
                <span style={{background:"linear-gradient(135deg,#2E124A 0%,#8B2FC9 50%,#6366F1 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>backbone</span><br/>
                of the internet
              </h2>
              {/* animated underline */}
              <div style={{height:3,background:"rgba(124,58,237,0.09)",borderRadius:99,marginTop:20,overflow:"hidden",maxWidth:280}}>
                <div style={{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",width:`${lineWidth}%`,transition:"width 1.3s 0.4s cubic-bezier(0.16,1,0.3,1)",boxShadow:"0 0 10px rgba(139,47,201,0.45)"}}/>
              </div>
            </div>

            {/* Body */}
            <p style={{color:"#5b4d7a",lineHeight:1.75,marginBottom:36,maxWidth:440,fontSize:"0.875rem",fontWeight:300,animation:inView?"abt-fadeUp 0.9s 0.22s both cubic-bezier(0.16,1,0.3,1)":"none",opacity:inView?undefined:0}}>
              Colobix delivers enterprise-grade hosting with simplicity. From bare-metal to fully managed cloud, every plan is engineered for performance, security, and reliability — at any scale.
            </p>

            {/* FEATURE LIST */}
            <div style={{marginBottom:36,animation:inView?"abt-fadeUp 0.9s 0.34s both cubic-bezier(0.16,1,0.3,1)":"none",opacity:inView?undefined:0}}>
              <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase" as const,letterSpacing:"0.2em",color:"#9d88c0",marginBottom:20}}>What We Offer</p>
              <div style={{position:"relative"}}>
                {/* vertical line */}
                <div style={{position:"absolute",left:9,top:6,bottom:6,width:1.5,background:"rgba(124,58,237,0.13)",borderRadius:99,overflow:"hidden",pointerEvents:"none"}}>
                  <div style={{width:"100%",background:"linear-gradient(180deg,#7c3aed,#a855f7)",height:inView?"100%":"0%",transition:"height 1.6s 0.5s cubic-bezier(0.16,1,0.3,1)"}}/>
                </div>
                {milestones.map((m,i) => (
                  <div key={m.title} style={{position:"relative",display:"flex",gap:18,alignItems:"flex-start",paddingLeft:30,marginBottom:i<milestones.length-1?24:0,opacity:inView?1:0,transition:`opacity 0.5s ${0.6+i*0.12}s`}}>
                    {/* dot */}
                    <div style={{position:"absolute",left:3,top:4,width:13,height:13,borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,58,237,0.18),rgba(168,85,247,0.12))",border:"1.5px solid rgba(124,58,237,0.32)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <div style={{width:4.5,height:4.5,borderRadius:"50%",background:"#7c3aed"}}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        {/* icon badge */}
                        <div style={{width:21,height:21,borderRadius:6,background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.16)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {m.icon}
                        </div>
                        <span style={{fontWeight:700,fontSize:"0.88rem",color:"#12002e",fontFamily:"var(--font-heading)"}}>{m.title}</span>
                      </div>
                      <p style={{fontSize:"0.8rem",color:"#5b4d7a",lineHeight:1.72,margin:0}}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="abt-cta-row" style={{display:"flex",gap:12,flexWrap:"wrap" as const,animation:inView?"abt-fadeUp 0.9s 0.48s both cubic-bezier(0.16,1,0.3,1)":"none",opacity:inView?undefined:0}}>
              <a href="#features" className="abt-cta" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"13px 28px",borderRadius:12,fontSize:"0.875rem",textDecoration:"none",background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)",color:"#fff",fontWeight:700,boxShadow:"0 5px 24px rgba(124,58,237,0.32)",letterSpacing:"0.01em"}}>
                Explore Features
                <svg style={{width:15,height:15}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"13px 28px",borderRadius:12,fontSize:"0.875rem",textDecoration:"none",fontWeight:600,color:"#7c3aed",background:"rgba(124,58,237,0.07)",border:"1.5px solid rgba(124,58,237,0.2)",transition:"all 0.28s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.12)";e.currentTarget.style.borderColor="rgba(124,58,237,0.4)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(124,58,237,0.07)";e.currentTarget.style.borderColor="rgba(124,58,237,0.2)";e.currentTarget.style.transform="translateY(0)";}}>
                Talk to Sales
              </a>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="abt-right" style={{animation:inView?"abt-fadeRight 0.9s 0.25s both cubic-bezier(0.16,1,0.3,1)":"none",opacity:inView?undefined:0}}>

            {/* CANVAS — network topology */}
            <div className="abt-canvas-wrap">
              {/* top accent bar */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"linear-gradient(90deg,transparent,#8B2FC9,#6366F1,transparent)",zIndex:5}}/>
              {/* scan line */}
              <div style={{position:"absolute",left:0,right:0,height:1.5,background:"linear-gradient(90deg,transparent,rgba(139,47,201,0.4),transparent)",zIndex:6,animation:"abt-scanLine 3.5s linear infinite",pointerEvents:"none"}}/>

              <NetworkCanvas/>

              {/* Floating tags */}
              {[
                {label:"99.9% Uptime",   icon:<IcoUptimeSm/>,  st:{top:"8%",  left:"5%",  animation:"abt-tagFloat  4s ease-in-out infinite"}},
                {label:"Global CDN",     icon:<IcoNetworkSm/>, st:{top:"7%",  right:"5%", animation:"abt-tagFloat2 5s ease-in-out infinite"}},
                {label:"DDoS Protected", icon:<IcoShieldSm/>,  st:{bottom:"10%",left:"5%",animation:"abt-tagFloat3 3.8s ease-in-out infinite"}},
              ].map(tag=>(
                <div key={tag.label} style={{position:"absolute",...tag.st as any,display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:10,padding:"6px 12px",fontSize:10,fontWeight:700,color:"#2E124A",boxShadow:"0 4px 16px rgba(124,58,237,0.1)",whiteSpace:"nowrap" as const,zIndex:10}}>
                  {tag.icon}{tag.label}
                </div>
              ))}

              {/* live badge */}
              <div style={{position:"absolute",bottom:"9%",right:"5%",zIndex:10,display:"flex",alignItems:"center",gap:6,padding:"5px 11px",borderRadius:99,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(124,58,237,0.14)",boxShadow:"0 2px 12px rgba(124,58,237,0.08)"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 0 2.5px rgba(34,197,94,0.25),0 0 8px #22c55e"}}/>
                <span style={{fontSize:9,fontFamily:"monospace",fontWeight:700,color:"rgba(46,18,74,0.65)",letterSpacing:"0.15em"}}>NETWORK LIVE</span>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="abt-stat-grid">
              {stats.map((s,i)=>(
                <div key={s.label} className="abt-stat-card"
                  onMouseEnter={()=>setHoveredStat(i)}
                  onMouseLeave={()=>setHoveredStat(null)}
                  style={{
                    padding:"16px 18px", borderRadius:16,
                    background:hoveredStat===i?"#fff":"rgba(255,255,255,0.72)",
                    border:`1px solid ${hoveredStat===i?"rgba(124,58,237,0.28)":"rgba(124,58,237,0.1)"}`,
                    backdropFilter:"blur(10px)",
                    boxShadow:hoveredStat===i?"0 10px 30px rgba(124,58,237,0.13)":"0 2px 10px rgba(124,58,237,0.05)",
                    animation:inView?`abt-scaleIn 0.7s ${0.45+i*0.1}s both cubic-bezier(0.34,1.56,0.64,1)`:"none",
                    opacity:inView?undefined:0,
                    position:"relative", overflow:"hidden",
                  }}>
                  <div style={{position:"absolute",top:0,right:0,width:50,height:50,background:"radial-gradient(circle at top right,rgba(124,58,237,0.09),transparent 70%)",opacity:hoveredStat===i?1:0,transition:"opacity 0.3s",pointerEvents:"none"}}/>
                  <div style={{marginBottom:8}}>{s.icon}</div>
                  <div style={{fontSize:"1.45rem",fontWeight:800,color:"#12002e",fontFamily:"var(--font-heading)",letterSpacing:"-0.03em",lineHeight:1}}>{s.value}</div>
                  <div style={{fontSize:10,color:"#9d88c0",marginTop:4,fontWeight:600,textTransform:"uppercase" as const,letterSpacing:"0.1em"}}>{s.label}</div>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#7c3aed,#a855f7,transparent)",transform:hoveredStat===i?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform 0.38s cubic-bezier(0.16,1,0.3,1)"}}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}