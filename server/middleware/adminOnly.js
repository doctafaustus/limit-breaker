export function adminOnly(req, res, next) {
  const email = req.stytchUser?.emails?.[0]?.email
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
