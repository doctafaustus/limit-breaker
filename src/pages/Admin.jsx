import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { journeys } from '../data/content'
import styles from './Admin.module.scss'

export default function Admin() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const { currentDay, activeJourneyId, streak, completedLessons } = state

  function handleAdvance(targetDay) {
    if (currentDay < targetDay) {
      dispatch({ type: 'ADVANCE_DAY' })
    }
  }

  function handleReset() {
    dispatch({ type: 'RESET_DAY' })
  }

  function handleResetAll() {
    dispatch({ type: 'RESET_ALL' })
    navigate('/onboarding', { replace: true })
  }

  function handleSetJourney(journeyId) {
    dispatch({ type: 'SET_JOURNEY', journeyId })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>⚙️ Admin Panel</div>
      <div className={styles.subtitle}>Dev tools — not visible to users</div>

      <div className={styles.sectionTitle}>Current State</div>
      <div className={styles.stateCard}>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Day:</span>
          <span className={styles.stateVal}>{currentDay} / 3</span>
        </div>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Journey:</span>
          <span className={styles.stateVal}>{activeJourneyId || 'none'}</span>
        </div>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Streak:</span>
          <span className={styles.stateVal}>{streak} days</span>
        </div>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Completed:</span>
          <span className={styles.stateVal}>
            {completedLessons.length > 0 ? completedLessons.join(', ') : 'none'}
          </span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Day Controls</div>
      <div className={styles.btnGroup}>
        <button
          className={[styles.btn, styles.btnPrimary].join(' ')}
          disabled={currentDay >= 2}
          onClick={() => handleAdvance(2)}
        >
          Advance to Day 2
        </button>
        <button
          className={[styles.btn, styles.btnPrimary].join(' ')}
          disabled={currentDay >= 3}
          onClick={() => handleAdvance(3)}
        >
          Advance to Day 3
        </button>
        <button className={styles.btn} onClick={handleReset}>
          ↩ Reset to Day 1 (clears completedLessons)
        </button>
      </div>

      <div className={styles.sectionTitle}>Change Journey</div>
      <div className={styles.journeyBtns}>
        {journeys.map(j => (
          <button
            key={j.id}
            className={[styles.btn, activeJourneyId === j.id ? styles.btnPrimary : ''].join(' ')}
            onClick={() => handleSetJourney(j.id)}
          >
            {j.emoji} {j.title}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.sectionTitle}>Danger Zone</div>
      <div className={styles.btnGroup}>
        <button className={[styles.btn, styles.btnDanger].join(' ')} onClick={handleResetAll}>
          🗑️ Reset Everything — return to onboarding
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.sectionTitle}>Raw State</div>
      <pre className={styles.rawJson}>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
