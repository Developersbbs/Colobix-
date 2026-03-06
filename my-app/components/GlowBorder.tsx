"use client";
import { ReactNode, CSSProperties } from "react";

interface GlowBorderProps {
  children: ReactNode;
  borderRadius?: number;
  glowColor?: string;
  borderWidth?: number;
  animated?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function GlowBorder({ children, borderRadius = 20, glowColor = "#8B2FC9", borderWidth = 1.5, animated = true, style, className }: GlowBorderProps) {
  const id = `glow-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <>
      {animated && (
        <style>{`
          @keyframes glowSpin { to { transform: rotate(360deg); } }
          .${id}-wrap::before {
            content: '';
            position: absolute;
            inset: -${borderWidth * 2}px;
            border-radius: ${borderRadius + borderWidth * 2}px;
            background: conic-gradient(from 0deg, transparent 0deg, ${glowColor} 60deg, transparent 120deg, transparent 360deg);
            animation: glowSpin 3s linear infinite;
            z-index: 0;
          }
          .${id}-wrap::after {
            content: '';
            position: absolute;
            inset: ${borderWidth}px;
            border-radius: ${borderRadius - borderWidth}px;
            background: inherit;
            z-index: 1;
          }
        `}</style>
      )}
      <div
        className={`${id}-wrap ${className || ""}`}
        style={{ position: "relative", borderRadius, overflow: "hidden", ...style }}
      >
        {!animated && (
          <div style={{ position: "absolute", inset: 0, borderRadius, border: `${borderWidth}px solid ${glowColor}40`, boxShadow: `0 0 20px ${glowColor}30, inset 0 0 20px ${glowColor}08`, pointerEvents: "none", zIndex: 0 }} />
        )}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
    </>
  );
}