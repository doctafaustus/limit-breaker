import { useEffect, useState } from 'react'
import { useStytch } from '@stytch/react'
import { useNavigate } from 'react-router-dom'
import { Warning } from '@phosphor-icons/react'

const SESSION_DURATION_MINUTES = 43200 // 30 days

export default function Authenticate() {
  const stytch = useStytch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    stytch.magicLinks.authenticate(token, {
      session_duration_minutes: SESSION_DURATION_MINUTES,
    })
      .then(async (resp) => {
        const userId = resp.user?.user_id || resp.user_id
        if (userId) {
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: userId }),
          }).catch(() => {}) // non-fatal if this fails
        }
        navigate('/', { replace: true })
      })
      .catch(err => {
        setError(err?.error_message || err?.message || 'This link has expired or already been used. Please request a new one.')
      })
  }, [])

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <Warning size={36} weight="duotone" color="#E53E3E" />
        <div style={{ fontWeight: 700, color: '#0F1B35' }}>Link invalid</div>
        <div style={{ fontSize: '0.88rem', color: '#5E6A82', textAlign: 'center', maxWidth: 300 }}>{error}</div>
        <a href="/login" style={{ color: '#2C5FDC', fontWeight: 600, fontSize: '0.9rem' }}>Back to sign in</a>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#5E6A82', fontSize: '0.9rem' }}>
      Signing you in…
    </div>
  )
}
