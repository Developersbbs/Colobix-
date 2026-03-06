"use client";
import { useState, useEffect, useRef } from "react";

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

const faqs = [
  { q: "What makes Colobix different from other providers?", a: "Colobix combines enterprise-grade bare-metal hardware with a developer-friendly control panel, real-time monitoring, and sub-minute support response times — at competitive pricing." },
  { q: "Do you offer a free trial?", a: "Yes. All new accounts get a 7-day free trial on Starter and Pro plans with no credit card required." },
  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. Change your plan at any time from the dashboard. Upgrades are instant; downgrades apply at the next billing cycle." },
  { q: "Where are your data centers located?", a: "We have 40+ PoPs across North America, Europe, Asia-Pacific, South America, Middle East, and Africa." },
  { q: "What kind of support do you offer?", a: "All plans include 24/7 ticket support. Pro and Enterprise clients get live chat and a dedicated Slack channel." },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. Enterprise annual contracts are available with discounts." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const [leftVisible, setLeftVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState<boolean[]>(new Array(faqs.length).fill(false));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setLeftVisible(true), 100);
    faqs.forEach((_, i) => {
      setTimeout(() => {
        setFaqVisible(p => { const n = [...p]; n[i] = true; return n; });
      }, 400 + i * 160);
    });
    return () => clearTimeout(t1);
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
    <section
      ref={sectionRef}
      id="faq"
      style={{
        background: "linear-gradient(135deg, #fefcff 0%, #f3ebff 35%, #ede4fd 65%, #e8dffb 100%)",
        borderTop: "1px solid rgba(124,58,237,0.07)",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <style>{`
        @keyframes faq-fromLeft   { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes faq-fromRight  { from{opacity:0;transform:translateX(60px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes faq-fadeUp     { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes faq-orbA       { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-28px)} }
        @keyframes faq-orbB       { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,22px)} }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: start;
        }
        .faq-left-sticky { position: sticky; top: 120px; }
        .faq-inner { padding: 7rem 5%; }

        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .faq-left-sticky { position: static; }
          .faq-inner { padding: 4rem 5%; }
        }
      `}</style>

      

      {/* ambient orbs */}
      <div style={{ position:"absolute", top:-80, right:-60, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)", filter:"blur(55px)", animation:"faq-orbA 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%)", filter:"blur(50px)", animation:"faq-orbB 10s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />

      <div ref={ref} className="faq-inner" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="faq-grid">

          {/* ── LEFT ── */}
          <div
            className="faq-left-sticky"
            style={{
              animation: leftVisible ? "faq-fromLeft 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
              opacity: leftVisible ? undefined : 0,
            }}
          >
            <span style={{ color:"#7c3aed", fontSize:11, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.16em", display:"block", marginBottom:12 }}>FAQ</span>

            <h2 style={{
              fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, marginTop:0, marginBottom:20,
              color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.03em", lineHeight:1.1,
            }}>
              Frequently asked<br />
              <span style={{ background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>
                questions
              </span>
            </h2>

            <div style={{ height:2, borderRadius:99, marginBottom:20, overflow:"hidden", background:"rgba(124,58,237,0.08)" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",
                width: leftVisible ? "100%" : "0%",
                transition:"width 1.4s 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow:"0 0 10px rgba(124,58,237,0.4)",
              }} />
            </div>

            <p style={{ color:"#5b4d7a", fontSize:"1rem", lineHeight:1.75, marginBottom:32 }}>
              Can't find your answer? Our team is available around the clock.
            </p>

            <a href="#contact" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"12px 24px", borderRadius:10, fontSize:"0.875rem",
              textDecoration:"none", fontWeight:700,
              background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)",
              color:"#fff", boxShadow:"0 4px 20px rgba(124,58,237,0.3)",
              transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(124,58,237,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(124,58,237,0.3)"; }}
            >
              Contact Support
              <svg style={{width:14,height:14}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          {/* ── RIGHT — FAQs ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background:"#fff",
                  border:`1px solid ${open===i ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.1)"}`,
                  borderRadius:16, overflow:"hidden",
                  boxShadow: open===i ? "0 8px 30px rgba(124,58,237,0.08)" : "none",
                  transition:"border-color 0.3s, box-shadow 0.35s",
                  opacity: faqVisible[i] ? 1 : 0,
                  transform: faqVisible[i] ? "translateX(0)" : "translateX(50px)",
                  transitionProperty: faqVisible[i] ? "border-color, box-shadow, opacity, transform" : "opacity, transform",
                  transitionDuration: faqVisible[i] ? "0.3s, 0.35s, 0.9s, 0.9s" : "0.9s, 0.9s",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <button
                  onClick={() => setOpen(open===i ? null : i)}
                  style={{
                    width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding: isMobile ? "16px 18px" : "20px 24px",
                    textAlign:"left" as const, background:"none", border:"none",
                    cursor:"pointer", fontWeight:600, fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: open===i ? "#7c3aed" : "#12002e",
                    gap:16, transition:"color 0.2s", fontFamily:"var(--font-body)",
                  }}
                >
                  {faq.q}
                  <div style={{
                    width:28, height:28, borderRadius:"50%", flexShrink:0,
                    background: open===i ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.05)",
                    border:"1px solid rgba(124,58,237,0.15)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#7c3aed", fontSize:"1.2rem",
                    transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: open===i ? "rotate(45deg) scale(1.1)" : "rotate(0deg) scale(1)",
                  }}>+</div>
                </button>

                <div style={{
                  maxHeight: open===i ? 200 : 0,
                  overflow:"hidden",
                  transition:"max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <div style={{ position:"relative", padding: isMobile ? "0 18px 16px" : "0 24px 20px" }}>
                    <div style={{
                      position:"absolute", left: isMobile ? 18 : 24, top:0, bottom: isMobile ? 16 : 20, width:2, borderRadius:99,
                      background:"linear-gradient(180deg,#7c3aed,#a855f7,transparent)",
                      opacity: open===i ? 1 : 0, transition:"opacity 0.3s 0.15s",
                    }} />
                    <p style={{ margin:0, paddingLeft:16, color:"#5b4d7a", fontSize:"0.875rem", lineHeight:1.75 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}