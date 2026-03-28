import { useApp } from '../context/AppContext'
import { getVocabForDay, getPastVocab } from '../data/vocabData'
import { getDateStr, formatDisplayDate } from '../data/content'
import styles from './Vocab.module.scss'

export default function Vocab() {
  const { state } = useApp()
  const todayStr = getDateStr(state.dateOffset)
  const vocab = getVocabForDay(todayStr)
  const past = getPastVocab(todayStr)

  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <div className={styles.pageLabel}>Word of the Day</div>
        <div className={styles.dayBadge}>{formatDisplayDate(state.dateOffset)}</div>
      </div>

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
        <>
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
        </>
      )}
    </div>
  )
}

function formatPastDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric'
  })
}
