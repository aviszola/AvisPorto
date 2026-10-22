import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          fontFamily: "'DM Sans', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: 'var(--card-bg)',
            padding: '2.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <i className="fas fa-exclamation-triangle" style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}></i>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '0.75rem' }}>Terjadi Kesalahan</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Aplikasi mengalami kendala tak terduga. Silakan coba muat ulang halaman.
            </p>
            <button
              onClick={this.handleReload}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
            >
              <i className="fas fa-rotate-right"></i> Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
