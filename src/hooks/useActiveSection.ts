import { useEffect } from 'react'

export function useActiveSection() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav-link')
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const onScroll = () => {
      const sy = window.scrollY + 140
      let cur = ''
      sections.forEach(s => { if (sy >= s.offsetTop) cur = s.id })
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
