import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getTodaysLesson, getDateStr, formatDisplayDate } from '../utils/dateUtils'
import styles from './Home.module.scss'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const { state } = useApp()
  const navigate = useNavigate()
  const { dateOffset, streak, completedLessons, lessons } = state

  const todayStr = getDateStr(dateOffset)
  const todayLesson = getTodaysLesson(lessons, todayStr)
  const isCompleted = todayLesson && completedLessons.some(c => c.lessonId === todayLesson.id)

  const [thought, setThought] = useState(null)
  useEffect(() => {
    fetch(`/api/thoughts?date=${todayStr}`)
      .then(r => r.ok ? r.json() : null)
      .then(setThought)
      .catch(() => {})
  }, [todayStr])

  return (
    <div>
      <div className={styles.greeting}>
        {getGreeting()}
        {streak > 0 && (
          <span className={styles.streakBadge}>🔥 {streak} day streak</span>
        )}
      </div>

      <div className={styles.contentGrid}>
        <div>
          {todayLesson && (
            <div className={styles.heroCard}>
              <div className={styles.heroCardBg} />
              <div style={{ position: 'relative' }}>
                <div className={styles.heroTag}>⚡ Daily Lesson · {formatDisplayDate(dateOffset)}</div>
                <div className={styles.heroTitle}>{todayLesson.title}</div>
                <div className={styles.heroSubtitle}>{todayLesson.subtitle}</div>
                <div className={styles.heroMeta}>
                  <div className={styles.heroBadge}>⏱ {todayLesson.estimatedMinutes} min</div>
                  <div className={styles.heroBadge}>✦ {todayLesson.xp} XP</div>
                </div>
                {isCompleted ? (
                  <div className={styles.completedRow}>
                    <div className={styles.completedBadge}>✓ Completed today</div>
                    <button
                      className={styles.redoBtn}
                      onClick={() => navigate('/lesson/today')}
                    >
                      Redo →
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.heroCta}
                    style={{ color: '#4A42CC' }}
                    onClick={() => navigate('/lesson/today')}
                  >
                    Start Today's Lesson →
                  </button>
                )}
              </div>
            </div>
          )}

          {!todayLesson && (
            <div className={styles.noJourneyCard}>
              No lesson scheduled for today — check back tomorrow.
            </div>
          )}
        </div>

        {thought && (
          <div>
            <div className={styles.sectionTitle}>Today's Thought</div>
            <div className={styles.tipCard}>
              <div className={styles.tipTitle}>{thought.title}</div>
              <div className={styles.tipText}>{thought.text}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
