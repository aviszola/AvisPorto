import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'

interface RippleBtnProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function RippleBtn({ children, onClick, className = '', type = 'button', disabled }: RippleBtnProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current
    if (!btn) return
    const r = btn.getBoundingClientRect()
    const circle = document.createElement('span')
    const sz = Math.max(r.width, r.height)
    circle.style.cssText = `
      position:absolute; border-radius:50%;
      width:${sz}px; height:${sz}px;
      left:${e.clientX - r.left - sz / 2}px;
      top:${e.clientY - r.top - sz / 2}px;
      background:rgba(255,255,255,.25);
      transform:scale(0); pointer-events:none;
      animation:ripple .5s ease-out forwards;
    `
    btn.appendChild(circle)
    setTimeout(() => circle.remove(), 500)
    onClick?.()
  }, [onClick])

  return (
    <button ref={ref} type={type} className={className} onClick={handleClick} disabled={disabled}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </button>
  )
}
