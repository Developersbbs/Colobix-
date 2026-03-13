"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = ["Features", "Products", "Pricing", "Clients", "FAQ"];

type Ripple = { id: number; x: number; y: number };

// ─── Navbar ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const logoHeight = isMobile ? 36 : isTablet ? 42 : 48;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Nunito:wght@700;800&display=swap');

        .nav-root * { box-sizing: border-box; }
        .nav-root { font-family: 'DM Sans', sans-serif; }

        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-20px) scaleX(0.97); }
          to   { opacity: 1; transform: translateY(0) scaleX(1); }
        }
        .nav-mounted { animation: navSlideDown 0.55s cubic-bezier(0.22,1,0.36,1) both; }

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
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #2E124A, #8B2FC9, #6366F1);
          border-radius: 999px;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover { color: #7c3aed; }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #7c3aed; }

        .nav-link-dot {
          position: absolute;
          top: 50%; right: -10px;
          transform: translateY(-50%) scale(0);
          width: 5px; height: 5px;
          background: #a855f7;
          border-radius: 50%;
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
          padding: 10px 22px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #2E124A 0%, #8B2FC9 55%, #6366F1 100%);
          background-size: 200% 200%;
          background-position: 0% 50%;
          box-shadow: 0 4px 18px rgba(124,58,237,0.38), 0 1px 0 rgba(255,255,255,0.15) inset;
          transition: background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .cta-btn:hover {
          background-position: 100% 50%;
          box-shadow: 0 8px 28px rgba(124,58,237,0.55), 0 1px 0 rgba(255,255,255,0.2) inset;
          transform: translateY(-1px) scale(1.02);
        }
        .cta-btn:active { transform: translateY(0) scale(0.98); }

        .cta-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-btn:hover .cta-arrow { transform: translateX(4px); }

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

        .nav-logo-wrap {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-logo-wrap:hover {
          transform: scale(1.04);
          filter: drop-shadow(0 3px 10px rgba(124,58,237,0.25));
        }

        .nav-link-item {
          opacity: 0;
          transform: translateY(-5px);
          animation: linkFadeIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes linkFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.96); transform-origin: top; }
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

        .mobile-link {
          display: block;
          padding: 13px 4px;
          color: #5b4d7a;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s, padding-left 0.2s;
          letter-spacing: 0.01em;
        }
        .mobile-link:hover { color: #7c3aed; padding-left: 8px; }
        .mobile-link.active { color: #7c3aed; font-weight: 600; }
      `}</style>

      <header
        className="nav-root"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          display: "flex", justifyContent: "center",
          cursor: "default",
          padding: scrolled
            ? (isMobile ? "10px 5%" : "12px 8%")
            : (isMobile ? "10px 12px" : "16px 24px"),
          transition: "padding 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <nav
          className={`nav-shimmer${scrolled ? " scrolled" : ""}${mounted ? " nav-mounted" : ""}`}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: scrolled ? 860 : 1280,
            background: scrolled
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.65)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: `1px solid ${scrolled
              ? "rgba(124,58,237,0.2)"
              : "rgba(124,58,237,0.1)"}`,
            boxShadow: scrolled
              ? "0 6px 36px rgba(124,58,237,0.12), 0 1px 0 rgba(255,255,255,0.6) inset"
              : "0 2px 12px rgba(124,58,237,0.04), 0 1px 0 rgba(255,255,255,0.5) inset",
            borderRadius: scrolled ? "999px" : "28px",
            padding: isMobile
              ? "9px 14px 9px 10px"
              : isTablet
              ? "10px 20px 10px 14px"
              : scrolled
              ? "10px 22px 10px 16px"
              : "10px 20px 10px 14px",
            transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* ── Logo ── */}
          <a href="#" className="nav-logo-wrap" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="/logo.svg"
              alt="Colobix"
              style={{ height: logoHeight, width: "auto", display: "block" }}
            />
          </a>

          {/* ── Desktop Links (≥1024px) ── */}
          {isDesktop && (
            <ul style={{
              display: "flex",
              gap: "clamp(1rem, 2vw, 2.2rem)",
              listStyle: "none", margin: 0, padding: 0,
              flexShrink: 0,
            }}>
              {navLinks.map((item, i) => (
                <li
                  key={item}
                  className="nav-link-item"
                  style={{ position: "relative", animationDelay: `${0.06 + i * 0.07}s` }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`nav-link${activeLink === item ? " active" : ""}`}
                    onClick={() => setActiveLink(item)}
                  >
                    {item}
                    <span className="nav-link-dot" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* ── Desktop CTA (≥768px) ── */}
          {!isMobile && (
            <a href="#contact" className="cta-btn"
             onClick={(e) => {
      handleRipple(e);
      router.push("/login");
    }} 
    style={{ flexShrink: 0 }}
            >
              {ripples.map((rp) => (
                <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y }} />
              ))}
              Get Started
              <span className="cta-arrow">→</span>
            </a>
          )}

          {/* ── Hamburger (mobile + tablet) ── */}
          {!isDesktop && (
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={mobileOpen ? "ham-open" : ""}
              style={{
                display: "flex", flexDirection: "column", gap: 5,
                background: "none", border: "none",
                cursor: "pointer", padding: "6px 4px",
                flexShrink: 0,
              }}
              aria-label="Toggle menu"
            >
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          )}
        </nav>

        {/* ── Mobile / Tablet Dropdown Menu ── */}
        {mobileOpen && !isDesktop && (
          <div
            className="mobile-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: isMobile ? 12 : 20,
              right: isMobile ? 12 : 20,
              marginTop: 8,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(124,58,237,0.14)",
              borderRadius: 20,
              padding: "8px 20px 16px",
              boxShadow: "0 16px 48px rgba(124,58,237,0.13), 0 1px 0 rgba(255,255,255,0.5) inset",
            }}
          >
            {navLinks.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`mobile-link${activeLink === item ? " active" : ""}`}
                onClick={() => { setActiveLink(item); setMobileOpen(false); }}
                style={{
                  borderBottom: i < navLinks.length - 1
                    ? "1px solid rgba(124,58,237,0.06)"
                    : "none",
                }}
              >
                {item}
              </a>
            ))}

            {isMobile && (
              <a
                href="#contact"
                onClick={(e) => {
      setMobileOpen(false)
      router.push("/login");
    }}
                style={{
                  display: "block",
                  marginTop: 14,
                  padding: "13px 0",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #2E124A 0%, #8B2FC9 55%, #6366F1 100%)",
                  color: "#fff",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Get Started →
              </a>
            )}
          </div>
        )}
      </header>
    </>
  );
}