"use client";
import { useState, useEffect, useRef } from "react";

const products = [
  { id: "vps", label: "VPS Servers", icon: "⚡", tagline: "Dedicated power, cloud flexibility", desc: "Get the perfect balance between dedicated resources and cloud scalability. Our VPS servers deliver guaranteed CPU, RAM, and NVMe storage — fully isolated, fully yours.", specs: ["Up to 32 vCPU cores", "Up to 128 GB RAM", "NVMe SSD storage", "Instant provisioning"] },
  { id: "cloud", label: "Cloud Servers", icon: "☁️", tagline: "Elastic compute at any scale", desc: "Deploy cloud instances across multiple availability zones in minutes. Auto-scaling, load balancing, and pay-as-you-go pricing make Colobix cloud the smartest choice.", specs: ["Multi-zone redundancy", "Auto-scaling groups", "S3-compatible storage", "99.99% availability"] },
  { id: "dedicated", label: "Dedicated Servers", icon: "🖥️", tagline: "Raw bare-metal performance", desc: "No hypervisor overhead. No noisy neighbours. Pure bare-metal power with Intel Xeon or AMD EPYC processors, enterprise NVMe arrays and 10GbE uplinks.", specs: ["Intel Xeon / AMD EPYC", "10GbE network uplink", "RAID-10 NVMe arrays", "Full IPMI / KVM access"] },
  { id: "shared", label: "Shared Hosting", icon: "🌐", tagline: "The easiest way to go live", desc: "Launch your website in minutes with cPanel, one-click WordPress, and free SSL included. Perfect for blogs, portfolios, and small business sites.", specs: ["Free SSL certificate", "One-click WordPress", "Daily backups", "99.9% uptime SLA"] },
  { id: "website", label: "Website Hosting", icon: "🚀", tagline: "Optimised for the modern web", desc: "Purpose-built for speed. LiteSpeed web server, built-in CDN, and smart caching deliver sub-second page loads globally for every visitor.", specs: ["LiteSpeed web server", "Global CDN included", "Smart caching engine", "PHP 8.x / Node.js"] },
];

// ── Animations (purple-recolored) ──

function VpsAnimation() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 900); return () => clearInterval(t); }, []);
  const bars = [68, 42, 91, 55, 78, 35, 83, 61];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes vpsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes scanLine{0%{top:0%}100%{top:100%}}
        @keyframes neonBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes spinCW{to{transform:rotate(360deg)}}
        @keyframes spinCCW{to{transform:rotate(-360deg)}}
      `}</style>
      <div style={{ position: "absolute", width: 288, height: 288, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.15)", animation: "spinCW 10s linear infinite" }} />
      <div style={{ position: "absolute", width: 208, height: 208, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.08)", animation: "spinCCW 7s linear infinite" }} />
      <div style={{ animation: "vpsFloat 3.5s ease-in-out infinite", position: "relative", zIndex: 10 }}>
        <div style={{ position: "relative", width: 192, height: 192, borderRadius: 16, border: "2px solid rgba(124,58,237,0.6)", background: "rgba(245,243,255,0.98)", overflow: "hidden", boxShadow: "0 0 40px rgba(124,58,237,0.2),inset 0 0 20px rgba(124,58,237,0.04)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(124,58,237,0.2)", zIndex: 20, animation: "scanLine 2.5s linear infinite" }} />
          <div style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, padding: "20px 20px 28px" }}>
            {bars.map((b, i) => {
              const h = tick % 4 === i % 4 ? Math.min(b + 18, 98) : b;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
                  <div style={{ width: 24, borderRadius: 4, overflow: "hidden", background: "rgba(124,58,237,0.1)", height: 38 }}>
                    <div style={{ width: "100%", borderRadius: 4, height: `${h}%`, background: "linear-gradient(to top,#7c3aed,#c084fc)", transition: "height 0.6s", boxShadow: `0 0 8px rgba(124,58,237,${h / 100})` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(124,58,237,0.7)" }}>CPU · LOAD · MONITOR</div>
        </div>
        {[[-6, -6], [-6, "auto"], ["auto", -6], ["auto", "auto"]].map(([t, l], i) => (
          <div key={i} style={{ position: "absolute", top: t === "auto" ? undefined : t, bottom: t === "auto" ? -6 : undefined, left: l === "auto" ? undefined : l, right: l === "auto" ? -6 : undefined, width: 12, height: 12, borderRadius: 3, background: "#a855f7", boxShadow: "0 0 10px rgba(168,85,247,1)", animation: `neonBlink 1.5s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function CloudAnimation() {
  const [phase, setPhase] = useState(0);
  useEffect(() => { const t = setInterval(() => setPhase(p => (p + 1) % 60), 80); return () => clearInterval(t); }, []);
  const nodes = [{ x: 50, y: 32 }, { x: 22, y: 58 }, { x: 78, y: 58 }, { x: 36, y: 78 }, { x: 64, y: 78 }];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`@keyframes cloudFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}} @keyframes nodePulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.5);opacity:1}} @keyframes spinCW{to{transform:rotate(360deg)}} @keyframes spinCCW{to{transform:rotate(-360deg)}}`}</style>
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.08)", animation: "spinCW 15s linear infinite" }} />
      <div style={{ animation: "cloudFloat 4s ease-in-out infinite", position: "relative", width: 256, height: 224 }}>
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[[0, 1], [0, 2], [1, 3], [2, 4], [1, 2]].map(([a, b], i) => {
            const active = Math.floor(phase / 12) % 5 === i;
            return <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={active ? "rgba(124,58,237,0.9)" : "rgba(124,58,237,0.15)"} strokeWidth={active ? "0.9" : "0.4"} style={{ filter: active ? "drop-shadow(0 0 3px rgba(124,58,237,1))" : "none", transition: "all 0.3s" }} />;
          })}
          <ellipse cx="50" cy="35" rx="28" ry="18" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.4)" strokeWidth="0.8" />
          <ellipse cx="35" cy="42" rx="18" ry="12" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.3)" strokeWidth="0.6" />
          <ellipse cx="65" cy="40" rx="16" ry="11" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.3)" strokeWidth="0.6" />
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="4" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.5)" strokeWidth="0.8" />
              <circle cx={n.x} cy={n.y} r="2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 4px rgba(124,58,237,0.8))", animation: `nodePulse 2s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function DedicatedAnimation() {
  const [active, setActive] = useState(0);
  const [loads, setLoads] = useState([72, 45, 88, 61]);
  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => (p + 1) % 4);
      setLoads(prev => prev.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 15))));
    }, 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes dedFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}} @keyframes blinkLed{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
      <div style={{ animation: "dedFloat 3.8s ease-in-out infinite", display: "flex", flexDirection: "column", gap: 12, zIndex: 10 }}>
        {[0, 1, 2, 3].map(i => {
          const isActive = active === i;
          const load = Math.round(loads[i]);
          return (
            <div key={i} style={{
              position: "relative", display: "flex", alignItems: "center", gap: 12,
              padding: "14px 20px", borderRadius: 12, width: 250,
              background: isActive ? "rgba(124,58,237,0.07)" : "rgba(245,243,255,0.9)",
              border: `1px solid ${isActive ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.1)"}`,
              boxShadow: isActive ? "0 0 20px rgba(124,58,237,0.15)" : "none", transition: "all 0.5s",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? "#7c3aed" : "#c4b5fd", boxShadow: isActive ? "0 0 8px rgba(124,58,237,1)" : "none", flexShrink: 0, transition: "all 0.3s", animation: isActive ? "blinkLed 1s ease-in-out infinite" : "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: isActive ? "#7c3aed" : "#9d89b8" }}>NODE-{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 9, fontFamily: "monospace", color: isActive ? "#a855f7" : "#c4b5fd" }}>{load}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, overflow: "hidden", background: "rgba(124,58,237,0.1)" }}>
                  <div style={{ height: "100%", borderRadius: 999, width: `${load}%`, background: isActive ? "linear-gradient(90deg,#7c3aed,#c084fc)" : "rgba(124,58,237,0.2)", boxShadow: isActive ? "0 0 8px rgba(124,58,237,0.6)" : "none", transition: "all 0.7s" }} />
                </div>
              </div>
              <span style={{ fontSize: 9, fontFamily: "monospace", padding: "3px 8px", borderRadius: 6, border: `1px solid ${isActive ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.1)"}`, color: isActive ? "#7c3aed" : "#c4b5fd", flexShrink: 0 }}>{isActive ? "ACTIVE" : "IDLE"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SharedAnimation() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => { setProgress(p => { if (p >= 100) { setStage(s => (s + 1) % 3); return 0; } return p + 1.5; }); }, 50);
    return () => clearInterval(t);
  }, []);
  const stages = ["Building...", "Uploading...", "Live! ✓"];
  const files: [string, string][] = [["index.html", "#7c3aed"], ["style.css", "#a855f7"], ["app.js", "#c084fc"], ["logo.svg", "#6d28d9"], ["favicon.ico", "#8b5cf6"]];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes sharedFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div style={{ animation: "sharedFloat 4s ease-in-out infinite", position: "relative", width: 240, borderRadius: 16, overflow: "hidden", boxShadow: "0 0 40px rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(124,58,237,0.1)", background: "#faf9ff" }}>
          {[["#ff5f57"], ["#febc2e"], ["#28c840"]].map(([c], i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
          <div style={{ marginLeft: 8, flex: 1, borderRadius: 4, padding: "2px 8px", fontSize: 9, fontFamily: "monospace", background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)", color: "rgba(124,58,237,0.6)" }}>colobix.com</div>
        </div>
        <div style={{ padding: "16px", background: "#ffffff", display: "flex", flexDirection: "column", gap: 10 }}>
          {files.map(([name, color]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", flex: 1, color: "#6b5a8a" }}>{name}</span>
              <div style={{ width: 48, height: 4, borderRadius: 999, overflow: "hidden", background: "rgba(124,58,237,0.08)" }}>
                <div style={{ height: "100%", borderRadius: 999, background: color, width: "60%" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 16px 16px", background: "#ffffff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontFamily: "monospace", marginBottom: 6, color: "#7c3aed" }}>
            <span>{stages[stage]}</span><span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, overflow: "hidden", background: "rgba(124,58,237,0.08)" }}>
            <div style={{ height: "100%", borderRadius: 999, width: `${progress}%`, background: "linear-gradient(90deg,#7c3aed,#c084fc)", transition: "width 0.1s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteAnimation() {
  const [val, setVal] = useState(0);
  const dirRef = useRef(1);
  useEffect(() => {
    const t = setInterval(() => { setVal(p => { const next = p + dirRef.current * 1.5; if (next >= 98 || next <= 2) dirRef.current *= -1; return Math.max(0, Math.min(100, next)); }); }, 30);
    return () => clearInterval(t);
  }, []);
  const speed = Math.round(val);
  const pops = ["SIN", "LHR", "JFK", "FRA", "SYD"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes webFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}} @keyframes popPing{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(2);opacity:1}}`}</style>
      <div style={{ animation: "webFloat 3.8s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, zIndex: 10 }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", transform: "rotate(-135deg)" }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="10" strokeLinecap="round" strokeDasharray="236" strokeDashoffset="59" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={`hsl(${270 - speed * 0.5},80%,55%)`} strokeWidth="10" strokeLinecap="round"
              strokeDasharray="236" strokeDashoffset={236 - (177 * speed / 100)}
              style={{ filter: `drop-shadow(0 0 8px hsl(${270 - speed * 0.5},80%,55%))`, transition: "all 0.08s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "monospace", color: "#7c3aed", textShadow: "0 0 20px rgba(124,58,237,0.4)" }}>{speed}</span>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#9d89b8", marginTop: 4 }}>ms / load</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {pops.map((code, i) => (
            <div key={code} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ position: "relative", width: 10, height: 10 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#a855f7", animation: `popPing 1.8s ease-in-out infinite`, animationDelay: `${i * 0.22}s`, boxShadow: "0 0 8px rgba(168,85,247,0.8)" }} />
              </div>
              <span style={{ fontSize: 9, fontFamily: "monospace", color: "#9d89b8" }}>{code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Animations = [VpsAnimation, CloudAnimation, DedicatedAnimation, SharedAnimation, WebsiteAnimation];

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

export default function Products() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView();
  const product = products[active];
  const Animation = Animations[active];

  return (
    <section id="products" style={{ position: "relative", background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.08)", overflow: "hidden" }}>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.025) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div ref={ref} style={{ position: "relative", maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <div style={{ marginBottom: 56, transition: "all 0.7s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
          <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>What we offer</span>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 800, marginTop: 12, color: "#1a0533", fontFamily: "var(--font-syne)" }}>
            Our <span style={{ color: "#7c3aed" }}>Products</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36, transition: "all 0.7s 0.1s", opacity: inView ? 1 : 0 }}>
          {products.map((p, i) => (
            <button key={p.id} onClick={() => setActive(i)} style={{
              padding: "10px 20px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
              background: active === i ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "transparent",
              border: active === i ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(124,58,237,0.15)",
              color: active === i ? "#fff" : "#6b5a8a",
              boxShadow: active === i ? "0 4px 15px rgba(124,58,237,0.3)" : "none",
              transition: "all 0.3s",
            }}>{p.icon} {p.label}</button>
          ))}
        </div>

        {/* Card */}
        <div key={product.id} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(124,58,237,0.12)", boxShadow: "0 20px 60px rgba(124,58,237,0.08)",
          animation: inView ? "fadeSlide 0.4s ease-out" : "none",
        }}>
          {/* Animation panel */}
          <div style={{ position: "relative", minHeight: 420, background: "linear-gradient(135deg,#faf9ff,#f5f3ff)", borderRight: "1px solid rgba(124,58,237,0.1)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.6),transparent)" }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(#7c3aed 1px,transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 20, display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(124,58,237,0.7)" }}>Live Preview</span>
            </div>
            <div style={{ position: "absolute", inset: 0 }}><Animation /></div>
          </div>

          {/* Text panel */}
          <div style={{ padding: "2.5rem", background: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7c3aed" }}>{product.tagline}</span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: 8, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>{product.label}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#6b5a8a", marginBottom: 28 }}>{product.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {product.specs.map(s => (
                  <li key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", flexShrink: 0 }}>
                      <svg style={{ width: 10, height: 10 }} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span style={{ color: "#1a0533" }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(124,58,237,0.08)", display: "flex", alignItems: "center", gap: 20 }}>
              <a href="#pricing" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: "0.875rem",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
                textDecoration: "none", boxShadow: "0 4px 15px rgba(124,58,237,0.3)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(124,58,237,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >Get Started <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></a>
              <a href="#" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#7c3aed", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#a855f7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#7c3aed")}
              >Read more →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}