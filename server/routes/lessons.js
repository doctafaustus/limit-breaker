import { Router } from 'express'
import Lesson from '../models/Lesson.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ date: 1 })
    res.json(lessons)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:lessonId', requireAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ lessonId: req.params.lessonId })
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' })
    res.json(lesson)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
