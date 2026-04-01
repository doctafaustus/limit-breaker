import { NavLink } from 'react-router-dom'
import { House, CalendarDots, BookOpen, NotePencil, User } from '@phosphor-icons/react'
import styles from './BottomNav.module.scss'

const navItems = [
  { label: 'Home', Icon: House, to: '/' },
  { label: 'Daily Track', Icon: CalendarDots, to: '/daily-track' },
  { label: 'Word', Icon: BookOpen, to: '/vocab' },
  { label: 'Reflections', Icon: NotePencil, to: '/reflections' },
  { label: 'Profile', Icon: User, to: '/profile' },
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
          {({ isActive }) => (
            <>
              <span className={styles.icon}>
                <item.Icon size={22} weight={isActive ? 'fill' : 'regular'} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
