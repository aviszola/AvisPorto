import { useState } from 'react'
import RippleBtn from './bits/RippleBtn'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama diperlukan'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan diperlukan'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Construct mailto link with form data
      const subject = encodeURIComponent(`Pesan dari ${formData.name} - Portofolio`)
      const body = encodeURIComponent(
        `${formData.message}\n\n---\nPengirim: ${formData.name}\nEmail: ${formData.email}`
      )
      const mailtoLink = `mailto:aviszola04@gmail.com?subject=${subject}&body=${body}`

      // Open default email client
      window.location.href = mailtoLink

      // Show success state
      await new Promise(resolve => setTimeout(resolve, 1200))
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
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
              <a href="https://github.com/aviszola" className="channel" target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github"></i> GitHub</a>
              <a href="https://www.linkedin.com/in/avis-zola-raditya-kurniawan-407388377" className="channel" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="mailto:aviszola04@gmail.com" className="channel" aria-label="Email"><i className="fas fa-envelope"></i> Email</a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  disabled={isSubmitting}
                  aria-label="Nama"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="form-error"><i className="fas fa-exclamation-circle"></i> {errors.name}</span>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  disabled={isSubmitting}
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="form-error"><i className="fas fa-exclamation-circle"></i> {errors.email}</span>}
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Pesan"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  disabled={isSubmitting}
                  aria-label="Pesan"
                  aria-invalid={!!errors.message}
                ></textarea>
                {errors.message && <span className="form-error"><i className="fas fa-exclamation-circle"></i> {errors.message}</span>}
              </div>
              <RippleBtn
                type="submit"
                className={`btn btn-primary btn-submit${success ? ' success' : ''}`}
                disabled={isSubmitting || success}
                aria-busy={isSubmitting}
              >
                <i className={`fas ${success ? 'fa-check' : 'fa-paper-plane'}`}></i>
                <span>{success ? 'Terkirim!' : isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
              </RippleBtn>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
