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
  { label: "gh", href: "#" },
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
        border: `1px solid ${hovered ? "rgba(168,85,247,0.6)" : "rgba(168,85,247,0.2)"}`,
        background: hovered
          ? "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.15))"
          : "rgba(168,85,247,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#e9d5ff" : "rgba(196,181,253,0.6)",
        fontSize: "0.82rem", textDecoration: "none",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.15 : 1})`,
        transition: "border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s",
        boxShadow: hovered ? "0 0 18px rgba(168,85,247,0.35), inset 0 0 8px rgba(168,85,247,0.1)" : "none",
        cursor: "pointer", position: "relative", overflow: "hidden",
      }}
    >
      {hovered && (
        <span style={{
          position: "absolute", inset: 0, borderRadius: 12,
          background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.18), transparent 70%)",
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
          color: hovered ? "#e9d5ff" : "rgba(196,181,253,0.65)",
          fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s",
          display: "inline-flex", alignItems: "center", gap: 6, position: "relative",
        }}
      >
        <span style={{
          display: "inline-block", width: 5, height: 5, borderRadius: "50%",
          background: hovered ? "#a855f7" : "transparent",
          boxShadow: hovered ? "0 0 8px #a855f7" : "none",
          transition: "background 0.25s, box-shadow 0.25s", flexShrink: 0,
        }} />
        <span style={{ position: "relative" }}>
          {children}
          <span style={{
            position: "absolute", bottom: -2, left: 0, height: 1,
            width: hovered ? "100%" : "0%",
            background: "linear-gradient(90deg, #a855f7, #7c3aed)",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 6px rgba(168,85,247,0.6)",
          }} />
        </span>
        <span style={{
          fontSize: "0.6rem", opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-4px)",
          transition: "opacity 0.2s, transform 0.2s", color: "#a855f7",
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
        color: hovered ? "rgba(196,181,253,0.85)" : "rgba(196,181,253,0.4)",
        fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s", position: "relative",
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: -1, left: 0,
        height: "1px", width: hovered ? "100%" : "0%",
        background: "rgba(168,85,247,0.5)", transition: "width 0.25s ease",
      }} />
    </a>
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
    <footer style={{ background: "#0d0020", position: "relative", overflow: "hidden", cursor: "default" }}>
      <style>{`
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }
        @keyframes floatOrb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10px,12px) scale(1.05)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        /* Footer responsive grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 52px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(168,85,247,0.1);
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
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          /* brand spans full width on small screens */
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .footer-legal-links { gap: 16px; }
        }
      `}</style>

      {/* Orbs */}
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.14),transparent 70%)", top:-140, left:-140, filter:"blur(50px)", animation:"floatOrb2 12s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)", bottom:-100, right:-100, filter:"blur(40px)", animation:"floatOrb3 15s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(192,132,252,0.07),transparent 70%)", top:"40%", left:"40%", filter:"blur(60px)", pointerEvents:"none" }} />

      {/* Top shimmer line */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent,rgba(168,85,247,0.6),rgba(124,58,237,0.8),rgba(168,85,247,0.6),transparent)",
        backgroundSize:"200% auto", animation:"shimmer 3s linear infinite",
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "3.5rem 5% 0" : "5.5rem 5% 0",
          position: "relative",
        }}
      >
        <div className="footer-grid">

          {/* Brand — spans full width on mobile via CSS class */}
          <div className={`footer-brand reveal ${visible ? "visible" : ""}`}>
            <a
              href="#"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              style={{
                textDecoration:"none", display:"inline-block", marginBottom:20,
                transform: logoHovered ? "scale(1.04)" : "scale(1)",
                transition:"transform 0.3s ease",
                filter: logoHovered ? "drop-shadow(0 0 12px rgba(168,85,247,0.5))" : "none",
              }}
            >
              <img src="/colobix-logo.png" alt="Colobix" style={{ height:56, width:88, objectFit:"contain" }} />
            </a>
            <p style={{ color:"rgba(196,181,253,0.65)", fontSize:"0.875rem", lineHeight:1.8, maxWidth:260 }}>
              Enterprise server infrastructure for teams that demand reliability, performance, and speed.
            </p>
            <div style={{ width:48, height:1, margin:"20px 0", background:"linear-gradient(90deg,rgba(168,85,247,0.8),transparent)", boxShadow:"0 0 8px rgba(168,85,247,0.4)" }} />
            <div style={{ display:"flex", gap:10 }}>
              {socialIcons.map(s => (
                <MagneticSocialBtn key={s.label} label={s.label} href={s.href} />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([title, items], ci) => (
            <div key={title} className={`reveal reveal-delay-${ci + 1} ${visible ? "visible" : ""}`}>
              <h4 style={{
                fontSize:10.5, fontWeight:700, textTransform:"uppercase" as const,
                letterSpacing:"0.16em", marginBottom:22,
                background:"linear-gradient(90deg,rgba(196,181,253,0.7),rgba(168,85,247,0.5))",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>{title}</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:14 }}>
                {items.map(item => <NavLink key={item}>{item}</NavLink>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ color:"rgba(196,181,253,0.35)", fontSize:"0.78rem", letterSpacing:"0.01em", margin:0 }}>
            © {new Date().getFullYear()} Colobix. All rights reserved.{" "}
            <span style={{ color:"rgba(168,85,247,0.4)" }}>Your Servers, Our Priority.</span>
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