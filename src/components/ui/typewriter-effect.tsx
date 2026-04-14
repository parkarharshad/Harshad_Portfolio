"use client";
import { cn } from "@/components/ui/utils";
import { motion, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: 0.05, ease: "easeInOut" }
      );
    }
  }, [isInView]);

  return (
    <div className={cn("text-center", className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span initial={{ opacity: 0, display: "none" }} key={`char-${index}`}
                className={cn("text-white", word.className)}>
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", width: 3, borderRadius: 2, background: "#fff", verticalAlign: "middle" }}
      />
    </div>
  );
}

export function TypewriterEffectSmooth({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        maxWidth: "100%",
      }}
    >
      <motion.div
        style={{ overflow: "hidden", maxWidth: "100%" }}
        initial={{ width: "0%" }}
        animate={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      >
        <div style={{
          whiteSpace: "nowrap",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(32px, 5vw, 64px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "0.22em",
        }}>
          {words.map((word, idx) => (
            <span key={idx} style={{ color: "#fff" }}>
              {word.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Blinking cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          display: "inline-block",
          width: 3,
          borderRadius: 2,
          background: "#fff",
          marginLeft: 8,
          flexShrink: 0,
          height: "clamp(28px, 4.5vw, 56px)",
          verticalAlign: "middle",
        }}
      />
    </div>
  );
}