"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // 0 = stationary, 1 = full scroll speed, 0.3 = slow bg
  style?: CSSProperties;
}

export function ParallaxLayer({ children, speed = 0.3, style }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const rect = el.parentElement!.getBoundingClientRect();
        const offset = -rect.top * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);

  return (
    <div ref={ref} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function ParallaxSection({ children, style, className }: ParallaxSectionProps) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }} className={className}>
      {children}
    </div>
  );
}