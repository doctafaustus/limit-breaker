import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  date: { type: String, required: true }, // YYYY-MM-DD
  xp: { type: Number, default: 0 },
  estimatedMinutes: { type: Number, default: 5 },
  blocks: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true })

export default mongoose.model('Lesson', lessonSchema)
