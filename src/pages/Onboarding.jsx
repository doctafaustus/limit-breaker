import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { useApp } from '../context/AppContext'
import { onboardingQuestions } from '../data/onboarding'
import { journeys } from '../data/content'
import styles from './Onboarding.module.scss'

export default function Onboarding() {
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState({ communication: 0, intelligence: 0, content: 0 })
  const [showRecommendation, setShowRecommendation] = useState(false)

  const totalSteps = onboardingQuestions.length
  const currentQ = onboardingQuestions[step]
  const selectedOption = answers[currentQ?.id]

  function handleSelect(option) {
    setAnswers(prev => ({ ...prev, [currentQ.id]: option.id }))
    setScores(prev => ({
      communication: prev.communication + (option.weight.communication || 0),
      intelligence: prev.intelligence + (option.weight.intelligence || 0),
      content: prev.content + (option.weight.content || 0),
    }))
  }

  function handleNext() {
    if (step < totalSteps - 1) {
      setStep(s => s + 1)
    } else {
      setShowRecommendation(true)
    }
  }

  function getWinnerJourney() {
    const entries = Object.entries(scores)
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  }

  function handleStart() {
    const journeyId = getWinnerJourney()
    dispatch({ type: 'COMPLETE_ONBOARDING', journeyId })
    navigate('/', { replace: true })
  }

  if (showRecommendation) {
    const journeyId = getWinnerJourney()
    const journey = journeys.find(j => j.id === journeyId)
    return (
      <div className={styles.wrap}>
        <div className={styles.logo}>Limit Breaker</div>
        <div className={styles.recommendation}>
          <div className={styles.recEmoji}>{journey.emoji}</div>
          <div className={styles.recTitle}>{journey.title}</div>
          <div className={styles.recDesc}>{journey.description}</div>
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
            Start my journey →
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>Limit Breaker</div>
      <div className={styles.dots}>
        {onboardingQuestions.map((_, i) => (
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
          {step < totalSteps - 1 ? 'Next →' : 'See my recommendation →'}
        </Button>
      </div>
    </div>
  )
}
