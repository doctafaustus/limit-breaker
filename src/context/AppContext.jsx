import { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'lb_state'

const initialState = {
  dateOffset: 0,
  streak: 0,
  completedLessons: [],
  lastCompletedDate: null,
  reflections: {},
  lessons: [],
  lessonsLoading: true,
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
    case 'COMPLETE_LESSON': {
      if (state.completedLessons.some(c => c.lessonId === action.lessonId)) return state
      const alreadyDoneToday = isSameDay(state.lastCompletedDate)
      const newStreak = alreadyDoneToday ? state.streak : state.streak + 1
      return {
        ...state,
        completedLessons: [...state.completedLessons, { lessonId: action.lessonId, completedAt: new Date().toISOString() }],
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

    case 'DELETE_REFLECTION': {
      const { [action.key]: _, ...rest } = state.reflections
      return { ...state, reflections: rest }
    }

    case 'SET_DATE_OFFSET':
      return { ...state, dateOffset: action.offset }

    case 'SET_LESSONS':
      return { ...state, lessons: action.lessons, lessonsLoading: false }

    case 'RESET_ALL':
      return { ...initialState, lessons: state.lessons, lessonsLoading: false }

    default:
      return state
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    // lessons come from the DB, never from localStorage
    const { lessons, lessonsLoading, ...persisted } = JSON.parse(raw)
    return { ...initialState, ...persisted }
  } catch {
    return initialState
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  // Persist user state only — lessons come from the DB
  useEffect(() => {
    try {
      const { lessons, lessonsLoading, ...persistable } = state
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable))
    } catch {
      // ignore storage errors
    }
  }, [state])

  // Fetch lessons from the API on mount
  useEffect(() => {
    fetch('/api/lessons')
      .then(r => r.json())
      .then(data => dispatch({
        type: 'SET_LESSONS',
        // normalize lessonId → id to match existing component code
        lessons: data.map(l => ({ ...l, id: l.lessonId })),
      }))
      .catch(() => dispatch({ type: 'SET_LESSONS', lessons: [] }))
  }, [])

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
