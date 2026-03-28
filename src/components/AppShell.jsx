import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './AppShell.module.scss'

export default function AppShell() {
  return (
    <div className="app-frame">
      <header className={styles.topBar}>
        <img src="/logo.png" alt="Limit Breaker" className={styles.logo} />
      </header>
      <div className="page">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
