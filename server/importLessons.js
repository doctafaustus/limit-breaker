import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Lesson from './models/Lesson.js'

async function importLessons() {
  const filePath = path.resolve(process.argv[2] || 'april-import.json')

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const lessons = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`Importing ${lessons.length} lesson(s) from ${filePath}`)

  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const ops = lessons.map(({ _id, __v, ...lesson }) => ({
    updateOne: {
      filter: { lessonId: lesson.lessonId },
      update: { $set: lesson },
      upsert: true,
    },
  }))

  const result = await Lesson.bulkWrite(ops)
  console.log(`Done — inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`)

  await mongoose.disconnect()
}

importLessons().catch(err => {
  console.error(err)
  process.exit(1)
})
