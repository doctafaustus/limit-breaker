import { useNavigate } from 'react-router-dom'
import { Lock, Check, Clock } from '@phosphor-icons/react'
import { useApp } from '../context/AppContext'
import { getDateStr, isLessonAvailable } from '../utils/dateUtils'
import styles from './Explore.module.scss'

export default function Explore() {
  const { state } = useApp()
  const navigate = useNavigate()
  const { dateOffset, completedLessons, lessons } = state
  const todayStr = getDateStr(dateOffset)

  function handleTileClick(lesson) {
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
      <div className={styles.pageTitle}>All Lessons</div>
      <div className={styles.grid}>
        {lessons.map(lesson => {
          const locked = !isLessonAvailable(lesson, todayStr)
          const completed = completedLessons.some(c => c.lessonId === lesson.id)
          return (
            <div
              key={lesson.id}
              className={[styles.tile, locked ? styles.tileLocked : ''].join(' ')}
              onClick={() => handleTileClick(lesson)}
            >
              <div className={styles.tileAccent} />
              {locked && <div className={styles.tileLock}><Lock size={18} weight="fill" color="#5E6A82" /></div>}
              {completed && !locked && <div className={styles.tileCheck}><Check size={18} weight="bold" color="#51CF66" /></div>}
              <div className={styles.tileDay}>{formatLessonDate(lesson.date)}</div>
              <div className={styles.tileTitle}>{lesson.title}</div>
              <div className={styles.tileMeta}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={12} color="#5E6A82" /> {lesson.estimatedMinutes}m</span>
                <span className={styles.tileXp}>+{lesson.xp} XP</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
