import { Outlet, NavLink, Link } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './AppShell.module.scss'
import { useApp } from '../context/AppContext'

const DAY_INITIALS = ['S','M','T','W','T','F','S']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function WeekDots() {
  const { state } = useApp()
  const now = new Date()
  const todayIndex = now.getDay()
  const dateLabel = `${MONTHS[now.getMonth()]} ${now.getDate()}`

  // Build a Set of day-of-week indices for lessons whose date falls in this week
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - todayIndex)
  weekStart.setHours(0, 0, 0, 0)

  const completedIds = new Set(state.completedLessons.map(c => c.lessonId))
  const completedDays = new Set(
    state.lessons
      .filter(l => completedIds.has(l.lessonId || l.id))
      .map(l => { const [y, m, d] = l.date.split('-').map(Number); return new Date(y, m - 1, d) })
      .filter(d => d >= weekStart && d <= now)
      .map(d => d.getDay())
  )

  return (
    <div className={styles.weekDotsWrap}>
      <div className={styles.weekDate}>{dateLabel}</div>
      <div className={styles.weekDots}>
        {DAY_INITIALS.map((label, i) => {
          const isCompleted = completedDays.has(i)
          const isToday = i === todayIndex
          return (
            <div key={i} className={styles.weekDotCol}>
              <div className={[
                styles.weekDot,
                isToday ? styles.weekDotTodaySize : '',
                isCompleted ? styles.weekDotPast : '',
                isToday && !isCompleted ? styles.weekDotToday : '',
              ].join(' ')} />
              <span className={[
                styles.weekDotLabel,
                isToday && !isCompleted ? styles.weekDotLabelToday : '',
                isToday && isCompleted ? styles.weekDotLabelCompleted : '',
              ].join(' ')}>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const navItems = [
  { label: 'Home', icon: '🏠', to: '/' },
  { label: 'Daily Track', icon: '🗓️', to: '/daily-track' },
  { label: 'Word', icon: '📖', to: '/vocab' },
  { label: 'Reflections', icon: '📝', to: '/reflections' },
  { label: 'Profile', icon: '👤', to: '/profile' },
]

export default function AppShell() {
  return (
    <div className="app-frame">
      <aside className={styles.sidebar}>
        <Link to="/"><img src="/logo.png" alt="Limit Breaker" className={styles.sidebarLogo} /></Link>
        <nav className={styles.sidebarNav}>
          {navItems.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [styles.sidebarItem, isActive ? styles.sidebarItemActive : ''].join(' ')
              }
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarWeekDots}>
          <WeekDots />
        </div>
      </aside>
      <div className={styles.mainArea}>
        <header className={styles.topBar}>
          <Link to="/"><img src="/logo.png" alt="Limit Breaker" className={styles.logo} /></Link>
          <WeekDots />
        </header>
        <div className="page">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
