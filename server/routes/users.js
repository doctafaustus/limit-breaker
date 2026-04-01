import { Router } from 'express'
import * as stytch from 'stytch'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
})

const router = Router()

const ALLOWED_PATCH_FIELDS = ['streak', 'lastCompletedDate', 'completedLessons', 'dateOffset']

// GET /api/users/:identifier
router.get('/:identifier', requireAuth, async (req, res) => {
  if (req.stytchUser.user_id !== req.params.identifier)
    return res.status(403).json({ error: 'Forbidden' })
  try {
    const user = await User.findOne({ identifier: req.params.identifier })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/users — create or return existing
router.post('/', requireAuth, async (req, res) => {
  const identifier = req.stytchUser.user_id
  try {
    const user = await User.findOneAndUpdate(
      { identifier },
      { $setOnInsert: { identifier } },
      { upsert: true, new: true }
    )
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH /api/users/:identifier
router.patch('/:identifier', requireAuth, async (req, res) => {
  if (req.stytchUser.user_id !== req.params.identifier)
    return res.status(403).json({ error: 'Forbidden' })
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => ALLOWED_PATCH_FIELDS.includes(k))
  )
  try {
    const user = await User.findOneAndUpdate(
      { identifier: req.params.identifier },
      { $set: updates },
      { new: true }
    )
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/users/:identifier
router.delete('/:identifier', requireAuth, async (req, res) => {
  if (req.stytchUser.user_id !== req.params.identifier)
    return res.status(403).json({ error: 'Forbidden' })
  try {
    await User.deleteOne({ identifier: req.params.identifier })
    await stytchClient.users.delete({ user_id: req.params.identifier })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
