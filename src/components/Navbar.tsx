import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const lastScroll = useRef(0)
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useActiveSection()

  /* Track active link index for pill indicator */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = NAV_LINKS.findIndex(l => l.href === '#' + e.target.id)
            if (idx !== -1) setActiveIdx(idx)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* Scroll hide/show */
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 20)
      if (sy > 80) {
        setHidden(sy > lastScroll.current)
      } else {
        setHidden(false)
      }
      lastScroll.current = sy
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSmooth = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (!href || href === '#') return
    const el = document.querySelector(href)
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    setMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        role="navigation"
        aria-label="Navigasi utama"
        data-hidden={hidden}
        data-scrolled={scrolled}
      >
        {/* Animated gradient orb */}
        <div className="nav-orb" aria-hidden="true" />

        <div className="container nav-container">
          <a href="#hero" className="logo" aria-label="Beranda" onClick={handleSmooth}>
            AVIS<span className="logo-accent">ZOLA</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links" role="menubar">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} role="none">
                <a
                  href={l.href}
                  className="nav-link"
                  role="menuitem"
                  onClick={handleSmooth}
                  ref={el => { linksRef.current[i] = el }}
                  data-active={i === activeIdx}
                >
                  {l.label}
                </a>
              </li>
            ))}
            {/* Active pill indicator */}
            <li className="nav-pill" style={{ transform: `translateX(${activeIdx * 100}%)` }} aria-hidden="true" />
          </ul>

          <div className="nav-actions">
            <button
              className="theme-btn"
              onClick={toggle}
              aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
              title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} />
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          <ul className="drawer-links">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="drawer-link"
                  onClick={handleSmooth}
                  data-active={i === activeIdx}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
    </>
  )
}
