import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Thought from './models/Thought.js'

async function importThoughts() {
  const filePath = path.resolve(process.argv[2] || 'april-thoughts-import.json')

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const thoughts = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`Importing ${thoughts.length} thought(s) from ${filePath}`)

  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const ops = thoughts.map(({ _id, __v, ...thought }) => ({
    updateOne: {
      filter: { date: thought.date },
      update: { $set: thought },
      upsert: true,
    },
  }))

  const result = await Thought.bulkWrite(ops)
  console.log(`Done — inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`)

  await mongoose.disconnect()
}

importThoughts().catch(err => {
  console.error(err)
  process.exit(1)
})
