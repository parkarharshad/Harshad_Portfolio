import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div ref={ref} style={{ position: 'relative' }}>

        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: 0, paddingTop: 8, paddingBottom: 8 }}>

            {/* Left — dot only, line runs through here */}
            <div style={{
              width: 40, flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              paddingTop: 4,
            }}>
              {/* Dot — background matches page so line "passes through" */}
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: '#0a0a0a',
                border: '2px solid #6366f1',
                boxShadow: '0 0 0 3px #0a0a0a, 0 0 0 5px rgba(99,102,241,0.2)',
                zIndex: 10, position: 'relative', flexShrink: 0,
              }} />
            </div>

            {/* Right — year + content */}
            <div style={{ flex: 1, paddingLeft: 24, paddingBottom: 48 }}>
              {/* Year label */}
              <div style={{
                fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                fontWeight: 800, fontSize: 14,
                color: '#6366f1', letterSpacing: '-0.01em',
                lineHeight: 1.4, marginBottom: 16,
                whiteSpace: 'nowrap',
              }}>
                {item.title.replace('\n', ' – ')}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* Line — sits behind dots */}
        <div style={{
          position: 'absolute',
          left: 19,
          top: 0, bottom: 0,
          width: 2,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          <motion.div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: heightTransform,
            opacity: opacityTransform,
            background: 'linear-gradient(to bottom, #4f46e5, #6366f1, #818cf8)',
          }} />
        </div>

      </div>
    </div>
  );
}