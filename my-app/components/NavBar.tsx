"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Set initial theme
    setDark(document.documentElement.classList.contains("dark"));

    // Watch for theme class changes on <html>
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = ["Features", "Pricing", "Clients", "FAQ"];

  // All colors react to dark/light
const navBg = dark
  ? scrolled ? "rgba(10,15,30,0.95)" : "rgba(10,15,30,0.70)"
  : scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)";

const borderColor = dark
  ? "rgba(6,182,212,0.12)"
  : "rgba(0,0,0,0.08)";

  const shadowColor = dark
    ? "0 8px 32px rgba(0,0,0,0.5)"
    : "0 8px 32px rgba(0,0,0,0.10)";

  const logoColor = dark ? "#ffffff" : "#0f172a";
const linkColor = dark ? "#cbd5e1" : "#64748b";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        padding: scrolled ? "16px 26px" : "16px 32px",
        transition: "padding 0.4s ease",
      }}
    >
      <nav
        style={{
          width: "100%",
          maxWidth: scrolled ? "1200px" : "1400px",
          background: navBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${borderColor}`,
          borderRadius: scrolled ? "999px" : "26px",
          padding: scrolled ? "14px 24px" : "14px 28px",
          boxShadow: scrolled ? shadowColor : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        
<a href="#" style={{ textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center" }}>
  <img
    src="/colobix-logo.png"
    alt="Colobix"
    style={{
      height: scrolled ? "70px" : "70px",
      width: "110px",
      objectFit: "container",
      transition: "all 0.4s ease",
    }}
  />
</a>

        {/* Center Nav */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((item) => (
            <li key={item}>
              
              <a  href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#06b6d4")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = linkColor)
                }
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ThemeToggle />
          
           <a href="#contact"
            style={{
              background: "#22d3ee",
              color: "#050d1a",
              fontWeight: 700,
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: scrolled ? "12px" : "14px",
              padding: scrolled ? "6px 16px" : "8px 20px",
              borderRadius: scrolled ? "999px" : "10px",
              textDecoration: "none",
              transition: "all 0.4s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#67e8f9";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(34,211,238,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#22d3ee";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}