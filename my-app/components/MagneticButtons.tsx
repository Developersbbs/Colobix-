"use client";
import { useRef, ReactNode, CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({ children, style, className, strength = 0.35, onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = ref.current; if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "translate(0,0)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ display: "inline-block", ...style }}
      className={className}
    >
      {children}
    </div>
  );

  return href ? <a href={href} style={{ textDecoration: "none" }}>{inner}</a> : inner;
}