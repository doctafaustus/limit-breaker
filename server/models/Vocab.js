import mongoose from 'mongoose'

const vocabSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  word: { type: String, required: true },
  pronunciation: { type: String },
  partOfSpeech: { type: String },
  definition: { type: String, required: true },
  example: { type: String },
  origin: { type: String },
}, { timestamps: true })

export default mongoose.model('Vocab', vocabSchema)
