import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isClickable = !!(t.closest('button') || t.closest('a') || t.tagName === 'BUTTON' || t.tagName === 'A')
      dot.style.opacity = isClickable ? '0' : '1'
      ring.style.width = isClickable ? '48px' : '32px'
      ring.style.height = isClickable ? '48px' : '32px'
      ring.style.marginLeft = isClickable ? '-24px' : '-16px'
      ring.style.marginTop = isClickable ? '-24px' : '-16px'
    }

    // Animate ring with lerp
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 6, height: 6,
        borderRadius: '50%',
        background: '#fff',
        marginLeft: -3, marginTop: -3,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'opacity 0.15s',
        willChange: 'transform',
      }} />

      {/* Ring — lerped */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 32, height: 32,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.4)',
        marginLeft: -16, marginTop: -16,
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'width 0.2s, height 0.2s, margin 0.2s',
        willChange: 'transform',
      }} />
    </>
  )
}