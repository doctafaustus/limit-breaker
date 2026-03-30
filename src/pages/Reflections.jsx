import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getLessonById } from '../data/content'
import styles from './Reflections.module.scss'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}

export default function Reflections() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const { reflections } = state

  const saved = Object.entries(reflections)
    .map(([key, r]) => ({ key, ...r, lesson: getLessonById(r.lessonId) }))
    .filter(r => r.lesson)
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))

  return (
    <div>
      <div className={styles.pageTitle}>Reflections</div>

      {saved.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📝</div>
          <div className={styles.emptyTitle}>Nothing here yet</div>
          <div className={styles.emptyText}>
            Complete a lesson and save a reflection — it'll show up here.
          </div>
        </div>
      ) : (
        <div className={styles.list}>
          {saved.map(r => (
            <div key={r.key} className={styles.card}>
              <div className={styles.cardMeta}>
                <button
                  className={styles.lessonLink}
                  onClick={() => navigate(`/lesson/${r.lesson.id}`)}
                >
                  {r.lesson.title} →
                </button>
                <div className={styles.cardMetaRight}>
                  <span className={styles.cardDate}>{formatDate(r.savedAt)}</span>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => dispatch({ type: 'DELETE_REFLECTION', key: r.key })}
                    aria-label="Delete reflection"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={styles.cardPrompt}>{r.prompt}</div>
              <div className={styles.cardText}>{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
