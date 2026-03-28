import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.scss'

const navItems = [
  { label: 'Home', icon: '🏠', to: '/' },
  { label: 'Daily Track', icon: '🗓️', to: '/daily-track' },
  { label: 'Word', icon: '📖', to: '/vocab' },
  { label: 'Reflections', icon: '📝', to: '/reflections' },
  { label: 'Profile', icon: '👤', to: '/profile' },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {navItems.map(item => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            [styles.item, isActive ? styles.itemActive : ''].join(' ')
          }
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
