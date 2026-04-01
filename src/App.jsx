import { Routes, Route, Navigate } from 'react-router-dom'
import { useStytchSession, useStytchUser } from '@stytch/react'
import Home from './pages/Home'
import DailyTrack from './pages/DailyTrack'
import Lesson from './pages/Lesson'
import Vocab from './pages/Vocab'
import Reflections from './pages/Reflections'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Authenticate from './pages/Authenticate'
import AppShell from './components/AppShell'
import Privacy from './pages/Privacy'

function ProtectedRoute({ children }) {
  const { session } = useStytchSession()
  if (session === undefined) return null // still loading
  if (!session) return <Navigate to="/login" replace />
  return children
}

function AdminRoute({ children }) {
  const { session } = useStytchSession()
  const { user } = useStytchUser()
  if (session === undefined || user === undefined) return null // still loading
  if (!session) return <Navigate to="/login" replace />
  const email = user?.emails?.[0]?.email
  if (email !== import.meta.env.VITE_ADMIN_EMAIL) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/daily-track" element={<DailyTrack />} />
        <Route path="/vocab" element={<Vocab />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lesson/:date" element={<Lesson />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
