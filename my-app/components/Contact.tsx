"use client";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#ffffff", border: "1px solid rgba(124,58,237,0.15)",
  borderRadius: 10, padding: "12px 16px", fontSize: "0.875rem", color: "#1a0533",
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
};

export default function Contact() {
  return (
    <section id="contact" style={{ background: "#faf9ff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div>
            <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Contact</span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>Let's talk infrastructure</h2>
            <p style={{ color: "#6b5a8a", fontWeight: 300, lineHeight: 1.75, marginBottom: 36 }}>Whether you need a single VPS or a multi-region bare-metal deployment, our team will help you find the right solution.</p>
            {[{ icon: "📧", label: "hello@colobix.com" }, { icon: "📞", label: "+1 (888) 265-6249" }, { icon: "📍", label: "San Francisco, CA & Global" }].map((d) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{d.icon}</div>
                <span style={{ color: "#6b5a8a", fontSize: "0.875rem" }}>{d.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["First Name", "John"], ["Last Name", "Doe"]].map(([label, ph]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, color: "#6b5a8a", fontWeight: 600 }}>{label}</label>
                  <input type="text" placeholder={ph} style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.45)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.15)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#6b5a8a", fontWeight: 600 }}>Email</label>
              <input type="email" placeholder="john@company.com" style={inputStyle}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.45)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(124,58,237,0.15)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#6b5a8a", fontWeight: 600 }}>Plan Interest</label>
              <select style={inputStyle}
                onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "rgba(124,58,237,0.45)"; (e.target as HTMLSelectElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "rgba(124,58,237,0.15)"; (e.target as HTMLSelectElement).style.boxShadow = "none"; }}
              >
                <option value="">Select a plan</option>
                <option>Starter</option><option>Pro</option><option>Enterprise</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#6b5a8a", fontWeight: 600 }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your infrastructure needs..." style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(124,58,237,0.45)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(124,58,237,0.15)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
              />
            </div>
            <button style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
              padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem",
              border: "none", cursor: "pointer", boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >Send Message</button>
          </div>
        </div>
      </div>
    </section>
  );
}