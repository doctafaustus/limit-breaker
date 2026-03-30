import { Router } from 'express'
import Vocab from '../models/Vocab.js'

const router = Router()

// GET /api/vocab?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const vocab = await Vocab.findOne({ date })
    if (!vocab) return res.status(404).json({ error: 'No vocab for this date' })
    res.json(vocab)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/vocab/past?date=YYYY-MM-DD — all vocab before a given date
router.get('/past', async (req, res) => {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ error: 'date query param required' })
    const past = await Vocab.find({ date: { $lt: date } }).sort({ date: -1 })
    res.json(past)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
