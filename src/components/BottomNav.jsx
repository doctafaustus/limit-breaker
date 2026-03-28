import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.scss'

const navItems = [
  { label: 'Home', icon: '🏠', to: '/' },
  { label: 'Path', icon: '🗺️', to: '/path' },
  { label: 'Word', icon: '📖', to: '/vocab' },
  { label: 'Explore', icon: '🌍', to: '/explore' },
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
