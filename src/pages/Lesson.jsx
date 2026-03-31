import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getDateStr, getLessonByDate, formatDateFromStr } from '../utils/dateUtils'
import styles from './Lesson.module.scss'

// ---- Block renderers ----

function TextBlock({ block }) {
  return <div className={styles.textBlock}>{block.content}</div>
}

function HeaderBlock({ block }) {
  return <div className={styles.headerBlock}>{block.content}</div>
}

function SpotMistakeBlock({ block, onAnswered }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => { onAnswered() }, [])

  function handleSelect(person) {
    if (selected) return
    setSelected(person)
  }

  const isCorrect = selected === block.mistakeIs

  function cardClass(person) {
    if (!selected) return styles.spotCard
    if (selected === person) {
      return [styles.spotCard, isCorrect ? styles.spotCardCorrect : styles.spotCardWrong].join(' ')
    }
    if (person === block.mistakeIs && !isCorrect) return [styles.spotCard, styles.spotCardCorrect].join(' ')
    return styles.spotCard
  }

  return (
    <div className={styles.spotWrap}>
      <div className={styles.spotHeader}>
        <span className={styles.spotBadge}>🔍 Spot the Mistake</span>
        <div className={styles.spotPrompt}>{block.prompt}</div>
        <div className={styles.spotInstruction}>Tap the person who got it <strong>wrong</strong></div>
      </div>
      <div className={styles.spotCards}>
        {['A', 'B'].map(person => (
          <div key={person} className={cardClass(person)} onClick={() => handleSelect(person)}>
            <div className={styles.spotPersonLabel}>Person {person}</div>
            {block['person' + person].lines.map((line, i) => (
              <div key={i} className={styles.spotLine}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      {selected && (
        <div className={[styles.spotResult, isCorrect ? styles.spotResultCorrect : styles.spotResultWrong].join(' ')}>
          <div className={styles.spotResultTitle}>{isCorrect ? '✓ Correct' : '✗ Not quite'}</div>
          <div className={styles.spotResultText}>{block.explanation}</div>
        </div>
      )}
    </div>
  )
}

function MultipleChoiceBlock({ block, onAnswered }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => { onAnswered() }, [])

  function handleSelect(i) {
    if (confirmed) return
    setSelected(i)
    setConfirmed(true)
  }

  return (
    <div className={styles.mcWrap}>
      <div className={styles.mcQuestion}>{block.question}</div>
      {block.options.map((opt, i) => {
        const isSelected = selected === i
        const isCorrect = opt.correct
        let optClass = styles.mcOption
        let dotClass = styles.mcOptionDot
        if (confirmed && isSelected && isCorrect) {
          optClass += ' ' + styles.mcOptionCorrect
          dotClass += ' ' + styles.mcOptionDotCorrect
        } else if (confirmed && isSelected && !isCorrect) {
          optClass += ' ' + styles.mcOptionIncorrect
          dotClass += ' ' + styles.mcOptionDotIncorrect
        } else if (confirmed && isCorrect) {
          optClass += ' ' + styles.mcOptionCorrect
          dotClass += ' ' + styles.mcOptionDotCorrect
        } else if (isSelected) {
          optClass += ' ' + styles.mcOptionSelected
          dotClass += ' ' + styles.mcOptionDotSelected
        }

        return (
          <div key={i} className={optClass} onClick={() => handleSelect(i)}>
            <div className={dotClass}>
              {confirmed && isCorrect ? '✓' : confirmed && isSelected && !isCorrect ? '✗' : ''}
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.mcOptionText}>{opt.text}</div>
              {confirmed && (isSelected || isCorrect) && opt.explanation && (
                <div className={styles.mcExplanation}>{opt.explanation}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ReflectionBlock({ block, onAnswered, onSave }) {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => { onAnswered() }, [])

  function handleSave() {
    setSaved(true)
    onSave(value)
  }

  return (
    <div className={styles.reflectionWrap}>
      <div className={styles.reflectionPrompt}>{block.prompt}</div>
      <textarea
        className={styles.reflection}
        value={value}
        onChange={e => { setValue(e.target.value); setSaved(false) }}
        placeholder={block.placeholder}
        rows={4}
      />
      {!saved && value.trim().length > 0 && (
        <button className={styles.fillSubmitBtn} style={{ marginTop: '0.75rem' }} onClick={handleSave}>
          Save reflection
        </button>
      )}
      {saved && (
        <div className={[styles.fillResult, styles.fillResultCorrect].join(' ')} style={{ marginTop: '0.75rem' }}>
          ✓ Reflection saved
        </div>
      )}
    </div>
  )
}

function SliderBlock({ block, onAnswered }) {
  const [value, setValue] = useState(5)

  useEffect(() => { onAnswered() }, [])

  function handleChange(e) {
    setValue(Number(e.target.value))
  }

  return (
    <div className={styles.sliderWrap}>
      <div className={styles.sliderPrompt}>{block.prompt}</div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        className={styles.sliderInput}
        onChange={handleChange}
      />
      <div className={styles.sliderLabels}>
        <div className={styles.sliderLabel}>{block.leftLabel}</div>
        <div className={[styles.sliderLabel, styles.sliderLabelRight].join(' ')}>{block.rightLabel}</div>
      </div>
    </div>
  )
}

function DailyActionBlock({ block, onAnswered }) {
  useEffect(() => { onAnswered() }, [])

  return (
    <div className={styles.dailyAction}>
      <div className={styles.dailyActionIcon}>⚡</div>
      <div className={styles.dailyActionHeadline}>{block.headline}</div>
      <div className={styles.dailyActionInstruction}>{block.instruction}</div>
      <div className={styles.dailyActionTime}>⏱ {block.timeEstimate}</div>
    </div>
  )
}

function BlockRenderer({ block, onAnswered, onSaveReflection }) {
  const isInteractive = ['spot-mistake', 'multiple-choice', 'reflection', 'slider', 'daily-action'].includes(block.type)

  switch (block.type) {
    case 'text': return <TextBlock block={block} />
    case 'text-header': return <HeaderBlock block={block} />
    case 'spot-mistake': return <SpotMistakeBlock block={block} onAnswered={onAnswered} />
    case 'multiple-choice': return <MultipleChoiceBlock block={block} onAnswered={onAnswered} />
    case 'reflection': return <ReflectionBlock block={block} onAnswered={onAnswered} onSave={onSaveReflection} />
    case 'slider': return <SliderBlock block={block} onAnswered={onAnswered} />
    case 'daily-action': return <DailyActionBlock block={block} onAnswered={onAnswered} />
    default: return null
  }
}

// ---- Completion screen ----
function CompletionScreen({ lesson, streak, onBack }) {
  return (
    <div className={styles.completion}>
      <div className={styles.completionEmoji}>🎉</div>
      <div className={styles.completionTitle}>Lesson Complete!</div>
      <div className={styles.xpBurst}>+{lesson.xp} XP</div>
      {streak > 0 && (
        <div className={styles.streakRow}>🔥 {streak} day streak</div>
      )}
      <div className={styles.completionSubtext}>
        You've finished "{lesson.title}". Keep going — every lesson builds on the last.
      </div>
      <button className={styles.completionBtn} onClick={onBack}>
        ← Back to Daily Track
      </button>
    </div>
  )
}

// ---- Main Lesson page ----
export default function Lesson() {
  const { date } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const { dateOffset, lessons } = state

  const realToday = getDateStr(0)
  const resolvedDate = date === 'today' ? getDateStr(dateOffset) : date

  // Block future dates — use real date, not offset, so it can't be bypassed
  useEffect(() => {
    if (date !== 'today' && date > realToday) {
      navigate('/', { replace: true })
    }
  }, [date, realToday])

  const lesson = getLessonByDate(lessons, resolvedDate)
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [answeredBlocks, setAnsweredBlocks] = useState({})
  const [showCompletion, setShowCompletion] = useState(false)
  const [completionFired, setCompletionFired] = useState(false)
  const blockRefs = useRef([])

  const blocks = lesson?.blocks || []
  const totalBlocks = blocks.length
  const currentBlock = blocks[currentBlockIndex]

  const isInteractive = currentBlock && ['fill-blank', 'multiple-choice', 'reflection', 'slider', 'daily-action'].includes(currentBlock.type)
  const isAnswered = answeredBlocks[currentBlockIndex]
  const canAdvance = !isInteractive || isAnswered

  useEffect(() => {
    if (currentBlockIndex === 0) return
    const el = blockRefs.current[currentBlockIndex]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentBlockIndex])

  function handleAnswered() {
    setAnsweredBlocks(prev => ({ ...prev, [currentBlockIndex]: true }))
  }

  function handleSaveReflection(blockIndex, text) {
    dispatch({
      type: 'SAVE_REFLECTION',
      key: `${lesson.id}-${blockIndex}`,
      lessonId: lesson.id,
      prompt: blocks[blockIndex].prompt,
      text,
    })
  }

  function handleNext() {
    if (currentBlockIndex < totalBlocks - 1) {
      setCurrentBlockIndex(i => i + 1)
    } else {
      if (!completionFired) {
        dispatch({ type: 'COMPLETE_LESSON', lessonId: lesson.id })
        setCompletionFired(true)
      }
      setShowCompletion(true)
    }
  }

  function handleBack() {
    navigate('/daily-track')
  }

  if (!lesson) {
    return (
      <div className={styles.lessonWrap}>
        <div className={styles.lessonHeader}>
          <button className={styles.closeBtn} onClick={() => navigate(-1)}>✕</button>
          <div style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem', color: '#6B6880' }}>Lesson not found</div>
        </div>
      </div>
    )
  }

  const progress = totalBlocks > 0 ? ((currentBlockIndex + 1) / totalBlocks) * 100 : 0

  if (showCompletion) {
    return (
      <div className={styles.lessonWrap}>
        <div className={styles.lessonHeader}>
          <button className={styles.closeBtn} onClick={handleBack}>✕</button>
          <div className={styles.progressBarWrap}>
            <div className={styles.progressFill} style={{ width: '100%' }} />
          </div>
          <div className={styles.stepCount}>Done!</div>
        </div>
        <CompletionScreen lesson={lesson} streak={state.streak} onBack={handleBack} />
      </div>
    )
  }

  return (
    <div className={styles.lessonWrap}>
      <div className={styles.lessonHeader}>
        <button className={styles.closeBtn} onClick={handleBack}>✕</button>
        <div className={styles.progressBarWrap}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stepCount}>{currentBlockIndex + 1}/{totalBlocks}</div>
      </div>

      <div className={styles.blockWrap}>
        <div className={styles.lessonDate}>⚡ Daily Lesson · {formatDateFromStr(resolvedDate)}</div>
        {blocks.slice(0, currentBlockIndex + 1).map((block, i) => (
          <div key={i} className={styles.blockItem} ref={el => blockRefs.current[i] = el}>
            <BlockRenderer
              block={block}
              onAnswered={handleAnswered}
              onSaveReflection={(text) => handleSaveReflection(i, text)}
            />
          </div>
        ))}
      </div>

      <div className={styles.nextBtnArea}>
        <button
          className={styles.nextBtn}
          disabled={!canAdvance}
          onClick={handleNext}
        >
          {currentBlockIndex < totalBlocks - 1 ? 'Continue →' : 'Finish lesson ✓'}
        </button>
      </div>
    </div>
  )
}
