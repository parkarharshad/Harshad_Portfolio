"use client";
import { cn } from "@/components/ui/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LayoutTextFlip({
  text,
  words,
  className,
  textClassName,
  wordClassName,
}: {
  text: string;
  words: string[];
  className?: string;
  textClassName?: string;
  wordClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div className={cn("flex items-center justify-center gap-2 flex-wrap", className)}>
      <span className={cn("font-bold", textClassName)}>{text}</span>

      {/* The pill — uses layout to animate width automatically */}
      <motion.span
        layout
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-lg px-4 py-1",
          wordClassName
        )}
        style={{ background: "#4f46e5" }}
        transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block whitespace-nowrap font-bold text-white"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* "platforms." after the pill */}
    </div>
  );
}