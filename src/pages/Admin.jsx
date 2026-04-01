import { useApp } from '../context/AppContext'
import { getDateStr } from '../utils/dateUtils'
import styles from './Admin.module.scss'

export default function Admin() {
  const { state, dispatch } = useApp()
  const { dateOffset, streak, completedLessons } = state

  const simulatedDate = getDateStr(dateOffset)

  function handleResetAll() {
    dispatch({ type: 'RESET_ALL' })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>⚙️ Admin Panel</div>
      <div className={styles.subtitle}>Dev tools — not visible to users</div>

      <div className={styles.sectionTitle}>Current State</div>
      <div className={styles.stateCard}>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Simulated date:</span>
          <span className={styles.stateVal}>{simulatedDate} {dateOffset !== 0 && `(${dateOffset > 0 ? '+' : ''}${dateOffset}d)`}</span>
        </div>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Streak:</span>
          <span className={styles.stateVal}>{streak} days</span>
        </div>
        <div className={styles.stateLine}>
          <span className={styles.stateKey}>Completed:</span>
          <span className={styles.stateVal}>
            {completedLessons.length > 0 ? completedLessons.map(c => c.lessonId).join(', ') : 'none'}
          </span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Simulate Date</div>
      <div className={styles.calGrid}>
        {Array.from({ length: 30 }, (_, i) => {
          const aprilDate = new Date(2026, 3, i + 1)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const offset = Math.round((aprilDate - today) / 86400000)
          const label = `${i + 1}`
          const isActive = dateOffset === offset
          const isPast = aprilDate < today
          return (
            <button
              key={i}
              className={[styles.calDay, isActive ? styles.calDayActive : '', isPast ? styles.calDayPast : ''].join(' ')}
              onClick={() => dispatch({ type: 'SET_DATE_OFFSET', offset })}
            >
              {label}
            </button>
          )
        })}
      </div>
      <button
        className={styles.btn}
        disabled={dateOffset === 0}
        onClick={() => dispatch({ type: 'SET_DATE_OFFSET', offset: 0 })}
      >
        ↩ Back to today ({getDateStr(0)})
      </button>

      <div className={styles.divider} />

      <div className={styles.sectionTitle}>Danger Zone</div>
      <div className={styles.btnGroup}>
        <button className={[styles.btn, styles.btnDanger].join(' ')} onClick={handleResetAll}>
          🗑️ Reset Everything
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.sectionTitle}>Raw State</div>
      <pre className={styles.rawJson}>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
