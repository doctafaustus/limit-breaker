import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { journeys, getTodayLesson } from '../data/content'
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
  const { activeJourneyId, currentDay, streak, completedLessons } = state

  const journey = journeys.find(j => j.id === activeJourneyId)
  const todayLesson = getTodayLesson(activeJourneyId, currentDay)
  const isCompleted = todayLesson && completedLessons.includes(todayLesson.id)

  const completedDays = completedLessons
    .filter(id => activeJourneyId && id.startsWith(activeJourneyId.slice(0, 4)))
    .length

  return (
    <div>
      <div className={styles.greeting}>
        {getGreeting()}
        {streak > 0 && (
          <span className={styles.streakBadge}>🔥 {streak} day streak</span>
        )}
      </div>

      {journey && todayLesson ? (
        <div
          className={styles.heroCard}
          style={{ background: `linear-gradient(135deg, ${journey.color}, ${journey.color}cc)` }}
        >
          <div className={styles.heroCardBg} />
          <div style={{ position: 'relative' }}>
            <div className={styles.heroTag}>{journey.emoji} {journey.title}</div>
            <div className={styles.heroTitle}>{todayLesson.title}</div>
            <div className={styles.heroSubtitle}>{todayLesson.subtitle}</div>
            <div className={styles.heroMeta}>
              <div className={styles.heroBadge}>
                ⏱ {todayLesson.estimatedMinutes} min
              </div>
              <div className={styles.heroBadge}>
                ✦ {todayLesson.xp} XP
              </div>
            </div>
            {isCompleted ? (
              <div className={styles.completedBadge}>
                ✓ Completed
              </div>
            ) : (
              <button
                className={styles.heroCta}
                style={{ color: journey.color }}
                onClick={() => navigate(`/lesson/${todayLesson.id}`)}
              >
                Start Today's Lesson →
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.noJourneyCard}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
          <div style={{ fontWeight: 600 }}>No lesson available today</div>
          <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Check back after advancing to the next day</div>
        </div>
      )}

      <div className={styles.sectionTitle}>Your Progress</div>
      <div className={styles.dayProgress}>
        {[1, 2, 3].map((day, i) => {
          const isCurrentDay = day === currentDay
          const isDone = day < currentDay || (day === currentDay && isCompleted)
          return (
            <>
              {i > 0 && (
                <div
                  key={`conn-${i}`}
                  className={[
                    styles.dayConnector,
                    day <= currentDay && isDone ? styles.dayConnectorFilled : '',
                  ].join(' ')}
                />
              )}
              <div
                key={day}
                className={[
                  styles.dayDot,
                  isDone ? styles.dayDotCompleted : '',
                  isCurrentDay && !isDone ? styles.dayDotCurrent : '',
                ].join(' ')}
              >
                {isDone ? '✓' : day}
              </div>
            </>
          )
        })}
      </div>

      <div className={styles.sectionTitle}>Quick Tip</div>
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
