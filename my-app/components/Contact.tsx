"use client";
import { useReveal } from "@/hooks/useReveal";

export default function Contact() {
  const { ref, visible } = useReveal();
  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#faf9ff", border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: 10, padding: "13px 16px", fontSize: "0.875rem", color: "#12002e",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    fontFamily: "var(--font-outfit), sans-serif",
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
    e.currentTarget.style.background = "#fff";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(124,58,237,0.15)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "#faf9ff";
  };

  return (
    <section id="contact" style={{ background: "#fff", borderTop: "1px solid rgba(124,58,237,0.07)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05),transparent 70%)", filter: "blur(40px)" }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <div className={`reveal ${visible ? "visible" : ""}`}>
              <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em" }}>Contact</span>
            </div>
            <h2 className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 20, color: "#12002e", fontFamily: "var(--font-syne)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Let's talk<br /><span className="grad-text">infrastructure</span>
            </h2>
            <p className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ color: "#5b4d7a", fontWeight: 300, lineHeight: 1.8, marginBottom: 40, fontSize: "1rem" }}>
              Whether you need a single VPS or a multi-region bare-metal deployment, our team will architect the perfect solution.
            </p>
            {[
              { icon: "📧", label: "hello@colobix.com",       sub: "We reply within 15 minutes" },
              { icon: "📞", label: "+1 (888) 265-6249",        sub: "Available 24/7" },
              { icon: "📍", label: "San Francisco, CA & Global", sub: "40+ locations worldwide" },
            ].map((d, i) => (
              <div key={d.label} className={`reveal reveal-delay-${i + 2} ${visible ? "visible" : ""}`} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0, transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.14)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "scale(1)"; }}
                >{d.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#12002e" }}>{d.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9d88c0", marginTop: 2 }}>{d.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ background: "#faf9ff", border: "1px solid rgba(124,58,237,0.1)", borderRadius: 24, padding: "2.5rem", boxShadow: "0 12px 50px rgba(124,58,237,0.07)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[["First Name", "text", "John"], ["Last Name", "text", "Doe"]].map(([label, type, ph]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, color: "#5b4d7a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
                  <input type={type} placeholder={ph} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              ))}
            </div>
            {[["Email", "email", "john@company.com"]].map(([label, type, ph]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: "#5b4d7a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
                <input type={type} placeholder={ph} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: "#5b4d7a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Plan Interest</label>
              <select style={inputStyle as any} onFocus={onFocus} onBlur={onBlur}>
                <option value="">Select a plan</option>
                <option>Starter</option><option>Pro</option><option>Enterprise</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
              <label style={{ fontSize: 11, color: "#5b4d7a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your infrastructure needs..." style={{ ...inputStyle, resize: "vertical" } as any} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <button className="btn-glow" style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}>
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}