import { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'lb_state'

const initialState = {
  onboardingComplete: false,
  activeJourneyId: null,
  currentDay: 1,
  streak: 0,
  completedLessons: [],
  lastCompletedDate: null,
}

function isSameDay(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const now = new Date()
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
}

function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboardingComplete: true,
        activeJourneyId: action.journeyId,
      }

    case 'COMPLETE_LESSON': {
      if (state.completedLessons.includes(action.lessonId)) return state
      const today = new Date().toISOString()
      const alreadyDoneToday = isSameDay(state.lastCompletedDate)
      const newStreak = alreadyDoneToday ? state.streak : state.streak + 1
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.lessonId],
        streak: newStreak,
        lastCompletedDate: today,
      }
    }

    case 'ADVANCE_DAY':
      return {
        ...state,
        currentDay: Math.min(state.currentDay + 1, 3),
      }

    case 'RESET_DAY':
      return {
        ...state,
        currentDay: 1,
        completedLessons: [],
      }

    case 'SET_JOURNEY':
      return {
        ...state,
        activeJourneyId: action.journeyId,
      }

    case 'RESET_ALL':
      return { ...initialState }

    default:
      return state
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    return { ...initialState, ...JSON.parse(raw) }
  } catch {
    return initialState
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore storage errors
    }
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
