"use client";
export default function LogoStrip() {
  const brands = ["AWS Partner", "Cloudflare", "Intel", "AMD", "Nvidia", "Equinix", "Juniper", "Cisco"];
  const doubled = [...brands, ...brands];
  return (
    <div style={{
      borderTop: "1px solid rgba(124,58,237,0.07)",
      borderBottom: "1px solid rgba(124,58,237,0.07)",
      background: "rgba(245,243,255,0.5)",
      padding: "20px 0", overflow: "hidden", position: "relative",
    }}>
      {/* fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(90deg,rgba(250,249,255,1),transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(-90deg,rgba(250,249,255,1),transparent)", zIndex: 2 }} />
      <div className="marquee-track">
        {doubled.map((b, i) => (
          <div key={i} style={{
            padding: "0 40px", fontSize: "0.8rem", fontWeight: 700,
            color: "#9d88c0", letterSpacing: "0.15em", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(124,58,237,0.25)", display: "inline-block", flexShrink: 0 }} />
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}