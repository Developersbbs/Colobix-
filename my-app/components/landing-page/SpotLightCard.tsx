"use client";
import { useRef, useState, ReactNode, CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  spotlightColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SpotlightCard({ children, style, className, spotlightColor = "rgba(139,47,201,0.15)", onMouseEnter, onMouseLeave }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%", opacity: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: `${x}%`, y: `${y}%`, opacity: 1 });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={() => { setPos(p => ({ ...p, opacity: 1 })); onMouseEnter?.(); }}
      onMouseLeave={() => { setPos(p => ({ ...p, opacity: 0 })); onMouseLeave?.(); }}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {/* Spotlight layer */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: `radial-gradient(300px circle at ${pos.x} ${pos.y}, ${spotlightColor}, transparent 70%)`,
        opacity: pos.opacity,
        transition: "opacity 0.3s",
      }} />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}