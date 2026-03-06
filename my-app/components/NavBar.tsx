"use client";
import { useState, useEffect, useRef } from "react";

const navLinks = ["Features", "Products", "Pricing", "Clients", "FAQ"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .nav-root * { box-sizing: border-box; }
        .nav-root { font-family: 'DM Sans', sans-serif; }

        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-24px) scaleX(0.96); }
          to   { opacity: 1; transform: translateY(0) scaleX(1); }
        }
        .nav-mounted { animation: navSlideDown 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #5b4d7a;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
          letter-spacing: 0.01em;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 999px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover { color: #7c3aed; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #7c3aed; }
        .nav-link.active::after { width: 100%; }

        .nav-link-dot {
          position: absolute;
          top: 50%; right: -10px;
          transform: translateY(-50%) scale(0);
          width: 5px; height: 5px;
          background: #a855f7;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }
        .nav-link:hover .nav-link-dot {
          animation: dotPing 0.6s ease forwards;
        }
        @keyframes dotPing {
          0%   { transform: translateY(-50%) scale(0); opacity: 1; }
          60%  { transform: translateY(-50%) scale(1.5); opacity: 0.6; }
          100% { transform: translateY(-50%) scale(2.2); opacity: 0; }
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 24px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%);
          background-size: 200% 200%;
          background-position: 0% 50%;
          box-shadow: 0 4px 15px rgba(124,58,237,0.35), 0 1px 0 rgba(255,255,255,0.15) inset;
          transition: background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease;
          letter-spacing: 0.01em;
        }
        .cta-btn:hover {
          background-position: 100% 50%;
          box-shadow: 0 8px 28px rgba(124,58,237,0.5), 0 1px 0 rgba(255,255,255,0.2) inset;
          transform: translateY(-1px) scale(1.02);
        }
        .cta-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 3px 10px rgba(124,58,237,0.3);
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          width: 10px; height: 10px;
          transform: translate(-50%, -50%) scale(0);
          animation: rippleAnim 0.6s linear forwards;
          pointer-events: none;
        }
        @keyframes rippleAnim {
          to { transform: translate(-50%, -50%) scale(28); opacity: 0; }
        }

        .cta-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cta-btn:hover .cta-arrow { transform: translateX(4px); }

        .nav-logo {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
        }
        .nav-logo:hover {
          transform: scale(1.06) rotate(-1deg);
          filter: drop-shadow(0 4px 12px rgba(124,58,237,0.25));
        }

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .nav-shimmer::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(124,58,237,0.4) 40%,
            rgba(168,85,247,0.6) 50%,
            rgba(124,58,237,0.4) 60%,
            transparent 100%
          );
          background-size: 400px 1px;
          animation: shimmer 3s linear infinite;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .nav-shimmer.scrolled::before { opacity: 1; }

        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); transform-origin: top; }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .mobile-menu { animation: mobileSlide 0.25s cubic-bezier(0.22,1,0.36,1) both; }

        .ham-line {
          display: block;
          width: 22px; height: 2px;
          background: #7c3aed;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; width: 0; }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nav-link-item {
          opacity: 0;
          transform: translateY(-6px);
          animation: linkFadeIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes linkFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .desktop-cta { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>

      <header
        className="nav-root"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "center",
          padding: scrolled ? "10px 20px" : "18px 32px",
          transition: "padding 0.4s ease",
        }}
      >
        <nav
          className={`nav-shimmer${scrolled ? " scrolled" : ""}${mounted ? " nav-mounted" : ""}`}
          style={{
            position: "relative",
            width: "100%", maxWidth: 1280,
            background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${scrolled ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.08)"}`,
            borderRadius: scrolled ? "999px" : "36px",
            padding: "10px 20px 10px 12px",
            boxShadow: scrolled
              ? "0 4px 30px rgba(124,58,237,0.1), 0 1px 0 rgba(124,58,237,0.08)"
              : "none",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="#" className="nav-logo" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/logo.svg" alt="Colobix" style={{ height: 70, width: 180, objectFit: "contain" }} />
          </a>

          {/* Desktop Links */}
          <ul className="desktop-links" style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((item, i) => (
              <li
                key={item}
                className="nav-link-item"
                style={{ position: "relative", animationDelay: `${0.08 + i * 0.07}s` }}
              >
                
                 <a href={`#${item.toLowerCase()}`}
                  className={`nav-link${activeLink === item ? " active" : ""}`}
                  onClick={() => setActiveLink(item)}
                >
                  {item}
                  <span className="nav-link-dot" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="desktop-cta" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#contact" ref={btnRef} className="cta-btn" onClick={handleRipple}>
              {ripples.map(rp => (
                <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y }} />
              ))}
              Get Started
              <span className="cta-arrow">→</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className={`ham-btn${mobileOpen ? " ham-open" : ""}`}
            style={{
              display: "none",
              flexDirection: "column", gap: 5,
              background: "none", border: "none",
              cursor: "pointer", padding: 6,
            }}
            aria-label="Toggle menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="mobile-menu"
            style={{
              position: "absolute", top: "100%", left: 20, right: 20, marginTop: 8,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: 18,
              padding: "16px 20px",
              boxShadow: "0 16px 40px rgba(124,58,237,0.12)",
            }}
          >
            {navLinks.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => { setActiveLink(item); setMobileOpen(false); }}
                style={{
                  display: "block",
                  padding: "12px 0",
                  borderBottom: i < navLinks.length - 1 ? "1px solid rgba(124,58,237,0.06)" : "none",
                  color: activeLink === item ? "#7c3aed" : "#5b4d7a",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}
            
             <a href="#contact"
              style={{
                display: "block", marginTop: 14,
                padding: "12px 0", textAlign: "center",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff", borderRadius: 999,
                fontWeight: 600, fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Get Started →
            </a>
          </div>
        )}
      </header>
    </>
  );
}