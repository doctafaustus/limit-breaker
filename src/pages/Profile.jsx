import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { journeys, lessons } from '../data/content'
import styles from './Profile.module.scss'

function getTotalXp(completedLessons) {
  let xp = 0
  for (const journeyLessons of Object.values(lessons)) {
    for (const lesson of journeyLessons) {
      if (completedLessons.includes(lesson.id)) xp += lesson.xp
    }
  }
  return xp
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
  const [showConfirm, setShowConfirm] = useState(false)
  const { streak, completedLessons } = state

  const totalXp = getTotalXp(completedLessons)
  const level = getLevel(totalXp)

  function handleReset() {
    dispatch({ type: 'RESET_ALL' })
    setShowConfirm(false)
  }

  function getJourneyProgress(journeyId) {
    const journeyLessons = lessons[journeyId] || []
    const done = journeyLessons.filter(l => completedLessons.includes(l.id)).length
    return { done, total: journeyLessons.length }
  }

  return (
    <div>
      <div className={styles.pageTitle}>👤 Profile</div>

      <div className={styles.avatarSection}>
        <div className={styles.avatar}>LB</div>
        <div className={styles.levelBadge}>Level {level} Learner</div>
        <div className={styles.userName}>Limit Breaker</div>
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
          🔥 {streak} day streak — keep it going!
        </div>
      )}

      <div className={styles.sectionTitle}>Journey Progress</div>
      <div className={styles.journeyProgressSection}>
        {journeys.map(journey => {
          const { done, total } = getJourneyProgress(journey.id)
          const pct = total > 0 ? (done / total) * 100 : 0
          return (
            <div key={journey.id} className={styles.journeyProgressItem}>
              <div className={styles.journeyProgressHeader}>
                <div className={styles.journeyProgressName}>
                  <span>{journey.emoji}</span>
                  <span>{journey.title}</span>
                </div>
                <div className={styles.journeyProgressCount}>{done}/{total}</div>
              </div>
              <div className={styles.progressBarWrap}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${pct}%`, background: journey.color }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.sectionTitle}>Settings</div>
      <div className={styles.settingsSection}>
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

      {showConfirm && (
        <div className={styles.confirmOverlay} onClick={() => setShowConfirm(false)}>
          <div className={styles.confirmSheet} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmTitle}>Reset all progress?</div>
            <div className={styles.confirmText}>
              This will clear all completed lessons, XP, streaks, and return you to onboarding. This cannot be undone.
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
