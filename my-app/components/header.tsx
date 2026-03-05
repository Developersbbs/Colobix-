"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Features", "Pricing", "Clients", "FAQ"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out"
      style={{ padding: scrolled ? "10px 24px" : "16px 24px" }}
    >
      <nav
        style={{
          width: scrolled ? "680px" : "100%",
          maxWidth: scrolled ? "680px" : "1200px",
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          border: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(0,0,0,0.05)",
          borderRadius: scrolled ? "100px" : "16px",
          padding: scrolled ? "8px 20px" : "12px 28px",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.12)"
            : "0 2px 12px rgba(0,0,0,0.06)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="dark:[background:rgba(5,13,26,0.85)] flex items-center justify-between"
      >

        {/* Logo */}
        
         <a href="#"
          className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white shrink-0"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Colo<span className="text-cyan-400">bix</span>
        </a>

        {/* Center links */}
        <ul className="hidden md:flex gap-6 list-none">
          {navLinks.map((item) => (
            <li key={item}>
              
               <a href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          
            <a href="#contact"
            style={{
              fontFamily: "var(--font-syne)",
              padding: scrolled ? "6px 16px" : "8px 20px",
              fontSize: scrolled ? "12px" : "14px",
              borderRadius: scrolled ? "100px" : "10px",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="bg-cyan-400 text-[#050d1a] font-bold hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:-translate-y-0.5 transition-transform duration-200"
          >
            Get Started
          </a>
        </div>

      </nav>
    </header>
  );
}