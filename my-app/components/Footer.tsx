"use client";
import { useReveal } from "@/hooks/useReveal";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Docs", "Status", "Contact", "Security"],
};

export default function Footer() {
  const { ref, visible } = useReveal();
  return (
    <footer style={{ background: "#12002e", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes floatOrb2{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,-15px)}}`}</style>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.12),transparent 70%)", top: -100, left: -100, filter: "blur(40px)", animation: "floatOrb2 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.08),transparent 70%)", bottom: -80, right: -80, filter: "blur(40px)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 5% 0", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(168,85,247,0.12)" }}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <a href="#" style={{ textDecoration: "none", display: "block", marginBottom: 20 }}>
              <img src="/colobix-logo.png" alt="Colobix" style={{ height: 56, width: 88, objectFit: "contain" }} />
            </a>
            <p style={{ color: "rgba(196,181,253,0.7)", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: 260 }}>
              Enterprise server infrastructure for teams that demand reliability, performance, and speed.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {["𝕏", "in", "gh"].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(196,181,253,0.6)", fontSize: "0.8rem", textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.color = "#c4b5fd"; e.currentTarget.style.background = "rgba(168,85,247,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"; e.currentTarget.style.color = "rgba(196,181,253,0.6)"; e.currentTarget.style.background = "rgba(168,85,247,0.08)"; }}
                >{s}</a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items], ci) => (
            <div key={title} className={`reveal reveal-delay-${ci + 1} ${visible ? "visible" : ""}`}>
              <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20, color: "rgba(196,181,253,0.5)", fontFamily: "var(--font-syne)" }}>{title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ color: "rgba(196,181,253,0.7)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(196,181,253,0.7)")}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(196,181,253,0.4)", fontSize: "0.8rem" }}>© {new Date().getFullYear()} Colobix. All rights reserved. Your Servers, Our Priority.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(196,181,253,0.4)", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(196,181,253,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(196,181,253,0.4)")}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}