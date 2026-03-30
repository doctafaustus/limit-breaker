import 'dotenv/config'
import mongoose from 'mongoose'
import { lessons } from '../src/data/content.js'
import vocabWords from '../src/data/vocabData.js'
import Lesson from './models/Lesson.js'
import Vocab from './models/Vocab.js'

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  // --- Lessons ---
  const lessonOps = lessons.map(l => ({
    updateOne: {
      filter: { lessonId: l.id },
      update: {
        $set: {
          lessonId: l.id,
          title: l.title,
          subtitle: l.subtitle,
          date: l.date,
          xp: l.xp,
          estimatedMinutes: l.estimatedMinutes,
          blocks: l.blocks,
        },
      },
      upsert: true,
    },
  }))

  const lessonResult = await Lesson.bulkWrite(lessonOps)
  console.log(`Lessons — inserted: ${lessonResult.upsertedCount}, updated: ${lessonResult.modifiedCount}`)

  // --- Vocab ---
  const vocabOps = vocabWords.map(v => ({
    updateOne: {
      filter: { date: v.date },
      update: { $set: v },
      upsert: true,
    },
  }))

  const vocabResult = await Vocab.bulkWrite(vocabOps)
  console.log(`Vocab   — inserted: ${vocabResult.upsertedCount}, updated: ${vocabResult.modifiedCount}`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
