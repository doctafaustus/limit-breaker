import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  identifier: { type: String, default: 'default', unique: true }, // placeholder until auth is added
  streak: { type: Number, default: 0 },
  lastCompletedDate: { type: String, default: null },
  completedLessons: {
    type: [{ lessonId: String, completedAt: Date }],
    default: [],
  },
  dateOffset: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
