import RevealFx from './bits/RevealFx'

export default function About() {
  return (
    <section id="about" className="section who">
      <div className="container">
        <div className="who-grid">
          <RevealFx className="who-visual">
            <div className="code-frame">
              <div className="code-bar">
                <span className="cb-dot"></span>
                <span className="cb-dot"></span>
                <span className="cb-dot"></span>
              </div>
<pre className="code-snippet">{`class AvisZola {
  final String role = "Flutter Developer";
  final String school = "SMK Telkom Malang";

  Project build(Problem p) {
    return Project(
      startWith: "why",
      researchFirst: true,
      iterateUntil: "it works",
    );
  }
}`}</pre>
            </div>
          </RevealFx>

          <RevealFx className="who-text">
            <span className="section-label">About</span>
            <h2 className="section-title">Mulai dari <em>Kenapa</em>,<br />bukan dari <em>Kode</em></h2>
            <div className="divider"></div>
            <p>Saya mulai belajar pemrograman saat masuk SMK Telkom Malang, jurusan Rekayasa Perangkat Lunak. Awalnya hanya iseng mengikuti teman, tetapi saat pertama kali melihat kode Flutter berjalan di ponsel saya sendiri — rasanya berbeda. Sejak saat itu, saya terus belajar, gagal, dan belajar lagi.</p>
            <p>Bagi saya, software engineering bukan sekadar kemampuan menulis kode. Lebih kepada bagaimana cara berpikir. Saya lebih suka berdiskusi dengan pengguna terlebih dahulu, memahami masalahnya, baru mencari solusi. Terkadang saya menghabiskan waktu berhari-hari hanya untuk berpikir, padahal kodenya hanya beberapa baris — dan itu wajar.</p>
            <p>Saat ini saya fokus di Flutter. Target saya sederhana: membuat aplikasi yang benar-benar berguna, bukan hanya terlihat bagus di screenshot.</p>

            <div className="skills-block">
              <h4 className="skills-label">Tech Stack</h4>
              <div className="skill-group">
                <span className="skill-group-label">Frontend</span>
                <div className="skill-chips">
                  <span><i className="fab fa-flutter"></i> Flutter</span>
                  <span>Dart</span>
                  <span>HTML/CSS</span>
                </div>
              </div>
              <div className="skill-group">
                <span className="skill-group-label">Backend &amp; Database</span>
                <div className="skill-chips">
                  <span><i className="fab fa-python"></i> Python</span>
                  <span><i className="fas fa-fire"></i> Firebase</span>
                  <span>REST API</span>
                </div>
              </div>
              <div className="skill-group">
                <span className="skill-group-label">Tools &amp; Workflow</span>
                <div className="skill-chips">
                  <span><i className="fab fa-git-alt"></i> Git</span>
                  <span>Figma</span>
                  <span>Postman</span>
                </div>
              </div>
            </div>
          </RevealFx>
        </div>
      </div>
    </section>
  )
}
