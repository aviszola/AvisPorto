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
  final String role = "Mobile & Frontend Developer";
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
            <h2 className="section-title">Di Balik <em>Setiap Kode</em><br />Ada Sebuah <em>Tujuan.</em></h2>
            <div className="divider"></div>
            <p>Saya mulai mengenal dunia pemrograman saat masuk SMK Telkom Malang. Awalnya hanya karena penasaran mengikuti teman, tetapi semuanya berubah ketika aplikasi pertama yang saya buat berhasil berjalan di layar ponsel. Sejak saat itu, rasa penasaran saya berkembang menjadi semangat untuk terus belajar dan membangun sesuatu yang bermanfaat.</p>
            <p>Seiring waktu, saya menikmati dua dunia sekaligus. Flutter mengajarkan saya cara membangun pengalaman mobile yang nyaman, sementara React membuka cara berpikir baru dalam menciptakan antarmuka web yang cepat, interaktif, dan modern. Dari situlah saya menyadari bahwa teknologi hanyalah alat. Yang paling penting adalah bagaimana sebuah produk mampu memberikan manfaat bagi orang yang menggunakannya.</p>
            <p>Saya senang mengubah ide menjadi produk nyata, mulai dari merancang antarmuka, memikirkan alur pengguna, hingga menghubungkan frontend dengan backend melalui REST API. Saat ini saya terus mengembangkan kemampuan sebagai Frontend Developer dan Mobile Developer, sambil mengeksplorasi teknologi baru untuk membangun aplikasi yang tidak hanya menarik secara visual, tetapi juga mudah digunakan dan memberikan pengalaman yang bermakna.</p>

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
