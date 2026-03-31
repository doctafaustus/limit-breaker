import 'dotenv/config'
import mongoose from 'mongoose'
import Thought from './models/Thought.js'

const thoughts = [
  {
    date: '2026-03-30',
    title: 'Consistency beats intensity',
    text: '5 minutes every day builds stronger habits than 2 hours once a week. Your brain learns through repetition, not cramming. Keep your streak alive — even a tiny session counts.',
  },
  {
    date: '2026-03-31',
    title: 'You can\'t fake presence',
    text: 'People don\'t remember what you said as much as they remember how you made them feel. Being fully present — phone down, eyes up, genuinely curious — is rarer than any skill you could learn. It\'s also more powerful.',
  },
  {
    date: '2026-04-01',
    title: 'Discomfort is the signal, not the stop sign',
    text: 'Every social skill that matters felt awkward the first time. Using someone\'s name. Holding silence. Asking a deeper question. The discomfort means you\'re at the edge of your current ability — which is exactly where growth happens.',
  },
  {
    date: '2026-04-02',
    title: 'Most people are waiting to be understood',
    text: 'In almost every conversation, both people want to feel heard more than they want to be right. The person who steps back first — who listens instead of counters — almost always leaves the better impression.',
  },
  {
    date: '2026-04-03',
    title: 'Small signals, big impressions',
    text: 'The things that define how others see you are rarely grand gestures. It\'s whether you remembered the detail they mentioned last time. Whether you looked up when they walked in. Whether you followed through on the small thing you said you\'d do. Character is built in the margins.',
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to:', mongoose.connection.name)

  const ops = thoughts.map(t => ({
    updateOne: {
      filter: { date: t.date },
      update: { $set: t },
      upsert: true,
    },
  }))

  const result = await Thought.bulkWrite(ops)
  console.log(`Thoughts — inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
