"use client";
import { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  maxDistance?: number;
  speed?: number;
}

export default function FloatingParticles({ count = 50, color = "124,58,237", maxDistance = 110, speed = 0.3 }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - d / maxDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.45)`;
        ctx.fill();
        pts[i].x += pts[i].vx; pts[i].y += pts[i].vy;
        if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
        if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count, color, maxDistance, speed]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}