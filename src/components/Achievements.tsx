import { useState } from 'react'
import { certs } from '../data/certs'

const years = ['all', '2026', '2025', '2024']

export default function Achievements() {
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIdx, setModalIdx] = useState(0)

  const list = filter === 'all' ? certs : certs.filter(c => c.year === filter)
  const current = certs[modalIdx]

  const open = (i: number) => { setModalIdx(i); setModalOpen(true) }

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Sertifikat &amp;<br /><em>Validasi</em></h2>
          <div className="divider"></div>
        </div>
        <div className="filter-row">
          {years.map(y => (
            <button key={y} className={`filter-btn${filter === y ? ' active' : ''}`} onClick={() => setFilter(y)}>
              {y === 'all' ? 'All' : y}
            </button>
          ))}
        </div>
        <div className="cert-grid">
          {list.map((c, i) => (
            <div key={c.name} className="cert-card" tabIndex={0} role="button" onClick={() => open(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i) } }}>
              <div className="cert-thumb">
                <img src={c.img} alt={c.name} loading="lazy" onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Certificate' }} />
                <span className="cert-badge">{c.year}</span>
              </div>
              <div className="cert-body"><h4>{c.name}</h4><p>{c.org}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className={`cert-modal-overlay${modalOpen ? ' active' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="cert-modal" onClick={e => e.stopPropagation()}>
          <div className="cert-modal-header">
            <h3>{current?.name}</h3>
            <button className="close-modal" onClick={() => setModalOpen(false)}>&times;</button>
          </div>
          <div className="cert-modal-body">
            <button className="modal-nav prev" onClick={() => setModalIdx(i => (i - 1 + certs.length) % certs.length)}><i className="fas fa-chevron-left"></i></button>
            <img src={current?.img} alt={current?.name} />
            <button className="modal-nav next" onClick={() => setModalIdx(i => (i + 1) % certs.length)}><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="cert-modal-footer">
            <div className="modal-meta"><strong>{current?.org}</strong> <span>{current?.year}</span></div>
            <div className="modal-dots">
              {certs.map((_, i) => (
                <span key={i} className={`m-dot${i === modalIdx ? ' active' : ''}`} onClick={() => setModalIdx(i)}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
