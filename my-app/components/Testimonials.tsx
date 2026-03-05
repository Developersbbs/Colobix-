"use client";
const testimonials = [
  { stars: 5, text: "We migrated our entire SaaS stack to Colobix six months ago. The latency improvement was immediate — our p95 response time dropped by over 60%.", name: "James Mercer", role: "CTO, Stackify", initials: "JM" },
  { stars: 5, text: "Colobix's support team is unlike any provider we've used before. Issues get resolved in minutes, not hours. Their infra is rock solid.", name: "Priya Nair", role: "DevOps Lead, Lumitech", initials: "PN" },
  { stars: 5, text: "The DDoS protection alone is worth every penny. We took a 400Gbps hit last quarter and our users didn't notice a thing.", name: "Marcus Schulz", role: "Infrastructure Eng, PayVault", initials: "MS" },
];

export default function Testimonials() {
  return (
    <section id="clients" style={{ background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Testimonials</span>
        <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>Trusted by engineering teams worldwide</h2>
        <p style={{ color: "#6b5a8a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 480, marginBottom: 56 }}>Here's what our clients say about running on Colobix.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: "#ffffff", border: "1px solid rgba(124,58,237,0.1)", borderRadius: 20, padding: "2rem",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ color: "#a855f7", letterSpacing: "0.15em", marginBottom: 16, fontSize: "1.1rem" }}>{"★".repeat(t.stars)}</div>
              <p style={{ color: "#6b5a8a", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 24 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: "#7c3aed" }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1a0533" }}>{t.name}</div>
                  <div style={{ color: "#9d89b8", fontSize: "0.75rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}