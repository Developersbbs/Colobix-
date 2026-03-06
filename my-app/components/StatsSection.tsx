"use client";
import { useEffect, useState, useRef } from "react";

function useRevealLocal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
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

function ServerVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const logs = [
    { text: "→ srv-01 ONLINE  [78% CPU]",  color: A },
    { text: "→ srv-02 ONLINE  [45% CPU]",  color: "#22c55e" },
    { text: "→ srv-03 WARN    [91% CPU]",  color: "#f59e0b" },
    { text: "→ net-gw SYNCED  [12ms]",     color: A },
    { text: "→ backup IDLE    [ready]",    color: "#22c55e" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontFamily: "inter", fontSize: 9, color: "rgba(46,18,74,0.35)", letterSpacing: "0.08em" }}>
          colobix://live-monitor
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", animation: "svBlink 1.4s infinite" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "#15803d", fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        {logs.map((line, i) => (
          <div key={i} style={{
            fontFamily: "monospace", fontSize: 10,
            color: i === (tick % logs.length) ? line.color : "rgba(46,18,74,0.3)",
            transition: "color 0.35s ease",
            display: "flex", alignItems: "center", gap: 5,
            padding: "3px 0",
            borderBottom: i < logs.length - 1 ? "1px solid rgba(46,18,74,0.04)" : "none",
          }}>
            {i === (tick % logs.length) && (
              <span style={{ color: line.color, animation: "svBlink 0.7s step-end infinite", fontSize: 8 }}>▶</span>
            )}
            {line.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(46,18,74,0.07)", display: "flex", gap: 20 }}>
        {[["CPU","62%",A],["MEM","38%","#f59e0b"],["NET","12ms","#22c55e"]].map(([lbl,val,col]) => (
          <div key={lbl}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(46,18,74,0.3)", marginBottom: 2 }}>{lbl}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: col, fontWeight: 700 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  id, label, value, suffix, desc, decimals = 0, accent, hov, setHov, active,
}: {
  id: string; label: string; value: number; suffix: string; desc: string;
  decimals?: number; accent: string; hov: string | null;
  setHov: (v: string | null) => void; active: boolean;
}) {
  const isHov = hov === id;
  return (
    <div
      onMouseEnter={() => setHov(id)}
      onMouseLeave={() => setHov(null)}
      style={{
        background: isHov ? "#fff" : "#faf8fc",
        border: `1px solid ${isHov ? accent + "30" : "rgba(46,18,74,0.08)"}`,
        borderRadius: 16,
        padding: "20px 22px",
        boxShadow: isHov
          ? `0 12px 32px rgba(46,18,74,0.1), 0 0 0 1px ${accent}18`
          : "0 1px 4px rgba(46,18,74,0.04)",
        transform: isHov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 64, height: 64,
        background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)`,
        pointerEvents: "none",
        opacity: isHov ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      <p style={{
        margin: "0 0 10px",
        fontSize: 9, fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.18em",
        color: "rgba(46,18,74,0.4)",
        fontFamily: "var(--font-inter, 'Inter', sans-serif)",
      }}>{label}</p>

      <div style={{
        fontSize: "2.5rem", fontWeight: 700,
        fontFamily: "var(--font-bodoni, 'Bodoni Moda', serif)",
        letterSpacing: "-0.03em", lineHeight: 1,
        color: P,
        display: "flex", alignItems: "flex-end", gap: 2,
      }}>
        <Counter target={value} active={active} decimals={decimals} />
        <span style={{ fontSize: "0.42em", fontWeight: 600, color: accent, marginBottom: "0.12em", fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>{suffix}</span>
      </div>

      <p style={{ margin: "6px 0 0", fontSize: "0.72rem", color: "rgba(46,18,74,0.38)", fontFamily: "var(--font-inter, 'Inter', sans-serif)", lineHeight: 1.5 }}>
        {desc}
      </p>

      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2, borderRadius: "0 0 0 16px",
        width: isHov ? "100%" : "0%",
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  );
}

export default function Stats() {
  const { ref, visible } = useRevealLocal(0.1);
  const [hov, setHov] = useState<string | null>(null);

  return (
    <section style={{ background: "#fff", borderTop: "1px solid rgba(46,18,74,0.06)", borderBottom: "1px solid rgba(46,18,74,0.06)" }}>

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "5.5rem 5%" }}>

        {/* Header */}
        <div className={`sr${visible ? " in" : ""}`} style={{ animationDelay: "0s", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 1.5, background: A }} />
            <span style={{
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
              textTransform: "uppercase", color: A,
            }}>Platform Overview · Q1 2025</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-bodoni, 'Bodoni Moda', serif)",
            fontSize: "clamp(2rem,3.8vw,2.9rem)", fontWeight: 700,
            color: P, margin: 0,
            letterSpacing: "-0.01em", lineHeight: 1.15,
          }}>
            Colobix{" "}
            <span style={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${A}, #c084fc)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>by the</span>{" "}
            numbers
          </h2>
          <p style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: "0.8rem", color: "rgba(46,18,74,0.35)",
            margin: "6px 0 0", letterSpacing: "0.02em",
          }}>Updated daily · All systems nominal</p>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 28, alignItems: "start" }}>

          {/* LEFT */}
          <div>
            <div className={`sr${visible ? " in" : ""}`} style={{ animationDelay: "0.08s" }}>
              <div style={{
                background: "#faf8fc",
                border: "1px solid rgba(46,18,74,0.08)",
                borderRadius: 18,
                overflow: "hidden",
                height: 252,
                boxShadow: "0 4px 24px rgba(46,18,74,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}>
                <ServerVisual />
              </div>
            </div>

            <div
              className={`sr${visible ? " in" : ""}`}
              style={{ animationDelay: "0.14s", display: "flex", gap: 10, marginTop: 12 }}
            >
              {/* Uptime badge */}
              <div style={{
                flex: 1,
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 14, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 2px 8px rgba(34,197,94,0.06)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 20px rgba(34,197,94,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(34,197,94,0.06)"; }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)", animation: "svBlink 2s infinite", flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, color: "#15803d", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Uptime</p>
                  <p style={{ margin: 0, fontFamily: "var(--font-bodoni,'Bodoni Moda',serif)", fontSize: "1.15rem", fontWeight: 700, color: "#15803d", letterSpacing: "-0.02em" }}>99.99%</p>
                </div>
              </div>

              {/* Latency badge */}
              <div style={{
                flex: 1,
                background: "linear-gradient(135deg, #faf5ff, #ede9fe)",
                border: "1px solid rgba(139,47,201,0.15)",
                borderRadius: 14, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 2px 8px rgba(139,47,201,0.06)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 20px rgba(139,47,201,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(139,47,201,0.06)"; }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${P},${A})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>⚡</div>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, color: "rgba(46,18,74,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Avg Latency</p>
                  <p style={{ margin: 0, fontFamily: "var(--font-bodoni,'Bodoni Moda',serif)", fontSize: "1.15rem", fontWeight: 700, color: P, letterSpacing: "-0.02em" }}>12ms</p>
                </div>
              </div>
            </div>

            {/* Achievement strip */}
            <div
              className={`sr achieve-card${visible ? " in" : ""}`}
              style={{
                animationDelay: "0.2s", marginTop: 12,
                background: "#faf8fc",
                border: "1px solid rgba(46,18,74,0.08)",
                borderRadius: 14, padding: "14px 18px",
                display: "flex", alignItems: "center", gap: 14,
                boxShadow: "0 1px 4px rgba(46,18,74,0.04)",
                cursor: "default",
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.05))",
                border: "1px solid rgba(245,158,11,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              }}>🏆</div>
              <div>
                <p style={{ margin: "0 0 2px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#b45309" }}>Annual Achievement · 2024</p>
                <p style={{ margin: 0, fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "0.78rem", color: "rgba(46,18,74,0.55)", lineHeight: 1.5 }}>
                  <strong style={{ color: A }}>Top 10 Hosting Provider</strong> in APAC — uptime & support excellence
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { id: "clients", label: "Total Clients",     value: 854,   suffix: "+", desc: "Businesses trusting Colobix",      accent: "#6366f1", decimals: 0 },
              { id: "uptime",  label: "Uptime SLA",        value: 99.99, suffix: "%", desc: "Guaranteed availability",           accent: "#22c55e", decimals: 2 },
              { id: "domains", label: "Active Domains",    value: 565,   suffix: "+", desc: "Hosted globally across all zones",  accent: A,         decimals: 0 },
              { id: "servers", label: "Dedicated Servers", value: 576,   suffix: "+", desc: "Bare-metal · 40+ PoP locations",    accent: "#f59e0b", decimals: 0 },
            ].map((s, i) => (
              <div
                key={s.id}
                className={`sr${visible ? " in" : ""}`}
                style={{ animationDelay: `${0.12 + i * 0.08}s` }}
              >
                <StatCard {...s} hov={hov} setHov={setHov} active={visible} />
              </div>
            ))}

            {/* Wide network card */}
            <div
              className={`sr${visible ? " in" : ""}`}
              style={{ gridColumn: "span 2", animationDelay: "0.45s" }}
            >
              <div
                onMouseEnter={() => setHov("net")}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: hov === "net" ? "#fff" : "#faf8fc",
                  border: `1px solid ${hov === "net" ? "rgba(139,47,201,0.2)" : "rgba(46,18,74,0.08)"}`,
                  borderRadius: 16, padding: "18px 22px",
                  boxShadow: hov === "net" ? "0 12px 32px rgba(46,18,74,0.1)" : "0 1px 4px rgba(46,18,74,0.04)",
                  transform: hov === "net" ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                  cursor: "default", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(46,18,74,0.4)" }}>Global Network</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "var(--font-bodoni,'Bodoni Moda',serif)", fontSize: "2rem", fontWeight: 700, color: P, letterSpacing: "-0.03em" }}>40+</span>
                      <span style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "0.8rem", color: A, fontWeight: 500 }}>Points of Presence</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["AS","EU","US","ME"].map(r => (
                      <div key={r} style={{
                        padding: "4px 10px", borderRadius: 6,
                        background: hov === "net" ? `${A}12` : "rgba(46,18,74,0.05)",
                        border: `1px solid ${hov === "net" ? `${A}25` : "rgba(46,18,74,0.08)"}`,
                        fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, fontWeight: 600,
                        color: hov === "net" ? A : "rgba(46,18,74,0.4)",
                        transition: "all 0.25s",
                      }}>{r}</div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 9, color: "rgba(46,18,74,0.3)", whiteSpace: "nowrap", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Avg Latency</span>
                  <div style={{ flex: 1, height: 4, background: "rgba(46,18,74,0.06)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: visible ? "18%" : "0%",
                      background: `linear-gradient(90deg, ${A}, #c084fc)`,
                      borderRadius: 999,
                      transition: "width 1.5s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: `0 0 8px ${A}60`,
                    }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-bodoni,'Bodoni Moda',serif)", fontSize: "0.95rem", fontWeight: 700, color: A, whiteSpace: "nowrap" }}>12ms</span>
                </div>

                <div style={{
                  position: "absolute", bottom: 0, left: 0,
                  height: 2, width: hov === "net" ? "100%" : "0%",
                  background: `linear-gradient(90deg, ${A}, #c084fc, transparent)`,
                  transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}