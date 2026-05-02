"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  autoPlay,
  autoPlayInterval,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* ── Tab buttons ── */}
      <div
        className={cn("flex flex-row flex-wrap items-center justify-start max-w-full w-full", containerClassName)}
        style={{ position: "relative", zIndex: 20, gap: 6, marginBottom: 16 }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => moveSelectedTabToTop(idx)}
            style={{
              position: "relative",
              padding: "8px 20px",
              borderRadius: 9999,
              border: "none",
              background: "transparent",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: active.value === tab.value ? "#fff" : "#6b7280",
              cursor: "pointer",
              flexShrink: 0,
            }}
            className={tabClassName}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                className={activeTabClassName}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* ── Card stack ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: isMobile ? 0 : 120,
          overflow: "visible",
        }}
        className={contentClassName}
      >
        <div style={{ position: "relative", width: "100%", height: isMobile ? 320 : 680 }}>
          {tabs.map((tab, idx) => (
            <motion.div
              key={tab.value}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: tabs.length - idx,
                pointerEvents: idx === 0 ? "auto" : "none",
              }}
              animate={{
                scale: isMobile ? 1 : 1 - idx * 0.07,
                y: isMobile ? 0 : hovering ? idx * -40 : idx * 8,
                opacity: isMobile
                  ? idx === 0 ? 1 : 0
                  : idx < 4 ? Math.max(0, 1 - idx * 0.2) : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {idx === 0 ? (
                <motion.div
                  key={active.value}
                  style={{ width: "100%", height: "100%" }}
                  initial={{ opacity: 0, y: isMobile ? 16 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {tab.content}
                </motion.div>
              ) : (
                tab.content
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
