import { motion } from 'motion/react'

export function FloatingShapes() {
  const shapes = [
    {
      type: 'cube',
      size: 60,
      top: '15%',
      left: '10%',
      duration: 25,
      delay: 0,
    },
    {
      type: 'pyramid',
      size: 50,
      top: '60%',
      left: '80%',
      duration: 30,
      delay: 2,
    },
    {
      type: 'cube',
      size: 40,
      top: '40%',
      left: '70%',
      duration: 28,
      delay: 4,
    },
    {
      type: 'pyramid',
      size: 55,
      top: '75%',
      left: '20%',
      duration: 32,
      delay: 1,
    },
    {
      type: 'cube',
      size: 45,
      top: '25%',
      left: '85%',
      duration: 27,
      delay: 3,
    },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: shape.top,
            left: shape.left,
            perspective: '1000px',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [0, -100, -200, -300],
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {shape.type === 'cube' ? (
            <Cube size={shape.size} />
          ) : (
            <Pyramid size={shape.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function Cube({ size }: { size: number }) {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front face */}
      <div
        className="absolute border border-cyan-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(6, 182, 212, 0.05)',
          transform: `translateZ(${size / 2}px)`,
        }}
      />
      {/* Back face */}
      <div
        className="absolute border border-teal-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(20, 184, 166, 0.05)',
          transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
        }}
      />
      {/* Right face */}
      <div
        className="absolute border border-cyan-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(6, 182, 212, 0.05)',
          transform: `rotateY(90deg) translateZ(${size / 2}px)`,
        }}
      />
      {/* Left face */}
      <div
        className="absolute border border-teal-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(20, 184, 166, 0.05)',
          transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
        }}
      />
      {/* Top face */}
      <div
        className="absolute border border-violet-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(124, 58, 237, 0.05)',
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
        }}
      />
      {/* Bottom face */}
      <div
        className="absolute border border-blue-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(59, 130, 246, 0.05)',
          transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
        }}
      />
    </div>
  )
}

function Pyramid({ size }: { size: number }) {
  const height = size * 1.2

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: height,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Base */}
      <div
        className="absolute border border-cyan-500/30"
        style={{
          width: size,
          height: size,
          background: 'rgba(6, 182, 212, 0.05)',
          transform: `rotateX(90deg) translateZ(-${height}px)`,
        }}
      />
      {/* Front face */}
      <div
        className="absolute border-l border-r border-b border-teal-500/30"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${height}px solid rgba(20, 184, 166, 0.05)`,
          transformOrigin: 'bottom center',
          transform: `translateY(-${height}px)`,
        }}
      />
      {/* Right face */}
      <div
        className="absolute border-l border-r border-b border-violet-500/30"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${height}px solid rgba(124, 58, 237, 0.05)`,
          transformOrigin: 'bottom center',
          transform: `rotateY(90deg) translateY(-${height}px) translateX(${size / 2}px)`,
        }}
      />
      {/* Back face */}
      <div
        className="absolute border-l border-r border-b border-blue-500/30"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${height}px solid rgba(59, 130, 246, 0.05)`,
          transformOrigin: 'bottom center',
          transform: `rotateY(180deg) translateY(-${height}px)`,
        }}
      />
      {/* Left face */}
      <div
        className="absolute border-l border-r border-b border-pink-500/30"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${height}px solid rgba(236, 72, 153, 0.05)`,
          transformOrigin: 'bottom center',
          transform: `rotateY(-90deg) translateY(-${height}px) translateX(-${size / 2}px)`,
        }}
      />
    </div>
  )
}
