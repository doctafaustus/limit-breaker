import { Router } from 'express'
import Reflection from '../models/Reflection.js'

const router = Router()

// GET /api/reflections?userId=...
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ error: 'userId query param required' })
    const reflections = await Reflection.find({ userId }).sort({ savedAt: -1 })
    res.json(reflections)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/reflections
router.post('/', async (req, res) => {
  try {
    const reflection = await Reflection.create(req.body)
    res.status(201).json(reflection)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/reflections/:id
router.delete('/:id', async (req, res) => {
  try {
    await Reflection.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
