import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Vocab from './models/Vocab.js'

async function importVocab() {
  const filePath = path.resolve(process.argv[2] || 'april-words-import.json')

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`Importing ${words.length} vocab word(s) from ${filePath}`)

  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const ops = words.map(({ _id, __v, ...word }) => ({
    updateOne: {
      filter: { date: word.date },
      update: { $set: word },
      upsert: true,
    },
  }))

  const result = await Vocab.bulkWrite(ops)
  console.log(`Done — inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`)

  await mongoose.disconnect()
}

importVocab().catch(err => {
  console.error(err)
  process.exit(1)
})
