import mongoose from 'mongoose'

const thoughtSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  title: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('Thought', thoughtSchema)
