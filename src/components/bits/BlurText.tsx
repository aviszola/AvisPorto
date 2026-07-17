import { useEffect, useRef } from 'react'

interface BlurTextProps {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  delay?: number
  duration?: number
}

export default function BlurText({ text, as: _as = 'h1', className = '', delay = 80, duration = 400 }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLSpanElement>('.bt-char')
    chars.forEach((char, i) => {
      char.style.transition = `opacity ${duration}ms cubic-bezier(.22,1,.36,1), filter ${duration}ms cubic-bezier(.22,1,.36,1)`
      char.style.opacity = '0'
      char.style.filter = 'blur(8px)'
      requestAnimationFrame(() => {
        setTimeout(() => {
          char.style.opacity = '1'
          char.style.filter = 'blur(0px)'
        }, i * delay)
      })
    })
  }, [text, delay, duration])

  return (
    <div ref={containerRef} className={className} role="heading" aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span key={i} className="bt-char" style={{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}>
          {char}
        </span>
      ))}
    </div>
  )
}
