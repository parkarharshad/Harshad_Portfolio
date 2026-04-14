"use client";
import { useState } from "react";
import { motion } from "motion/react";

type Tab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

export function Tabs({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) {
  const [active, setActive] = useState<Tab>(tabs[0]);
  const [hovering, setHovering] = useState(false);

  const activeIdx = tabs.findIndex((t) => t.value === active.value);

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* ── Tab pill buttons ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
        className={containerClassName}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab)}
            style={{
              position: "relative",
              padding: "8px 22px",
              borderRadius: 9999,
              border: "none",
              background: "transparent",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: active.value === tab.value ? "#fff" : "#6b7280",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            className={tabClassName}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="active-tab-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                className={activeTabClassName}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab.title}</span>
          </button>
        ))}
      </div>

      {/*
        ── Card stack area ──

        SPACING FIX:
        • paddingTop: 100 → gives room above the active card for 2 peek cards
          to fan upward WITHOUT overlapping the tab buttons
        • The inner div height is just the active card height (520px)
        • Cards translate with NEGATIVE y (upward) so they appear ABOVE active card
        • overflow: visible on the outer so peeking cards aren't clipped
      */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: 100,          // ← space for peek cards above
          perspective: "1000px",
          overflow: "visible",
        }}
        className={contentClassName}
      >
        <div style={{ position: "relative", width: "100%", height: 520 }}>
          {tabs.map((tab, i) => {
            const offset = i - activeIdx;

            // offset  0 → active card, always visible at y=0
            // offset  1 → 1st peek card, fans UP on hover
            // offset  2 → 2nd peek card, fans even higher on hover
            // offset <0 or >2 → hidden always

            let y = 0;
            let scale = 1;
            let opacity = 0;  // default: hidden
            let zIndex = 0;

            if (offset === 0) {
              y = 0;
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (offset === 1) {
              y = hovering ? -52 : 0;
              scale = hovering ? 0.96 : 1;
              opacity = hovering ? 1 : 0;
              zIndex = 9;
            } else if (offset === 2) {
              y = hovering ? -92 : 0;
              scale = hovering ? 0.92 : 1;
              opacity = hovering ? 1 : 0;
              zIndex = 8;
            }
            // offset < 0 or > 2 stays at opacity 0

            return (
              <motion.div
                key={tab.value}
                animate={{ y, scale, opacity, zIndex }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transformOrigin: "top center",
                  pointerEvents: offset === 0 ? "auto" : "none",
                  willChange: "transform, opacity",
                }}
              >
                {tab.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}