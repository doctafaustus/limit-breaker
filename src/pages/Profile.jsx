import { useNavigate } from 'react-router-dom'
import { useStytch, useStytchUser } from '@stytch/react'
import { Fire, Trophy, SignOut, Trash, Gear } from '@phosphor-icons/react'
import { useApp } from '../context/AppContext'
import styles from './Profile.module.scss'

function getTotalXp(lessons, completedLessons) {
  return lessons
    .filter(l => completedLessons.some(c => c.lessonId === l.id))
    .reduce((sum, l) => sum + l.xp, 0)
}

function getLessonsThisMonth(completedLessons) {
  const now = new Date()
  return completedLessons.filter(c => {
    const d = new Date(c.completedAt)
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  }).length
}

function getBestMonth(completedLessons) {
  const counts = {}
  completedLessons.forEach(c => {
    const d = new Date(c.completedAt)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    counts[key] = (counts[key] || 0) + 1
  })
  return Math.max(0, ...Object.values(counts))
}

function getLevel(xp) {
  if (xp >= 500) return 5
  if (xp >= 300) return 4
  if (xp >= 150) return 3
  if (xp >= 50) return 2
  return 1
}

export default function Profile() {
  const { state } = useApp()
  const navigate = useNavigate()
  const stytch = useStytch()
  const { user } = useStytchUser()
  const { streak, completedLessons, lessons } = state

  const email = user?.emails?.[0]?.email ?? ''
  const initials = email ? email[0].toUpperCase() : 'LB'
  const totalXp = getTotalXp(lessons, completedLessons)
  const level = getLevel(totalXp)
  const thisMonth = getLessonsThisMonth(completedLessons)
  const bestMonth = getBestMonth(completedLessons)
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long' })

  async function handleLogout() {
    await stytch.session.revoke()
    navigate('/login', { replace: true })
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm('Are you sure you want to delete your account? This is permanent and cannot be undone.')
    if (!confirmed) return
    await fetch(`/api/users/${user.user_id}`, { method: 'DELETE' })
    await stytch.session.revoke()
    navigate('/login', { replace: true })
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
              <div className={styles.statValue}>{completedLessons.length}</div>
              <div className={styles.statLabel}>Lessons</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{streak}</div>
              <div className={styles.statLabel}>Day Streak</div>
            </div>
          </div>

          {streak > 0 && (
            <div className={styles.streakDisplay}>
              <Fire size={18} weight="fill" color="#FF922B" /> {streak} day streak — keep it going!
            </div>
          )}
        </div>

        <div>
          <div className={styles.sectionTitle}>Lessons in {monthName}</div>
          <div className={styles.progressCard}>
            <div className={styles.monthCount}>{thisMonth}</div>
            <div className={styles.monthSub}>
              {bestMonth > 0 && thisMonth >= bestMonth
                ? <><Trophy size={16} weight="fill" color="#F59E0B" /> Best month yet!</>
                : bestMonth > 0
                  ? `Best month: ${bestMonth}`
                  : 'Start building your streak this month'}
            </div>
          </div>

          <div className={styles.sectionTitle} style={{ marginTop: '1.5rem' }}>Settings</div>
          <div className={styles.settingsSection}>
            <button className={styles.settingsBtn} onClick={handleLogout}>
              <SignOut size={18} /> Sign out
            </button>
            <button
              className={[styles.settingsBtn, styles.settingsBtnDanger].join(' ')}
              onClick={handleDeleteAccount}
            >
              <Trash size={18} /> Delete account
            </button>
          </div>

          {email === import.meta.env.VITE_ADMIN_EMAIL && (
            <button className={styles.adminBtn} onClick={() => navigate('/admin')}>
              <Gear size={16} /> Admin Panel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
