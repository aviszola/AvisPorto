import RippleBtn from './bits/RippleBtn'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const btn = (e.target as HTMLFormElement).querySelector('.btn-submit') as HTMLButtonElement
    const txt = btn.querySelector('span')!
    const ico = btn.querySelector('i')!
    btn.disabled = true
    txt.textContent = 'Mengirim...'
    setTimeout(() => {
      btn.classList.add('success')
      ico.className = 'fas fa-check'
      txt.textContent = 'Terkirim!'
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => {
        btn.classList.remove('success')
        btn.disabled = false
        ico.className = 'fas fa-paper-plane'
        txt.textContent = 'Kirim Pesan'
      }, 3000)
    }, 800)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-inner">
            <span className="section-label">Contact</span>
                        <h2 className="section-title">Mari <em>Berkolaborasi</em></h2>
            <div className="divider"></div>
            <p className="contact-desc">
                            Saat ini saya sedang mencari kesempatan internship atau posisi junior developer. Jika Anda memiliki project, ide, atau sekadar ingin berdiskusi seputar teknologi, silakan hubungi saya.
            </p>
            <div className="contact-channels">
              <a href="https://github.com/aviszola" className="channel" target="_blank" rel="noopener"><i className="fab fa-github"></i> GitHub</a>
              <a href="https://www.linkedin.com/in/avis-zola-raditya-kurniawan-407388377" className="channel" target="_blank" rel="noopener"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="mailto:aviszola04@gmail.com" className="channel"><i className="fas fa-envelope"></i> Email</a>
              <a href="#" className="channel" onClick={e => { e.preventDefault(); alert('Resume — coming soon!') }}><i className="fas fa-file-alt"></i> Resume</a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Nama" required aria-label="Nama" />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" required aria-label="Email" />
              </div>
              <div className="form-group">
                <textarea name="message" rows={3} placeholder="Pesan" required aria-label="Pesan"></textarea>
              </div>
              <RippleBtn type="submit" className="btn btn-primary btn-submit">
                <i className="fas fa-paper-plane"></i> <span>Kirim Pesan</span>
              </RippleBtn>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
