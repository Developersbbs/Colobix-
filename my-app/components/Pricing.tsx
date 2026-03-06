"use client";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  { name: "Starter", price: "$29", period: "/mo", desc: "Perfect for small projects and early-stage startups.", features: ["2 vCPU Cores", "4 GB RAM", "100 GB NVMe SSD", "2 TB Bandwidth", "1 Gbps Port", "Basic DDoS Protection"], disabled: ["Managed Backups", "Priority Support"], featured: false, cta: "Get Started" },
  { name: "Pro",     price: "$99", period: "/mo", desc: "Ideal for growing businesses with production workloads.", features: ["8 vCPU Cores", "16 GB RAM", "500 GB NVMe SSD", "10 TB Bandwidth", "10 Gbps Port", "Advanced DDoS Protection", "Managed Daily Backups"], disabled: ["Dedicated Account Manager"], featured: true, cta: "Get Started" },
  { name: "Enterprise", price: "Custom", period: "contact us", desc: "Custom hardware, SLAs, and dedicated support for large organizations.", features: ["Bare-Metal or Custom Config", "Unlimited RAM Options", "Petabyte-scale Storage", "Unlimited Bandwidth", "100 Gbps Port", "Full DDoS Suite", "Custom Backup Policies", "Dedicated Account Manager"], disabled: [], featured: false, cta: "Contact Sales" },
];

export default function Pricing() {
  const { ref, visible } = useReveal();
  return (
    <section id="pricing" style={{ background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.07)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)", filter: "blur(40px)" }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 5%" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>Pricing</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}>
            Simple, <span className="grad-text">transparent</span> pricing
          </h2>
          <p style={{ color: "#5b4d7a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 440, margin: "0 auto" }}>No hidden fees. Scale up or down anytime.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
          {plans.map((plan, i) => (
            <div key={plan.name} className={`reveal reveal-delay-${i + 1} ${visible ? "visible" : ""}`} style={{
              position: "relative", borderRadius: 24, padding: "2.5rem",
              border: plan.featured ? "2px solid rgba(124,58,237,0.5)" : "1px solid rgba(124,58,237,0.1)",
              background: plan.featured ? "linear-gradient(160deg,rgba(124,58,237,0.06),rgba(168,85,247,0.04))" : "#fff",
              boxShadow: plan.featured ? "0 20px 60px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.1)" : "0 4px 20px rgba(124,58,237,0.04)",
              transition: "transform 0.3s, box-shadow 0.3s", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = plan.featured ? "0 32px 80px rgba(124,58,237,0.22)" : "0 20px 60px rgba(124,58,237,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.featured ? "0 20px 60px rgba(124,58,237,0.15)" : "0 4px 20px rgba(124,58,237,0.04)"; }}
            >
              {/* shimmer on hover */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.5) 50%,transparent 60%)", opacity: 0, transition: "opacity 0.3s" }} />
              {plan.featured && (
                <>
                  <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "5px 20px", borderRadius: "0 0 12px 12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Most Popular</div>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed)" }} />
                </>
              )}
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7c3aed", marginBottom: 16, marginTop: plan.featured ? 16 : 0 }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: "3.2rem", fontWeight: 800, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.04em", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ color: "#9d88c0", fontSize: "0.875rem" }}>{plan.period}</span>
              </div>
              <p style={{ color: "#5b4d7a", fontSize: "0.875rem", borderBottom: "1px solid rgba(124,58,237,0.08)", paddingBottom: 20, marginBottom: 20 }}>{plan.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#12002e" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, color: "#7c3aed", fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.disabled.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#c4b5fd" }}>
                    <span style={{ width: 18, height: 18, flexShrink: 0 }}>–</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={plan.featured ? "btn-glow" : ""} style={{
                display: "block", textAlign: "center", padding: "13px",
                borderRadius: 12, fontWeight: 700, fontSize: "0.9rem",
                textDecoration: "none", transition: "all 0.25s",
                ...(plan.featured ? { boxShadow: "0 4px 20px rgba(124,58,237,0.35)" } : {
                  border: "1.5px solid rgba(124,58,237,0.2)", color: "#7c3aed", background: "transparent"
                }),
              }}
                onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)"; } }}
                onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; } }}
              >{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}