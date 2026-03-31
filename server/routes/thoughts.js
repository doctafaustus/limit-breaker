import { Router } from 'express'
import Thought from '../models/Thought.js'

const router = Router()

// GET /api/thoughts?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const thought = await Thought.findOne({ date })
    if (!thought) return res.status(404).json({ error: 'No thought for this date' })
    res.json(thought)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
