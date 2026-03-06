"use client";
import { useState, useEffect, useRef } from "react";

const P = "#2E124A";
const A = "#8B2FC9";
const AL = "#C4A8E0";

const products = [
  { id: "vps", label: "VPS Servers", icon: "⚡", tagline: "Dedicated power, cloud flexibility", desc: "Get the perfect balance between dedicated resources and cloud scalability. Our VPS servers deliver guaranteed CPU, RAM, and NVMe storage — fully isolated, fully yours.", specs: ["Up to 32 vCPU cores", "Up to 128 GB RAM", "NVMe SSD storage", "Instant provisioning"] },
  { id: "cloud", label: "Cloud Servers", icon: "☁️", tagline: "Elastic compute at any scale", desc: "Deploy cloud instances across multiple availability zones in minutes. Auto-scaling, load balancing, and pay-as-you-go pricing make Colobix cloud the smartest choice.", specs: ["Multi-zone redundancy", "Auto-scaling groups", "S3-compatible storage", "99.99% availability"] },
  { id: "dedicated", label: "Dedicated Servers", icon: "🖥️", tagline: "Raw bare-metal performance", desc: "No hypervisor overhead. No noisy neighbours. Pure bare-metal power with Intel Xeon or AMD EPYC processors, enterprise NVMe arrays and 10GbE uplinks.", specs: ["Intel Xeon / AMD EPYC", "10GbE network uplink", "RAID-10 NVMe arrays", "Full IPMI / KVM access"] },
  { id: "shared", label: "Shared Hosting", icon: "🌐", tagline: "The easiest way to go live", desc: "Launch your website in minutes with cPanel, one-click WordPress, and free SSL included. Perfect for blogs, portfolios, and small business sites.", specs: ["Free SSL certificate", "One-click WordPress", "Daily backups", "99.9% uptime SLA"] },
  { id: "website", label: "Website Hosting", icon: "🚀", tagline: "Optimised for the modern web", desc: "Purpose-built for speed. LiteSpeed web server, built-in CDN, and smart caching deliver sub-second page loads globally for every visitor.", specs: ["LiteSpeed web server", "Global CDN included", "Smart caching engine", "PHP 8.x / Node.js"] },
];

/* ─── Responsive hook ─── */
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}

/* ─────────────────────────────── VPS ─────────────────────────────── */
function VpsAnimation() {
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 800); return () => clearInterval(t); }, []);
  const bars = [68, 42, 91, 55, 78, 35, 83, 61];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes vpsFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes scanLine    { 0%{top:0%} 100%{top:100%} }
        @keyframes cornerBlink { 0%,100%{opacity:1;box-shadow:0 0 12px ${A}} 50%{opacity:0.3;box-shadow:none} }
        @keyframes ringSpinCW  { to{transform:rotate(360deg)} }
        @keyframes ringSpinCC  { to{transform:rotate(-360deg)} }
      `}</style>
      {[300, 240, 180].map((s, i) => (
        <div key={s} style={{
          position: "absolute", width: s, height: s, borderRadius: "50%",
          border: `1px solid rgba(46,18,74,${0.08 + i * 0.04})`,
          animation: `${i % 2 === 0 ? "ringSpinCW" : "ringSpinCC"} ${12 + i * 4}s linear infinite`
        }}>
          <div style={{
            position: "absolute", width: 7, height: 7, borderRadius: "50%", background: A,
            top: -3.5, left: "50%", marginLeft: -3.5, boxShadow: `0 0 10px ${A}, 0 0 20px ${A}`
          }} />
        </div>
      ))}
      <div style={{ animation: "vpsFloat 3.5s ease-in-out infinite", position: "relative", zIndex: 10 }}>
        <div style={{
          position: "relative", width: 210, height: 210, borderRadius: 20,
          border: `2px solid rgba(46,18,74,0.55)`,
          background: "rgba(250,247,253,0.98)",
          boxShadow: `0 0 50px rgba(139,47,201,0.2), inset 0 0 30px rgba(46,18,74,0.04)`,
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg,transparent,${A},transparent)`,
            zIndex: 20, opacity: 0.5, animation: "scanLine 2.2s linear infinite"
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `linear-gradient(${P} 1px,transparent 1px),linear-gradient(90deg,${P} 1px,transparent 1px)`,
            backgroundSize: "20px 20px"
          }} />
          <div style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "22px 18px 32px" }}>
            {bars.map((b, i) => {
              const isActive = tick % 4 === i % 4;
              const h = isActive ? Math.min(b + 22, 98) : b;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <div style={{
                    width: 22, borderRadius: 6, overflow: "hidden", background: `rgba(46,18,74,0.08)`, height: 44,
                    boxShadow: hovered === i ? `0 0 12px ${A}` : "none", transition: "box-shadow 0.2s"
                  }}>
                    <div style={{
                      width: "100%", borderRadius: 6, height: `${h}%`,
                      background: isActive || hovered === i ? `linear-gradient(to top,${P},${A},#C084FC)` : `linear-gradient(to top,rgba(46,18,74,0.4),rgba(139,47,201,0.3))`,
                      transition: "height 0.5s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
                      boxShadow: isActive ? `0 0 12px rgba(139,47,201,0.7)` : "none"
                    }} />
                  </div>
                  {hovered === i && <div style={{ fontSize: 8, color: A, fontFamily: "monospace", marginBottom: 3, fontWeight: 700 }}>{h}%</div>}
                </div>
              );
            })}
          </div>
          <div style={{
            position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center",
            fontSize: 8, fontFamily: "monospace", letterSpacing: "0.2em",
            color: `rgba(46,18,74,0.5)`, textTransform: "uppercase"
          }}>CPU · LOAD · MONITOR</div>
        </div>
        {[[-7, -7], [-7, "auto"], ["auto", -7], ["auto", "auto"]].map(([t, l], i) => (
          <div key={i} style={{
            position: "absolute",
            top: t === "auto" ? undefined : t as number, bottom: t === "auto" ? -7 : undefined,
            left: l === "auto" ? undefined : l as number, right: l === "auto" ? -7 : undefined,
            width: 12, height: 12, borderRadius: 3, background: A,
            animation: `cornerBlink 1.8s ease-in-out infinite`, animationDelay: `${i * 0.3}s`
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Cloud ─────────────────────────────── */
function CloudAnimation() {
  const [phase, setPhase] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  useEffect(() => { const t = setInterval(() => setPhase(p => (p + 1) % 60), 80); return () => clearInterval(t); }, []);
  const nodes = [{ x: 50, y: 28 }, { x: 20, y: 58 }, { x: 80, y: 58 }, { x: 35, y: 80 }, { x: 65, y: 80 }];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 2]];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`
        @keyframes cloudFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes nodePulse  { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.6);opacity:1} }
        @keyframes cloudRing  { to{transform:rotate(360deg)} }
        @keyframes dataPacket { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
      `}</style>
      {[320, 260].map((s, i) => (
        <div key={s} style={{
          position: "absolute", width: s, height: s, borderRadius: "50%",
          border: `1px solid rgba(46,18,74,${0.07 + i * 0.04})`,
          animation: `cloudRing ${14 + i * 6}s linear infinite ${i % 2 ? "reverse" : ""}`
        }}>
          <div style={{
            position: "absolute", width: 6, height: 6, borderRadius: "50%", background: A,
            top: -3, left: "50%", marginLeft: -3, boxShadow: `0 0 8px ${A}`
          }} />
        </div>
      ))}
      <div style={{ animation: "cloudFloat 4s ease-in-out infinite", position: "relative", width: 280, height: 240, zIndex: 10 }}>
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          {edges.map(([a, b], i) => {
            const active = Math.floor(phase / 12) % 5 === i;
            return (
              <g key={i}>
                <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={`rgba(46,18,74,0.1)`} strokeWidth="0.5" />
                <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
                  stroke={active ? A : "transparent"} strokeWidth="1.2" strokeDasharray="4 4"
                  style={{ filter: active ? "drop-shadow(0 0 3px #8B2FC9)" : "none", animation: active ? "dataPacket 0.5s linear infinite" : "none" }} />
              </g>
            );
          })}
          <ellipse cx="50" cy="32" rx="26" ry="16" fill={`rgba(46,18,74,0.04)`} stroke={`rgba(46,18,74,0.35)`} strokeWidth="0.7" />
          <ellipse cx="34" cy="40" rx="17" ry="11" fill={`rgba(46,18,74,0.03)`} stroke={`rgba(46,18,74,0.25)`} strokeWidth="0.5" />
          <ellipse cx="66" cy="38" rx="15" ry="10" fill={`rgba(46,18,74,0.03)`} stroke={`rgba(46,18,74,0.25)`} strokeWidth="0.5" />
          {nodes.map((n, i) => (
            <g key={i} style={{ cursor: "pointer" }} onMouseEnter={() => setHoveredNode(i)} onMouseLeave={() => setHoveredNode(null)}>
              <circle cx={n.x} cy={n.y} r={hoveredNode === i ? 6 : 4}
                fill={hoveredNode === i ? `rgba(46,18,74,0.15)` : `rgba(46,18,74,0.07)`}
                stroke={hoveredNode === i ? A : `rgba(46,18,74,0.4)`} strokeWidth="0.8" style={{ transition: "all 0.2s" }} />
              <circle cx={n.x} cy={n.y} r="2" fill={hoveredNode === i ? A : P}
                style={{
                  filter: `drop-shadow(0 0 ${hoveredNode === i ? 6 : 3}px ${A})`,
                  animation: `nodePulse ${1.8 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`, transition: "all 0.2s"
                }} />
              {hoveredNode === i && <text x={n.x} y={n.y - 8} textAnchor="middle" fontSize="4" fill={A} fontFamily="monospace">NODE-0{i + 1}</text>}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Dedicated ─────────────────────────────── */
function DedicatedAnimation() {
  const [active, setActive] = useState(0);
  const [loads, setLoads] = useState([72, 45, 88, 61]);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => (p + 1) % 4);
      setLoads(prev => prev.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 15))));
    }, 950);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes dedFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ledBlink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes rowGlow  { 0%,100%{box-shadow:0 0 20px rgba(139,47,201,0.2)} 50%{box-shadow:0 0 35px rgba(139,47,201,0.4)} }
      `}</style>
      <div style={{ animation: "dedFloat 3.8s ease-in-out infinite", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }}>
        {[0, 1, 2, 3].map(i => {
          const isActive = active === i || hovered === i;
          const load = Math.round(loads[i]);
          const color = isActive ? A : `rgba(46,18,74,0.25)`;
          return (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 18px", borderRadius: 14, width: 260, cursor: "pointer",
                background: isActive ? `rgba(46,18,74,0.07)` : "rgba(250,247,253,0.95)",
                border: `1px solid ${isActive ? `rgba(46,18,74,0.45)` : `rgba(46,18,74,0.1)`}`,
                animation: isActive ? "rowGlow 2s ease-in-out infinite" : "none",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isActive ? "scale(1.03)" : "scale(1)"
              }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0, transition: "all 0.3s",
                background: isActive ? A : `rgba(46,18,74,0.2)`,
                boxShadow: isActive ? `0 0 0 3px rgba(139,47,201,0.2), 0 0 12px ${A}` : "none",
                animation: isActive ? "ledBlink 1.2s ease-in-out infinite" : "none"
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10, fontFamily: "monospace", fontWeight: 700,
                    color: isActive ? P : `rgba(46,18,74,0.4)`,
                    textShadow: isActive ? `0 0 8px rgba(46,18,74,0.3)` : "none"
                  }}>NODE-{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", fontWeight: 700, color }}>{load}%</span>
                </div>
                <div style={{
                  height: 6, borderRadius: 999, overflow: "hidden", background: `rgba(46,18,74,0.08)`,
                  boxShadow: isActive ? `inset 0 0 6px rgba(46,18,74,0.1)` : "none"
                }}>
                  <div style={{
                    height: "100%", borderRadius: 999, width: `${load}%`,
                    background: isActive ? `linear-gradient(90deg,${P},${A},#C084FC)` : `rgba(46,18,74,0.2)`,
                    boxShadow: isActive ? `0 0 10px rgba(139,47,201,0.7)` : "none",
                    transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)"
                  }} />
                </div>
              </div>
              <span style={{
                fontSize: 9, fontFamily: "monospace", padding: "3px 10px", borderRadius: 8, flexShrink: 0,
                border: `1px solid ${isActive ? `rgba(46,18,74,0.4)` : `rgba(46,18,74,0.1)`}`,
                color: isActive ? P : `rgba(46,18,74,0.35)`,
                background: isActive ? `rgba(46,18,74,0.06)` : "transparent",
                fontWeight: 700, transition: "all 0.3s"
              }}>{isActive ? "ACTIVE" : "IDLE"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Shared ─────────────────────────────── */
function SharedAnimation() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [hoveredFile, setHoveredFile] = useState<number | null>(null);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => { if (p >= 100) { setStage(s => (s + 1) % 3); return 0; } return p + 1.5; });
    }, 50);
    return () => clearInterval(t);
  }, []);
  const stages = ["Building...", "Uploading...", "Live! ✓"];
  const stageColors = [`rgba(46,18,74,0.7)`, A, "#22c55e"];
  const files: [string, string, number][] = [
    ["index.html", P, 75], ["style.css", A, 60], ["app.js", "#C084FC", 85],
    ["logo.svg", "#7B3FA8", 50], ["favicon.ico", AL, 65]
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes sharedFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes progressPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
      `}</style>
      <div style={{
        animation: "sharedFloat 4s ease-in-out infinite", position: "relative", width: 250, borderRadius: 20,
        overflow: "hidden", border: `1px solid rgba(46,18,74,0.2)`,
        boxShadow: `0 0 50px rgba(46,18,74,0.12), 0 20px 60px rgba(46,18,74,0.08)`
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "10px 14px",
          borderBottom: `1px solid rgba(46,18,74,0.1)`,
          background: `linear-gradient(135deg,#FAF7FD,#F5F0FB)`
        }}>
          {[["#ff5f57"], ["#febc2e"], ["#28c840"]].map(([c], i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, boxShadow: `0 0 4px ${c}` }} />
          ))}
          <div style={{
            marginLeft: 8, flex: 1, borderRadius: 6, padding: "3px 10px", fontSize: 9,
            fontFamily: "monospace", background: `rgba(46,18,74,0.05)`,
            border: `1px solid rgba(46,18,74,0.12)`, color: `rgba(46,18,74,0.55)`
          }}>colobix.com</div>
        </div>
        <div style={{ padding: "14px 16px", background: "#fff", display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map(([name, color, pct], i) => (
            <div key={name} onMouseEnter={() => setHoveredFile(i)} onMouseLeave={() => setHoveredFile(null)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "4px 8px",
                borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
                background: hoveredFile === i ? `rgba(46,18,74,0.04)` : "transparent"
              }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0,
                boxShadow: `0 0 ${hoveredFile === i ? 10 : 5}px ${color}`, transition: "box-shadow 0.2s"
              }} />
              <span style={{
                fontSize: 10, fontFamily: "monospace", flex: 1,
                color: hoveredFile === i ? P : `rgba(46,18,74,0.55)`, transition: "color 0.2s"
              }}>{name}</span>
              <div style={{ width: 52, height: 4, borderRadius: 999, overflow: "hidden", background: `rgba(46,18,74,0.07)` }}>
                <div style={{
                  height: "100%", borderRadius: 999, background: color,
                  width: hoveredFile === i ? "100%" : `${pct}%`,
                  transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: `0 0 6px ${color}`
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 16px 14px", background: "#fff", borderTop: `1px solid rgba(46,18,74,0.07)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontFamily: "monospace", marginBottom: 7 }}>
            <span style={{
              color: stageColors[stage], fontWeight: 700,
              animation: stage === 2 ? "none" : "progressPulse 1s ease-in-out infinite"
            }}>{stages[stage]}</span>
            <span style={{ color: P, fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, overflow: "hidden", background: `rgba(46,18,74,0.07)` }}>
            <div style={{
              height: "100%", borderRadius: 999, width: `${progress}%`,
              background: `linear-gradient(90deg,${P},${A},#C084FC)`,
              transition: "width 0.1s", boxShadow: `0 0 10px rgba(139,47,201,0.5)`
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Website ─────────────────────────────── */
function WebsiteAnimation() {
  const [val, setVal] = useState(0);
  const [hoveredPop, setHoveredPop] = useState<number | null>(null);
  const dirRef = useRef(1);
  useEffect(() => {
    const t = setInterval(() => {
      setVal(p => {
        const next = p + dirRef.current * 1.5;
        if (next >= 98 || next <= 2) dirRef.current *= -1;
        return Math.max(0, Math.min(100, next));
      });
    }, 30);
    return () => clearInterval(t);
  }, []);
  const speed = Math.round(val);
  const pops = ["SIN", "LHR", "JFK", "FRA", "SYD"];
  const quality = speed < 30 ? "EXCELLENT" : speed < 60 ? "GOOD" : "FAIR";
  const qColor = speed < 30 ? "#22c55e" : speed < 60 ? A : "#f59e0b";
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes webFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes popPing   { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(2.2);opacity:1} }
        @keyframes gaugeGlow { 0%,100%{filter:drop-shadow(0 0 6px ${A})} 50%{filter:drop-shadow(0 0 16px ${A})} }
      `}</style>
      <div style={{ animation: "webFloat 3.8s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 28, zIndex: 10 }}>
        <div style={{ position: "relative", width: 168, height: 168 }}>
          <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", transform: "rotate(-135deg)", animation: "gaugeGlow 2s ease-in-out infinite" }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke={`rgba(46,18,74,0.07)`} strokeWidth="12" strokeLinecap="round" strokeDasharray="236" strokeDashoffset="59" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={`rgba(139,47,201,0.1)`} strokeWidth="16" strokeLinecap="round"
              strokeDasharray="236" strokeDashoffset={236 - (177 * speed / 100)} style={{ filter: "blur(6px)", transition: "stroke-dashoffset 0.1s" }} />
            <circle cx="60" cy="60" r="50" fill="none" stroke={`hsl(${285 - speed * 0.6},70%,50%)`}
              strokeWidth="12" strokeLinecap="round"
              strokeDasharray="236" strokeDashoffset={236 - (177 * speed / 100)}
              style={{ filter: `drop-shadow(0 0 8px hsl(${285 - speed * 0.6},70%,50%))`, transition: "all 0.08s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "2.8rem", fontWeight: 900, fontFamily: "monospace", color: P, lineHeight: 1, letterSpacing: "-0.04em" }}>{speed}</span>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: `rgba(46,18,74,0.45)`, marginTop: 4, letterSpacing: "0.1em" }}>ms / load</span>
            <span style={{
              fontSize: 9, fontFamily: "monospace", fontWeight: 700, marginTop: 6,
              color: qColor, letterSpacing: "0.12em", padding: "2px 8px",
              borderRadius: 99, background: `${qColor}18`, border: `1px solid ${qColor}40`
            }}>{quality}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {pops.map((code, i) => (
            <div key={code} onMouseEnter={() => setHoveredPop(i)} onMouseLeave={() => setHoveredPop(null)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <div style={{ position: "relative", width: 12, height: 12 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%", background: A,
                  animation: `popPing 1.8s ease-in-out infinite`, animationDelay: `${i * 0.22}s`,
                  boxShadow: `0 0 ${hoveredPop === i ? 16 : 8}px ${A}`,
                  transform: hoveredPop === i ? "scale(1.4)" : "scale(1)", transition: "transform 0.2s"
                }} />
              </div>
              <span style={{
                fontSize: 9, fontFamily: "monospace", fontWeight: 700,
                color: hoveredPop === i ? P : `rgba(46,18,74,0.4)`, transition: "color 0.2s"
              }}>{code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Animations = [VpsAnimation, CloudAnimation, DedicatedAnimation, SharedAnimation, WebsiteAnimation];

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

export default function Products() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref, inView } = useInView();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const product = products[active];
  const Animation = Animations[active];

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setTabsVisible(true), 400);
    const t3 = setTimeout(() => setCardVisible(true), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
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

  const switchTab = (i: number) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 220);
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f2ff 35%, #f2e8ff 65%, #ede2fc 100%)",
        borderTop: `1px solid rgba(46,18,74,0.08)`,
        overflow: "hidden",
        cursor: "default"
      }}
    >
      <style>{`
        @keyframes prod-headerUp  { from{opacity:0;transform:translateY(50px)}              to{opacity:1;transform:translateY(0)} }
        @keyframes prod-tabIn     { from{opacity:0;transform:translateY(20px) scale(0.95)}  to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes prod-cardLeft  { from{opacity:0;transform:translateX(-60px) scale(0.96)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes prod-cardRight { from{opacity:0;transform:translateX(60px) scale(0.96)}  to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes prod-cardUp    { from{opacity:0;transform:translateY(60px) scale(0.96)}  to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes prod-panelOut  { from{opacity:1;transform:translateY(0)}                 to{opacity:0;transform:translateY(-12px)} }
        @keyframes prod-tabSwitch { from{opacity:0;transform:translateX(-8px)}              to{opacity:1;transform:translateX(0)} }
        @keyframes prod-orbFloat  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(28px,-30px) scale(1.06)} }
        @keyframes ledBlink       { 0%,100%{opacity:1} 50%{opacity:0.15} }
      `}</style>


      {/* ambient orbs */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,rgba(139,47,201,0.08),transparent 70%)`, filter: "blur(50px)", animation: "prod-orbFloat 14s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -120, left: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,rgba(46,18,74,0.06),transparent 70%)`, filter: "blur(55px)", animation: "prod-orbFloat 10s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

      <div ref={ref} style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: isMobile ? "4rem 5% 5rem" : "7rem 5%", zIndex: 1 }}>

        {/* ── HEADER ── */}
<div style={{
          textAlign: "center", marginBottom: isMobile ? 32 : 56,
          animation: headerVisible ? "prod-headerUp 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
          opacity: headerVisible ? undefined : 0,
        }}>
          {/* small-caps label */}
          <span style={{
            color: A, fontSize: 11, fontWeight: 700,
            textTransform: "uppercase" as const, letterSpacing: "0.22em",
            fontFamily: "var(--font-body)", display: "block", marginBottom: 18,
          }}>What we offer</span>

          {/* main heading */}
          <h2 style={{
            fontSize: isMobile ? "clamp(1.9rem,7vw,2.5rem)" : "clamp(2.2rem,4vw,3.4rem)",
            fontWeight: 800, marginTop: 0, marginBottom: 16,
            color: "#1C0A2E", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.035em", lineHeight: 1.1,
          }}>
            Our{" "}
            <span className="prod-gradient-word">Products</span>
          </h2>

          {/* subtext — add your own or remove this block */}
          <p style={{
            color: "rgba(46,18,74,0.45)", fontWeight: 300,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            maxWidth: 440, margin: "0 auto 28px",
            lineHeight: 1.7, fontFamily: "var(--font-body)",
          }}>
            Everything you need to run fast, secure, and reliable infrastructure.
          </p>

          {/* decorative underline pill */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", height: 4, width: 56 }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: 99,
                background: `linear-gradient(90deg, ${P}, ${A}, #6366F1)`,
                animation: headerVisible ? "prod-lineGrow 0.9s 0.5s both cubic-bezier(0.16,1,0.3,1)" : "none",
              }} />
              <div style={{
                position: "absolute", inset: 0, borderRadius: 99,
                background: `linear-gradient(90deg, ${P}, ${A}, #6366F1)`,
                filter: "blur(6px)", opacity: 0.45,
              }} />
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: isMobile ? 8 : 10,
          marginBottom: isMobile ? 24 : 40,
        }}>
          {products.map((p, i) => {
            const isActive = active === i;
            return (
              <button
                key={p.id}
                onClick={() => switchTab(i)}
                style={{
                  position: "relative",
                  padding: isMobile ? "9px 14px" : "11px 22px",
                  borderRadius: 12,
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  fontWeight: 600, cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  background: isActive ? `linear-gradient(135deg,${P},${A})` : "#fff",
                  border: isActive ? `1px solid rgba(46,18,74,0.4)` : `1px solid rgba(46,18,74,0.12)`,
                  color: isActive ? "#fff" : `rgba(46,18,74,0.6)`,
                  boxShadow: isActive ? `0 6px 24px rgba(46,18,74,0.25), 0 2px 8px rgba(139,47,201,0.2)` : "none",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  overflow: "hidden",
                  animation: tabsVisible ? `prod-tabIn 0.8s ${i * 0.12}s both cubic-bezier(0.34,1.56,0.64,1)` : "none",
                  opacity: tabsVisible ? undefined : 0,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `rgba(46,18,74,0.3)`; e.currentTarget.style.color = P; e.currentTarget.style.background = `rgba(46,18,74,0.04)`; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = `rgba(46,18,74,0.12)`; e.currentTarget.style.color = `rgba(46,18,74,0.6)`; e.currentTarget.style.background = "#fff"; } }}
              >
                {isActive && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.1),transparent)", pointerEvents: "none" }} />}
                <span style={{ marginRight: isMobile ? 4 : 6 }}>{p.icon}</span>
                {/* On very small screens hide label, show icon only */}
                <span style={{ display: width < 400 ? "none" : "inline" }}>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── CARD ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
          borderRadius: isMobile ? 16 : 24,
          overflow: "hidden",
          border: `1px solid rgba(46,18,74,0.12)`,
          boxShadow: `0 24px 80px rgba(46,18,74,0.1), 0 4px 20px rgba(46,18,74,0.06)`,
          animation: animating ? "prod-panelOut 0.22s ease forwards" : "none",
        }}>

          {/* Animation panel */}
          <div style={{
            position: "relative",
            minHeight: isMobile ? 280 : isTablet ? 340 : 440,
            background: `linear-gradient(160deg,#FAF7FD,#F5F0FB,#EDE8F8)`,
            borderRight: isMobile || isTablet ? "none" : `1px solid rgba(46,18,74,0.1)`,
            borderBottom: isMobile || isTablet ? `1px solid rgba(46,18,74,0.1)` : "none",
            animation: cardVisible ? `${isMobile || isTablet ? "prod-cardUp" : "prod-cardLeft"} 1.1s 0s both cubic-bezier(0.16,1,0.3,1)` : "none",
            opacity: cardVisible ? undefined : 0,
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${P},${A},transparent)` }} />
            <div style={{
              position: "absolute", inset: 0, opacity: 0.025,
              backgroundImage: `linear-gradient(${P} 1px,transparent 1px),linear-gradient(90deg,${P} 1px,transparent 1px)`,
              backgroundSize: "28px 28px"
            }} />
            {/* live badge */}
            <div style={{
              position: "absolute", top: 16, left: 16, zIndex: 20,
              display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99,
              background: `rgba(46,18,74,0.07)`, border: `1px solid rgba(46,18,74,0.15)`, backdropFilter: "blur(8px)"
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, boxShadow: `0 0 0 3px rgba(139,47,201,0.2)`, animation: "ledBlink 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: `rgba(46,18,74,0.6)`, fontWeight: 700 }}>Live Preview</span>
            </div>
            {/* product badge */}
            <div style={{
              position: "absolute", top: 16, right: 16, zIndex: 20,
              padding: "5px 12px", borderRadius: 8, fontSize: 9, fontFamily: "monospace",
              background: `rgba(46,18,74,0.06)`, border: `1px solid rgba(46,18,74,0.14)`,
              color: `rgba(46,18,74,0.5)`, letterSpacing: "0.15em", textTransform: "uppercase" as const
            }}>
              {product.id.toUpperCase()}
            </div>
            <div style={{ position: "absolute", inset: 0 }}><Animation /></div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(46,18,74,0.2),transparent)` }} />
          </div>

          {/* Text panel */}
          <div style={{
            padding: isMobile ? "1.75rem 1.5rem" : isTablet ? "2rem 2.25rem" : "2.5rem 2.75rem",
            background: "#fff",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            animation: cardVisible
              ? `${isMobile || isTablet ? "prod-cardUp" : "prod-cardRight"} 1.1s 0.15s both cubic-bezier(0.16,1,0.3,1)`
              : animating ? "none" : "prod-tabSwitch 0.35s 0.1s both ease",
            opacity: cardVisible ? undefined : animating ? 1 : 0,
          }}>
            <div>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const,
                letterSpacing: "0.14em", color: A, fontFamily: "var(--font-body)"
              }}>{product.tagline}</span>
              <h3 style={{
                fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: 800, marginTop: 10, marginBottom: 18,
                color: "#1C0A2E", fontFamily: "var(--font-heading)", letterSpacing: "-0.025em", lineHeight: 1.1
              }}>
                {product.label}
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: `rgba(46,18,74,0.65)`, marginBottom: 28 }}>
                {product.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {product.specs.map((s, i) => (
                  <li key={s} style={{
                    display: "flex", alignItems: "center", gap: 12, fontSize: "0.875rem",
                    animation: `prod-tabSwitch 0.5s ${0.1 + i * 0.1}s both ease`,
                    opacity: animating ? 0 : 1
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `rgba(46,18,74,0.07)`, border: `1px solid rgba(46,18,74,0.18)`
                    }}>
                      <svg style={{ width: 10, height: 10 }} viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{ color: "#1C0A2E", fontWeight: 500 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              marginTop: 32, paddingTop: 24, borderTop: `1px solid rgba(46,18,74,0.08)`,
              display: "flex", alignItems: "center", gap: 20,
              flexWrap: isMobile ? "wrap" : "nowrap" as any
            }}>
              <a href="#pricing" className="btn-glow" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: isMobile ? "11px 22px" : "12px 28px",
                borderRadius: 12, fontWeight: 700,
                fontSize: "0.875rem", textDecoration: "none",
                boxShadow: `0 6px 24px rgba(46,18,74,0.3)`,
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
                Get Started
                <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#" style={{
                fontSize: "0.875rem", fontWeight: 600, color: A,
                textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.01em"
              }}
                onMouseEnter={e => { e.currentTarget.style.color = P; e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={e => { e.currentTarget.style.color = A; e.currentTarget.style.textDecoration = "none"; }}
              >Read more →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}