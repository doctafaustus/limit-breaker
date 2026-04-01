import { Router } from 'express'
import * as stytch from 'stytch'
import User from '../models/User.js'

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
})

const router = Router()

// GET /api/users/:identifier
router.get('/:identifier', async (req, res) => {
  try {
    const user = await User.findOne({ identifier: req.params.identifier })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/users — create or return existing
router.post('/', async (req, res) => {
  try {
    const { identifier = 'default' } = req.body
    const user = await User.findOneAndUpdate(
      { identifier },
      { $setOnInsert: { identifier } },
      { upsert: true, new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/users/:identifier — update streak, completedLessons, etc.
router.patch('/:identifier', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { identifier: req.params.identifier },
      { $set: req.body },
      { new: true }
    )
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/users/:identifier — delete from MongoDB and Stytch
router.delete('/:identifier', async (req, res) => {
  try {
    await User.deleteOne({ identifier: req.params.identifier })
    await stytchClient.users.delete({ user_id: req.params.identifier })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
