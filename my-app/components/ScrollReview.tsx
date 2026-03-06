"use client";
import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;   // ms
  y?: number;       // initial offset
  duration?: number; // ms
  style?: CSSProperties;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({ children, delay = 0, y = 40, duration = 700, style, className, once = true }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
      else if (!once) setVisible(false);
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}