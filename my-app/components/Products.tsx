"use client";

import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: "vps",
    label: "VPS Servers",
    icon: "⚡",
    tagline: "Dedicated power, cloud flexibility",
    desc: "Get the perfect balance between dedicated resources and cloud scalability. Our VPS servers deliver guaranteed CPU, RAM, and NVMe storage — fully isolated, fully yours.",
    specs: ["Up to 32 vCPU cores", "Up to 128 GB RAM", "NVMe SSD storage", "Instant provisioning"],
  },
  {
    id: "cloud",
    label: "Cloud Servers",
    icon: "☁️",
    tagline: "Elastic compute at any scale",
    desc: "Deploy cloud instances across multiple availability zones in minutes. Auto-scaling, load balancing, and pay-as-you-go pricing make Colobix cloud the smartest choice.",
    specs: ["Multi-zone redundancy", "Auto-scaling groups", "S3-compatible storage", "99.99% availability"],
  },
  {
    id: "dedicated",
    label: "Dedicated Servers",
    icon: "🖥️",
    tagline: "Raw bare-metal performance",
    desc: "No hypervisor overhead. No noisy neighbours. Pure bare-metal power with Intel Xeon or AMD EPYC processors, enterprise NVMe arrays and 10GbE uplinks.",
    specs: ["Intel Xeon / AMD EPYC", "10GbE network uplink", "RAID-10 NVMe arrays", "Full IPMI / KVM access"],
  },
  {
    id: "shared",
    label: "Shared Hosting",
    icon: "🌐",
    tagline: "The easiest way to go live",
    desc: "Launch your website in minutes with cPanel, one-click WordPress, and free SSL included. Perfect for blogs, portfolios, and small business sites.",
    specs: ["Free SSL certificate", "One-click WordPress", "Daily backups", "99.9% uptime SLA"],
  },
  {
    id: "website",
    label: "Website Hosting",
    icon: "🚀",
    tagline: "Optimised for the modern web",
    desc: "Purpose-built for speed. LiteSpeed web server, built-in CDN, and smart caching deliver sub-second page loads globally for every visitor.",
    specs: ["LiteSpeed web server", "Global CDN included", "Smart caching engine", "PHP 8.x / Node.js"],
  },
];

function VpsAnimation() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 900); return () => clearInterval(t); }, []);
  const bars = [68, 42, 91, 55, 78, 35, 83, 61];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes vpsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes scanLine{0%{top:0%}100%{top:100%}}
        @keyframes neonBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes spinCW{to{transform:rotate(360deg)}}
        @keyframes spinCCW{to{transform:rotate(-360deg)}}
      `}</style>
      <div className="absolute w-72 h-72 rounded-full border border-cyan-400/20" style={{animation:"spinCW 10s linear infinite"}}/>
      <div className="absolute w-52 h-52 rounded-full border border-cyan-300/10" style={{animation:"spinCCW 7s linear infinite"}}/>
      <div style={{animation:"vpsFloat 3.5s ease-in-out infinite"}} className="relative z-10">
        <div className="relative w-48 h-48 rounded-2xl border-2 border-cyan-400/70 bg-[#020d1a]/95 overflow-hidden"
          style={{boxShadow:"0 0 40px rgba(6,182,212,0.4),inset 0 0 30px rgba(6,182,212,0.05)"}}>
          <div className="absolute left-0 right-0 h-px bg-cyan-400/30 z-20" style={{animation:"scanLine 2.5s linear infinite"}}/>
          <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"linear-gradient(#06b6d4 1px,transparent 1px),linear-gradient(90deg,#06b6d4 1px,transparent 1px)",backgroundSize:"22px 22px"}}/>
          <div className="relative z-10 grid grid-cols-4 gap-1.5 p-5 pt-6">
            {bars.map((b,i)=>{
              const h=tick%4===i%4?Math.min(b+18,98):b;
              return (
                <div key={i} className="flex flex-col-reverse items-center">
                  <div className="w-6 rounded-sm overflow-hidden bg-slate-800/80" style={{height:38}}>
                    <div className="w-full rounded-sm transition-all duration-600"
                      style={{height:`${h}%`,background:"linear-gradient(to top,#06b6d4,#67e8f9)",boxShadow:`0 0 8px rgba(6,182,212,${h/100})`,transitionDuration:"600ms"}}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono tracking-[0.2em] text-cyan-400"
            style={{textShadow:"0 0 8px rgba(6,182,212,0.9)"}}>CPU · LOAD · MONITOR</div>
        </div>
        {[["-top-1.5","-left-1.5"],["-top-1.5","-right-1.5"],["-bottom-1.5","-left-1.5"],["-bottom-1.5","-right-1.5"]].map(([t,l],i)=>(
          <div key={i} className={`absolute ${t} ${l} w-3 h-3 rounded-sm bg-cyan-400`}
            style={{boxShadow:"0 0 10px rgba(6,182,212,1),0 0 20px rgba(6,182,212,0.6)",animation:`neonBlink 1.5s ease-in-out infinite`,animationDelay:`${i*0.2}s`}}/>
        ))}
      </div>
      {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([pos,bdr],i)=>(
        <div key={i} className={`absolute ${pos} ${bdr} border-cyan-400/40 w-6 h-6`}/>
      ))}
    </div>
  );
}

function CloudAnimation() {
  const [phase,setPhase]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setPhase(p=>(p+1)%60),80);return()=>clearInterval(t);},[]);
  const nodes=[{x:50,y:32},{x:22,y:58},{x:78,y:58},{x:36,y:78},{x:64,y:78}];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes cloudFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes nodePulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.5);opacity:1}}
        @keyframes spinCW{to{transform:rotate(360deg)}}
        @keyframes spinCCW{to{transform:rotate(-360deg)}}
      `}</style>
      <div className="absolute w-80 h-80 rounded-full border border-cyan-400/10" style={{animation:"spinCW 15s linear infinite"}}/>
      <div className="absolute w-60 h-60 rounded-full border border-cyan-300/10" style={{animation:"spinCCW 10s linear infinite"}}/>
      <div style={{animation:"cloudFloat 4s ease-in-out infinite"}} className="relative w-64 h-56">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {[[0,1],[0,2],[1,3],[2,4],[1,2]].map(([a,b],i)=>{
            const active=Math.floor(phase/12)%5===i;
            return <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke={active?"rgba(6,182,212,0.9)":"rgba(6,182,212,0.2)"} strokeWidth={active?"0.9":"0.4"}
              style={{filter:active?"drop-shadow(0 0 3px rgba(6,182,212,1))":"none",transition:"all 0.3s"}}/>;
          })}
          <ellipse cx="50" cy="35" rx="28" ry="18" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8"
            style={{filter:"drop-shadow(0 0 6px rgba(6,182,212,0.5))"}}/>
          <ellipse cx="35" cy="42" rx="18" ry="12" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.4)" strokeWidth="0.6"/>
          <ellipse cx="65" cy="40" rx="16" ry="11" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.4)" strokeWidth="0.6"/>
          {nodes.map((n,i)=>(
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.6)" strokeWidth="0.8"/>
              <circle cx={n.x} cy={n.y} r="2" fill="#06b6d4"
                style={{filter:"drop-shadow(0 0 4px rgba(6,182,212,0.8))",animation:`nodePulse 2s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}/>
            </g>
          ))}
          {[30,50,70].map((x,i)=>(
            <line key={i} x1={x} y1="52" x2={x} y2="63" stroke="rgba(6,182,212,0.5)" strokeWidth="0.6" strokeDasharray="2 2"
              style={{animation:`nodePulse ${1.4+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.25}s`}}/>
          ))}
        </svg>
      </div>
      {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([pos,bdr],i)=>(
        <div key={i} className={`absolute ${pos} ${bdr} border-cyan-400/30 w-6 h-6`}/>
      ))}
    </div>
  );
}

function DedicatedAnimation() {
  const [active,setActive]=useState(0);
  const [loads,setLoads]=useState([72,45,88,61]);
  useEffect(()=>{
    const t=setInterval(()=>{
      setActive(p=>(p+1)%4);
      setLoads(prev=>prev.map(v=>Math.max(20,Math.min(95,v+(Math.random()-0.5)*15))));
    },900);
    return()=>clearInterval(t);
  },[]);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes dedFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes blinkLed{0%,100%{opacity:1}50%{opacity:0.2}}
        @keyframes spinCW{to{transform:rotate(360deg)}}
      `}</style>
      <div className="absolute w-72 h-72 rounded-full border border-cyan-400/10" style={{animation:"spinCW 18s linear infinite"}}/>
      <div style={{animation:"dedFloat 3.8s ease-in-out infinite"}} className="flex flex-col gap-3 z-10">
        {[0,1,2,3].map(i=>{
          const isActive=active===i;
          const load=Math.round(loads[i]);
          return (
            <div key={i} className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-500 overflow-hidden"
              style={{width:250,background:isActive?"rgba(6,182,212,0.08)":"rgba(2,13,26,0.85)",borderColor:isActive?"rgba(6,182,212,0.7)":"rgba(6,182,212,0.1)",boxShadow:isActive?"0 0 24px rgba(6,182,212,0.2),inset 0 0 20px rgba(6,182,212,0.05)":"none"}}>
              {isActive&&<div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"/>}
              <div className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                style={{background:isActive?"#06b6d4":"#1e3a4a",boxShadow:isActive?"0 0 8px rgba(6,182,212,1),0 0 16px rgba(6,182,212,0.6)":"none",animation:isActive?"blinkLed 1s ease-in-out infinite":"none"}}/>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-mono" style={{color:isActive?"#06b6d4":"#4a7a8a",textShadow:isActive?"0 0 8px rgba(6,182,212,0.8)":"none"}}>NODE-{String(i+1).padStart(2,"0")}</span>
                  <span className="text-[9px] font-mono" style={{color:isActive?"#67e8f9":"#2a4a5a"}}>{load}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-slate-800">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{width:`${load}%`,background:isActive?"linear-gradient(90deg,#06b6d4,#67e8f9)":"#1e3a4a",boxShadow:isActive?"0 0 8px rgba(6,182,212,0.8)":"none"}}/>
                </div>
              </div>
              <span className="text-[9px] font-mono shrink-0 px-1.5 py-0.5 rounded border transition-all duration-300"
                style={{color:isActive?"#06b6d4":"#2a4a5a",borderColor:isActive?"rgba(6,182,212,0.4)":"rgba(6,182,212,0.1)",textShadow:isActive?"0 0 6px rgba(6,182,212,0.8)":"none"}}>
                {isActive?"ACTIVE":"IDLE"}
              </span>
            </div>
          );
        })}
      </div>
      {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([pos,bdr],i)=>(
        <div key={i} className={`absolute ${pos} ${bdr} border-cyan-400/30 w-6 h-6`}/>
      ))}
    </div>
  );
}

function SharedAnimation() {
  const [progress,setProgress]=useState(0);
  const [stage,setStage]=useState(0);
  useEffect(()=>{
    const t=setInterval(()=>{
      setProgress(p=>{if(p>=100){setStage(s=>(s+1)%3);return 0;}return p+1.5;});
    },50);
    return()=>clearInterval(t);
  },[]);
  const stages=["Building...","Uploading...","Live! ✓"];
  const files=[["index.html","#06b6d4"],["style.css","#818cf8"],["app.js","#fbbf24"],["logo.svg","#34d399"],["favicon.ico","#f87171"]];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes spinCW{to{transform:rotate(360deg)}} @keyframes sharedFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div className="absolute w-72 h-72 rounded-full border border-cyan-400/10" style={{animation:"spinCW 14s linear infinite"}}/>
      <div style={{animation:"sharedFloat 4s ease-in-out infinite"}} className="relative w-60 rounded-2xl overflow-hidden z-10"
        style={{boxShadow:"0 0 40px rgba(6,182,212,0.2),0 0 80px rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.3)"} as React.CSSProperties}>
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b" style={{background:"rgba(2,13,26,0.98)",borderColor:"rgba(6,182,212,0.15)"}}>
          {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c],i)=>(
            <div key={i} className="w-2 h-2 rounded-full" style={{background:c}}/>
          ))}
          <div className="ml-2 flex-1 rounded px-1.5 py-0.5 text-[7px] font-mono" style={{background:"rgba(6,182,212,0.05)",border:"1px solid rgba(6,182,212,0.15)",color:"rgba(6,182,212,0.6)"}}>
            colobix.com
          </div>
        </div>
        <div className="p-4 space-y-2.5" style={{background:"rgba(5,13,26,0.95)"}}>
          {files.map(([name,color],i)=>(
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{background:color,boxShadow:`0 0 6px ${color}`}}/>
              <span className="text-[10px] font-mono flex-1" style={{color:"rgba(148,163,184,0.8)"}}>{name}</span>
              <div className="w-12 h-1 rounded-full overflow-hidden" style={{background:"rgba(30,58,74,0.8)"}}>
                <div className="h-full rounded-full" style={{width:`${55+i*9}%`,background:color,boxShadow:`0 0 4px ${color}`}}/>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4 pt-2" style={{background:"rgba(5,13,26,0.95)",borderTop:"1px solid rgba(6,182,212,0.1)"}}>
          <div className="flex justify-between text-[8px] font-mono mb-1.5" style={{color:"rgba(6,182,212,0.7)"}}>
            <span>{stages[stage]}</span><span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{background:"rgba(30,58,74,0.8)"}}>
            <div className="h-full rounded-full transition-all duration-100"
              style={{width:`${progress}%`,background:"linear-gradient(90deg,#06b6d4,#67e8f9)",boxShadow:"0 0 8px rgba(6,182,212,0.8)"}}/>
          </div>
        </div>
      </div>
      {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([pos,bdr],i)=>(
        <div key={i} className={`absolute ${pos} ${bdr} border-cyan-400/30 w-6 h-6`}/>
      ))}
    </div>
  );
}

function WebsiteAnimation() {
  const [val,setVal]=useState(0);
  const dirRef=useRef(1);
  useEffect(()=>{
    const t=setInterval(()=>{
      setVal(p=>{const next=p+dirRef.current*1.5;if(next>=98||next<=2)dirRef.current*=-1;return Math.max(0,Math.min(100,next));});
    },30);
    return()=>clearInterval(t);
  },[]);
  const speed=Math.round(val);
  const pops=["SIN","LHR","JFK","FRA","SYD"];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes webFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes popPing{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(2);opacity:1}}
        @keyframes spinCW{to{transform:rotate(360deg)}}
      `}</style>
      <div className="absolute w-72 h-72 rounded-full border border-cyan-400/10" style={{animation:"spinCW 12s linear infinite"}}/>
      <div style={{animation:"webFloat 3.8s ease-in-out infinite"}} className="flex flex-col items-center gap-6 z-10">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-[135deg]">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="10" strokeLinecap="round" strokeDasharray="236" strokeDashoffset="59"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="236" strokeDashoffset={236-(177*speed/100)} style={{filter:"blur(5px)",transition:"stroke-dashoffset 0.08s"}}/>
            <circle cx="60" cy="60" r="50" fill="none"
              stroke={`hsl(${190-speed*0.8},100%,55%)`} strokeWidth="10" strokeLinecap="round"
              strokeDasharray="236" strokeDashoffset={236-(177*speed/100)}
              style={{filter:`drop-shadow(0 0 8px hsl(${190-speed*0.8},100%,55%))`,transition:"all 0.08s"}}/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold font-mono leading-none" style={{color:"#06b6d4",textShadow:"0 0 24px rgba(6,182,212,0.9)"}}>
              {speed}
            </span>
            <span className="text-[10px] font-mono mt-1" style={{color:"rgba(6,182,212,0.5)"}}>ms / load</span>
          </div>
        </div>
        <div className="flex gap-4">
          {pops.map((code,i)=>(
            <div key={code} className="flex flex-col items-center gap-1.5">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute inset-0 rounded-full bg-emerald-400"
                  style={{animation:`popPing 1.8s ease-in-out infinite`,animationDelay:`${i*0.22}s`,boxShadow:"0 0 10px rgba(52,211,153,0.9)"}}/>
              </div>
              <span className="text-[9px] font-mono" style={{color:"rgba(6,182,212,0.5)"}}>{code}</span>
            </div>
          ))}
        </div>
      </div>
      {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([pos,bdr],i)=>(
        <div key={i} className={`absolute ${pos} ${bdr} border-cyan-400/30 w-6 h-6`}/>
      ))}
    </div>
  );
}

const Animations=[VpsAnimation,CloudAnimation,DedicatedAnimation,SharedAnimation,WebsiteAnimation];

function useInView(threshold=0.15){
  const ref=useRef<HTMLDivElement>(null);
  const [inView,setInView]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true);},{threshold});
    obs.observe(el);return()=>obs.disconnect();
  },[threshold]);
  return{ref,inView};
}

export default function Products() {
  const [active,setActive]=useState(0);
  const {ref,inView}=useInView();
  const product=products[active];
  const Animation=Animations[active];

  return (
    <section id="products" className="relative bg-slate-50 dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10 overflow-hidden">
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-cyan-100/30 dark:bg-cyan-500/5 blur-3xl"/>
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-slate-100 dark:bg-cyan-900/8 blur-3xl"/>
      </div>
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{backgroundImage:"linear-gradient(#06b6d4 1px,transparent 1px),linear-gradient(90deg,#06b6d4 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>

      <div ref={ref} className="relative max-w-6xl mx-auto px-[5%] py-28">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">What we offer</span>
          <h2 className="text-5xl md:text-6xl font-extrabold mt-3 tracking-tight text-slate-900 dark:text-white" style={{fontFamily:"var(--font-syne)"}}>
            Our <span className="text-cyan-500 dark:text-cyan-400" style={{textShadow:"0 0 30px rgba(6,182,212,0.3)"}}>Products</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-100 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          {products.map((p,i)=>(
            <button key={p.id} onClick={()=>setActive(i)}
              className="relative group px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden"
              style={{
                background:active===i?"linear-gradient(135deg,#06b6d4,#0891b2)":"transparent",
                border:active===i?"1px solid rgba(6,182,212,0.6)":"1px solid rgba(6,182,212,0.15)",
                color:active===i?"#fff":undefined,
                boxShadow:active===i?"0 0 20px rgba(6,182,212,0.3),0 4px 15px rgba(6,182,212,0.2)":"none",
              }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <span className={`relative flex items-center gap-2 ${active!==i?"text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400":""}`}>
                <span>{p.icon}</span>{p.label}
              </span>
              {active===i&&<div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"/>}
            </button>
          ))}
        </div>

        {/* Card */}
        <div key={product.id}
          className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden transition-all duration-500 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
          style={{
            transitionDelay:"200ms",
            border:"1px solid rgba(6,182,212,0.15)",
            boxShadow:"0 0 60px rgba(6,182,212,0.08),0 20px 60px rgba(0,0,0,0.1)",
            animation:inView?"fadeSlide 0.4s ease-out":"none",
          }}>

          {/* ── Animation panel: full height ── */}
          <div className="relative overflow-hidden border-b lg:border-b-0 lg:border-r"
            style={{
              minHeight:420,
              background:"linear-gradient(135deg,#020d1a 0%,#030f1f 50%,#020c18 100%)",
              borderColor:"rgba(6,182,212,0.15)",
            }}>
            {/* Top neon line */}
            <div className="absolute top-0 left-0 right-0 h-px z-10"
              style={{background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.8),transparent)",boxShadow:"0 0 10px rgba(6,182,212,0.5)"}}/>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{backgroundImage:"linear-gradient(#06b6d4 1px,transparent 1px),linear-gradient(90deg,#06b6d4 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
            {/* HUD label */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)"}}>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{boxShadow:"0 0 6px rgba(6,182,212,1)"}}/>
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{color:"rgba(6,182,212,0.8)"}}>Live Preview</span>
            </div>
            {/* Product badge */}
            <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider"
              style={{background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)",color:"rgba(6,182,212,0.7)"}}>
              {product.id.toUpperCase()}
            </div>
            {/* Animation fills full height */}
            <div className="absolute inset-0">
              <Animation/>
            </div>
            {/* Bottom neon line */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.4),transparent)"}}/>
          </div>

          {/* ── Text panel ── */}
          <div className="relative p-10 flex flex-col justify-between bg-white dark:bg-[#060f20]">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.15),transparent)"}}/>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                {product.tagline}
              </span>
              <h3 className="text-3xl font-extrabold mt-2 mb-5 text-slate-900 dark:text-white tracking-tight"
                style={{fontFamily:"var(--font-syne)"}}>
                {product.label}
              </h3>
              <p className="text-sm leading-relaxed mb-8 text-slate-500 dark:text-slate-300">
                {product.desc}
              </p>

              {/* Specs */}
              <ul className="space-y-3 mb-10">
                {product.specs.map(s=>(
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{background:"rgba(6,182,212,0.1)",border:"1px solid rgba(6,182,212,0.3)",boxShadow:"0 0 8px rgba(6,182,212,0.1)"}}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-slate-700 dark:text-slate-200">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="w-full h-px mb-8 bg-slate-100 dark:bg-cyan-500/10"/>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <a href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                style={{background:"linear-gradient(135deg,#06b6d4,#0891b2)",boxShadow:"0 0 20px rgba(6,182,212,0.35),0 4px 15px rgba(6,182,212,0.2)"}}>
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="#"
                className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}