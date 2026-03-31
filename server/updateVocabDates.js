import 'dotenv/config'
import mongoose from 'mongoose'
import Vocab from './models/Vocab.js'

const words = [
  { word: 'Gravitas',   newDate: '2026-03-30' },
  { word: 'Mnemonics',  newDate: '2026-03-31' },
  { word: 'Equanimity', newDate: '2026-04-01' },
  { word: 'Laconic',    newDate: '2026-04-02' },
  { word: 'Heuristic',  newDate: '2026-04-03' },
]

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  // Fetch existing docs by word name
  const existing = await Vocab.find({ word: { $in: words.map(w => w.word) } })
  console.log(`Found ${existing.length} vocab entries`)

  // Delete them all first to avoid unique date conflicts
  await Vocab.deleteMany({ word: { $in: words.map(w => w.word) } })
  console.log('Deleted existing entries')

  // Re-insert with new dates
  const updated = existing.map(doc => {
    const match = words.find(w => w.word === doc.word)
    return { ...doc.toObject(), date: match.newDate }
  })

  await Vocab.insertMany(updated)
  updated.forEach(d => console.log(`${d.word} → ${d.date}`))

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
