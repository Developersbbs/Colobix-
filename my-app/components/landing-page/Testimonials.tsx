"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const testimonials = [
  { stars: 5, text: "We migrated our entire SaaS stack to Colobix. The latency improvement was immediate — p95 response time dropped by over 60%.", name: "James Mercer", role: "CTO, Stackify", initials: "JM", color: "#7c3aed" },
  { stars: 5, text: "Colobix's support team is unlike any provider before. Issues get resolved in minutes. Their infra is rock solid.", name: "Priya Nair", role: "DevOps Lead, Lumitech", initials: "PN", color: "#a855f7" },
  { stars: 5, text: "The DDoS protection is worth every penny. We took a 400Gbps hit last quarter and our users didn't notice a thing.", name: "Marcus Schulz", role: "Infrastructure Eng, PayVault", initials: "MS", color: "#6d28d9" },
  { stars: 5, text: "Provisioning is instantaneous. We scaled from 2 to 40 nodes during Black Friday with zero downtime.", name: "Sara Lindqvist", role: "Eng Director, ShopFlow", initials: "SL", color: "#8b5cf6" },
  { stars: 5, text: "Best price-to-performance ratio we've ever found. Colobix simply outperforms the big cloud providers.", name: "Tom Nakamura", role: "Founder, ByteLab", initials: "TN", color: "#7c3aed" },
  { stars: 5, text: "Their global PoPs cut our international latency in half. Users in Asia-Pacific finally get the fast experience they deserve.", name: "Leila Hosseini", role: "VP Engineering, Nexora", initials: "LH", color: "#a855f7" },
];

function Card({ t, visible, i }: { t: typeof testimonials[0]; visible: boolean; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 320, flexShrink: 0, margin: "0 10px",
        background: hovered ? "#f8f3ff" : "#fff",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.1)"}`,
        borderRadius: 20, padding: "1.5rem",
        boxShadow: hovered ? "0 20px 50px rgba(124,58,237,0.15)" : "0 4px 20px rgba(124,58,237,0.06)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${t.color},transparent)`, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin:"center", transition:"transform 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
      <div style={{ position:"absolute", inset:0, borderRadius:20, pointerEvents:"none", background:`radial-gradient(200px circle at 50% 0%,${t.color}10,transparent 70%)`, opacity: hovered ? 1 : 0, transition:"opacity 0.3s" }} />
      <div style={{ color:"#a855f7", letterSpacing:"0.1em", fontSize:"1rem", marginBottom:14 }}>{"★".repeat(t.stars)}</div>
      <p style={{ color:"#5b4d7a", fontSize:"0.875rem", lineHeight:1.75, marginBottom:18, fontStyle:"italic" }}>"{t.text}"</p>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:38, height:38, borderRadius:"50%", background:`${t.color}18`, border:`1.5px solid ${t.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.78rem", color:t.color, transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)", transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>{t.initials}</div>
        <div>
          <div style={{ fontWeight:600, fontSize:"0.85rem", color:"#12002e" }}>{t.name}</div>
          <div style={{ color:"#9d88c0", fontSize:"0.72rem" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [marqueeVisible, setMarqueeVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const doubled = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setMarqueeVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} id="clients" style={{
      background: "linear-gradient(155deg, #ffffff 0%, #fdfbff 50%, #f9f6ff 100%)",
      borderTop: "1px solid rgba(124,58,237,0.07)",
      overflow: "hidden", position: "relative", cursor: "default",
    }}>
      <style>{`
        @keyframes testi-titleUp  { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes testi-orbA     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-30px)} }
        @keyframes testi-orbB     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,20px)} }
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .testi-inner { padding: 7rem 0; }
        .testi-header { max-width: 1280px; margin: 0 auto 56px; padding: 0 5%; }
        .testi-fade-left { width: 160px; }
        .testi-fade-right { width: 160px; }

        @media (max-width: 768px) {
          .testi-inner { padding: 4rem 0; }
          .testi-header { margin-bottom: 36px; }
          .testi-fade-left, .testi-fade-right { width: 60px; }
        }
      `}</style>

      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.05),transparent 65%)", left:mousePos.x, top:mousePos.y, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:0, transition:"left 0.1s linear, top 0.1s linear" }} />
      <div style={{ position:"absolute", top:-80, right:-80, width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.09),transparent 70%)", filter:"blur(55px)", animation:"testi-orbA 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.07),transparent 70%)", filter:"blur(50px)", animation:"testi-orbB 10s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />

      <div ref={ref} className="testi-inner" style={{ position:"relative", zIndex:1 }}>

        <div className="testi-header" style={{ textAlign:"center" }}>
          <span style={{
            color:"#7c3aed", fontSize:11, fontWeight:700,
            textTransform:"uppercase" as const, letterSpacing:"0.16em",
            display:"block", marginBottom:12,
            animation: headerVisible ? "testi-titleUp 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>Testimonials</span>

          <h2 style={{
            fontSize:"clamp(1.8rem,4vw,3rem)",
            fontWeight:800, marginTop:0, marginBottom:16,
            color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.03em",
            animation: headerVisible ? "testi-titleUp 1.1s 0.14s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            Trusted by engineering{" "}
            <span style={{ background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>
              teams worldwide
            </span>
          </h2>
        </div>

        <div style={{ position:"relative", overflow:"hidden", opacity: marqueeVisible ? 1 : 0, transform: marqueeVisible ? "translateY(0)" : "translateY(40px)", transition:"opacity 1.1s 0.4s cubic-bezier(0.16,1,0.3,1), transform 1.1s 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="testi-fade-left" style={{ position:"absolute", left:0, top:0, bottom:0, background:"linear-gradient(90deg,#f5eeff,transparent)", zIndex:2, pointerEvents:"none" }} />
          <div className="testi-fade-right" style={{ position:"absolute", right:0, top:0, bottom:0, background:"linear-gradient(-90deg,#f5eeff,transparent)", zIndex:2, pointerEvents:"none" }} />
          <div style={{ display:"flex", padding:"12px 0", animation:"marquee-scroll 32s linear infinite", width:"max-content" }}>
            {doubled.map((t, i) => <Card key={i} t={t} visible={marqueeVisible} i={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
}