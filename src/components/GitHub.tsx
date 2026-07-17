import { useEffect, useState } from 'react'

const USERNAME = 'aviszola'

interface Repo {
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
}

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[] | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Repo[]) => setRepos(data))
      .catch(() => setRepos([]))
  }, [])

  if (!repos) {
    return (
      <section id="github" className="section github-sec">
        <div className="container">
          <div className="section-head">
            <span className="section-label">Open Source</span>
            <h2 className="section-title">Dari <em>GitHub</em></h2>
            <div className="divider"></div>
          </div>
          <div className="gh-grid"><div className="gh-loading">Loading repositories...</div></div>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="section github-sec">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Open Source</span>
          <h2 className="section-title">Dari <em>GitHub</em></h2>
          <div className="divider"></div>
        </div>
        <div className="gh-grid">
          {repos.length === 0 ? (
            <div className="gh-fallback">
              <i className="fas fa-github"></i> Unable to load repos.{' '}
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener">View GitHub →</a>
            </div>
          ) : (
            repos.slice(0, 4).map(r => (
              <div key={r.name} className="gh-card">
                <h4>{r.name}</h4>
                <p>{r.description || 'No description'}</p>
                <div className="gh-meta">
                  <span><i className="fas fa-star"></i> {r.stargazers_count}</span>
                  <span><i className="fas fa-code-branch"></i> {r.forks_count}</span>
                  <span><i className="fas fa-circle" style={{ color: r.language ? '#c9a96e' : '#666' }}></i> {r.language || 'N/A'}</span>
                </div>
                <a href={r.html_url} target="_blank" rel="noopener"><i className="fab fa-github"></i> View Repo</a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
