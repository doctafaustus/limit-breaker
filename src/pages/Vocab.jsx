import { useApp } from '../context/AppContext'
import { getVocabForDay } from '../data/vocabData'
import { getDateStr } from '../data/content'
import styles from './Vocab.module.scss'

export default function Vocab() {
  const { state } = useApp()
  const vocab = getVocabForDay(getDateStr(state.dateOffset))

  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <div className={styles.pageLabel}>Word of the Day</div>
        <div className={styles.dayBadge}>Day {state.currentDay}</div>
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

      <div className={styles.footer}>
        Expand your vocabulary — one word at a time.
      </div>
    </div>
  )
}
