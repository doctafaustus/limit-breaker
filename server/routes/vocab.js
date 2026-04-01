import { Router } from 'express'
import Vocab from '../models/Vocab.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/past', requireAuth, async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const past = await Vocab.find({ date: { $lt: date } }).sort({ date: -1 })
    res.json(past)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/', requireAuth, async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const vocab = await Vocab.findOne({ date })
    if (!vocab) return res.status(404).json({ error: 'No vocab for this date' })
    res.json(vocab)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
