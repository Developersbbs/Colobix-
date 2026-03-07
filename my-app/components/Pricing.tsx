"use client";
import { useEffect, useRef, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}

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

const plans = [
  { name: "Starter", price: "$29", period: "/mo", desc: "Perfect for small projects and early-stage startups.", features: ["2 vCPU Cores", "4 GB RAM", "100 GB NVMe SSD", "2 TB Bandwidth", "1 Gbps Port", "Basic DDoS Protection"], disabled: ["Managed Backups", "Priority Support"], featured: false, cta: "Get Started" },
  { name: "Pro",     price: "$99", period: "/mo", desc: "Ideal for growing businesses with production workloads.", features: ["8 vCPU Cores", "16 GB RAM", "500 GB NVMe SSD", "10 TB Bandwidth", "10 Gbps Port", "Advanced DDoS Protection", "Managed Daily Backups"], disabled: ["Dedicated Account Manager"], featured: true, cta: "Get Started" },
  { name: "Enterprise", price: "Custom", period: "contact us", desc: "Custom hardware, SLAs, and dedicated support for large organizations.", features: ["Bare-Metal or Custom Config", "Unlimited RAM Options", "Petabyte-scale Storage", "Unlimited Bandwidth", "100 Gbps Port", "Full DDoS Suite", "Custom Backup Policies", "Dedicated Account Manager"], disabled: [], featured: false, cta: "Contact Sales" },
];

const cardAnims = ["price-fromLeft", "price-fromBottom", "price-fromRight"];

export default function Pricing() {
  const { ref, inView } = useInView();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible]     = useState([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setCardVisible(p => { const n=[...p]; n[0]=true; return n; }), 500);
    const t3 = setTimeout(() => setCardVisible(p => { const n=[...p]; n[1]=true; return n; }), 750);
    const t4 = setTimeout(() => setCardVisible(p => { const n=[...p]; n[2]=true; return n; }), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [inView]);

  const getAnim = (i: number) => {
    if (isMobile || isTablet) return "price-fromBottom";
    return cardAnims[i];
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        background: "linear-gradient(135deg, #fefcff 0%, #f3ebff 35%, #ede4fd 65%, #e8dffb 100%)",
        borderTop: "1px solid rgba(124,58,237,0.07)",
        position: "relative", overflow: "hidden",
        cursor: "default"
      }}
    >
      <style>{`
        @keyframes price-fromLeft   { from{opacity:0;transform:translateX(-80px)} to{opacity:1;transform:translateX(0)} }
        @keyframes price-fromBottom { from{opacity:0;transform:translateY(80px)} to{opacity:1;transform:translateY(0)} }
        @keyframes price-fromRight  { from{opacity:0;transform:translateX(80px)} to{opacity:1;transform:translateX(0)} }
        @keyframes price-titleUp    { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes price-orbA       { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-35px)} }
        @keyframes price-orbB       { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,20px)} }

      `}</style>

      {/* ambient orbs */}
      <div style={{ position:"absolute", top:-80, right:-80, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)", filter:"blur(55px)", animation:"price-orbA 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:-100, left:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%)", filter:"blur(50px)", animation:"price-orbB 10s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />

      {/* dot grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:"radial-gradient(rgba(124,58,237,0.14) 1px, transparent 1px)",
        backgroundSize:"32px 32px",
        maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage:"radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        opacity: inView ? 0.6 : 0, transition:"opacity 2s ease",
      }} />

      <div ref={ref} style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "4rem 5% 5rem" : "7rem 5%", position:"relative", zIndex:1 }}>

        {/* HEADER */}
        <div style={{ textAlign:"center", marginBottom: isMobile ? 40 : 64 }}>
          <span style={{
            color:"#7c3aed", fontSize:11, fontWeight:700,
            textTransform:"uppercase" as const, letterSpacing:"0.16em",
            display:"block", marginBottom:12,
            animation: headerVisible ? "price-titleUp 0.7s 0s both ease-out" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>Pricing</span>

          <h2 style={{
            fontSize: isMobile ? "clamp(1.8rem,7vw,2.4rem)" : "clamp(2rem,4vw,3rem)",
            fontWeight:800, marginTop:0, marginBottom:16,
            color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.03em",
            animation: headerVisible ? "price-titleUp 0.7s 0.1s both ease-out" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            Simple,{" "}
            <span style={{ background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>
              transparent
            </span>
            {" "}pricing
          </h2>

          <p style={{
            color:"#5b4d7a", fontSize:"1.05rem", fontWeight:300, maxWidth:440, margin:"0 auto",
            animation: headerVisible ? "price-titleUp 0.7s 0.2s both ease-out" : "none",
            opacity: headerVisible ? undefined : 0,
          }}>
            No hidden fees. Scale up or down anytime.
          </p>

          <div style={{
            height:2, borderRadius:99, margin:"28px auto 0",
            background:"linear-gradient(90deg,transparent,#7c3aed,#a855f7,transparent)",
            width: headerVisible ? 120 : 0,
            transition:"width 0.9s 0.3s ease-out",
          }} />
        </div>

        {/* CARDS */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)",
          gap: isMobile ? 16 : 20,
          alignItems:"start",
        }}>
          {plans.map((plan, i) => {
            const spanFull = isTablet && i === 2;
            return (
              <div
                key={plan.name}
                style={{
                  gridColumn: spanFull ? "1 / -1" : undefined,
                  maxWidth: spanFull ? 520 : undefined,
                  margin: spanFull ? "0 auto" : undefined,
                  width: spanFull ? "100%" : undefined,
                  animation: cardVisible[i] ? `${getAnim(i)} 0.7s ease-out both` : "none",
                  opacity: cardVisible[i] ? undefined : 0,
                }}
              >
                <div
                  style={{
                    position:"relative", borderRadius:24,
                    padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                    border: plan.featured ? "2px solid rgba(124,58,237,0.5)" : "1px solid rgba(124,58,237,0.1)",
                    background: plan.featured
                      ? "linear-gradient(160deg,rgba(124,58,237,0.06),rgba(168,85,247,0.04))"
                      : "#fff",
                    boxShadow: plan.featured
                      ? "0 20px 60px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.1)"
                      : "0 4px 20px rgba(124,58,237,0.04)",
                    /* ── smooth ease-out, no bounce ── */
                    transition: "box-shadow 0.3s ease-out",
                    overflow:"hidden", cursor:"default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = plan.featured
                      ? "0 32px 80px rgba(124,58,237,0.22)"
                      : "0 20px 60px rgba(124,58,237,0.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = plan.featured
                      ? "0 20px 60px rgba(124,58,237,0.15)"
                      : "0 4px 20px rgba(124,58,237,0.04)";
                  }}
                >


                  {plan.featured && (
                    <>
                      <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#7c3aed,#a855f7)", color:"#fff", fontSize:10, fontWeight:700, padding:"5px 20px", borderRadius:"0 0 12px 12px", letterSpacing:"0.12em", textTransform:"uppercase" as const }}>Most Popular</div>
                      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed)" }} />
                    </>
                  )}

                  <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.12em", color:"#7c3aed", marginBottom:16, marginTop:plan.featured?16:0 }}>{plan.name}</div>

                  <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:6 }}>
                    <span style={{ fontSize: isMobile ? "2.6rem" : "3.2rem", fontWeight:800, color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.04em", lineHeight:1 }}>{plan.price}</span>
                    <span style={{ color:"#9d88c0", fontSize:"0.875rem" }}>{plan.period}</span>
                  </div>

                  <p style={{ color:"#5b4d7a", fontSize:"0.875rem", borderBottom:"1px solid rgba(124,58,237,0.08)", paddingBottom:20, marginBottom:20 }}>{plan.desc}</p>

                  <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                    {plan.features.map((f, fi) => (
                      <li key={f} style={{
                        display:"flex", alignItems:"center", gap:10,
                        fontSize:"0.875rem", color:"#12002e",
                        opacity: cardVisible[i] ? 1 : 0,
                        transform: cardVisible[i] ? "translateX(0)" : "translateX(-16px)",
                        transition:`opacity 0.5s ${0.1 + fi * 0.07}s, transform 0.5s ${0.1 + fi * 0.07}s ease-out`,
                      }}>
                        <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:10, color:"#7c3aed", fontWeight:700 }}>✓</span>
                        {f}
                      </li>
                    ))}
                    {plan.disabled.map(f => (
                      <li key={f} style={{ display:"flex", alignItems:"center", gap:10, fontSize:"0.875rem", color:"#c4b5fd" }}>
                        <span style={{ width:18, height:18, flexShrink:0 }}>–</span>{f}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact"
                    style={{
                      display:"block", textAlign:"center", padding:"13px",
                      borderRadius:12, fontWeight:700, fontSize:"0.9rem",
                      textDecoration:"none",
                      transition:"background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                      ...(plan.featured
                        ? { background:"linear-gradient(135deg,#2E124A,#8B2FC9)", color:"#fff", boxShadow:"0 4px 20px rgba(124,58,237,0.35)" }
                        : { border:"1.5px solid rgba(124,58,237,0.2)", color:"#7c3aed", background:"transparent" }
                      ),
                    }}
                    onMouseEnter={e => {
                      if (!plan.featured) {
                        e.currentTarget.style.background = "rgba(124,58,237,0.06)";
                        e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)";
                      } else {
                        e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,58,237,0.5)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!plan.featured) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)";
                      } else {
                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.35)";
                      }
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}