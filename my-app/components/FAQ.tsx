"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  { q: "What makes Colobix different from other providers?", a: "Colobix combines enterprise-grade bare-metal hardware with a developer-friendly control panel, real-time monitoring, and sub-minute support response times — at competitive pricing." },
  { q: "Do you offer a free trial?", a: "Yes. All new accounts get a 7-day free trial on Starter and Pro plans with no credit card required." },
  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. Change your plan at any time from the dashboard. Upgrades are instant; downgrades apply at the next billing cycle." },
  { q: "Where are your data centers located?", a: "We have 40+ PoPs across North America, Europe, Asia-Pacific, South America, Middle East, and Africa." },
  { q: "What kind of support do you offer?", a: "All plans include 24/7 ticket support. Pro and Enterprise clients get live chat and a dedicated Slack channel." },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. Enterprise annual contracts are available with discounts." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, visible } = useReveal();
  return (
    <section id="faq" style={{ background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.07)" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 5%", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "start" }}>
        {/* Left sticky header */}
        <div style={{ position: "sticky", top: 120 }}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>FAQ</span>
          </div>
          <h2 className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 20, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Frequently asked<br /><span className="grad-text">questions</span>
          </h2>
          <p className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ color: "#5b4d7a", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32 }}>
            Can't find your answer? Our team is available around the clock.
          </p>
          <a href="#contact" className={`btn-glow reveal reveal-delay-3 ${visible ? "visible" : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, fontSize: "0.875rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }}>
            Contact Support
          </a>
        </div>
        {/* Right accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} ${visible ? "visible" : ""}`} style={{
              background: "#fff", border: `1px solid ${open === i ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.1)"}`,
              borderRadius: 16, overflow: "hidden", transition: "border-color 0.3s, box-shadow 0.3s",
              boxShadow: open === i ? "0 8px 30px rgba(124,58,237,0.08)" : "none",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 24px", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "0.9rem", color: open === i ? "#7c3aed" : "#12002e",
                gap: 16, transition: "color 0.2s", fontFamily: "var(--font-outfit), sans-serif",
              }}>
                {faq.q}
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: open === i ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#7c3aed", fontSize: "1.2rem", transition: "all 0.3s",
                  transform: open === i ? "rotate(45deg)" : "none",
                }}>+</div>
              </button>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <p style={{ padding: "0 24px 20px", color: "#5b4d7a", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}