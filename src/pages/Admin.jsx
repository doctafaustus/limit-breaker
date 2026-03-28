import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getDateStr } from '../data/content'
import styles from './Admin.module.scss'

export default function Admin() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const { dateOffset, streak, completedLessons } = state

  const simulatedDate = getDateStr(dateOffset)

  function handleResetAll() {
    dispatch({ type: 'RESET_ALL' })
    navigate('/onboarding', { replace: true })
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
            {completedLessons.length > 0 ? completedLessons.join(', ') : 'none'}
          </span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Simulate Date</div>
      <div className={styles.btnGroup}>
        <button
          className={[styles.btn, styles.btnPrimary].join(' ')}
          onClick={() => dispatch({ type: 'SET_DATE_OFFSET', offset: dateOffset + 1 })}
        >
          +1 Day → {getDateStr(dateOffset + 1)}
        </button>
        <button
          className={[styles.btn, styles.btnPrimary].join(' ')}
          onClick={() => dispatch({ type: 'SET_DATE_OFFSET', offset: dateOffset + 2 })}
          disabled={dateOffset >= 1}
        >
          +2 Days → {getDateStr(dateOffset + 2)}
        </button>
        <button
          className={styles.btn}
          disabled={dateOffset === 0}
          onClick={() => dispatch({ type: 'SET_DATE_OFFSET', offset: 0 })}
        >
          ↩ Back to today ({getDateStr(0)})
        </button>
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
