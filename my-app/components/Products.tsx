"use client";
import { useState, useEffect, useRef } from "react";

const P = "#2E124A";
const A = "#8B2FC9";
const AL = "#C4A8E0";

/* ─── Hand-crafted SVG tab icons ─── */
const IcoVPS = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="6" width="12" height="12" rx="2" fill={active ? "rgba(255,255,255,0.25)" : "rgba(46,18,74,0.08)"} stroke={active ? "#fff" : P} strokeWidth="1.5" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill={active ? "rgba(255,255,255,0.35)" : "rgba(46,18,74,0.15)"} />
    <line x1="2" y1="9"  x2="6" y2="9"  stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="2" y1="12" x2="6" y2="12" stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="2" y1="15" x2="6" y2="15" stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="18" y1="9"  x2="22" y2="9"  stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="18" y1="12" x2="22" y2="12" stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="18" y1="15" x2="22" y2="15" stroke={active ? "#fff" : P} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IcoCloud = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 16 C3.2 16 1 13.8 1 11 C1 8.4 2.9 6.2 5.4 5.8 C5.7 3.1 8 1 10.8 1 C13.3 1 15.4 2.6 16.2 4.8 C16.8 4.6 17.4 4.5 18 4.5 C20.5 4.5 22.5 6.5 22.5 9 C22.5 11.5 20.5 13.5 18 13.5 H6Z"
      fill={active ? "rgba(255,255,255,0.2)" : "rgba(46,18,74,0.06)"} stroke={active ? "#fff" : P} strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="8"  y1="19" x2="8"  y2="16" stroke={active ? "#fff" : A} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="16" stroke={active ? "#fff" : A} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="16" y1="19" x2="16" y2="16" stroke={active ? "#fff" : A} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IcoDedicated = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4"  width="20" height="5.5" rx="1.5" fill={active ? "rgba(255,255,255,0.2)" : "rgba(46,18,74,0.06)"} stroke={active ? "#fff" : P} strokeWidth="1.4" />
    <rect x="2" y="12" width="20" height="5.5" rx="1.5" fill={active ? "rgba(255,255,255,0.2)" : "rgba(46,18,74,0.06)"} stroke={active ? "#fff" : P} strokeWidth="1.4" />
    <rect x="5"  y="5.5" width="3.5" height="2.5" rx="0.5" fill={active ? "rgba(255,255,255,0.4)" : "rgba(46,18,74,0.18)"} />
    <rect x="9.5" y="5.5" width="3.5" height="2.5" rx="0.5" fill={active ? "rgba(255,255,255,0.4)" : "rgba(46,18,74,0.18)"} />
    <rect x="5"  y="13.5" width="3.5" height="2.5" rx="0.5" fill={active ? "rgba(255,255,255,0.4)" : "rgba(46,18,74,0.18)"} />
    <rect x="9.5" y="13.5" width="3.5" height="2.5" rx="0.5" fill={active ? "rgba(255,255,255,0.4)" : "rgba(46,18,74,0.18)"} />
    <circle cx="18.5" cy="6.75"  r="1" fill={active ? "#fff" : A} />
    <circle cx="18.5" cy="14.75" r="1" fill={active ? "#fff" : A} />
  </svg>
);

const IcoShared = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M2 6 C2 4.9 2.9 4 4 4 H9 L11 6.5 H20 C21.1 6.5 22 7.4 22 8.5 V18 C22 19.1 21.1 20 20 20 H4 C2.9 20 2 19.1 2 18 Z"
      fill={active ? "rgba(255,255,255,0.18)" : "rgba(46,18,74,0.06)"} stroke={active ? "#fff" : P} strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="12" y1="10" x2="12" y2="16" stroke={active ? "#fff" : A} strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="9.5,12.5 12,10 14.5,12.5" stroke={active ? "#fff" : A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoWebsite = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="17" rx="2.5" fill={active ? "rgba(255,255,255,0.15)" : "rgba(46,18,74,0.06)"} stroke={active ? "#fff" : P} strokeWidth="1.5" />
    <line x1="2" y1="8" x2="22" y2="8" stroke={active ? "#fff" : P} strokeWidth="1.3" />
    <circle cx="5.5"  cy="5.5" r="1" fill={active ? "#fff" : "rgba(46,18,74,0.3)"} />
    <circle cx="8.5"  cy="5.5" r="1" fill={active ? "#fff" : "rgba(46,18,74,0.3)"} />
    <circle cx="11.5" cy="5.5" r="1" fill={active ? "#fff" : "rgba(46,18,74,0.3)"} />
    <polyline points="13,10.5 10,15 12.5,15 11,20 15,14.5 12.5,14.5"
      fill={active ? "rgba(255,255,255,0.3)" : "rgba(139,47,201,0.2)"}
      stroke={active ? "#fff" : A} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const products = [
  { id: "vps",       label: "VPS Servers",       Icon: IcoVPS,       tagline: "Dedicated power, cloud flexibility",  desc: "Get the perfect balance between dedicated resources and cloud scalability. Our VPS servers deliver guaranteed CPU, RAM, and NVMe storage — fully isolated, fully yours.", specs: ["Up to 32 vCPU cores", "Up to 128 GB RAM", "NVMe SSD storage", "Instant provisioning"] },
  { id: "cloud",     label: "Cloud Servers",      Icon: IcoCloud,     tagline: "Elastic compute at any scale",        desc: "Deploy cloud instances across multiple availability zones in minutes. Auto-scaling, load balancing, and pay-as-you-go pricing make Colobix cloud the smartest choice.", specs: ["Multi-zone redundancy", "Auto-scaling groups", "S3-compatible storage", "99.99% availability"] },
  { id: "dedicated", label: "Dedicated Servers",  Icon: IcoDedicated, tagline: "Raw bare-metal performance",          desc: "No hypervisor overhead. No noisy neighbours. Pure bare-metal power with Intel Xeon or AMD EPYC processors, enterprise NVMe arrays and 10 GbE uplinks.", specs: ["Intel Xeon / AMD EPYC", "10 GbE network uplink", "RAID-10 NVMe arrays", "Full IPMI / KVM access"] },
  { id: "shared",    label: "Shared Hosting",     Icon: IcoShared,    tagline: "The easiest way to go live",         desc: "Launch your website in minutes with cPanel, one-click WordPress, and free SSL included. Perfect for blogs, portfolios, and small business sites.", specs: ["Free SSL certificate", "One-click WordPress", "Daily backups", "99.9% uptime SLA"] },
  { id: "website",   label: "Website Hosting",    Icon: IcoWebsite,   tagline: "Optimised for the modern web",       desc: "Purpose-built for speed. LiteSpeed web server, built-in CDN, and smart caching deliver sub-second page loads globally for every visitor.", specs: ["LiteSpeed web server", "Global CDN included", "Smart caching engine", "PHP 8.x / Node.js"] },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}
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

/* ══ VPS Animation ══ */
function VpsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState({ cpu: 62, ram: 47, disk: 31, net: 78 });
  const histRef = useRef<number[]>(Array(40).fill(50));
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const metricTimer = setInterval(() => {
      setMetrics(prev => ({
        cpu:  Math.max(10, Math.min(95, prev.cpu  + (Math.random() - 0.5) * 14)),
        ram:  Math.max(20, Math.min(90, prev.ram  + (Math.random() - 0.5) * 8)),
        disk: Math.max(10, Math.min(70, prev.disk + (Math.random() - 0.5) * 4)),
        net:  Math.max(15, Math.min(98, prev.net  + (Math.random() - 0.5) * 18)),
      }));
    }, 900);

    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let val = 60;

    const draw = () => {
      val = Math.max(10, Math.min(95, val + (Math.random() - 0.49) * 6));
      histRef.current = [...histRef.current.slice(1), val];
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(46,18,74,0.06)"; ctx.lineWidth = 1;
      for (let y = 0; y <= 4; y++) { ctx.beginPath(); ctx.moveTo(0, (y/4)*H); ctx.lineTo(W, (y/4)*H); ctx.stroke(); }
      const pts = histRef.current;
      const step = W / (pts.length - 1);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(139,47,201,0.18)"); grad.addColorStop(1, "rgba(139,47,201,0)");
      ctx.beginPath(); ctx.moveTo(0, H);
      pts.forEach((v, i) => ctx.lineTo(i * step, H - (v / 100) * H));
      ctx.lineTo((pts.length - 1) * step, H); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.strokeStyle = A; ctx.lineWidth = 2; ctx.lineJoin = "round";
      pts.forEach((v, i) => { const x = i * step, y = H - (v/100)*H; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.stroke();
      const lx = (pts.length-1)*step, ly = H - (pts[pts.length-1]/100)*H;
      ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI*2);
      ctx.fillStyle = A; ctx.shadowColor = A; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { clearInterval(metricTimer); cancelAnimationFrame(frameRef.current); };
  }, []);

  const gauges = [
    { label: "CPU", value: metrics.cpu, color: A },
    { label: "RAM", value: metrics.ram, color: "#6366F1" },
    { label: "DISK", value: metrics.disk, color: "#7c3aed" },
    { label: "NET", value: metrics.net, color: "#a855f7" },
  ];

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"68px 24px 24px", boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:500, display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid rgba(46,18,74,0.1)", background:"rgba(250,247,253,0.95)", padding:"12px 14px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.18em", color:"rgba(46,18,74,0.5)", textTransform:"uppercase" as const }}>CPU Load — Live</span>
            <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:A }}>{Math.round(metrics.cpu)}%</span>
          </div>
          <canvas ref={canvasRef} width={320} height={110} style={{ width:"100%", height:110, display:"block" }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {gauges.map(g => (
            <div key={g.label} style={{ borderRadius:12, border:"1px solid rgba(46,18,74,0.08)", background:"rgba(250,247,253,0.9)", padding:"10px 12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:"rgba(46,18,74,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>{g.label}</span>
                <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:g.color }}>{Math.round(g.value)}%</span>
              </div>
              <div style={{ height:5, borderRadius:99, background:"rgba(46,18,74,0.07)", overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${g.value}%`, borderRadius:99, background:g.color, boxShadow:`0 0 8px ${g.color}60`, transition:"width 0.8s ease-out" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["vps-01","#22c55e","running"],["vps-02","#f59e0b","updating"],["vps-03","#22c55e","running"]].map(([id,c,s]) => (
            <div key={id} style={{ flex:1, borderRadius:10, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.9)", padding:"7px 10px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:3 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:c, boxShadow:`0 0 6px ${c}` }} />
                <span style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, color:P }}>{id}</span>
              </div>
              <span style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ Cloud Animation ══ */
function CloudAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const pops = [
    { label:"SIN", x:0.76, y:0.62 }, { label:"LHR", x:0.46, y:0.28 },
    { label:"JFK", x:0.23, y:0.33 }, { label:"FRA", x:0.50, y:0.27 },
    { label:"SYD", x:0.84, y:0.78 }, { label:"NRT", x:0.84, y:0.36 },
    { label:"DXB", x:0.64, y:0.46 }, { label:"GRU", x:0.30, y:0.72 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    const packets: { from:number; to:number; progress:number; speed:number }[] = [];
    const addPacket = () => {
      const from = Math.floor(Math.random() * pops.length);
      let to = Math.floor(Math.random() * pops.length);
      while (to === from) to = Math.floor(Math.random() * pops.length);
      packets.push({ from, to, progress:0, speed:0.008+Math.random()*0.006 });
    };
    for (let i = 0; i < 3; i++) addPacket();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(46,18,74,0.04)";
      [[0.18,0.36,0.10,0.14,-0.2],[0.49,0.30,0.07,0.08,0],[0.50,0.58,0.08,0.14,0.1],
       [0.74,0.38,0.14,0.14,0],[0.28,0.68,0.07,0.12,0.1],[0.84,0.76,0.07,0.06,0]
      ].forEach(([cx,cy,rx,ry,rot]) => {
        ctx.beginPath(); ctx.ellipse(cx*W, cy*H, rx*W, ry*H, rot, 0, Math.PI*2); ctx.fill();
      });
      pops.forEach((a, ai) => pops.forEach((b, bi) => {
        if (bi <= ai) return;
        const ax=a.x*W, ay=a.y*H, bx=b.x*W, by=b.y*H;
        const mx=(ax+bx)/2, my=(ay+by)/2 - Math.abs(bx-ax)*0.12;
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.quadraticCurveTo(mx,my,bx,by);
        ctx.strokeStyle="rgba(139,47,201,0.08)"; ctx.lineWidth=1; ctx.stroke();
      }));
      for (let pi = packets.length-1; pi >= 0; pi--) {
        const pk = packets[pi]; pk.progress += pk.speed;
        if (pk.progress >= 1) { packets.splice(pi, 1); addPacket(); continue; }
        const a=pops[pk.from], b=pops[pk.to];
        const ax=a.x*W, ay=a.y*H, bx=b.x*W, by=b.y*H;
        const mx=(ax+bx)/2, my=(ay+by)/2 - Math.abs(bx-ax)*0.12;
        const p=pk.progress;
        const x=(1-p)*(1-p)*ax + 2*(1-p)*p*mx + p*p*bx;
        const y=(1-p)*(1-p)*ay + 2*(1-p)*p*my + p*p*by;
        const grd=ctx.createRadialGradient(x,y,0,x,y,6);
        grd.addColorStop(0,"rgba(168,85,247,0.9)"); grd.addColorStop(1,"rgba(168,85,247,0)");
        ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill();
        ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
      }
      pops.forEach((pop, i) => {
        const x=pop.x*W, y=pop.y*H;
        const pulse=0.5+0.5*Math.sin(t*0.04+i*1.1);
        ctx.beginPath(); ctx.arc(x,y,8+pulse*3,0,Math.PI*2);
        ctx.fillStyle=`rgba(139,47,201,${0.05+pulse*0.05})`; ctx.fill();
        ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2);
        ctx.fillStyle="rgba(250,247,253,0.95)"; ctx.strokeStyle=A; ctx.lineWidth=1.5; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fillStyle=A; ctx.fill();
        ctx.font="bold 8px monospace"; ctx.fillStyle="rgba(46,18,74,0.7)"; ctx.textAlign="center";
        ctx.fillText(pop.label, x, y+16);
      });
      t++; frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"68px 24px 24px", boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:500 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:"rgba(46,18,74,0.45)", letterSpacing:"0.18em", textTransform:"uppercase" as const }}>Global Edge Network</span>
          <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:"#22c55e", background:"rgba(34,197,94,0.1)", padding:"2px 8px", borderRadius:99, border:"1px solid rgba(34,197,94,0.3)" }}>40+ PoPs LIVE</span>
        </div>
        <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid rgba(46,18,74,0.1)", background:"linear-gradient(160deg,#FAF7FD,#F5F0FB)" }}>
          <canvas ref={canvasRef} width={360} height={280} style={{ width:"100%", height:"auto", display:"block" }} />
        </div>
        <div style={{ display:"flex", gap:8, marginTop:10 }}>
          {[["Latency","<10ms","#22c55e"],["Uptime","99.99%",A],["Zones","6 cont.","#6366F1"]].map(([k,v,c]) => (
            <div key={k} style={{ flex:1, borderRadius:10, border:"1px solid rgba(46,18,74,0.08)", background:"rgba(250,247,253,0.9)", padding:"8px 10px", textAlign:"center" }}>
              <div style={{ fontSize:11, fontWeight:800, fontFamily:"monospace", color:c as string }}>{v}</div>
              <div style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)", marginTop:2, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ Dedicated Animation ══ */
function DedicatedAnimation() {
  const [temps, setTemps] = useState([38,42,36,44,39]);
  const [power, setPower] = useState(420);
  const [activeRow, setActiveRow] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    const update = () => {
      t++;
      if (t % 40 === 0) setActiveRow(r => (r+1) % 5);
      if (t % 15 === 0) setTemps(prev => prev.map(v => Math.max(32, Math.min(55, v + (Math.random()-0.5)*3))));
      if (t % 10 === 0) setPower(p => Math.max(380, Math.min(480, p + (Math.random()-0.5)*20)));
      frameRef.current = requestAnimationFrame(update);
    };
    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const units = [
    { label:"1U — Intel Xeon E5-2690", type:"CPU" },
    { label:"1U — 10GbE Switch",       type:"NET" },
    { label:"2U — AMD EPYC 7742",      type:"CPU" },
    { label:"1U — IPMI / KVM",         type:"MGMT" },
    { label:"1U — NVMe Array x8",      type:"DISK" },
  ];
  const typeColors: Record<string,string> = { CPU:A, NET:"#22c55e", MGMT:"#f59e0b", DISK:"#6366F1" };

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"68px 24px 24px", boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:500, display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ borderRadius:14, border:"2px solid rgba(46,18,74,0.2)", background:"rgba(250,247,253,0.98)", overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,${P},${A})`, padding:"8px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.18em" }}>SERVER RACK — BAY 03</span>
            <div style={{ display:"flex", gap:4 }}>
              {[1,0,1].map((on,i) => (
                <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:on?"#22c55e":"rgba(255,255,255,0.3)", boxShadow:on?"0 0 6px #22c55e":"none" }} />
              ))}
            </div>
          </div>
          <div style={{ padding:"10px 12px", display:"flex", flexDirection:"column", gap:6 }}>
            {units.map((u, i) => {
              const isActive = activeRow === i;
              const tc = typeColors[u.type];
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, border:`1px solid ${isActive ? `${tc}50` : "rgba(46,18,74,0.08)"}`, background:isActive?`${tc}10`:"rgba(46,18,74,0.02)", transition:"all 0.5s ease-out" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", flexShrink:0, background:isActive?tc:"rgba(46,18,74,0.18)", boxShadow:isActive?`0 0 8px ${tc}`:"none", transition:"all 0.4s" }} />
                  <span style={{ fontSize:9, fontFamily:"monospace", flex:1, color:isActive?P:"rgba(46,18,74,0.45)", fontWeight:isActive?700:400, transition:"color 0.3s" }}>{u.label}</span>
                  <span style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, padding:"2px 6px", borderRadius:5, background:`${tc}18`, color:tc, border:`1px solid ${tc}40` }}>{u.type}</span>
                  <span style={{ fontSize:8, fontFamily:"monospace", color:temps[i]>48?"#f59e0b":"rgba(46,18,74,0.35)", minWidth:28, textAlign:"right" as const }}>{Math.round(temps[i])}°C</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, borderRadius:12, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.9)", padding:"10px 12px" }}>
            <div style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)", letterSpacing:"0.12em", textTransform:"uppercase" as const, marginBottom:5 }}>Power Draw</div>
            <div style={{ fontSize:18, fontWeight:800, fontFamily:"monospace", color:P, letterSpacing:"-0.03em" }}>{Math.round(power)}<span style={{ fontSize:10, fontWeight:500, color:"rgba(46,18,74,0.45)", marginLeft:2 }}>W</span></div>
            <div style={{ height:3, borderRadius:99, background:"rgba(46,18,74,0.06)", marginTop:6, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${((power-380)/100)*100}%`, background:`linear-gradient(90deg,${A},#6366F1)`, transition:"width 0.6s" }} />
            </div>
          </div>
          <div style={{ flex:1, borderRadius:12, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.9)", padding:"10px 12px" }}>
            <div style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)", letterSpacing:"0.12em", textTransform:"uppercase" as const, marginBottom:5 }}>Uplink</div>
            <div style={{ fontSize:18, fontWeight:800, fontFamily:"monospace", color:"#22c55e", letterSpacing:"-0.03em" }}>10<span style={{ fontSize:10, fontWeight:500, color:"rgba(46,18,74,0.45)", marginLeft:2 }}>GbE</span></div>
            <div style={{ display:"flex", gap:3, marginTop:6 }}>
              {Array(8).fill(0).map((_,i) => (
                <div key={i} style={{ flex:1, height:3, borderRadius:99, background:i<6?"#22c55e":"rgba(46,18,74,0.07)", boxShadow:i<6?"0 0 4px #22c55e80":"none" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ Shared Animation ══ */
function SharedAnimation() {
  const [progress, setProgress] = useState(0);
  const [deployStep, setDeployStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = ["Uploading files…","Installing WordPress…","Configuring SSL…","Going Live!"];

  useEffect(() => {
    let prog = 0;
    const iv = setInterval(() => {
      prog += 0.8; setProgress(Math.min(100, prog));
      setDeployStep(Math.floor((Math.min(100,prog)/100)*(steps.length-0.01)));
      if (prog >= 100) { setDone(true); clearInterval(iv); setTimeout(() => { setProgress(0); setDeployStep(0); setDone(false); prog=0; }, 2600); }
    }, 55);
    return () => clearInterval(iv);
  }, []);

  const files = [
    { name:"wp-config.php", icon:"⚙", color:A },
    { name:"index.php",     icon:"📄", color:"#6366F1" },
    { name:"style.css",     icon:"🎨", color:"#a855f7" },
    { name:"functions.php", icon:"🔧", color:P },
    { name:"uploads/",      icon:"📁", color:"#f59e0b" },
  ];

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"68px 24px 24px", boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:500 }}>
        <div style={{ borderRadius:14, border:"1px solid rgba(46,18,74,0.14)", overflow:"hidden", boxShadow:"0 12px 40px rgba(46,18,74,0.1)" }}>
          <div style={{ background:"linear-gradient(135deg,#FAF7FD,#F0EAFA)", padding:"9px 14px", borderBottom:"1px solid rgba(46,18,74,0.08)", display:"flex", alignItems:"center", gap:8 }}>
            {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c],i) => (
              <div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c, boxShadow:`0 0 4px ${c}` }} />
            ))}
            <div style={{ flex:1, background:"rgba(46,18,74,0.05)", border:"1px solid rgba(46,18,74,0.1)", borderRadius:6, padding:"3px 10px", fontSize:9, fontFamily:"monospace", color:"rgba(46,18,74,0.5)" }}>
              https://yoursite.colobix.com
            </div>
            {done && <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:"#22c55e" }}>✓ LIVE</span>}
          </div>
          <div style={{ background:"#fff", padding:"10px 12px" }}>
            <div style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, color:"rgba(46,18,74,0.35)", letterSpacing:"0.14em", marginBottom:8 }}>FILE MANAGER — /public_html</div>
            {files.map((f, i) => {
              const uploaded = progress > i * 20;
              return (
                <div key={f.name} style={{ display:"flex", alignItems:"center", gap:9, padding:"5px 6px", borderRadius:7, marginBottom:4, background:uploaded?`${f.color}08`:"transparent", transition:"background 0.5s" }}>
                  <span style={{ fontSize:13, opacity:uploaded?1:0.3, transition:"opacity 0.5s" }}>{f.icon}</span>
                  <span style={{ fontSize:9, fontFamily:"monospace", flex:1, color:uploaded?P:"rgba(46,18,74,0.3)", transition:"color 0.5s" }}>{f.name}</span>
                  {uploaded && <div style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ background:"rgba(250,247,253,0.98)", borderTop:"1px solid rgba(46,18,74,0.07)", padding:"10px 14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:done?"#22c55e":A }}>{steps[deployStep]}</span>
              <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, color:P }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height:6, borderRadius:99, background:"rgba(46,18,74,0.07)", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${progress}%`, borderRadius:99, background:done?"#22c55e":`linear-gradient(90deg,${P},${A},#a855f7)`, boxShadow:`0 0 10px ${done?"#22c55e80":"rgba(139,47,201,0.5)"}`, transition:"width 0.1s, background 0.5s" }} />
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" as const }}>
          {["Free SSL","1-click WP","Daily backup","cPanel"].map(tag => (
            <span key={tag} style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, padding:"4px 10px", borderRadius:99, background:"rgba(139,47,201,0.08)", border:"1px solid rgba(139,47,201,0.2)", color:A }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ Website Animation ══ */
function roundRect(ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
}

function WebsiteAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const [score, setScore] = useState(98);
  const [ttfb, setTtfb] = useState(42);

  useEffect(() => {
    const iv = setInterval(() => {
      setScore(s => Math.max(92, Math.min(100, s + Math.round((Math.random()-0.45)*2))));
      setTtfb(t => Math.max(28, Math.min(65, t + Math.round((Math.random()-0.5)*8))));
    }, 1200);

    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    const resources = [
      { name:"index.html",   start:0.00, dur:0.08, color:A },
      { name:"style.css",    start:0.08, dur:0.12, color:"#6366F1" },
      { name:"app.js",       start:0.08, dur:0.20, color:P },
      { name:"hero.webp",    start:0.18, dur:0.10, color:"#a855f7" },
      { name:"font.woff2",   start:0.22, dur:0.07, color:"#7c3aed" },
      { name:"analytics.js", start:0.28, dur:0.14, color:AL },
    ];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      const rowH = H / resources.length;
      const labelW = 80, barArea = W - labelW - 8;
      const progress = (t % 120) / 120;
      resources.forEach((r, i) => {
        const y = i * rowH;
        if (i%2===0) { ctx.fillStyle="rgba(46,18,74,0.02)"; ctx.fillRect(0,y,W,rowH); }
        ctx.font="8px monospace"; ctx.fillStyle="rgba(46,18,74,0.45)"; ctx.textAlign="left";
        ctx.fillText(r.name, 6, y+rowH/2+3);
        const bx=labelW, bw=barArea*r.dur, bstart=barArea*r.start;
        ctx.fillStyle="rgba(46,18,74,0.05)";
        roundRect(ctx, bx+bstart, y+4, bw, rowH-8, 3); ctx.fill();
        const fill=Math.max(0, Math.min(1, (progress-r.start)/r.dur));
        if (fill > 0) {
          const grad=ctx.createLinearGradient(bx+bstart,0,bx+bstart+bw,0);
          grad.addColorStop(0, r.color+"dd"); grad.addColorStop(1, r.color+"66");
          ctx.fillStyle=grad;
          roundRect(ctx, bx+bstart, y+4, bw*fill, rowH-8, 3); ctx.fill();
          if (fill < 1) {
            const edge=bx+bstart+bw*fill;
            const gl=ctx.createLinearGradient(edge-6,0,edge,0);
            gl.addColorStop(0, r.color+"00"); gl.addColorStop(1, r.color+"ff");
            ctx.fillStyle=gl; ctx.fillRect(edge-6, y+4, 6, rowH-8);
          }
        }
      });
      ctx.strokeStyle="rgba(46,18,74,0.12)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(labelW,0); ctx.lineTo(labelW,H); ctx.stroke();
      const cx=labelW+barArea*progress;
      ctx.strokeStyle="rgba(139,47,201,0.35)"; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,H); ctx.stroke();
      ctx.setLineDash([]);
      t++; frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { clearInterval(iv); cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"68px 24px 24px", boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:500, display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, borderRadius:12, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.95)", padding:"12px 14px" }}>
            <div style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)", letterSpacing:"0.14em", textTransform:"uppercase" as const, marginBottom:5 }}>PageSpeed</div>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:"monospace", color:score>=95?"#22c55e":A, lineHeight:1, letterSpacing:"-0.04em" }}>{score}</div>
            <div style={{ fontSize:8, fontFamily:"monospace", color:"#22c55e", marginTop:3 }}>● EXCELLENT</div>
          </div>
          <div style={{ flex:1, borderRadius:12, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.95)", padding:"12px 14px" }}>
            <div style={{ fontSize:8, fontFamily:"monospace", color:"rgba(46,18,74,0.4)", letterSpacing:"0.14em", textTransform:"uppercase" as const, marginBottom:5 }}>TTFB</div>
            <div style={{ fontSize:26, fontWeight:900, fontFamily:"monospace", color:P, lineHeight:1, letterSpacing:"-0.04em" }}>{ttfb}<span style={{ fontSize:11, color:"rgba(46,18,74,0.4)", fontWeight:400 }}>ms</span></div>
            <div style={{ fontSize:8, fontFamily:"monospace", color:A, marginTop:3 }}>LiteSpeed</div>
          </div>
        </div>
        <div style={{ borderRadius:12, border:"1px solid rgba(46,18,74,0.09)", background:"rgba(250,247,253,0.95)", overflow:"hidden" }}>
          <div style={{ padding:"8px 10px 4px", fontSize:8, fontFamily:"monospace", fontWeight:700, color:"rgba(46,18,74,0.4)", letterSpacing:"0.14em", textTransform:"uppercase" as const }}>Request Waterfall</div>
          <canvas ref={canvasRef} width={340} height={160} style={{ width:"100%", height:160, display:"block" }} />
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
          {["LiteSpeed","CDN Built-in","Brotli","HTTP/3"].map(tag => (
            <span key={tag} style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, padding:"3px 8px", borderRadius:99, background:"rgba(139,47,201,0.07)", border:"1px solid rgba(139,47,201,0.18)", color:A, whiteSpace:"nowrap" as const }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Animations = [VpsAnimation, CloudAnimation, DedicatedAnimation, SharedAnimation, WebsiteAnimation];

/* ══ Main Component ══ */
export default function Products() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref, inView } = useInView();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const product = products[active];
  const Animation = Animations[active];

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setTabsVisible(true), 400);
    const t3 = setTimeout(() => setCardVisible(true), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  const switchTab = (i: number) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 220);
  };

  return (
    <section
      ref={sectionRef as any}
      id="products"
      style={{ position:"relative", background:"linear-gradient(135deg,#ffffff 0%,#f8f2ff 35%,#f2e8ff 65%,#ede2fc 100%)", borderTop:`1px solid rgba(46,18,74,0.08)`, overflow:"hidden", cursor:"default" }}
    >
      <style>{`
        @keyframes prod-headerUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes prod-tabIn     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes prod-cardLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes prod-cardRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes prod-cardUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes prod-panelOut  { from{opacity:1} to{opacity:0} }
        @keyframes prod-tabSwitch { from{opacity:0;transform:translateX(-8px)}              to{opacity:1;transform:translateX(0)} }
        @keyframes prod-orbFloat  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-30px)} }
        @keyframes ledBlink       { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes prod-lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        /* Tab scrollable strip on mobile */
        .prod-tabs-strip {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 767px) {
          .prod-tabs-strip {
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
          }
        }

        .prod-tab:hover { border-color: rgba(46,18,74,0.3) !important; color: ${P} !important; background: rgba(46,18,74,0.04) !important; }

        /* Animation panel heights */
        .anim-panel-inner {
          min-height: 600px;
          height: 600px;
        }
        @media (max-width: 1023px) {
          .anim-panel-inner {
            min-height: 560px;
            height: 560px;
          }
        }
        @media (max-width: 767px) {
          .anim-panel-inner {
            min-height: 520px;
            height: 520px;
          }
        }
      `}</style>

      <div style={{ position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,rgba(139,47,201,0.08),transparent 70%)`,filter:"blur(50px)",animation:"prod-orbFloat 14s ease-in-out infinite",pointerEvents:"none",zIndex:0 }} />
      <div style={{ position:"absolute",bottom:-120,left:-80,width:420,height:420,borderRadius:"50%",background:`radial-gradient(circle,rgba(46,18,74,0.06),transparent 70%)`,filter:"blur(55px)",animation:"prod-orbFloat 10s ease-in-out infinite reverse",pointerEvents:"none",zIndex:0 }} />

      <div ref={ref} style={{ position:"relative",maxWidth:1280,margin:"0 auto",padding:isMobile?"4rem 5% 5rem":"7rem 5%",zIndex:1 }}>

        {/* HEADER */}
        <div style={{ textAlign:"center", marginBottom:isMobile?32:56, animation:headerVisible?"prod-headerUp 1.1s 0s both ease-out":"none", opacity:headerVisible?undefined:0 }}>
          <span style={{ color:A,fontSize:11,fontWeight:700,textTransform:"uppercase" as const,letterSpacing:"0.22em",display:"block",marginBottom:18 }}>What we offer</span>
          <h2 style={{ fontSize:isMobile?"clamp(1.9rem,7vw,2.5rem)":"clamp(2.2rem,4vw,3.4rem)",fontWeight:800,marginTop:0,marginBottom:16,color:"#1C0A2E",fontFamily:"var(--font-heading)",letterSpacing:"-0.035em",lineHeight:1.1 }}>
            Our <span style={{ background:`linear-gradient(135deg,${P},${A},#6366F1)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Products</span>
          </h2>
          <p style={{ color:"#5b4d7a",fontWeight:300,fontSize:isMobile?"0.95rem":"1.05rem",maxWidth:440,margin:"0 auto 28px",lineHeight:1.7 }}>
            Everything you need to run fast, secure, and reliable infrastructure.
          </p>
          <div style={{ display:"flex",justifyContent:"center" }}>
            <div style={{ position:"relative",height:4,width:56 }}>
              <div style={{ position:"absolute",inset:0,borderRadius:99,background:`linear-gradient(90deg,${P},${A},#6366F1)`,animation:headerVisible?"prod-lineGrow 0.9s 0.5s both ease-out":"none",transformOrigin:"left" }} />
              <div style={{ position:"absolute",inset:0,borderRadius:99,background:`linear-gradient(90deg,${P},${A},#6366F1)`,filter:"blur(6px)",opacity:0.45 }} />
            </div>
          </div>
        </div>

        {/* ── TABS: centered ── */}
        <div className="prod-tabs-strip" style={{ marginBottom:isMobile?24:40 }}>
          {products.map((p, i) => {
            const isActive = active === i;
            return (
              <button key={p.id} onClick={() => switchTab(i)}
                className={isActive ? "" : "prod-tab"}
                style={{
                  position:"relative", padding:isMobile?"9px 14px":"11px 22px", borderRadius:12,
                  fontSize:isMobile?"0.8rem":"0.875rem", fontWeight:600, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:7,
                  background:isActive?`linear-gradient(135deg,${P},${A})`:"#fff",
                  border:isActive?`1px solid rgba(46,18,74,0.4)`:`1px solid rgba(46,18,74,0.12)`,
                  color:isActive?"#fff":`rgba(46,18,74,0.6)`,
                  boxShadow:isActive?`0 6px 24px rgba(46,18,74,0.25)`:"none",
                  transition:"all 0.25s ease-out",
                  
                  animation:tabsVisible?`prod-tabIn 0.6s ${i*0.1}s both ease-out`:"none",
                  opacity:tabsVisible?undefined:0, overflow:"hidden",
                  whiteSpace:"nowrap" as const,
                }}
              >
                {isActive && <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.1),transparent)",pointerEvents:"none" }} />}
                <p.Icon active={isActive} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── CARD ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "55% 45%",
          borderRadius:isMobile?16:24, overflow:"hidden",
          border:`1px solid rgba(46,18,74,0.12)`,
          boxShadow:`0 24px 80px rgba(46,18,74,0.1),0 4px 20px rgba(46,18,74,0.06)`,
          animation:animating?"prod-panelOut 0.22s ease forwards":"none",
        }}>

          {/* Animation panel — tall enough on all screens */}
          <div className="anim-panel-inner" style={{
            position:"relative",
            background:`linear-gradient(160deg,#FAF7FD,#F5F0FB,#EDE8F8)`,
            borderRight: !isMobile ? `1px solid rgba(46,18,74,0.1)` : "none",
            borderBottom: isMobile ? `1px solid rgba(46,18,74,0.1)` : "none",
            animation:cardVisible?`${isMobile?"prod-cardUp":"prod-cardLeft"} 0.7s 0s both ease-out`:"none",
            opacity:cardVisible?undefined:0,
          }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${P},${A},transparent)` }} />
            <div style={{ position:"absolute",inset:0,opacity:0.022,backgroundImage:`linear-gradient(${P} 1px,transparent 1px),linear-gradient(90deg,${P} 1px,transparent 1px)`,backgroundSize:"28px 28px" }} />
            <div style={{ position:"absolute",top:16,left:16,zIndex:20,display:"flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:99,background:`rgba(46,18,74,0.07)`,border:`1px solid rgba(46,18,74,0.15)`,backdropFilter:"blur(8px)" }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:A,boxShadow:`0 0 0 3px rgba(139,47,201,0.2)`,animation:"ledBlink 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize:9,fontFamily:"monospace",letterSpacing:"0.18em",textTransform:"uppercase" as const,color:`rgba(46,18,74,0.6)`,fontWeight:700 }}>Live Preview</span>
            </div>
            <div style={{ position:"absolute",top:16,right:16,zIndex:20,padding:"5px 12px",borderRadius:8,fontSize:9,fontFamily:"monospace",background:`rgba(46,18,74,0.06)`,border:`1px solid rgba(46,18,74,0.14)`,color:`rgba(46,18,74,0.5)`,letterSpacing:"0.15em",textTransform:"uppercase" as const }}>
              {product.id.toUpperCase()}
            </div>
            {/* Animation fills the full panel */}
            <div style={{ position:"absolute",inset:0,top:52,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
              <Animation />
            </div>
          </div>

          {/* Text panel */}
          <div style={{
            padding:isMobile?"1.75rem 1.5rem":"2rem 2rem",
            background:"#fff", display:"flex", flexDirection:"column", justifyContent:"space-between",
            animation:cardVisible?`${isMobile?"prod-cardUp":"prod-cardRight"} 0.7s 0.1s both ease-out`:animating?"none":"prod-tabSwitch 0.35s 0.1s both ease",
            opacity:cardVisible?undefined:animating?1:0,
          }}>
            <div>
              <span style={{ fontSize:11,fontWeight:700,textTransform:"uppercase" as const,letterSpacing:"0.14em",color:A }}>{product.tagline}</span>
              <h3 style={{ fontSize:isMobile?"1.5rem":"2rem",fontWeight:800,marginTop:10,marginBottom:18,color:"#1C0A2E",fontFamily:"var(--font-heading)",letterSpacing:"-0.025em",lineHeight:1.1 }}>{product.label}</h3>
              <p style={{ fontSize:"0.9rem",lineHeight:1.8,color:`rgba(46,18,74,0.65)`,marginBottom:28 }}>{product.desc}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:12 }}>
                {product.specs.map((s, i) => (
                  <li key={s} style={{ display:"flex",alignItems:"center",gap:12,fontSize:"0.875rem",animation:`prod-tabSwitch 0.5s ${0.1+i*0.1}s both ease`,opacity:animating?0:1 }}>
                    <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:`rgba(46,18,74,0.07)`,border:`1px solid rgba(46,18,74,0.18)` }}>
                      <svg style={{ width:10,height:10 }} viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span style={{ color:"#1C0A2E",fontWeight:500 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop:32,paddingTop:24,borderTop:`1px solid rgba(46,18,74,0.08)`,display:"flex",alignItems:"center",gap:20,flexWrap:isMobile?"wrap":"nowrap" as any }}>
              <a href="#pricing" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:isMobile?"11px 22px":"12px 28px",borderRadius:12,fontWeight:700,fontSize:"0.875rem",textDecoration:"none",background:`linear-gradient(135deg,${P},${A})`,color:"#fff",boxShadow:`0 6px 24px rgba(46,18,74,0.3)`,width:isMobile?"100%":"auto",justifyContent:isMobile?"center":"flex-start",transition:"transform 0.25s ease-out, box-shadow 0.25s ease-out" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 10px 32px rgba(46,18,74,0.4)`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow=`0 6px 24px rgba(46,18,74,0.3)`; }}
              >
                Get Started
                <svg style={{ width:16,height:16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#" style={{ fontSize:"0.875rem",fontWeight:600,color:A,textDecoration:"none",transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color=P; e.currentTarget.style.textDecoration="underline"; }}
                onMouseLeave={e => { e.currentTarget.style.color=A; e.currentTarget.style.textDecoration="none"; }}
              >Read more →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}