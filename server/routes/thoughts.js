import { Router } from 'express'
import Thought from '../models/Thought.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const thought = await Thought.findOne({ date })
    if (!thought) return res.status(404).json({ error: 'No thought for this date' })
    res.json(thought)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
