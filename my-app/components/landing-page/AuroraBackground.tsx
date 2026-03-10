"use client";

interface AuroraProps {
  intensity?: "low" | "medium" | "high";
  colors?: [string, string, string];
}

export default function AuroraBackground({ intensity = "medium", colors = ["rgba(139,47,201,0.12)", "rgba(99,102,241,0.1)", "rgba(168,85,247,0.08)"] }: AuroraProps) {
  const speed = intensity === "low" ? "18s" : intensity === "high" ? "8s" : "13s";
  return (
    <>
      <style>{`
        @keyframes auroraA { 0%,100%{transform:translate(0,0) scale(1) rotate(0deg)} 33%{transform:translate(60px,-40px) scale(1.15) rotate(8deg)} 66%{transform:translate(-30px,30px) scale(0.9) rotate(-5deg)} }
        @keyframes auroraB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-50px) scale(1.2)} }
        @keyframes auroraC { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(40px,60px) rotate(15deg)} }
      `}</style>
      <div aria-hidden style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"60%", height:"60%", borderRadius:"50%", background:`radial-gradient(ellipse,${colors[0]},transparent 70%)`, filter:"blur(60px)", animation:`auroraA ${speed} ease-in-out infinite` }} />
        <div style={{ position:"absolute", top:"30%", right:"-15%", width:"55%", height:"55%", borderRadius:"50%", background:`radial-gradient(ellipse,${colors[1]},transparent 70%)`, filter:"blur(70px)", animation:`auroraB ${speed} ease-in-out infinite`, animationDelay:`-${parseInt(speed)*0.33}s` }} />
        <div style={{ position:"absolute", bottom:"-10%", left:"30%", width:"50%", height:"50%", borderRadius:"50%", background:`radial-gradient(ellipse,${colors[2]},transparent 70%)`, filter:"blur(80px)", animation:`auroraC ${speed} ease-in-out infinite`, animationDelay:`-${parseInt(speed)*0.66}s` }} />
      </div>
    </>
  );
}