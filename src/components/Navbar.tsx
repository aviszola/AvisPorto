import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar() {
  const { theme, toggle } = useTheme()

  useActiveSection()

  const handleSmooth = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (!href || href === '#') return
    const el = document.querySelector(href)
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  }

  return (
    <nav id="navbar" role="navigation" aria-label="Navigasi utama">
      <div className="container nav-container">
        <a href="#hero" className="logo" aria-label="Beranda" onClick={handleSmooth}>
          AVIS<span className="logo-accent">ZOLA</span>
        </a>

        <ul className="nav-links" id="navLinks">
          <li><a href="#about" className="nav-link" onClick={handleSmooth}>About</a></li>
          <li><a href="#projects" className="nav-link" onClick={handleSmooth}>Projects</a></li>
          <li><a href="#journey" className="nav-link" onClick={handleSmooth}>Journey</a></li>
          <li><a href="#contact" className="nav-link" onClick={handleSmooth}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="theme-btn" onClick={toggle} aria-label="Ganti tema">
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}
