import * as stytch from 'stytch'

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
})

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const resp = await client.sessions.authenticate({ session_token: token })
    req.stytchUser = resp.user
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' })
  }
}
