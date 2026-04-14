import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export function AnimatedTestimonials({ testimonials, autoplay = true }: { testimonials: Testimonial[]; autoplay?: boolean }) {
  const [active, setActive] = useState(0);
  const [rotations] = useState(() => testimonials.map(() => Math.random() * 20 - 10));

  const next = useCallback(() => setActive(i => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [autoplay, next]);

  return (
    <div className='testimonial-layout'>

      {/* Image stack */}
      <div style={{ position: 'relative', width: 'min(280px, 80vw)', height: 'min(320px, 70vw)', flexShrink: 0 }}>
        <AnimatePresence>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.src}
              initial={{ opacity: 0, scale: 0.9, rotate: rotations[i], zIndex: 0 }}
              animate={{
                opacity: i === active ? 1 : 0.4,
                scale: i === active ? 1 : 0.95,
                rotate: i === active ? 0 : rotations[i],
                zIndex: i === active ? 10 : testimonials.length - Math.abs(i - active),
                y: i === active ? 0 : 12,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', inset: 0,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: i === active ? '0 25px 50px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              <img src={t.src} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 4 }}>
                {testimonials[active].name}
              </h3>
              <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#52525b', letterSpacing: '.06em' }}>
                {testimonials[active].designation}
              </p>
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 15, color: '#a1a1aa', lineHeight: 1.8 }}>
              {testimonials[active].quote}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button onClick={prev} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}>
            <ArrowLeft size={15} color="#fff" />
          </button>
          <button onClick={next} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}>
            <ArrowRight size={15} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}