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

export default function App() {
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
          <p>&copy; {new Date().getFullYear()} Avis Zola Raditya Kurniawan</p>
          <p className="footer-tagline">Dibikin pake Flutter mindset, HTML, CSS &amp; JavaScript</p>
        </div>
      </footer>

      <button id="back-to-top" className="ctrl-btn show" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 900,
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid var(--border)', background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          color: 'var(--accent)', fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-md)',
        }}
        aria-label="Kembali ke atas"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  )
}
