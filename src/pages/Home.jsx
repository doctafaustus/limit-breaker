import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fire, Lightning, Clock, Sparkle, Check, X, BookOpen, NotePencil, ArrowRight } from '@phosphor-icons/react'
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

  const [showOnboarding, setShowOnboarding] = useState(
    () => localStorage.getItem('lb_onboarding_dismissed') !== 'true'
  )

  function dismissOnboarding() {
    localStorage.setItem('lb_onboarding_dismissed', 'true')
    setShowOnboarding(false)
  }

  return (
    <div>
      <div className={styles.greeting}>
        {getGreeting()}
        {streak > 0 && (
          <span className={styles.streakBadge}><Fire size={14} weight="fill" color="#FF922B" /> {streak} day streak</span>
        )}
      </div>

      <div className={styles.contentGrid}>
        <div>
          {todayLesson && (
            <div className={styles.heroCard}>
              <div className={styles.heroCardBg} />
              <div style={{ position: 'relative' }}>
                <div className={styles.heroTag}><Lightning size={12} weight="fill" color="white" /> Daily Lesson · {formatDisplayDate(dateOffset)}</div>
                <div className={styles.heroTitle}>{todayLesson.title}</div>
                <div className={styles.heroSubtitle}>{todayLesson.subtitle}</div>
                <div className={styles.heroMeta}>
                  <div className={styles.heroBadge}><Clock size={13} color="rgba(255,255,255,0.8)" /> {todayLesson.estimatedMinutes} min</div>
                  <div className={styles.heroBadge}><Sparkle size={13} weight="fill" color="#FFD93D" /> {todayLesson.xp} XP</div>
                </div>
                {isCompleted ? (
                  <div className={styles.completedRow}>
                    <div className={styles.completedBadge}><Check size={14} weight="bold" color="#51CF66" /> Completed today</div>
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
                    style={{ color: '#1A3EB8' }}
                    onClick={() => navigate('/lesson/today')}
                  >
                    Start Today's Lesson <ArrowRight size={16} weight="bold" />
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

      {showOnboarding && (
        <div className={styles.onboarding}>
          <div className={styles.onboardingHeader}>
            <div className={styles.onboardingTitle}>Welcome to Limit Breaker</div>
            <button className={styles.onboardingDismiss} onClick={dismissOnboarding}><X size={16} /> Dismiss</button>
          </div>
          <div className={styles.onboardingGrid}>
            <div className={styles.onboardingItem}>
              <div className={styles.onboardingIcon}><Lightning size={28} weight="duotone" color="#2C5FDC" /></div>
              <div className={styles.onboardingItemTitle}>Daily Lessons</div>
              <div className={styles.onboardingItemText}>A new 5-minute lesson unlocks each day. Work through real social scenarios, spot mistakes, and build skills that stick.</div>
            </div>
            <div className={styles.onboardingItem}>
              <div className={styles.onboardingIcon}><BookOpen size={28} weight="duotone" color="#2C5FDC" /></div>
              <div className={styles.onboardingItemTitle}>Word of the Day</div>
              <div className={styles.onboardingItemText}>Expand your vocabulary with one high-value word daily — with pronunciation, definition, and example usage.</div>
            </div>
            <div className={styles.onboardingItem}>
              <div className={styles.onboardingIcon}><NotePencil size={28} weight="duotone" color="#2C5FDC" /></div>
              <div className={styles.onboardingItemTitle}>Reflections</div>
              <div className={styles.onboardingItemText}>Each lesson has optional reflection prompts. Your answers are saved here so you can revisit your thinking over time.</div>
            </div>
            <div className={styles.onboardingItem}>
              <div className={styles.onboardingIcon}><Fire size={28} weight="duotone" color="#FF922B" /></div>
              <div className={styles.onboardingItemTitle}>Build a Streak</div>
              <div className={styles.onboardingItemText}>Consistency beats intensity. Aim for 3–5 lessons a week — small daily effort compounds into real change.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
