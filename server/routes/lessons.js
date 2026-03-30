import { Router } from 'express'
import Lesson from '../models/Lesson.js'

const router = Router()

// GET /api/lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ date: 1 })
    res.json(lessons)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/lessons/:lessonId
router.get('/:lessonId', async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ lessonId: req.params.lessonId })
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' })
    res.json(lesson)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
