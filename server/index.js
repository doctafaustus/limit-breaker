import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import usersRouter from './routes/users.js'
import lessonsRouter from './routes/lessons.js'
import vocabRouter from './routes/vocab.js'
import reflectionsRouter from './routes/reflections.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/vocab', vocabRouter)
app.use('/api/reflections', reflectionsRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
