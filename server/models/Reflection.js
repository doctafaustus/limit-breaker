import mongoose from 'mongoose'

const reflectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: String, required: true },
  blockIndex: { type: Number, required: true },
  prompt: { type: String },
  text: { type: String, required: true },
  savedAt: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.model('Reflection', reflectionSchema)
