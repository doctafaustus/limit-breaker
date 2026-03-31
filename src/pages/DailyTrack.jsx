import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getDateStr, isLessonAvailable } from '../utils/dateUtils'
import styles from './DailyTrack.module.scss'

export default function DailyTrack() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { dateOffset, completedLessons, lessons } = state
  const todayStr = getDateStr(dateOffset)

  function getNodeState(lesson) {
    if (completedLessons.some(c => c.lessonId === lesson.id)) return 'completed'
    if (lesson.date === todayStr) return 'current'
    if (isLessonAvailable(lesson, todayStr)) return 'current'
    return 'locked'
  }

  function handleNodeClick(lesson) {
    if (!isLessonAvailable(lesson, todayStr)) return
    navigate(`/lesson/${lesson.date}`)
  }

  function formatLessonDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric'
    })
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.trackTitle}>Daily Track</div>
        <div className={styles.trackSubtitle}>Daily lessons · Self-improvement · ~5 min each</div>
      </div>

      <div className={styles.path}>
        {lessons.map((lesson, i) => {
          const nodeState = getNodeState(lesson)
          const available = isLessonAvailable(lesson, todayStr)
          return (
            <div key={lesson.id} className={styles.nodeWrap}>
              {i > 0 && <div className={styles.connector} />}
              <div
                className={[styles.nodeRow, !available ? styles.nodeRowLocked : ''].join(' ')}
                onClick={() => handleNodeClick(lesson)}
              >
                <div className={`${styles.nodeCircle} ${styles['nodeCircle--' + nodeState]}`}>
                  {nodeState === 'completed' ? '✓' : !available ? '🔒' : i + 1}
                </div>
                <div className={styles.nodeInfo}>
                  <div className={styles.nodeDay}>{formatLessonDate(lesson.date)}</div>
                  <div className={styles.nodeTitle}>{lesson.title}</div>
                  <div className={styles.nodeModule}>{lesson.subtitle}</div>
                </div>
                {available && nodeState !== 'completed' && (
                  <div style={{ fontSize: '1rem', color: '#6B6880' }}>→</div>
                )}
                {nodeState === 'completed' && (
                  <div className={styles.redoHint}>↺ Redo</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
