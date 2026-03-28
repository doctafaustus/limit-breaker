import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { journeys, lessons } from '../data/content'
import styles from './Explore.module.scss'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'communication', label: '💬 Communication' },
  { id: 'intelligence', label: '🧠 Intelligence' },
  { id: 'content', label: '📱 Content' },
]

export default function Explore() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const { currentDay, completedLessons, activeJourneyId } = state

  const allLessons = Object.entries(lessons).flatMap(([journeyId, jLessons]) => {
    const journey = journeys.find(j => j.id === journeyId)
    return jLessons.map(l => ({ ...l, journeyId, journey }))
  })

  const filtered = activeFilter === 'all'
    ? allLessons
    : allLessons.filter(l => l.journeyId === activeFilter)

  function isLocked(lesson) {
    if (lesson.journeyId === activeJourneyId) {
      return lesson.day > currentDay
    }
    return lesson.day > 1
  }

  function handleTileClick(lesson) {
    if (isLocked(lesson)) return
    navigate(`/lesson/${lesson.id}`)
  }

  return (
    <div>
      <div className={styles.pageTitle}>🌍 Explore</div>
      <div className={styles.filterBar}>
        {filters.map(f => (
          <div
            key={f.id}
            className={[styles.filterChip, activeFilter === f.id ? styles.filterChipActive : ''].join(' ')}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(lesson => {
          const locked = isLocked(lesson)
          const completed = completedLessons.includes(lesson.id)
          return (
            <div
              key={lesson.id}
              className={[styles.tile, locked ? styles.tileLocked : ''].join(' ')}
              onClick={() => handleTileClick(lesson)}
            >
              <div className={styles.tileAccent} style={{ background: lesson.journey.color }} />
              {locked && <div className={styles.tileLock}>🔒</div>}
              {completed && !locked && <div className={styles.tileLock}>✓</div>}
              <div className={styles.tileModule}>{lesson.moduleTitle}</div>
              <div className={styles.tileTitle}>{lesson.title}</div>
              <div className={styles.tileMeta}>
                <span>⏱ {lesson.estimatedMinutes}m</span>
                <span className={styles.tileXp}>+{lesson.xp} XP</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
