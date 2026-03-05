"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["Features", "Pricing", "Clients", "FAQ"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "center",
      padding: scrolled ? "10px 24px" : "16px 32px",
      transition: "padding 0.4s ease",
    }}>
      <nav style={{
        width: "100%", maxWidth: scrolled ? "1100px" : "1400px",
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${scrolled ? "rgba(124,58,237,0.18)" : "rgba(124,58,237,0.1)"}`,
        borderRadius: scrolled ? "999px" : "20px",
        padding: scrolled ? "10px 24px" : "12px 28px",
        boxShadow: scrolled ? "0 8px 40px rgba(124,58,237,0.12)" : "none",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/colobix-logo.png" alt="Colobix" style={{ height: 58, width: 90, objectFit: "contain" }} />
        </a>

        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} style={{
                fontSize: "0.875rem", fontWeight: 500, color: "#6b5a8a",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7c3aed")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b5a8a")}
              >{item}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          color: "#fff", fontWeight: 700, fontSize: "14px",
          padding: "9px 22px", borderRadius: scrolled ? "999px" : "10px",
          textDecoration: "none", transition: "all 0.3s",
          boxShadow: "0 4px 15px rgba(124,58,237,0.3)", whiteSpace: "nowrap",
        }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(124,58,237,0.5)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(124,58,237,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >Get Started</a>
      </nav>
    </header>
  );
}