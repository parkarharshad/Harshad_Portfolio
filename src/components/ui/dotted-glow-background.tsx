import React, { useEffect, useRef, useState } from "react";
import { cn } from "./utils";

type DottedGlowBackgroundProps = {
  className?: string;
  gap?: number;
  radius?: number;
  color?: string;
  darkColor?: string;
  glowColor?: string;
  darkGlowColor?: string;
  colorLightVar?: string;
  colorDarkVar?: string;
  glowColorLightVar?: string;
  glowColorDarkVar?: string;
  opacity?: number;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
};

type Dot = { x: number; y: number; phase: number; speed: number };

export const DottedGlowBackground = ({
  className,
  gap = 12,
  radius = 2,
  color = "rgba(0,0,0,0.7)",
  darkColor,
  glowColor = "rgba(0, 170, 255, 0.85)",
  darkGlowColor,
  colorLightVar,
  colorDarkVar,
  glowColorLightVar,
  glowColorDarkVar,
  opacity = 0.6,
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.3,
  speedScale = 1,
}: DottedGlowBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resolvedColor, setResolvedColor] = useState<string>(color);
  const [resolvedGlowColor, setResolvedGlowColor] = useState<string>(glowColor);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>();

  const resolveCssVariable = (el: Element, variableName?: string): string | null => {
    if (!variableName) return null;
    const normalized = variableName.startsWith("--") ? variableName : `--${variableName}`;
    const fromEl = getComputedStyle(el).getPropertyValue(normalized).trim();
    if (fromEl) return fromEl;
    return getComputedStyle(document.documentElement).getPropertyValue(normalized).trim() || null;
  };

  const detectDarkMode = (): boolean => {
    const root = document.documentElement;
    return root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
  };

  const parseColor = (colorStr: string): [number, number, number] => {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 170, 255];
  };

  const generateDots = (width: number, height: number): Dot[] => {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({ x: col * gap, y: row * gap, phase: Math.random() * Math.PI * 2, speed: speedMin + Math.random() * (speedMax - speedMin) });
      }
    }
    return dots;
  };

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundOpacity > 0) {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
      gradient.addColorStop(0, `rgba(0,0,0,${backgroundOpacity})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const baseColor = parseColor(resolvedColor);
    const glowColorRgb = parseColor(resolvedGlowColor);

    dotsRef.current.forEach((dot) => {
      dot.phase += (dot.speed * speedScale) / 60;
      const intensity = (Math.sin(dot.phase) + 1) / 2;
      const r = Math.round(baseColor[0] + (glowColorRgb[0] - baseColor[0]) * intensity);
      const g = Math.round(baseColor[1] + (glowColorRgb[1] - baseColor[1]) * intensity);
      const b = Math.round(baseColor[2] + (glowColorRgb[2] - baseColor[2]) * intensity);
      const alpha = 0.3 + intensity * 0.7;

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(dot.x * dpr, dot.y * dpr, radius * dpr, 0, Math.PI * 2);
      ctx.fill();

      if (intensity > 0.6) {
        ctx.shadowBlur = 8 * dpr * intensity;
        ctx.shadowColor = `rgba(${glowColorRgb[0]},${glowColorRgb[1]},${glowColorRgb[2]},${intensity * 0.8})`;
        ctx.beginPath();
        ctx.arc(dot.x * dpr, dot.y * dpr, radius * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    dotsRef.current = generateDots(rect.width, rect.height);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isDark = detectDarkMode();
    let finalColor = color;
    let finalGlowColor = glowColor;
    if (isDark && colorDarkVar) { const r = resolveCssVariable(container, colorDarkVar); if (r) finalColor = r; }
    else if (!isDark && colorLightVar) { const r = resolveCssVariable(container, colorLightVar); if (r) finalColor = r; }
    else if (isDark && darkColor) finalColor = darkColor;
    if (isDark && glowColorDarkVar) { const r = resolveCssVariable(container, glowColorDarkVar); if (r) finalGlowColor = r; }
    else if (!isDark && glowColorLightVar) { const r = resolveCssVariable(container, glowColorLightVar); if (r) finalGlowColor = r; }
    else if (isDark && darkGlowColor) finalGlowColor = darkGlowColor;
    setResolvedColor(finalColor);
    setResolvedGlowColor(finalGlowColor);
  }, [color, darkColor, glowColor, darkGlowColor, colorLightVar, colorDarkVar, glowColorLightVar, glowColorDarkVar]);

  useEffect(() => {
    setupCanvas();
    const observer = new ResizeObserver(() => setupCanvas());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [gap, speedMin, speedMax]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [resolvedColor, resolvedGlowColor, radius, speedScale, backgroundOpacity]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)} style={{ opacity }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </div>
  );
};