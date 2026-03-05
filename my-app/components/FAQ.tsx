"use client";
import { useState } from "react";

const faqs = [
  { q: "What makes Colobix different from other providers?", a: "Colobix combines enterprise-grade bare-metal hardware with a developer-friendly control panel, real-time monitoring, and sub-minute support response times — at competitive pricing." },
  { q: "Do you offer a free trial?", a: "Yes. All new accounts get a 7-day free trial on our Starter and Pro plans with no credit card required." },
  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your plan at any time from the dashboard. Upgrades are instant; downgrades apply at the next billing cycle." },
  { q: "Where are your data centers located?", a: "We have 40+ PoPs across North America, Europe, Asia-Pacific, South America, Middle East, and Africa." },
  { q: "What kind of support do you offer?", a: "All plans include 24/7 ticket support. Pro and Enterprise clients also get access to live chat and a dedicated Slack channel." },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. Enterprise contracts are available for clients who prefer annual billing with discounts." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ background: "#ffffff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>FAQ</span>
        <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>Frequently asked questions</h2>
        <p style={{ color: "#6b5a8a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 480, marginBottom: 56 }}>Still have questions? Reach out to our team anytime.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 760 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#faf9ff", border: `1px solid ${open === i ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.1)"}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.3s" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 28px", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "0.9rem", color: open === i ? "#7c3aed" : "#1a0533", gap: 16, transition: "color 0.2s",
              }}>
                {faq.q}
                <span style={{ color: "#7c3aed", fontSize: "1.3rem", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                <p style={{ padding: "0 28px 20px", color: "#6b5a8a", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}