export default function Now() {
  return (
    <section id="now" className="section now">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Now</span>
          <h2 className="section-title">Aktivitas <em>Saat Ini</em></h2>
          <div className="divider"></div>
        </div>
        <div className="now-grid">
          <div className="now-card">
            <i className="fas fa-code"></i>
            <h3>Building</h3>
            <p>Portfolio v3 — engineering-focused narrative dengan arsitektur modular.</p>
          </div>
          <div className="now-card">
            <i className="fas fa-graduation-cap"></i>
            <h3>Learning</h3>
            <p>BLoC state management, GetX, dan clean architecture di Flutter.</p>
          </div>
          <div className="now-card">
            <i className="fas fa-book"></i>
            <h3>Reading</h3>
            <p>Flutter docs, Firebase best practices, software architecture patterns.</p>
          </div>
          <div className="now-card">
            <i className="fas fa-bullseye"></i>
            <h3>Goal</h3>
            <p>Magang sebagai Flutter developer. Ingin belajar dari engineer yang lebih berpengalaman.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
