import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getLessonByDay } from '../data/content'
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
  const { currentDay, streak, completedLessons } = state

  const todayLesson = getLessonByDay(currentDay)
  const isCompleted = todayLesson && completedLessons.includes(todayLesson.id)

  return (
    <div>
      <div className={styles.greeting}>
        {getGreeting()}
        {streak > 0 && (
          <span className={styles.streakBadge}>🔥 {streak} day streak</span>
        )}
      </div>

      {todayLesson && (
        <div className={styles.heroCard}>
          <div className={styles.heroCardBg} />
          <div style={{ position: 'relative' }}>
            <div className={styles.heroTag}>⚡ Today's Lesson</div>
            <div className={styles.heroTitle}>{todayLesson.title}</div>
            <div className={styles.heroSubtitle}>{todayLesson.subtitle}</div>
            <div className={styles.heroMeta}>
              <div className={styles.heroBadge}>⏱ {todayLesson.estimatedMinutes} min</div>
              <div className={styles.heroBadge}>✦ {todayLesson.xp} XP</div>
            </div>
            {isCompleted ? (
              <div className={styles.completedBadge}>✓ Completed today</div>
            ) : (
              <button
                className={styles.heroCta}
                style={{ color: '#4A42CC' }}
                onClick={() => navigate(`/lesson/${todayLesson.id}`)}
              >
                Start Today's Lesson →
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.sectionTitle}>Today's Thought</div>
      <div className={styles.tipCard}>
        <div className={styles.tipTitle}>Consistency beats intensity</div>
        <div className={styles.tipText}>
          5 minutes every day builds stronger habits than 2 hours once a week.
          Your brain learns through repetition, not cramming. Keep your streak alive —
          even a tiny session counts.
        </div>
      </div>
    </div>
  )
}
