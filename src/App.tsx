import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Now from './components/Now'
import FeaturedTabs from './components/FeaturedTabs'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import GitHub from './components/GitHub'
import Journey from './components/Journey'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

const CURRENT_YEAR = new Date().getFullYear()

export default function App() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Now />
        <FeaturedTabs />
        <TechStack />
        <Projects />
        <GitHub />
        <Journey />
        <Achievements />
        <Contact />
      </main>

      <footer>
        <div className="container footer-inner">
          <p>&copy; {CURRENT_YEAR} Avis Zola Raditya Kurniawan</p>
          <p className="footer-tagline">Dibikin pake Flutter mindset, HTML, CSS &amp; JavaScript</p>
        </div>
      </footer>

      <div className="floating-controls">
        <button
          id="back-to-top"
          className={`ctrl-btn ${showTop ? 'show' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
        </button>
      </div>
    </>
  )
}
