import { Router } from 'express'
import Reflection from '../models/Reflection.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/reflections?userId=...
router.get('/', requireAuth, async (req, res) => {
  if (req.stytchUser.user_id !== req.query.userId)
    return res.status(403).json({ error: 'Forbidden' })
  try {
    const reflections = await Reflection.find({ userId: req.query.userId }).sort({ savedAt: -1 })
    res.json(reflections)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/reflections
router.post('/', requireAuth, async (req, res) => {
  if (req.stytchUser.user_id !== req.body.userId)
    return res.status(403).json({ error: 'Forbidden' })
  try {
    const reflection = await Reflection.create(req.body)
    res.status(201).json(reflection)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/reflections/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id)
    if (!reflection) return res.status(404).json({ error: 'Not found' })
    if (reflection.userId !== req.stytchUser.user_id)
      return res.status(403).json({ error: 'Forbidden' })
    await reflection.deleteOne()
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
