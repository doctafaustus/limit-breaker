import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Vocab from './models/Vocab.js'

async function exportVocab() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const vocab = await Vocab.find().sort({ date: 1 }).lean()
  console.log(`Found ${vocab.length} vocab word(s)`)

  const outPath = path.resolve('vocab-export.json')
  fs.writeFileSync(outPath, JSON.stringify(vocab, null, 2))
  console.log(`Saved to ${outPath}`)

  await mongoose.disconnect()
}

exportVocab().catch(err => {
  console.error(err)
  process.exit(1)
})
