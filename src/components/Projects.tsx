import { useState } from 'react'
import { projects } from '../data/projects'

function esc(str: string) { return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m] || m) }

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const list = filter === 'all' ? projects : projects.filter(p => p.filter === filter)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Project <em>Lainnya</em></h2>
          <div className="divider"></div>
        </div>
        <div className="filter-row">
          {['all', 'flutter', 'web', 'ai'].map(f => (
            <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'flutter' ? 'Flutter' : f === 'web' ? 'Web' : 'AI/ML'}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {list.map(p => (
            <div key={p.name} className="project-card">
              <div className="project-thumb">
                {p.image ? <img src={p.image} alt={p.name} /> : <i className={`fas ${p.icon}`}></i>}
              </div>
              <div className="project-info">
                <h3>{p.name}</h3>
                <p className="p-problem">{p.problem}</p>
                <div className="tech-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                <div className="project-links">
                  <a href={p.link} target="_blank" rel="noopener"><i className="fab fa-github"></i> GitHub</a>
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener"><i className="fas fa-globe"></i> Live Demo</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
