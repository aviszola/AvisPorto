import { useEffect, useRef } from 'react'

interface RevealFxProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'span'
  threshold?: number
}

export default function RevealFx({ children, className = '', as: Tag = 'div', threshold = 0.08 }: RevealFxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('rx-active')
          obs.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <Tag ref={ref} className={`rx-fx ${className}`}
      style={{
        opacity: 0, transform: 'translateY(20px) scale(.98)',
        filter: 'blur(4px)',
        transition: 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1), filter .7s cubic-bezier(.22,1,.36,1)',
      }}
    >
      {children}
    </Tag>
  )
}
