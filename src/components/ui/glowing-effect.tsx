import { useEffect, useRef, useCallback } from "react";

interface Props {
  blur?: number;
  borderWidth?: number;
  spread?: number;
  proximity?: number;
  color?: string;
  disabled?: boolean;
}

export function GlowingEffect({
  blur = 0,
  borderWidth = 2,
  spread = 80,
  proximity = 80,
  color = "rgba(99,102,241,1)",
  disabled = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  const tick = useCallback(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || disabled) return;

    const rect = parent.getBoundingClientRect();
    const { x: mx, y: my } = mouse.current;

    // Is mouse near the card?
    const dx = Math.max(rect.left - mx, 0, mx - rect.right);
    const dy = Math.max(rect.top - my, 0, my - rect.bottom);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > proximity) {
      el.style.opacity = "0";
    } else {
      // Angle from card center to mouse
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(my - cy, mx - cx) * (180 / Math.PI) - 90;
      const opacity = Math.min(1, 1 - dist / proximity);

      el.style.opacity = String(opacity);
      el.style.setProperty("--angle", `${angle}deg`);
    }
  }, [disabled, proximity]);

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const loop = () => { tick(); raf.current = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [disabled, tick]);

  if (disabled) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: -borderWidth,
        borderRadius: "inherit",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0,
        transition: "opacity 0.4s ease",
        background: `conic-gradient(from var(--angle, 0deg), transparent 0%, transparent 65%, ${color} 80%, transparent 95%)`,
        filter: blur ? `blur(${blur}px)` : undefined,
        // Mask to show only the border ring
        padding: borderWidth,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}