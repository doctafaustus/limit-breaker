import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { useApp } from '../context/AppContext'
import styles from './Onboarding.module.scss'

const questions = [
  {
    id: 'q1',
    question: 'What brings you here?',
    options: [
      { id: 'a', emoji: '💬', text: 'I want to be more confident and articulate' },
      { id: 'b', emoji: '🧠', text: 'I want to expand my mind and think differently' },
      { id: 'c', emoji: '🤝', text: 'I want to connect better with people around me' },
      { id: 'd', emoji: '⚡', text: 'All of the above — I want to level up' },
    ],
  },
  {
    id: 'q2',
    question: 'How much time can you commit each day?',
    options: [
      { id: 'a', emoji: '⚡', text: 'Just 5 minutes — keep it snappy' },
      { id: 'b', emoji: '🕐', text: 'Around 10 minutes works for me' },
      { id: 'c', emoji: '📚', text: 'I\'ll go as long as it\'s good' },
    ],
  },
  {
    id: 'q3',
    question: 'How do you prefer to learn?',
    options: [
      { id: 'a', emoji: '📖', text: 'Reading and reflecting on ideas' },
      { id: 'b', emoji: '✍️', text: 'Doing exercises and applying things immediately' },
      { id: 'c', emoji: '🔀', text: 'A mix — keep it varied' },
    ],
  },
]

export default function Onboarding() {
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showReady, setShowReady] = useState(false)

  const currentQ = questions[step]
  const selectedOption = answers[currentQ?.id]

  function handleSelect(option) {
    setAnswers(prev => ({ ...prev, [currentQ.id]: option.id }))
  }

  function handleNext() {
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      setShowReady(true)
    }
  }

  function handleStart() {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    navigate('/', { replace: true })
  }

  if (showReady) {
    return (
      <div className={styles.wrap}>
        <div className={styles.logo}>Limit Breaker</div>
        <div className={styles.recommendation}>
          <div className={styles.recEmoji}>🚀</div>
          <div className={styles.recTitle}>You're ready.</div>
          <div className={styles.recDesc}>
            Every day you'll get one short, focused lesson — on confidence, body language, articulation, and the kind of ideas that quietly change how you see the world. Small doses. Real results.
          </div>
        </div>
        <div className={styles.nextBtn}>
          <Button
            w="100%"
            size="lg"
            colorScheme="purple"
            onClick={handleStart}
            borderRadius="full"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight={700}
          >
            Let's go →
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>Limit Breaker</div>
      <div className={styles.dots}>
        {questions.map((_, i) => (
          <div
            key={i}
            className={[styles.dot, i === step ? styles.dotActive : ''].join(' ')}
          />
        ))}
      </div>

      <div key={step} className={styles.stepWrap}>
        <div className={styles.question}>{currentQ.question}</div>
        <div className={styles.options}>
          {currentQ.options.map(option => (
            <div
              key={option.id}
              className={[
                styles.option,
                selectedOption === option.id ? styles.optionSelected : '',
              ].join(' ')}
              onClick={() => handleSelect(option)}
            >
              <span className={styles.optionEmoji}>{option.emoji}</span>
              <span className={styles.optionText}>{option.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.nextBtn}>
        <Button
          w="100%"
          size="lg"
          colorScheme="purple"
          isDisabled={!selectedOption}
          onClick={handleNext}
          borderRadius="full"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight={700}
        >
          {step < questions.length - 1 ? 'Next →' : 'Finish →'}
        </Button>
      </div>
    </div>
  )
}
