import { useEffect, useRef } from 'react'
import BlurText from './bits/BlurText'
import Spotlight from './bits/Spotlight'
import MagneticBtn from './bits/MagneticBtn'

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = statsRef.current
    if (!container) return
    const nums = container.querySelectorAll<HTMLElement>('.stat-number')
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        nums.forEach(el => {
          const target = +el.dataset.target! || 0
          let c = 0
          const s = Math.max(target / 50, 1)
          const tick = () => { c += s; if (c < target) { el.textContent = String(Math.floor(c)); requestAnimationFrame(tick) } else el.textContent = String(target) }
          tick()
        })
        obs.disconnect()
      }
    }, { threshold: .4 })
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" className="section hero">
      <div className="container hero-container">
        <div className="hero-visual">
          <Spotlight size={300}>
            <div className="avatar-scene">
              <div className="avatar-wrapper">
                <img src="/images/profil.jpg" alt="Avis Zola" width="320" height="320" />
              </div>
            </div>
          </Spotlight>
        </div>

        <div className="hero-content">
          <BlurText
            text="Simple things should be simple, complex things should be possible."
            as="p"
            className="hero-statement"
            delay={30}
            duration={400}
          />
          <h1 className="hero-title">Avis Zola Raditya Kurniawan</h1>
          <p className="hero-subtitle">Mobile App & Frontend Developer &middot; SMK Telkom Malang</p>
          <div className="hero-buttons">
            <MagneticBtn as="a" href="#projects" strength={0.2}>
              <span className="btn btn-primary">
                <i className="fas fa-arrow-right"></i> Lihat Project
              </span>
            </MagneticBtn>
            <MagneticBtn as="a" href="#contact" strength={0.2}>
              <span className="btn btn-ghost">
                <i className="fas fa-envelope"></i> Kontak
              </span>
            </MagneticBtn>
          </div>
          <div className="hero-stats" ref={statsRef}>
            <div className="stat">
              <div className="stat-val"><span className="stat-number" data-target="12">0</span><span className="stat-plus">+</span></div>
              <p>Projects</p>
            </div>
            <div className="stat-sep"></div>
            <div className="stat">
              <div className="stat-val"><span className="stat-number" data-target="4">0</span><span className="stat-plus">+</span></div>
              <p>Certificates</p>
            </div>
            <div className="stat-sep"></div>
            <div className="stat">
              <div className="stat-val"><span className="stat-number" data-target="3">0</span><span className="stat-plus">+</span></div>
              <p>Years Building</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
