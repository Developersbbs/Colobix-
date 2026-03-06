"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ── useInView hook ─────────────────────────────────────────────────── */
function useInView(threshold = 0.18) {
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

/* ── Section 1 — FADE UP + SPLIT (deep plum bg) ────────────────────── */
function Section1() {
  const { ref, inView } = useInView();
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0f0020 0%, #1a0035 50%, #2E124A 100%)",
    }}>
      <style>{`
        @keyframes s1FadeUp   { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
        @keyframes s1SlideLeft{ from{opacity:0;transform:translateX(-80px)} to{opacity:1;transform:translateX(0)} }
        @keyframes s1SlideRight{from{opacity:0;transform:translateX(80px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes s1LineGrow { from{width:0}                               to{width:120px} }
        @keyframes s1OrbFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-25px)} }
      `}</style>

      {/* bg orbs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", top:"-10%", right:"-10%", background:"radial-gradient(circle, rgba(139,47,201,0.18), transparent 70%)", filter:"blur(60px)", animation:"s1OrbFloat 9s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", bottom:"-5%", left:"-5%", background:"radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)", filter:"blur(50px)", animation:"s1OrbFloat 12s ease-in-out infinite reverse", pointerEvents:"none" }} />

      <div ref={ref} style={{ maxWidth:1100, width:"100%", padding:"0 5%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
        {/* Left — slides in from left */}
        <div>
          <div style={{ width:120, height:3, background:"linear-gradient(90deg,#8B2FC9,#6366F1)", borderRadius:99, marginBottom:28, animation: inView ? "s1LineGrow 0.7s 0.1s both ease" : "none" }} />
          <h2 style={{
            fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:800, color:"#fff",
            lineHeight:1.08, letterSpacing:"-0.035em",
            fontFamily:"var(--font-heading)",
            animation: inView ? "s1SlideLeft 0.75s 0.15s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Infrastructure<br />
            <span style={{ background:"linear-gradient(135deg,#C084FC,#6366F1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Built Different
            </span>
          </h2>
          <p style={{
            marginTop:20, fontSize:"1.05rem", color:"rgba(196,181,253,0.75)", lineHeight:1.8, maxWidth:380,
            animation: inView ? "s1FadeUp 0.75s 0.3s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Bare-metal performance with cloud flexibility. Deploy globally in seconds, scale without limits.
          </p>
          <div style={{
            marginTop:36, display:"flex", gap:14,
            animation: inView ? "s1FadeUp 0.75s 0.45s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            <a href="#pricing" style={{ padding:"13px 30px", borderRadius:12, background:"linear-gradient(135deg,#8B2FC9,#6366F1)", color:"#fff", fontWeight:700, fontSize:"0.9rem", textDecoration:"none", boxShadow:"0 6px 28px rgba(139,47,201,0.45)" }}>Get Started →</a>
            <a href="#features" style={{ padding:"13px 30px", borderRadius:12, border:"1.5px solid rgba(196,181,253,0.25)", color:"rgba(196,181,253,0.85)", fontWeight:600, fontSize:"0.9rem", textDecoration:"none" }}>Learn More</a>
          </div>
        </div>

        {/* Right — slides in from right */}
        <div style={{
          animation: inView ? "s1SlideRight 0.75s 0.25s both cubic-bezier(0.16,1,0.3,1)" : "none",
          opacity: inView ? undefined : 0,
        }}>
          {[
            { label:"Uptime SLA", val:"99.99%", color:"#a78bfa" },
            { label:"Global PoPs", val:"40+",    color:"#818cf8" },
            { label:"DDoS Protection", val:"2 Tbps", color:"#c084fc" },
            { label:"Avg Latency", val:"12ms",   color:"#a78bfa" },
          ].map((item, i) => (
            <div key={item.label} style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"18px 24px", marginBottom:10, borderRadius:16,
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(196,181,253,0.12)",
              backdropFilter:"blur(12px)",
              animation: inView ? `s1FadeUp 0.6s ${0.35 + i * 0.1}s both cubic-bezier(0.16,1,0.3,1)` : "none",
              opacity: inView ? undefined : 0,
              transition:"background 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              <span style={{ color:"rgba(196,181,253,0.65)", fontSize:"0.85rem", fontWeight:500 }}>{item.label}</span>
              <span style={{ color:item.color, fontSize:"1.4rem", fontWeight:800, fontFamily:"var(--font-heading)", letterSpacing:"-0.02em" }}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 2 — SCALE UP + STAGGER CARDS (electric indigo bg) ─────── */
function Section2() {
  const { ref, inView } = useInView();
  const cards = [
    { icon:"⚡", title:"NVMe SSD",        desc:"Blazing I/O at every tier with enterprise-grade NVMe storage arrays." },
    { icon:"🌐", title:"40 Gbps Network", desc:"Full-duplex uplinks, zero oversubscription, guaranteed throughput." },
    { icon:"🛡️", title:"DDoS Shield",     desc:"2Tbps+ scrubbing capacity distributed across every global PoP." },
    { icon:"📡", title:"Dedicated IP",    desc:"Every plan ships with a dedicated IP for maximum routing control." },
    { icon:"⏱️", title:"99.9% SLA",       desc:"N+1 cooling, diesel backup, and 24/7 NOC eyes on your systems." },
    { icon:"💬", title:"Live Support",    desc:"Real engineers, sub-minute response, 365 days a year." },
  ];
  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(160deg, #0a001f 0%, #12003a 40%, #1e0050 100%)",
    }}>
      <style>{`
        @keyframes s2ScaleUp  { from{opacity:0;transform:scale(0.82) translateY(30px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes s2TitleIn  { from{opacity:0;transform:translateY(50px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes s2GridPop  { from{opacity:0;transform:scale(0.88) rotate(-1deg)} to{opacity:1;transform:scale(1) rotate(0)} }
        @keyframes s2Pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(139,47,201,0.5)} 50%{box-shadow:0 0 0 12px rgba(139,47,201,0)} }
      `}</style>

      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }} />

      <div ref={ref} style={{ maxWidth:1100, width:"100%", margin:"0 auto", padding:"7rem 5%" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <span style={{
            display:"inline-block", fontSize:11, fontWeight:700, textTransform:"uppercase",
            letterSpacing:"0.2em", color:"#818cf8", marginBottom:16,
            animation: inView ? "s2TitleIn 0.6s 0s both ease" : "none",
            opacity: inView ? undefined : 0,
          }}>Why Colobix</span>
          <h2 style={{
            fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:800, color:"#fff",
            letterSpacing:"-0.03em", lineHeight:1.1, fontFamily:"var(--font-heading)",
            animation: inView ? "s2TitleIn 0.7s 0.1s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Everything your{" "}
            <span style={{ background:"linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              infrastructure needs
            </span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {cards.map((c, i) => (
            <div key={c.title} style={{
              padding:"1.75rem", borderRadius:20,
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(129,140,248,0.14)",
              backdropFilter:"blur(16px)",
              animation: inView ? `s2GridPop 0.65s ${i * 0.08}s both cubic-bezier(0.34,1.56,0.64,1)` : "none",
              opacity: inView ? undefined : 0,
              transition:"background 0.25s, border-color 0.25s, transform 0.25s",
              cursor:"default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(129,140,248,0.1)"; e.currentTarget.style.borderColor="rgba(129,140,248,0.35)"; e.currentTarget.style.transform="translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(129,140,248,0.14)"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              <div style={{ fontSize:28, marginBottom:16, display:"inline-flex", alignItems:"center", justifyContent:"center", width:52, height:52, borderRadius:14, background:"rgba(129,140,248,0.12)", border:"1px solid rgba(129,140,248,0.2)" }}>{c.icon}</div>
              <h3 style={{ fontWeight:700, color:"#e0e7ff", fontSize:"1rem", marginBottom:8, fontFamily:"var(--font-heading)" }}>{c.title}</h3>
              <p style={{ color:"rgba(165,180,252,0.6)", fontSize:"0.85rem", lineHeight:1.7, margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 3 — FLIP IN + HORIZONTAL SLIDE (violet-rose bg) ───────── */
function Section3() {
  const { ref, inView } = useInView();
  const plans = [
    { name:"Starter", price:"$29", features:["2 vCPU", "4 GB RAM", "100 GB NVMe", "2 TB BW"], color:"#7c3aed", hot:false },
    { name:"Pro",     price:"$99", features:["8 vCPU", "16 GB RAM", "500 GB NVMe", "10 TB BW"], color:"#a855f7", hot:true  },
    { name:"Enterprise", price:"Custom", features:["Bare-Metal", "Unlimited RAM", "PB Storage", "Dedicated IP"], color:"#ec4899", hot:false },
  ];
  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(150deg, #1a0030 0%, #2d0050 45%, #3b0068 100%)",
    }}>
      <style>{`
        @keyframes s3FlipIn   { from{opacity:0;transform:perspective(800px) rotateX(25deg) translateY(40px)} to{opacity:1;transform:perspective(800px) rotateX(0) translateY(0)} }
        @keyframes s3SlideUp  { from{opacity:0;transform:translateY(70px)} to{opacity:1;transform:translateY(0)} }
        @keyframes s3GlowPulse{ 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes s3Float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.1),transparent 65%)", filter:"blur(70px)", pointerEvents:"none", animation:"s3GlowPulse 5s ease-in-out infinite" }} />

      <div ref={ref} style={{ maxWidth:1100, width:"100%", margin:"0 auto", padding:"7rem 5%" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <h2 style={{
            fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:800, color:"#fff",
            letterSpacing:"-0.03em", fontFamily:"var(--font-heading)",
            animation: inView ? "s3SlideUp 0.7s 0s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Simple,{" "}
            <span style={{ background:"linear-gradient(90deg,#c084fc,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              transparent
            </span>
            {" "}pricing
          </h2>
          <p style={{
            color:"rgba(216,180,254,0.6)", marginTop:12, fontSize:"1rem",
            animation: inView ? "s3SlideUp 0.7s 0.1s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>No hidden fees. Scale up or down anytime.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, alignItems:"center" }}>
          {plans.map((plan, i) => (
            <div key={plan.name} style={{
              padding: plan.hot ? "2.5rem" : "2rem",
              borderRadius:22,
              background: plan.hot
                ? "linear-gradient(155deg,rgba(168,85,247,0.22),rgba(99,102,241,0.18))"
                : "rgba(255,255,255,0.04)",
              border: plan.hot
                ? `2px solid rgba(168,85,247,0.55)`
                : "1px solid rgba(216,180,254,0.12)",
              boxShadow: plan.hot ? "0 20px 60px rgba(168,85,247,0.22)" : "none",
              animation: inView ? `s3FlipIn 0.75s ${i * 0.12}s both cubic-bezier(0.16,1,0.3,1)` : "none",
              opacity: inView ? undefined : 0,
              position:"relative",
              transition:"transform 0.3s",
              animation: inView ? `s3FlipIn 0.75s ${i * 0.12}s both cubic-bezier(0.16,1,0.3,1), ${plan.hot ? "s3Float 4s 1s ease-in-out infinite" : "none"}` : "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {plan.hot && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#8B2FC9,#ec4899)", color:"#fff", fontSize:9, fontWeight:700, padding:"4px 18px", borderRadius:"0 0 10px 10px", letterSpacing:"0.14em", textTransform:"uppercase" }}>Most Popular</div>}
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:plan.color, marginBottom:14, marginTop: plan.hot ? 12 : 0 }}>{plan.name}</div>
              <div style={{ fontSize:"3rem", fontWeight:800, color:"#fff", fontFamily:"var(--font-heading)", letterSpacing:"-0.04em", lineHeight:1 }}>{plan.price}</div>
              <div style={{ color:"rgba(216,180,254,0.5)", fontSize:"0.8rem", marginBottom:20, marginTop:4 }}>/ month</div>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"center", gap:10, fontSize:"0.875rem", color:"rgba(216,180,254,0.75)" }}>
                    <span style={{ width:18, height:18, borderRadius:"50%", background:`${plan.color}22`, border:`1px solid ${plan.color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:plan.color, fontWeight:700, flexShrink:0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{ display:"block", textAlign:"center", padding:"12px", borderRadius:12, fontWeight:700, fontSize:"0.875rem", textDecoration:"none", background: plan.hot ? "linear-gradient(135deg,#8B2FC9,#6366F1)" : "transparent", color: plan.hot ? "#fff" : plan.color, border: plan.hot ? "none" : `1.5px solid ${plan.color}50`, boxShadow: plan.hot ? "0 4px 20px rgba(139,47,201,0.4)" : "none" }}>
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 4 — BLUR REVEAL + STAGGER LIST (midnight teal bg) ──────── */
function Section4() {
  const { ref, inView } = useInView();
  const faqs = [
    { q:"What makes Colobix different?",            a:"Enterprise bare-metal hardware with developer-friendly tooling, real-time monitoring, and sub-minute support response times." },
    { q:"Is there a free trial?",                   a:"Yes. All new accounts get a 7-day free trial on Starter and Pro plans — no credit card required." },
    { q:"Can I upgrade or downgrade my plan?",      a:"Absolutely. Change plans anytime. Upgrades are instant; downgrades apply at next billing cycle." },
    { q:"Where are your data centers?",             a:"40+ PoPs across North America, Europe, Asia-Pacific, South America, Middle East, and Africa." },
    { q:"What support options are available?",      a:"All plans include 24/7 ticket support. Pro and Enterprise get live chat and a dedicated Slack channel." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(145deg, #001a1a 0%, #002030 50%, #001535 100%)",
    }}>
      <style>{`
        @keyframes s4BlurIn   { from{opacity:0;filter:blur(16px);transform:translateY(28px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
        @keyframes s4LineIn   { from{opacity:0;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
        @keyframes s4ItemSlide{ from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes s4RightIn  { from{opacity:0;transform:translateX(50px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div style={{ position:"absolute", top:"-20%", right:"-10%", width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle,rgba(20,184,166,0.1),transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-15%", left:"-10%", width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.08),transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

      <div ref={ref} style={{ maxWidth:1100, width:"100%", margin:"0 auto", padding:"7rem 5%", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start" }}>
        {/* Left */}
        <div style={{ position:"sticky", top:120 }}>
          <span style={{
            display:"inline-block", fontSize:11, fontWeight:700, textTransform:"uppercase",
            letterSpacing:"0.2em", color:"#2dd4bf", marginBottom:16,
            animation: inView ? "s4BlurIn 0.65s 0s both ease" : "none",
            opacity: inView ? undefined : 0,
          }}>FAQ</span>
          <h2 style={{
            fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:"#fff",
            letterSpacing:"-0.03em", lineHeight:1.1, fontFamily:"var(--font-heading)",
            animation: inView ? "s4BlurIn 0.75s 0.1s both cubic-bezier(0.16,1,0.3,1)" : "none",
            opacity: inView ? undefined : 0,
          }}>
            Frequently asked<br />
            <span style={{ background:"linear-gradient(90deg,#2dd4bf,#06b6d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>questions</span>
          </h2>
          <div style={{ width:60, height:3, background:"linear-gradient(90deg,#2dd4bf,transparent)", borderRadius:99, marginTop:20, transformOrigin:"left", animation: inView ? "s4LineIn 0.6s 0.25s both ease" : "none", opacity: inView ? undefined : 0 }} />
          <p style={{
            color:"rgba(153,246,228,0.55)", marginTop:20, fontSize:"0.9rem", lineHeight:1.8,
            animation: inView ? "s4BlurIn 0.7s 0.3s both ease" : "none",
            opacity: inView ? undefined : 0,
          }}>Can't find your answer? Our team is on standby around the clock.</p>
          <a href="#contact" style={{
            display:"inline-flex", alignItems:"center", gap:8, marginTop:28,
            padding:"12px 24px", borderRadius:12,
            background:"rgba(45,212,191,0.1)", border:"1.5px solid rgba(45,212,191,0.3)",
            color:"#2dd4bf", fontWeight:700, fontSize:"0.875rem", textDecoration:"none",
            animation: inView ? "s4BlurIn 0.7s 0.4s both ease" : "none",
            opacity: inView ? undefined : 0,
          }}>Contact Support →</a>
        </div>

        {/* Right — accordion */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderRadius:16, overflow:"hidden",
              border:`1px solid ${open===i ? "rgba(45,212,191,0.4)" : "rgba(45,212,191,0.1)"}`,
              background: open===i ? "rgba(45,212,191,0.06)" : "rgba(255,255,255,0.03)",
              transition:"border-color 0.3s, background 0.3s",
              animation: inView ? `s4ItemSlide 0.6s ${i * 0.09}s both cubic-bezier(0.16,1,0.3,1)` : "none",
              opacity: inView ? undefined : 0,
            }}>
              <button onClick={() => setOpen(open===i ? null : i)} style={{
                width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"18px 22px", background:"none", border:"none", cursor:"pointer",
                textAlign:"left", color: open===i ? "#2dd4bf" : "rgba(153,246,228,0.8)",
                fontWeight:600, fontSize:"0.88rem", fontFamily:"var(--font-body)", gap:14,
                transition:"color 0.2s",
              }}>
                {faq.q}
                <div style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, background:"rgba(45,212,191,0.1)", border:"1px solid rgba(45,212,191,0.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#2dd4bf", fontSize:"1.1rem", transition:"transform 0.3s", transform: open===i ? "rotate(45deg)" : "none" }}>+</div>
              </button>
              <div style={{ maxHeight: open===i ? 150 : 0, overflow:"hidden", transition:"max-height 0.38s cubic-bezier(0.16,1,0.3,1)" }}>
                <p style={{ padding:"0 22px 18px", color:"rgba(153,246,228,0.55)", fontSize:"0.85rem", lineHeight:1.75, margin:0 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5 — ZOOM BURST + TYPEWRITER COUNT (warm amber bg) ──────── */
function Section5() {
  const { ref, inView } = useInView(0.1);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [854, 99, 565, 576];
  const labels  = ["Total Clients", "Uptime %", "Active Domains", "Dedicated Servers"];
  const suffixes= ["+",  ".99%", "+", "+"];
  const colors  = ["#f59e0b", "#10b981", "#f97316", "#ef4444"];

  useEffect(() => {
    if (!inView) return;
    const dur = 2000, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts(targets.map(t => Math.round(e * t)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <section style={{
      minHeight:"80vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(145deg, #1c0a00 0%, #2d1200 50%, #1a0f00 100%)",
    }}>
      <style>{`
        @keyframes s5ZoomBurst { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        @keyframes s5TitleDrop { from{opacity:0;transform:translateY(-50px) rotate(-2deg)} to{opacity:1;transform:translateY(0) rotate(0)} }
        @keyframes s5RingPulse { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
        @keyframes s5OrbDrift  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,25px)} }
      `}</style>

      <div style={{ position:"absolute", top:"20%", left:"10%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.12),transparent 70%)", filter:"blur(50px)", animation:"s5OrbDrift 10s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"8%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(239,68,68,0.1),transparent 70%)", filter:"blur(60px)", animation:"s5OrbDrift 14s ease-in-out infinite reverse", pointerEvents:"none" }} />

      <div ref={ref} style={{ maxWidth:1100, width:"100%", margin:"0 auto", padding:"7rem 5%", textAlign:"center" }}>
        <span style={{
          display:"inline-block", fontSize:11, fontWeight:700, textTransform:"uppercase",
          letterSpacing:"0.2em", color:"#f59e0b", marginBottom:16,
          animation: inView ? "s5TitleDrop 0.6s 0s both cubic-bezier(0.34,1.56,0.64,1)" : "none",
          opacity: inView ? undefined : 0,
        }}>Platform by the Numbers</span>
        <h2 style={{
          fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:800, color:"#fff",
          letterSpacing:"-0.03em", marginBottom:64, fontFamily:"var(--font-heading)",
          animation: inView ? "s5TitleDrop 0.7s 0.1s both cubic-bezier(0.34,1.56,0.64,1)" : "none",
          opacity: inView ? undefined : 0,
        }}>
          Colobix{" "}
          <span style={{ background:"linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            at scale
          </span>
        </h2>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
          {labels.map((label, i) => (
            <div key={label} style={{
              padding:"2rem", borderRadius:20,
              background:"rgba(255,255,255,0.04)",
              border:`1px solid ${colors[i]}25`,
              position:"relative", overflow:"hidden",
              animation: inView ? `s5ZoomBurst 0.65s ${i * 0.1}s both cubic-bezier(0.34,1.56,0.64,1)` : "none",
              opacity: inView ? undefined : 0,
              transition:"transform 0.3s, border-color 0.3s",
              cursor:"default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-8px) scale(1.03)"; e.currentTarget.style.borderColor=`${colors[i]}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.borderColor=`${colors[i]}25`; }}
            >
              {/* pulse ring */}
              <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:60, height:60, borderRadius:"50%", border:`1px solid ${colors[i]}40`, animation: inView ? `s5RingPulse 2.5s ${i*0.4}s ease-out infinite` : "none", pointerEvents:"none" }} />
              <div style={{ fontSize:"2.8rem", fontWeight:800, color:colors[i], fontFamily:"var(--font-heading)", letterSpacing:"-0.04em", lineHeight:1, position:"relative", zIndex:1 }}>
                {counts[i]}{suffixes[i]}
              </div>
              <div style={{ fontSize:"0.8rem", color:`${colors[i]}99`, marginTop:8, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.12em", position:"relative", zIndex:1 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main export — all sections composed ───────────────────────────── */
export default function AnimatedSections() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}