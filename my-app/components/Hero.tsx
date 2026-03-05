"use client";
export default function Hero() {
  const stats = [
    { num: "99.99%", label: "Uptime SLA" },
    { num: "12ms", label: "Avg Latency" },
    { num: "40+", label: "Data Centers" },
    { num: "10k+", label: "Active Clients" },
  ];

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "7rem 5% 5rem", overflow: "hidden", background: "#ffffff",
    }}>
      <style>{`
        @keyframes heroPing { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(2);opacity:0.3} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glow blobs */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%)",
        top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)",
        bottom: "10%", right: "10%", pointerEvents: "none",
      }} />

      {/* Badge */}
      <div style={{
        position: "relative", display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
        color: "#7c3aed", padding: "6px 18px", borderRadius: 999,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a855f7", display: "inline-block", animation: "heroPing 1.8s ease-in-out infinite" }} />
        Enterprise-Grade Infrastructure
      </div>

      <h1 style={{
        position: "relative", fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 800,
        lineHeight: 1.1, maxWidth: 860, marginBottom: 24, letterSpacing: "-0.03em",
        color: "#1a0533", fontFamily: "var(--font-syne)",
      }}>
        The Server Platform<br />Built for{" "}
        <span style={{
          background: "linear-gradient(135deg,#7c3aed,#a855f7,#6d28d9)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Scale</span>
      </h1>

      <p style={{ position: "relative", color: "#6b5a8a", fontSize: "1.1rem", maxWidth: 500, marginBottom: 40, fontWeight: 300, lineHeight: 1.7 }}>
        Colobix delivers blazing-fast, ultra-reliable server infrastructure for businesses that cannot afford downtime.
      </p>

      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
        <a href="#pricing" style={{
          background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
          padding: "14px 32px", borderRadius: 10, fontWeight: 700,
          textDecoration: "none", fontSize: 15, boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
          transition: "all 0.3s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 35px rgba(124,58,237,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >Start Project</a>
        <a href="#features" style={{
          border: "1.5px solid rgba(124,58,237,0.25)", color: "#7c3aed",
          padding: "14px 32px", borderRadius: 10, fontWeight: 600,
          textDecoration: "none", fontSize: 15, background: "transparent",
          transition: "all 0.3s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
        >Explore Features →</a>
      </div>

      {/* Stats */}
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 56, marginTop: 80, justifyContent: "center" }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            {i > 0 && <div style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 1, background: "rgba(124,58,237,0.12)" }} />}
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1a0533", fontFamily: "var(--font-syne)" }}>{s.num}</div>
            <div style={{ fontSize: 11, color: "#9d89b8", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}