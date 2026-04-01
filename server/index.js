import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './db.js'
import usersRouter from './routes/users.js'
import lessonsRouter from './routes/lessons.js'
import vocabRouter from './routes/vocab.js'
import reflectionsRouter from './routes/reflections.js'
import thoughtsRouter from './routes/thoughts.js'

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/vocab', vocabRouter)
app.use('/api/reflections', reflectionsRouter)
app.use('/api/thoughts', thoughtsRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Serve React app
app.use(express.static(path.join(__dirname, '../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
