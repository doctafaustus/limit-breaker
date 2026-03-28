import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { journeys, lessons } from '../data/content'
import styles from './Journey.module.scss'

export default function Journey() {
  const { journeyId } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()
  const { currentDay, completedLessons } = state

  const journey = journeys.find(j => j.id === journeyId)
  const journeyLessons = lessons[journeyId] || []

  if (!journey) {
    return (
      <div>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>←</button>
          <div className={styles.journeyTitle}>Journey not found</div>
        </div>
      </div>
    )
  }

  function getNodeState(lesson) {
    if (completedLessons.includes(lesson.id)) return 'completed'
    if (lesson.day === currentDay) return 'current'
    if (lesson.day < currentDay) return 'completed'
    return 'locked'
  }

  function handleNodeClick(lesson) {
    const nodeState = getNodeState(lesson)
    if (nodeState === 'locked') return
    navigate(`/lesson/${lesson.id}`)
  }

  return (
    <div>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={styles.journeyEmoji}>{journey.emoji}</span>
            <span className={styles.journeyTitle}>{journey.title}</span>
          </div>
          <div className={styles.journeySubtitle}>{journey.subtitle}</div>
        </div>
      </div>

      <div className={styles.moduleLabel}>{journeyLessons[0]?.moduleTitle}</div>

      <div className={styles.path}>
        {journeyLessons.map((lesson, i) => {
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
                  {nodeState === 'completed' ? '✓' : nodeState === 'locked' ? '🔒' : lesson.day}
                </div>
                <div className={styles.nodeInfo}>
                  <div className={styles.nodeDay}>Day {lesson.day}</div>
                  <div className={styles.nodeTitle}>{lesson.title}</div>
                  <div className={styles.nodeModule}>{lesson.moduleTitle}</div>
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
