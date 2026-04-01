import { useState, useEffect } from 'react'
import { useStytch } from '@stytch/react'
import { useApp } from '../context/AppContext'
import { getDateStr } from '../utils/dateUtils'
import { authFetch } from '../utils/authFetch'
import styles from './Vocab.module.scss'

export default function Vocab() {
  const { state } = useApp()
  const stytch = useStytch()
  const todayStr = getDateStr(state.dateOffset)

  const [vocab, setVocab] = useState(null)
  const [past, setPast] = useState([])

  useEffect(() => {
    const token = stytch.session.getTokens()?.session_token
    authFetch(`/api/vocab?date=${todayStr}`, {}, token)
      .then(r => r.json())
      .then(setVocab)
      .catch(() => setVocab(null))

    authFetch(`/api/vocab/past?date=${todayStr}`, {}, token)
      .then(r => r.json())
      .then(setPast)
      .catch(() => setPast([]))
  }, [todayStr])

  if (!vocab) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <div className={styles.pageLabel}>Word of the Day</div>
        <div className={styles.dayBadge}>{new Date(new Date().setDate(new Date().getDate() + state.dateOffset)).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.pronunciation}>{vocab.pronunciation}</div>
          <div className={styles.word}>{vocab.word}</div>
          <div className={styles.partOfSpeech}>{vocab.partOfSpeech}</div>

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Definition</div>
          <div className={styles.definition}>{vocab.definition}</div>

          <div className={styles.sectionLabel} style={{ marginTop: '1.5rem' }}>Used in a sentence</div>
          <div className={styles.example}>
            <span className={styles.quoteMarks}>"</span>
            {vocab.example}
            <span className={styles.quoteMarks}>"</span>
          </div>

          <div className={styles.origin}>
            <span className={styles.originLabel}>Origin</span> {vocab.origin}
          </div>
        </div>

        {past.length > 0 && (
          <div>
            <div className={styles.pastHeader}>Previous Words</div>
            <div className={styles.pastList}>
              {past.map(v => (
                <div key={v.date} className={styles.pastCard}>
                  <div className={styles.pastMeta}>
                    <span className={styles.pastWord}>{v.word}</span>
                    <span className={styles.pastPos}>{v.partOfSpeech}</span>
                  </div>
                  <div className={styles.pastDate}>{formatPastDate(v.date)}</div>
                  <div className={styles.pastDef}>{v.definition}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function formatPastDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric'
  })
}
