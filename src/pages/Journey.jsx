import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { lessons } from '../data/content'
import styles from './Journey.module.scss'

export default function Journey() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { currentDay, completedLessons } = state

  function getNodeState(lesson) {
    if (completedLessons.includes(lesson.id)) return 'completed'
    if (lesson.day === currentDay) return 'current'
    return 'locked'
  }

  function handleNodeClick(lesson) {
    if (getNodeState(lesson) === 'locked') return
    navigate(`/lesson/${lesson.id}`)
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.journeyTitle}>Your Path</div>
        <div className={styles.journeySubtitle}>3 days · Self-improvement · ~5 min each</div>
      </div>

      <div className={styles.path}>
        {lessons.map((lesson, i) => {
          const nodeState = getNodeState(lesson)
          const isLocked = nodeState === 'locked'
          return (
            <div key={lesson.id} className={styles.nodeWrap}>
              {i > 0 && <div className={styles.connector} />}
              <div
                className={[styles.nodeRow, isLocked ? styles.nodeRowLocked : ''].join(' ')}
                onClick={() => handleNodeClick(lesson)}
              >
                <div className={`${styles.nodeCircle} ${styles['nodeCircle--' + nodeState]}`}>
                  {nodeState === 'completed' ? '✓' : isLocked ? '🔒' : lesson.day}
                </div>
                <div className={styles.nodeInfo}>
                  <div className={styles.nodeDay}>Day {lesson.day}</div>
                  <div className={styles.nodeTitle}>{lesson.title}</div>
                  <div className={styles.nodeModule}>{lesson.subtitle}</div>
                </div>
                {!isLocked && nodeState !== 'completed' && (
                  <div style={{ fontSize: '1rem', color: '#6B6880' }}>→</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
