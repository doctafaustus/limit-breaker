import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStytch, useStytchUser } from '@stytch/react'
import { useApp } from '../context/AppContext'
import styles from './Profile.module.scss'

function getTotalXp(lessons, completedLessons) {
  return lessons
    .filter(l => completedLessons.includes(l.id))
    .reduce((sum, l) => sum + l.xp, 0)
}

function getLevel(xp) {
  if (xp >= 500) return 5
  if (xp >= 300) return 4
  if (xp >= 150) return 3
  if (xp >= 50) return 2
  return 1
}

export default function Profile() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const stytch = useStytch()
  const { user } = useStytchUser()
  const [showConfirm, setShowConfirm] = useState(false)
  const { streak, completedLessons, lessons } = state

  const email = user?.emails?.[0]?.email ?? ''
  const initials = email ? email[0].toUpperCase() : 'LB'
  const totalXp = getTotalXp(lessons, completedLessons)
  const level = getLevel(totalXp)
  const done = completedLessons.length
  const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0

  async function handleLogout() {
    await stytch.session.revoke()
    navigate('/login', { replace: true })
  }

  function handleReset() {
    dispatch({ type: 'RESET_ALL' })
    setShowConfirm(false)
  }

  return (
    <div>
      <div className={styles.pageTitle}>Profile</div>

      <div className={styles.contentGrid}>
        <div>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.levelBadge}>Level {level} Learner</div>
            {email && <div className={styles.userEmail}>{email}</div>}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{totalXp}</div>
              <div className={styles.statLabel}>Total XP</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{done}</div>
              <div className={styles.statLabel}>Lessons</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{streak}</div>
              <div className={styles.statLabel}>Day Streak</div>
            </div>
          </div>

          {streak > 0 && (
            <div className={styles.streakDisplay}>
              🔥 {streak} day streak — keep it going!
            </div>
          )}
        </div>

        <div>
          <div className={styles.sectionTitle}>Overall Progress</div>
          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <span>{done} of {lessons.length} lessons complete</span>
              <span>{pct}%</span>
            </div>
            <div className={styles.progressBarWrap}>
              <div className={styles.progressBarFill} style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className={styles.sectionTitle} style={{ marginTop: '1.5rem' }}>Settings</div>
          <div className={styles.settingsSection}>
            <button
              className={styles.settingsBtn}
              onClick={handleLogout}
            >
              🚪 Sign out
            </button>
            <button
              className={[styles.settingsBtn, styles.settingsBtnDanger].join(' ')}
              onClick={() => setShowConfirm(true)}
            >
              🗑️ Reset all progress
            </button>
          </div>

          <button className={styles.adminBtn} onClick={() => navigate('/admin')}>
            ⚙️ Admin Panel
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className={styles.confirmOverlay} onClick={() => setShowConfirm(false)}>
          <div className={styles.confirmSheet} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmTitle}>Reset all progress?</div>
            <div className={styles.confirmText}>
              This will clear all completed lessons, XP, streaks, and reflections. This cannot be undone.
            </div>
            <div className={styles.confirmBtns}>
              <button className={styles.confirmCancel} onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className={styles.confirmConfirm} onClick={handleReset}>Reset everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
