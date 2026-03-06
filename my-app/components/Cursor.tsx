"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, frame: number;
    let isHovering = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
      if (glowRef.current) {
        glowRef.current.style.left = mx + "px";
        glowRef.current.style.top  = my + "px";
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHovering = !!(t.closest("a") || t.closest("button") || t.closest("[data-hover]"));
      if (ringRef.current) {
        ringRef.current.style.width  = isHovering ? "60px" : "36px";
        ringRef.current.style.height = isHovering ? "60px" : "36px";
        ringRef.current.style.borderColor = isHovering ? "rgba(139,47,201,0.7)" : "rgba(46,18,74,0.35)";
        ringRef.current.style.background  = isHovering ? "rgba(139,47,201,0.06)" : "transparent";
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = isHovering ? "1" : "0.6";
        glowRef.current.style.width   = isHovering ? "180px" : "120px";
        glowRef.current.style.height  = isHovering ? "180px" : "120px";
      }
    };

    const loop = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
      frame = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    loop();
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        #c-dot  { position:fixed;width:8px;height:8px;border-radius:50%;background:#2E124A;transform:translate(-50%,-50%);pointer-events:none;z-index:9999;transition:transform 0.1s; }
        #c-ring { position:fixed;border-radius:50%;border:1.5px solid rgba(46,18,74,0.35);transform:translate(-50%,-50%);pointer-events:none;z-index:9998;width:36px;height:36px;transition:width 0.3s,height 0.3s,border-color 0.3s,background 0.3s; }
        #c-glow { position:fixed;border-radius:50%;pointer-events:none;z-index:9997;transform:translate(-50%,-50%);width:120px;height:120px;background:radial-gradient(circle,rgba(139,47,201,0.18),transparent 70%);opacity:0.6;transition:width 0.4s,height 0.4s,opacity 0.3s;filter:blur(8px); }
        body { cursor:none; }
      `}</style>
      <div id="c-dot"  ref={dotRef}  />
      <div id="c-ring" ref={ringRef} />
      <div id="c-glow" ref={glowRef} />
    </>
  );
}