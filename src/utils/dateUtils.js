// Returns a YYYY-MM-DD string for today offset by N days (for admin simulation)
export function getDateStr(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Returns a human-readable date string like "Saturday, March 28"
export function formatDisplayDate(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function getTodaysLesson(lessons, dateStr) {
  return lessons.find(l => l.date === dateStr) || null
}

export function getLessonById(lessons, id) {
  return lessons.find(l => l.id === id || l.lessonId === id) || null
}

export function getLessonByDate(lessons, dateStr) {
  return lessons.find(l => l.date === dateStr) || null
}

export function formatDateFromStr(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })
}

export function isLessonAvailable(lesson, todayStr) {
  return lesson.date <= todayStr
}
