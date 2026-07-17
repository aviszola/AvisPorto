export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Journey</span>
                    <h2 className="section-title">Perjalanan <em>Saya</em></h2>
          <div className="divider"></div>
        </div>
        <div className="timeline">
          <div className="timeline-progress" id="timelineProgress"></div>
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-year">2024</span>
              <h4>Iseng Coding</h4>
                            <p>Pertama kali mengenal programming. Mencoba Python dari tutorial acak. Belum serius, masih tahap eksplorasi.</p>
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-year">2025</span>
              <h4>SMK Telkom Malang — RPL</h4>
                            <p>Masuk jurusan Rekayasa Perangkat Lunak. Bertemu Flutter — langsung cocok. Mulai mengerjakan project sungguhan. Bergabung dengan MPK.</p>
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-content">
              <span className="tl-year">2026</span>
              <h4>12+ Project &amp; 4+ Sertifikat</h4>
                            <p>Membangun berbagai aplikasi mobile. Mendapatkan sertifikasi AI Engineering, Web Development, Front End. Mulai memahami perbedaan antara menulis kode dan mengoding yang benar.</p>
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-dot tl-dot--future"></div>
            <div className="tl-content">
              <span className="tl-year tl-year--future">2027</span>
              <h4>Target: Intern</h4>
                            <p>Ingin magang di perusahaan teknologi. Agar dapat belajar dari engineer yang lebih berpengalaman dan melihat bagaimana perangkat lunak dibangun di dunia nyata.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
