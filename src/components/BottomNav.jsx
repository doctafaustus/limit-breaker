import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './BottomNav.module.scss'

const navItems = [
  { label: 'Home', icon: '🏠', to: '/' },
  { label: 'Journey', icon: '🗺️', to: 'journey' },
  { label: 'Word', icon: '📖', to: '/vocab' },
  { label: 'Explore', icon: '🌍', to: '/explore' },
  { label: 'Profile', icon: '👤', to: '/profile' },
]

export default function BottomNav() {
  const { state } = useApp()

  const journeyTo = state.activeJourneyId
    ? `/journey/${state.activeJourneyId}`
    : '/journey/communication'

  return (
    <nav className={styles.nav}>
      {navItems.map(item => {
        const to = item.to === 'journey' ? journeyTo : item.to
        const isExact = item.to === '/'
        return (
          <NavLink
            key={item.label}
            to={to}
            end={isExact}
            className={({ isActive }) =>
              [styles.item, isActive ? styles.itemActive : ''].join(' ')
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
