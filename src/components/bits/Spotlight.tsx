import { useRef, useEffect } from 'react'

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  size?: number
}

export default function Spotlight({ children, className = '', size = 400 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      el.style.setProperty('--sx', `${x}%`)
      el.style.setProperty('--sy', `${y}%`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className={`spotlight-wrap ${className}`}
      style={{
        position: 'relative', overflow: 'hidden',
        '--sx': '50%', '--sy': '50%',
      } as React.CSSProperties}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle ${size}px at var(--sx) var(--sy), rgba(201,169,110,.08), transparent 70%)`,
        opacity: 0, transition: 'opacity .35s ease',
      }} className="spotlight-beam" />
      {children}
    </div>
  )
}
