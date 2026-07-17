import { useEffect, useRef, useState, type ReactNode } from 'react'

interface MagneticBtnProps {
  children: ReactNode
  strength?: number
  className?: string
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function MagneticBtn({ children, strength = .3, className = '', as: Tag = 'button', href, onClick, type }: MagneticBtnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      setPos({ x: dx, y: dy })
    }
    const onLeave = () => setPos({ x: 0, y: 0 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])

  const inner = (
    <div ref={ref} className={`magnetic-wrap ${className}`}
      style={{
        display: 'inline-block', transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform .35s cubic-bezier(.22,1,.36,1)' : 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )

  if (Tag === 'a') return <a href={href} className="magnetic-link" onClick={onClick}>{inner}</a>
  return <button type={type || 'button'} className="magnetic-link" onClick={onClick}>{inner}</button>
}
