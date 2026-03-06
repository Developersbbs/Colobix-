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

// ── Hand-crafted SVG icons ─────────────────────────────────────────────────
const IconMail = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    {/* envelope body */}
    <rect x="3" y="5" width="18" height="14" rx="2"
      stroke="#7c3aed" strokeWidth="1.4"
      fill="rgba(124,58,237,0.06)" />
    {/* flap / V */}
    <path d="M3 7l9 7 9-7"
      stroke="#7c3aed" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhone = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    {/* handset body */}
    <path
      d="M6.5 3h3.2l1.5 4-2 1.2a11 11 0 0 0 4.6 4.6L15 10.8l4 1.5v3.2A2 2 0 0 1 17 17.5C9.5 17 3 10.5 3 3a2 2 0 0 1 1.5-2H6.5Z"
      stroke="#7c3aed" strokeWidth="1.4" strokeLinejoin="round"
      fill="rgba(124,58,237,0.06)" />
  </svg>
);

const IconPin = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    {/* pin shape */}
    <path
      d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 13 6 13s6-8.5 6-13c0-3.3-2.7-6-6-6Z"
      stroke="#7c3aed" strokeWidth="1.4" strokeLinejoin="round"
      fill="rgba(124,58,237,0.06)" />
    {/* inner dot */}
    <circle cx="12" cy="8" r="2.2"
      stroke="#7c3aed" strokeWidth="1.3"
      fill="rgba(124,58,237,0.15)" />
  </svg>
);
// ───────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { ref, inView } = useInView();
  const [leftVisible, setLeftVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
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
    const t2 = setTimeout(() => setFormVisible(true), 450);
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

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#faf9ff", border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: 10, padding: "13px 16px", fontSize: "0.875rem", color: "#12002e",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    fontFamily: "var(--font-body)", boxSizing: "border-box",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
    e.currentTarget.style.background = "#fff";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(124,58,237,0.15)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "#faf9ff";
  };

  const contactItems = [
    { icon: <IconMail />,  label: "hello@colobix.com",         sub: "We reply within 15 minutes" },
    { icon: <IconPhone />, label: "+1 (888) 265-6249",          sub: "Available 24/7" },
    { icon: <IconPin />,   label: "San Francisco, CA & Global", sub: "40+ locations worldwide" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: "linear-gradient(145deg, #fdfbff 0%, #f8f2ff 50%, #f0e8ff 100%)",
        borderTop: "1px solid rgba(124,58,237,0.07)",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <style>{`
        @keyframes contact-fromLeft  { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes contact-fromRight { from{opacity:0;transform:translateX(70px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes contact-orbA      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-28px)} }
        @keyframes contact-orbB      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,22px)} }
        @keyframes contact-scanLine  { 0%{top:-2px;opacity:0.5} 100%{top:100%;opacity:0} }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-inner { padding: 7rem 5%; }
        .contact-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .contact-inner { padding: 4rem 5%; }
        }
        @media (max-width: 480px) {
          .contact-name-row { grid-template-columns: 1fr; }
        }

        /* icon hover — rotate + scale */
        .contact-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.14);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }
        .contact-icon-wrap:hover {
          background: rgba(124,58,237,0.14);
          transform: scale(1.12) rotate(-5deg);
        }
      `}</style>

      {/* ambient orbs */}
      <div style={{ position:"absolute", bottom:-100, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.07),transparent 70%)", filter:"blur(55px)", animation:"contact-orbA 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", top:-80, right:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)", filter:"blur(50px)", animation:"contact-orbB 10s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />

      <div ref={ref} className="contact-inner" style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="contact-grid">

          {/* ── LEFT ── */}
          <div style={{
            animation: leftVisible ? "contact-fromLeft 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: leftVisible ? undefined : 0,
          }}>
            <span style={{ color:"#7c3aed", fontSize:11, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:"0.16em", display:"block", marginBottom:12 }}>Contact</span>

            <h2 style={{
              fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, marginTop:0, marginBottom:20,
              color:"#12002e", fontFamily:"var(--font-heading)", letterSpacing:"-0.03em", lineHeight:1.1,
            }}>
              Let's talk<br />
              <span style={{ background:"linear-gradient(135deg,#2E124A,#8B2FC9,#6366F1)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>
                infrastructure
              </span>
            </h2>

            <div style={{ height:2, borderRadius:99, marginBottom:24, overflow:"hidden", background:"rgba(124,58,237,0.08)" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background:"linear-gradient(90deg,#2E124A,#8B2FC9,#6366F1)",
                width: leftVisible ? "100%" : "0%",
                transition:"width 1.4s 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow:"0 0 10px rgba(124,58,237,0.4)",
              }} />
            </div>

            <p style={{ color:"#5b4d7a", fontWeight:300, lineHeight:1.8, marginBottom:40, fontSize:"1rem" }}>
              Whether you need a single VPS or a multi-region bare-metal deployment, our team will architect the perfect solution.
            </p>

            {contactItems.map((d, i) => (
              <div
                key={d.label}
                style={{
                  display:"flex", alignItems:"center", gap:14, marginBottom:20,
                  opacity: leftVisible ? 1 : 0,
                  transform: leftVisible ? "translateY(0)" : "translateY(20px)",
                  transition:`opacity 0.7s ${0.4 + i * 0.14}s, transform 0.7s ${0.4 + i * 0.14}s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                {/* SVG icon in hover-able wrapper */}
                <div className="contact-icon-wrap">{d.icon}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:"0.9rem", color:"#12002e" }}>{d.label}</div>
                  <div style={{ fontSize:"0.78rem", color:"#9d88c0", marginTop:2 }}>{d.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FORM ── */}
          <div style={{
            animation: formVisible ? "contact-fromRight 1.1s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: formVisible ? undefined : 0,
          }}>
            <div style={{
              background:"#faf9ff", border:"1px solid rgba(124,58,237,0.1)",
              borderRadius:24, padding: isMobile ? "1.5rem" : "2.5rem",
              boxShadow:"0 12px 50px rgba(124,58,237,0.07)",
              position:"relative", overflow:"hidden",
            }}>
              {/* scan line */}
              <div style={{ position:"absolute", left:0, right:0, height:1.5, background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)", zIndex:10, pointerEvents:"none", animation:"contact-scanLine 4s linear infinite" }} />
              {/* top accent */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#7c3aed,#a855f7,transparent)" }} />

              <div className="contact-name-row">
                {[["First Name","text","John"],["Last Name","text","Doe"]].map(([label,type,ph]) => (
                  <div key={label} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, color:"#5b4d7a", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{label}</label>
                    <input type={type} placeholder={ph} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                <label style={{ fontSize:11, color:"#5b4d7a", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Email</label>
                <input type="email" placeholder="john@company.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                <label style={{ fontSize:11, color:"#5b4d7a", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Plan Interest</label>
                <select style={inputStyle as any} onFocus={onFocus} onBlur={onBlur}>
                  <option value="">Select a plan</option>
                  <option>Starter</option><option>Pro</option><option>Enterprise</option>
                </select>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:24 }}>
                <label style={{ fontSize:11, color:"#5b4d7a", fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your infrastructure needs..." style={{ ...inputStyle, resize:"vertical" } as any} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <button
                className="btn-glow"
                style={{
                  width:"100%", padding:"14px", borderRadius:12, fontSize:"0.95rem",
                  boxShadow:"0 4px 20px rgba(124,58,237,0.35)",
                  transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px) scale(1.01)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(124,58,237,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(124,58,237,0.35)"; }}
              >
                Send Message →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}