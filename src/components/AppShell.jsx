import { Outlet, NavLink } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './AppShell.module.scss'

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
        <img src="/logo.png" alt="Limit Breaker" className={styles.sidebarLogo} />
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
      </aside>
      <div className={styles.mainArea}>
        <header className={styles.topBar}>
          <img src="/logo.png" alt="Limit Breaker" className={styles.logo} />
        </header>
        <div className="page">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
