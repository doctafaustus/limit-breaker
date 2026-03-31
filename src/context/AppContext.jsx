import { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import { useStytchUser } from '@stytch/react'

const STORAGE_KEY = 'lb_state'

const initialState = {
  dateOffset: 0,
  streak: 0,
  completedLessons: [],
  lastCompletedDate: null,
  reflections: {},
  lessons: [],
  lessonsLoading: true,
  userLoading: true,
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

    case 'SET_USER':
      return {
        ...state,
        streak: action.user.streak ?? 0,
        completedLessons: action.user.completedLessons ?? [],
        lastCompletedDate: action.user.lastCompletedDate ?? null,
        userLoading: false,
      }

    case 'SET_LESSONS':
      return { ...state, lessons: action.lessons, lessonsLoading: false }

    case 'RESET_ALL':
      return { ...initialState, lessons: state.lessons, lessonsLoading: false, userLoading: false }

    default:
      return state
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const { dateOffset } = JSON.parse(raw)
    return { ...initialState, dateOffset: dateOffset ?? 0 }
  } catch {
    return initialState
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const { user } = useStytchUser()
  const hydratedRef = useRef(false)

  // Persist only dateOffset to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dateOffset: state.dateOffset }))
    } catch {
      // ignore storage errors
    }
  }, [state.dateOffset])

  // Hydrate progress from DB when user is available
  useEffect(() => {
    if (!user?.user_id) return
    hydratedRef.current = false
    fetch(`/api/users/${user.user_id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        dispatch({ type: 'SET_USER', user: data || {} })
        hydratedRef.current = true
      })
      .catch(() => {
        dispatch({ type: 'SET_USER', user: {} })
        hydratedRef.current = true
      })
  }, [user?.user_id])

  // Sync progress to DB after lesson completion or reset
  useEffect(() => {
    if (!user?.user_id || !hydratedRef.current) return
    fetch(`/api/users/${user.user_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        streak: state.streak,
        completedLessons: state.completedLessons,
        lastCompletedDate: state.lastCompletedDate,
      }),
    }).catch(() => {}) // non-fatal
  }, [state.completedLessons, state.streak])

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
