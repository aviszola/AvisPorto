import { useState, type ReactNode } from 'react'

const tabs = ['Latar Belakang', 'Yang Dibikin', 'Tech', 'Yang Dipelajari']

const content: Record<string, ReactNode> = {
  'Latar Belakang': (
        <p>Banyak UMKM ingin naik kelas melalui franchise, namun operasionalnya masih manual. Pencatatan mitra, pengontrolan cabang, pemberian informasi — semuanya terpisah. Data tersebar di mana-mana.</p>
  ),
  'Yang Dibikin': (
        <p>Platform web untuk mengelola franchise dari satu tempat. Admin dapat mengelola mitra, memantau cabang, dan memberikan informasi secara real-time, semua terpusat.</p>
  ),
  'Tech': (
    <div className="cs-tech-groups">
      <div className="cs-tech-group">
        <span className="cs-tech-label">Frontend</span>
        <div className="cs-tech-chips"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
      </div>
      <div className="cs-tech-group">
        <span className="cs-tech-label">Backend</span>
        <div className="cs-tech-chips"><span>Firebase</span></div>
      </div>
      <div className="cs-tech-group">
        <span className="cs-tech-label">Database</span>
        <div className="cs-tech-chips"><span>Cloud Firestore</span></div>
      </div>
      <div className="cs-tech-group">
        <span className="cs-tech-label">Auth</span>
        <div className="cs-tech-chips"><span>Firebase Auth</span></div>
      </div>
      <div className="cs-tech-group">
        <span className="cs-tech-label">Storage</span>
        <div className="cs-tech-chips"><span>Firebase Storage</span></div>
      </div>
      <div className="cs-tech-group">
        <span className="cs-tech-label">Tools</span>
        <div className="cs-tech-chips"><span>Git</span><span>Figma</span><span>Postman</span></div>
      </div>
    </div>
  ),
  'Yang Dipelajari': (
    <ul className="cs-list">
            <li>Struktur database sangat penting. Kesalahan desain di awal berarti migrasi data yang menyulitkan di tengah jalan.</li>
            <li>Frontend yang modular membuat debugging jauh lebih mudah. Mengubah satu fitur tidak perlu khawatir merusak yang lain.</li>
            <li>Berkomunikasi langsung dengan calon pengguna sebelum coding — itu yang paling efektif. Fitur yang tidak digunakan hanya menumpuk kompleksitas.</li>
    </ul>
  ),
}

export default function FeaturedTabs() {
  const [active, setActive] = useState(0)

  return (
    <section id="featured" className="section featured">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Featured Project</span>
          <h2 className="section-title">EazyChise: <em>Platform Franchise UMKM</em></h2>
          <p className="section-subhead">Franchise management platform — web-based, Firebase backend.</p>
          <div className="divider"></div>
        </div>

        <div className="casestudy">
          <div className="cs-visual-col">
            <div className="cs-screenshot">
              <a href="https://eazychise.vercel.app" target="_blank" rel="noopener" aria-label="Buka EazyChise di tab baru">
                <img src="/images/eazychise-dashboard.png" alt="EazyChise Dashboard" />
              </a>
            </div>
          </div>

          <div className="cs-details">
            <div className="tab-buttons">
              {tabs.map((tab, i) => (
                <button key={tab} className={`tab-btn${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="cs-section">
              <h4 className="cs-label">{tabs[active]}</h4>
              {content[tabs[active]]}
            </div>

            <div className="cs-links">
              <a href="https://github.com/elzidane/eazychise" className="btn btn-primary" target="_blank" rel="noopener">
                <i className="fab fa-github"></i> View on GitHub
              </a>
              <a href="https://eazychise.vercel.app" className="btn btn-ghost" target="_blank" rel="noopener">
                <i className="fas fa-globe"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
