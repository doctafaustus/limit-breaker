import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import DailyTrack from './pages/DailyTrack'
import Lesson from './pages/Lesson'
import Vocab from './pages/Vocab'
import Reflections from './pages/Reflections'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import AppShell from './components/AppShell'

export default function App() {
  const { state } = useApp()

  if (!state.onboardingComplete) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/daily-track" element={<DailyTrack />} />
        <Route path="/vocab" element={<Vocab />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="/lesson/:lessonId" element={<Lesson />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
