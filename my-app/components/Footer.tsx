
"use client";
const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Docs", "Status", "Contact", "Security"],
};

export default function Footer() {
  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid rgba(124,58,237,0.1)", paddingTop: 56, paddingBottom: 32, paddingLeft: "5%", paddingRight: "5%" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
        <div>
          <a href="#" style={{ textDecoration: "none", display: "block", marginBottom: 16 }}>
            <img src="/colobix-logo.png" alt="Colobix" style={{ height: 56, width: 88, objectFit: "contain" }} />
          </a>
          <p style={{ color: "#6b5a8a", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 220 }}>
            Enterprise server infrastructure for teams that demand reliability and speed.
          </p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20, color: "#1a0533", fontFamily: "var(--font-syne)" }}>{title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map(item => (
                <li key={item}>
                  <a href="#" style={{ color: "#6b5a8a", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7c3aed")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b5a8a")}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid rgba(124,58,237,0.08)", flexWrap: "wrap", gap: 16 }}>
        <p style={{ color: "#9d89b8", fontSize: "0.8rem" }}>© {new Date().getFullYear()} Colobix. All rights reserved.</p>
        <div style={{ display: "flex", gap: 10 }}>
          {["𝕏", "in", "gh"].map(s => (
            <a key={s} href="#" style={{
              width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(124,58,237,0.12)",
              background: "rgba(124,58,237,0.04)", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#9d89b8", fontSize: "0.8rem", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.35)"; (e.currentTarget as HTMLElement).style.color = "#7c3aed"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.12)"; (e.currentTarget as HTMLElement).style.color = "#9d89b8"; }}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}