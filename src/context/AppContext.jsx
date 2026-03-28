import { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'lb_state'

const initialState = {
  onboardingComplete: false,
  dateOffset: 0,       // admin-only: simulate N days into the future
  streak: 0,
  completedLessons: [],
  lastCompletedDate: null,
  reflections: {},     // keyed by `${lessonId}-${blockIndex}`
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
      return { ...state, onboardingComplete: true }

    case 'COMPLETE_LESSON': {
      if (state.completedLessons.includes(action.lessonId)) return state
      const alreadyDoneToday = isSameDay(state.lastCompletedDate)
      const newStreak = alreadyDoneToday ? state.streak : state.streak + 1
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.lessonId],
        streak: newStreak,
        lastCompletedDate: new Date().toISOString(),
      }
    }

    case 'SAVE_REFLECTION':
      return {
        ...state,
        reflections: {
          ...state.reflections,
          [action.key]: {
            lessonId: action.lessonId,
            prompt: action.prompt,
            text: action.text,
            savedAt: new Date().toISOString(),
          },
        },
      }

    case 'SET_DATE_OFFSET':
      return { ...state, dateOffset: action.offset }

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
