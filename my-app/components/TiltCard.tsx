"use client";
import { useRef, ReactNode, CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

export default function TiltCard({ children, style, className, maxTilt = 15, glare = true, scale = 1.04 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (y - 0.5) * -maxTilt * 2;
      const rotY = (x - 0.5) * maxTilt * 2;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      if (glareRef.current) {
        glareRef.current.style.opacity = "0.15";
        glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.6), transparent 60%)`;
      }
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current; if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform", position: "relative", ...style }}
    >
      {glare && (
        <div ref={glareRef} style={{ position: "absolute", inset: 0, borderRadius: "inherit", opacity: 0, pointerEvents: "none", zIndex: 10, transition: "opacity 0.2s", borderRadius: "inherit" }} />
      )}
      {children}
    </div>
  );
}