import { useState } from 'react'
import { useStytch } from '@stytch/react'
import { Link } from 'react-router-dom'
import { EnvelopeSimple, ArrowRight } from '@phosphor-icons/react'
import styles from './Login.module.scss'

export default function Login() {
  const stytch = useStytch()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await stytch.magicLinks.email.loginOrCreate(email, {
        login_magic_link_url: `${window.location.origin}/authenticate`,
        signup_magic_link_url: `${window.location.origin}/authenticate`,
      })
      setSent(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src="/logo.png" alt="Limit Breaker" className={styles.logo} />

        {sent ? (
          <div className={styles.sent}>
            <div className={styles.sentIcon}><EnvelopeSimple size={40} weight="duotone" color="#2C5FDC" /></div>
            <div className={styles.sentTitle}>Check your inbox</div>
            <div className={styles.sentText}>
              We sent a magic link to <strong>{email}</strong>. Click it to sign in — no password needed.
            </div>
            <button className={styles.resend} onClick={() => setSent(false)}>
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div className={styles.heading}>Sign in to Limit Breaker</div>
            <div className={styles.subheading}>Enter your email and we'll send you a magic link.</div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              {error && <div className={styles.error}>{error}</div>}
              <button className={styles.btn} type="submit" disabled={loading}>
                {loading ? 'Sending…' : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>Send magic link <ArrowRight size={16} weight="bold" /></span>}
              </button>
            </form>
          </>
        )}
      </div>
      <p className={styles.footer}>
        By signing in, you agree to our <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>.
      </p>
    </div>
  )
}
