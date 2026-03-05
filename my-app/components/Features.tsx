"use client";
const features = [
  { icon: "🖥️", title: "SSD Disk Drives", desc: "Top-notch dedicated servers with blazing NVMe SSD storage for unmatched I/O performance." },
  { icon: "🌐", title: "40 GB/s Network", desc: "Guaranteed excellent experience with high-speed bandwidth for your success." },
  { icon: "🛡️", title: "DDoS Protection", desc: "Full-stack DDoS mitigation with up to 2Tbps scrubbing capacity across all PoPs." },
  { icon: "📡", title: "Dedicated IP", desc: "One of many premium features is a dedicated IP for each hosting plan." },
  { icon: "⏱️", title: "99.9% Uptime Guarantee", desc: "Multiple datacenter locations, cooling, generators, and constant monitoring for true reliability." },
  { icon: "💬", title: "24/7 Support", desc: "Available to help and find answers to questions as soon as they come up, in real-time." },
];

export default function Features() {
  return (
    <section id="features" style={{ background: "#ffffff", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "7rem 5%" }}>
        <span style={{ color: "#7c3aed", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Why Colobix</span>
        <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 16, color: "#1a0533", fontFamily: "var(--font-syne)" }}>
          Everything your infrastructure needs
        </h2>
        <p style={{ color: "#6b5a8a", fontSize: "1.05rem", fontWeight: 300, maxWidth: 480, marginBottom: 56 }}>
          From dedicated bare-metal to fully managed cloud — the right solution for any workload.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(124,58,237,0.08)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(124,58,237,0.1)" }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#ffffff", padding: "2.5rem", position: "relative", cursor: "default",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#faf9ff";
                el.style.boxShadow = "inset 0 0 0 1px rgba(124,58,237,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#ffffff";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 20, transition: "all 0.3s",
              }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, color: "#1a0533", fontSize: "1rem", marginBottom: 8, fontFamily: "var(--font-syne)" }}>{f.title}</h3>
              <p style={{ color: "#6b5a8a", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}