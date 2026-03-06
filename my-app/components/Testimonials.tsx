"use client";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  { stars: 5, text: "We migrated our entire SaaS stack to Colobix. The latency improvement was immediate — p95 response time dropped by over 60%.", name: "James Mercer", role: "CTO, Stackify", initials: "JM", color: "#7c3aed" },
  { stars: 5, text: "Colobix's support team is unlike any provider before. Issues get resolved in minutes. Their infra is rock solid.", name: "Priya Nair", role: "DevOps Lead, Lumitech", initials: "PN", color: "#a855f7" },
  { stars: 5, text: "The DDoS protection is worth every penny. We took a 400Gbps hit last quarter and our users didn't notice a thing.", name: "Marcus Schulz", role: "Infrastructure Eng, PayVault", initials: "MS", color: "#6d28d9" },
  { stars: 5, text: "Provisioning is instantaneous. We scaled from 2 to 40 nodes during Black Friday with zero downtime.", name: "Sara Lindqvist", role: "Eng Director, ShopFlow", initials: "SL", color: "#8b5cf6" },
  { stars: 5, text: "Best price-to-performance ratio we've ever found. Colobix simply outperforms the big cloud providers.", name: "Tom Nakamura", role: "Founder, ByteLab", initials: "TN", color: "#7c3aed" },
  { stars: 5, text: "Their global PoPs cut our international latency in half. Users in Asia-Pacific finally get the fast experience they deserve.", name: "Leila Hosseini", role: "VP Engineering, Nexora", initials: "LH", color: "#a855f7" },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      width: 360, flexShrink: 0, margin: "0 12px",
      background: "#fff", border: "1px solid rgba(124,58,237,0.1)",
      borderRadius: 20, padding: "1.75rem",
      boxShadow: "0 4px 20px rgba(124,58,237,0.06)",
      transition: "all 0.3s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,58,237,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ color: "#a855f7", letterSpacing: "0.1em", fontSize: "1.1rem", marginBottom: 16 }}>{"★".repeat(t.stars)}</div>
      <p style={{ color: "#5b4d7a", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${t.color}18`, border: `1.5px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: t.color }}>{t.initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#12002e" }}>{t.name}</div>
          <div style={{ color: "#9d88c0", fontSize: "0.75rem" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, visible } = useReveal();
  const doubled = [...testimonials, ...testimonials];
  return (
    <section id="clients" style={{ background: "#fff", borderTop: "1px solid rgba(124,58,237,0.07)", overflow: "hidden" }}>
      <div ref={ref} style={{ padding: "7rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto 56px", padding: "0 5%" }}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>Testimonials</span>
          </div>
          <h2 className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, marginTop: 12, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}>
            Trusted by engineering<br /><span className="grad-text">teams worldwide</span>
          </h2>
        </div>
        {/* Marquee */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(90deg,#fff,transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(-90deg,#fff,transparent)", zIndex: 2 }} />
          <div className="marquee-track" style={{ padding: "12px 0" }}>
            {doubled.map((t, i) => <Card key={i} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}