"use client";
const plans = [
  { name: "Starter", price: "$29", period: "per month", desc: "Perfect for small projects and early-stage startups.", features: ["2 vCPU Cores", "4 GB RAM", "100 GB NVMe SSD", "2 TB Bandwidth", "1 Gbps Port", "Basic DDoS Protection"], disabled: ["Managed Backups", "Priority Support"], featured: false, cta: "Get Started" },
  { name: "Pro", price: "$99", period: "per month", desc: "Ideal for growing businesses with production workloads.", features: ["8 vCPU Cores", "16 GB RAM", "500 GB NVMe SSD", "10 TB Bandwidth", "10 Gbps Port", "Advanced DDoS Protection", "Managed Daily Backups"], disabled: ["Dedicated Account Manager"], featured: true, cta: "Get Started" },
  { name: "Enterprise", price: "Custom", period: "contact us", desc: "Custom hardware, SLAs, and dedicated support for large organizations.", features: ["Bare-Metal or Custom Config", "Unlimited RAM Options", "Petabyte-scale Storage", "Unlimited Bandwidth", "100 Gbps Port", "Full DDoS Suite", "Custom Backup Policies", "Dedicated Account Manager"], disabled: [], featured: false, cta: "Contact Sales" },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#ffffff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Pricing</span>
        <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>Simple, transparent pricing</h2>
        <p style={{ color: "#6b5a8a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 440, marginBottom: 56 }}>No hidden fees, no surprise bills. Scale up or down at any time.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              position: "relative", borderRadius: 20, padding: "2.5rem",
              border: plan.featured ? "1.5px solid rgba(124,58,237,0.4)" : "1px solid rgba(124,58,237,0.1)",
              background: plan.featured ? "linear-gradient(160deg,rgba(124,58,237,0.05),rgba(168,85,247,0.03))" : "#faf9ff",
              boxShadow: plan.featured ? "0 8px 40px rgba(124,58,237,0.12)" : "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 50px rgba(124,58,237,0.15)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = plan.featured ? "0 8px 40px rgba(124,58,237,0.12)" : "none"; }}
            >
              {plan.featured && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 16px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Most Popular</div>
              )}
              <div style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>{plan.name}</div>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "#1a0533", fontFamily: "var(--font-syne)", marginBottom: 4 }}>{plan.price}</div>
              <div style={{ color: "#9d89b8", fontSize: "0.875rem", marginBottom: 16 }}>{plan.period}</div>
              <p style={{ color: "#6b5a8a", fontSize: "0.875rem", borderBottom: "1px solid rgba(124,58,237,0.08)", paddingBottom: 20, marginBottom: 20 }}>{plan.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#1a0533" }}>
                    <span style={{ color: "#7c3aed", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
                {plan.disabled.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#c4b5fd" }}>
                    <span>–</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: "block", textAlign: "center", padding: "12px", borderRadius: 10,
                fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", transition: "all 0.2s",
                background: plan.featured ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "transparent",
                color: plan.featured ? "#fff" : "#7c3aed",
                border: plan.featured ? "none" : "1.5px solid rgba(124,58,237,0.25)",
                boxShadow: plan.featured ? "0 4px 15px rgba(124,58,237,0.3)" : "none",
              }}
                onMouseEnter={(e) => { if (!plan.featured) { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; } }}
                onMouseLeave={(e) => { if (!plan.featured) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; } }}
              >{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}