import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getLessonById, getJourneyById } from '../data/content'
import styles from './Lesson.module.scss'

// ---- Block renderers ----

function TextBlock({ block }) {
  return <div className={styles.textBlock}>{block.content}</div>
}

function HeaderBlock({ block }) {
  return <div className={styles.headerBlock}>{block.content}</div>
}

function FillBlankBlock({ block, onAnswered }) {
  const [inputs, setInputs] = useState(block.blanks.map(() => ''))
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState([])

  function handleChange(i, val) {
    const next = [...inputs]
    next[i] = val
    setInputs(next)
  }

  function handleSubmit() {
    const res = block.blanks.map((answer, i) => {
      const userVal = inputs[i].trim().toLowerCase()
      const correctVal = answer.toLowerCase()
      return userVal === correctVal || correctVal.includes(userVal) || userVal.includes(correctVal.split('/')[0].trim())
    })
    setResults(res)
    setSubmitted(true)
    if (res.every(Boolean)) onAnswered()
  }

  const allFilled = inputs.every(v => v.trim().length > 0)
  const allCorrect = results.length > 0 && results.every(Boolean)

  return (
    <div className={styles.fillBlankWrap}>
      <div className={styles.fillBlankPrompt}>Fill in the blanks:</div>
      <div style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '0.9rem', color: '#1A1930' }}>
        {block.prompt}
      </div>
      <div className={styles.fillBlankInputs}>
        {block.blanks.map((_, i) => (
          <div key={i} className={styles.fillBlankInputRow}>
            <span className={styles.fillBlankNumber}>#{i + 1}</span>
            <input
              type="text"
              className={[
                styles.fillInput,
                submitted ? (results[i] ? styles.fillCorrect : styles.fillWrong) : '',
              ].join(' ')}
              value={inputs[i]}
              onChange={e => handleChange(i, e.target.value)}
              disabled={submitted && results[i]}
              placeholder={`Blank ${i + 1}`}
            />
          </div>
        ))}
      </div>
      {!submitted && (
        <button
          className={styles.fillSubmitBtn}
          disabled={!allFilled}
          onClick={handleSubmit}
        >
          Check answers
        </button>
      )}
      {submitted && (
        <div className={[styles.fillResult, allCorrect ? styles.fillResultCorrect : styles.fillResultWrong].join(' ')}>
          {allCorrect
            ? '✓ Correct! Great job.'
            : `Not quite — try again.`}
        </div>
      )}
      {submitted && !allCorrect && (
        <button
          className={styles.fillSubmitBtn}
          style={{ marginTop: '0.5rem', background: '#6B6880' }}
          onClick={() => {
            setSubmitted(false)
            setResults([])
            setInputs(inputs.map((v, i) => results[i] ? v : ''))
          }}
        >
          Try again
        </button>
      )}
    </div>
  )
}

function MultipleChoiceBlock({ block, onAnswered }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  function handleSelect(i) {
    if (confirmed) return
    setSelected(i)
    setConfirmed(true)
    onAnswered()
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

function ReflectionBlock({ block, onAnswered }) {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    onAnswered()
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
  const [interacted, setInteracted] = useState(false)

  function handleChange(e) {
    setValue(Number(e.target.value))
    if (!interacted) {
      setInteracted(true)
      onAnswered()
    }
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

function BlockRenderer({ block, onAnswered, answered }) {
  const isInteractive = ['fill-blank', 'multiple-choice', 'reflection', 'slider', 'daily-action'].includes(block.type)

  switch (block.type) {
    case 'text': return <TextBlock block={block} />
    case 'text-header': return <HeaderBlock block={block} />
    case 'fill-blank': return <FillBlankBlock block={block} onAnswered={onAnswered} />
    case 'multiple-choice': return <MultipleChoiceBlock block={block} onAnswered={onAnswered} />
    case 'reflection': return <ReflectionBlock block={block} onAnswered={onAnswered} />
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
        ← Back to Journey
      </button>
    </div>
  )
}

// ---- Main Lesson page ----
export default function Lesson() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const lesson = getLessonById(lessonId)
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [answeredBlocks, setAnsweredBlocks] = useState({})
  const [showCompletion, setShowCompletion] = useState(false)
  const [completionFired, setCompletionFired] = useState(false)

  const blocks = lesson?.blocks || []
  const totalBlocks = blocks.length
  const currentBlock = blocks[currentBlockIndex]

  const isInteractive = currentBlock && ['fill-blank', 'multiple-choice', 'reflection', 'slider', 'daily-action'].includes(currentBlock.type)
  const isAnswered = answeredBlocks[currentBlockIndex]
  const canAdvance = !isInteractive || isAnswered

  function handleAnswered() {
    setAnsweredBlocks(prev => ({ ...prev, [currentBlockIndex]: true }))
  }

  function handleNext() {
    if (currentBlockIndex < totalBlocks - 1) {
      setCurrentBlockIndex(i => i + 1)
    } else {
      if (!completionFired) {
        dispatch({ type: 'COMPLETE_LESSON', lessonId })
        setCompletionFired(true)
      }
      setShowCompletion(true)
    }
  }

  function handleBack() {
    const journey = lesson ? lesson.id.split('-')[0] : null
    if (journey) {
      navigate(`/journey/${journey}`)
    } else {
      navigate('/')
    }
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
        {blocks.slice(0, currentBlockIndex + 1).map((block, i) => (
          <div key={i} className={styles.blockItem}>
            <BlockRenderer
              block={block}
              onAnswered={handleAnswered}
              answered={!!answeredBlocks[i]}
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
