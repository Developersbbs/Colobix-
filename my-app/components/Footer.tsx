"use client";
import { useReveal } from "@/hooks/useReveal";
import { useState, useRef, useEffect } from "react";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Docs", "Status", "Contact", "Security"],
};

const socialIcons = [
  { label: "𝕏", href: "#" },
  { label: "in", href: "#" },
];

function MagneticSocialBtn({ label, href }: { label: string; href: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        width: 38, height: 38, borderRadius: 12,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)"}`,
        background: hovered
          ? "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(124,58,237,0.4))"
          : "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#ffffff" : "#e2d4f5",
        fontSize: "0.82rem", textDecoration: "none",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.15 : 1})`,
        transition: "border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s",
        boxShadow: hovered ? "0 0 18px rgba(168,85,247,0.5), inset 0 0 8px rgba(168,85,247,0.15)" : "none",
        cursor: "pointer", position: "relative", overflow: "hidden",
      }}
    >
      {hovered && (
        <span style={{
          position: "absolute", inset: 0, borderRadius: 12,
          background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25), transparent 70%)",
          animation: "pulseGlow 1.2s ease-in-out infinite",
        }} />
      )}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </a>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? "#ffffff" : "#ede9fe",
          fontSize: "0.9rem",
          fontWeight: 400,
          textDecoration: "none",
          transition: "color 0.2s",
          display: "inline-flex", alignItems: "center", gap: 6, position: "relative",
        }}
      >
        <span style={{
          display: "inline-block", width: 5, height: 5, borderRadius: "50%",
          background: hovered ? "#c084fc" : "rgba(255,255,255,0.3)",
          boxShadow: hovered ? "0 0 8px #c084fc" : "none",
          transition: "background 0.25s, box-shadow 0.25s", flexShrink: 0,
        }} />
        <span style={{ position: "relative" }}>
          {children}
          <span style={{
            position: "absolute", bottom: -2, left: 0, height: 1,
            width: hovered ? "100%" : "0%",
            background: "linear-gradient(90deg, #c084fc, #a855f7)",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 6px rgba(192,132,252,0.6)",
          }} />
        </span>
        <span style={{
          fontSize: "0.6rem", opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-4px)",
          transition: "opacity 0.2s, transform 0.2s", color: "#c084fc",
        }}>→</span>
      </a>
    </li>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "#ffffff" : "#d8b4fe",
        fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s", position: "relative",
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: -1, left: 0,
        height: "1px", width: hovered ? "100%" : "0%",
        background: "rgba(192,132,252,0.8)", transition: "width 0.25s ease",
      }} />
    </a>
  );
}

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      fontSize: "0.9rem",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      letterSpacing: "0.12em",
      color: "#ffffff",
      marginBottom: 22,
      marginTop: 0,
    }}>
      {children}
    </h4>
  );
}

export default function Footer() {
  const { ref, visible } = useReveal();
  const [logoHovered, setLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer style={{ background: "#3e2d56", position: "relative", overflow: "hidden", cursor: "default" }}>
      <style>{`
        @keyframes pulseGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .footer-shimmer-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(192,132,252,0.8),rgba(168,85,247,1),rgba(192,132,252,0.8),transparent);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 52px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 26px 0;
          flex-wrap: wrap;
          gap: 14px;
        }
        .footer-legal-links { display: flex; gap: 28px; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .footer-legal-links { gap: 16px; }
        }
      `}</style>



      {/* Top shimmer line */}
      <div className="footer-shimmer-line" />

      <div
        ref={ref}
        style={{
          maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "3.5rem 5% 0" : "5.5rem 5% 0",
          position: "relative",
        }}
      >
        <div className="footer-grid">

          {/* Brand */}
          <div className={`footer-brand reveal ${visible ? "visible" : ""}`}>
            <a
              href="#"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              style={{
                textDecoration:"none", display:"inline-block", marginBottom:20,
                transform: logoHovered ? "scale(1.04)" : "scale(1)",
                transition:"transform 0.3s ease, box-shadow 0.3s ease",
                background: "#ffffff",
                borderRadius: 12,
                padding: "8px 16px",
                boxShadow: logoHovered
                  ? "0 0 22px rgba(192,132,252,0.5), 0 4px 16px rgba(0,0,0,0.2)"
                  : "0 2px 12px rgba(0,0,0,0.25)",
              }}
            >
              <img src="/colobix-logo.png" alt="Colobix" style={{height:"70px",width:"90px",objectFit:"contain", display:"block" }} />
            </a>
            <p style={{ color: "#ede9fe", fontSize:"0.9rem", lineHeight:1.85, maxWidth:260, fontWeight: 400 }}>
              Enterprise server infrastructure for teams that demand reliability, performance, and speed.
            </p>
            <div style={{ width:48, height:1, margin:"20px 0", background:"linear-gradient(90deg,rgba(192,132,252,0.9),transparent)", boxShadow:"0 0 8px rgba(192,132,252,0.5)" }} />
            <div style={{ display:"flex", gap:10 }}>
              {socialIcons.map(s => (
                <MagneticSocialBtn key={s.label} label={s.label} href={s.href} />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([title, items], ci) => (
            <div key={title} className={`reveal reveal-delay-${ci + 1} ${visible ? "visible" : ""}`}>
              <ColumnHeader>{title}</ColumnHeader>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:14 }}>
                {items.map(item => <NavLink key={item}>{item}</NavLink>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ color: "#d8b4fe", fontSize:"0.78rem", letterSpacing:"0.01em", margin:0, fontWeight: 400 }}>
            © {new Date().getFullYear()} Colobix. All rights reserved.{" "}
            <span style={{ color:"#e879f9", fontWeight: 600 }}>Your Servers, Our Priority.</span>
          </p>
          <div className="footer-legal-links">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <FooterLink key={l}>{l}</FooterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}