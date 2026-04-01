import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, ArrowRight, ArrowCounterClockwise } from '@phosphor-icons/react'
import { useApp } from '../context/AppContext'
import { getDateStr, isLessonAvailable } from '../utils/dateUtils'
import styles from './DailyTrack.module.scss'

export default function DailyTrack() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { dateOffset, completedLessons, lessons } = state
  const todayStr = getDateStr(dateOffset)
  const todayRef = useRef(null)

  useEffect(() => {
    if (!todayRef.current || !lessons.length) return
    const timer = setTimeout(() => {
      const el = todayRef.current
      if (!el) return
      let parent = el.parentElement
      let found = false
      while (parent && parent !== document.body) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'auto' || overflowY === 'scroll') {
          found = true
          const elRect = el.getBoundingClientRect()
          const parentRect = parent.getBoundingClientRect()
          const absoluteTop = elRect.top - parentRect.top + parent.scrollTop
          const scrollTarget = absoluteTop - parent.clientHeight / 2 + elRect.height / 2
          parent.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' })
          break
        }
        parent = parent.parentElement
      }
      if (!found) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
    return () => clearTimeout(timer)
  }, [lessons])

  function getNodeState(lesson) {
    if (completedLessons.some(c => c.lessonId === lesson.id)) return 'completed'
    if (lesson.date === todayStr) return 'current'
    if (isLessonAvailable(lesson, todayStr)) return 'available'
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
            <div key={lesson.id} className={styles.nodeWrap} ref={lesson.date === todayStr ? todayRef : null}>
              {i > 0 && <div className={styles.connector} />}
              <div
                className={[styles.nodeRow, !available ? styles.nodeRowLocked : ''].join(' ')}
                onClick={() => handleNodeClick(lesson)}
              >
                <div className={`${styles.nodeCircle} ${styles['nodeCircle--' + nodeState]}`}>
                  {nodeState === 'completed' ? <Check size={16} weight="bold" /> : !available ? <Lock size={16} weight="fill" /> : Number(lesson.date.split('-')[2])}
                </div>
                <div className={styles.nodeInfo}>
                  <div className={styles.nodeDay}>{formatLessonDate(lesson.date)}</div>
                  <div className={styles.nodeTitle}>{lesson.title}</div>
                  <div className={styles.nodeModule}>{lesson.subtitle}</div>
                </div>
                {available && nodeState !== 'completed' && nodeState !== 'current' && (
                  <ArrowRight size={18} color="#5E6A82" />
                )}
                {nodeState === 'completed' && (
                  <div className={styles.redoHint}><ArrowCounterClockwise size={13} color="#5E6A82" /> Redo</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
