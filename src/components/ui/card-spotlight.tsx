import { useRef, useState, useCallback, useEffect, ReactNode, MouseEvent, CSSProperties } from "react";
import { cn } from "./utils";

interface Props {
  children: ReactNode;
  className?: string;
  radius?: number;
  color?: string;
  style?: CSSProperties;
}

export function CardSpotlight({
  children,
  className,
  radius = 300,
  color = "rgba(99,102,241,0.15)",
  style,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.floor(Math.random() * 255);
        imageData.data[i]     = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 40; // more visible
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const observer = new ResizeObserver(() => draw());
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("relative", className)}
      style={{ overflow: 'hidden', ...style }}
    >
      {/* Noise texture — visible on hover */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          mixBlendMode: "overlay",
        }}
      />

      {/* Indigo spotlight — follows cursor */}
      <div style={{
        position: "absolute", inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s ease",
        background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
      }} />

      {/* Content — above effects */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}