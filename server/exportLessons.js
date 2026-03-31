import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Lesson from './models/Lesson.js'

async function exportLessons() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const lessons = await Lesson.find().sort({ date: 1 }).lean()
  console.log(`Found ${lessons.length} lesson(s)`)

  const outPath = path.resolve('lessons-export.json')
  fs.writeFileSync(outPath, JSON.stringify(lessons, null, 2))
  console.log(`Saved to ${outPath}`)

  await mongoose.disconnect()
}

exportLessons().catch(err => {
  console.error(err)
  process.exit(1)
})
