const mongoose = require('mongoose')

const exams = [
  'Matric',
  'Intermediate Pre-Medical',
  'Intermediate Pre-Engineering',
  'O and A Levels',
  'MDCAT',
  'ECAT',
]
const boards = ['Sindh Board', 'Punjab Board', 'Federal Board', 'Cambridge or Edexcel']
const subjects = ['Physics', 'Chemistry', 'Maths', 'English', 'Urdu', 'Pakistan Studies']
const weakTopics = [
  'Vectors',
  'Projectile motion',
  'Circular motion',
  'Work and energy',
  'Chemical equilibrium',
  'Organic basics',
  'Integration',
  'Matrices',
]
const learningStyles = ['Step by step', 'Summary', 'Quiz wise']

function isValidDateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(0)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(year, month - 1, day)

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

const studyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    exam: { type: String, enum: exams },
    board: { type: String, enum: boards },
    subjects: { type: [{ type: String, enum: subjects }], default: undefined },
    dailyStudyHours: {
      type: Number,
      min: 0.5,
      max: 5,
      validate: {
        validator: (value) => Number.isInteger(value * 2),
        message: 'Daily study hours must use half-hour increments',
      },
    },
    daysPerWeek: {
      type: Number,
      min: 1,
      max: 7,
      validate: {
        validator: Number.isInteger,
        message: 'Days per week must be a whole number',
      },
    },
    examDate: {
      type: String,
      validate: {
        validator: isValidDateOnly,
        message: 'Exam date must be a valid YYYY-MM-DD date',
      },
    },
    weakTopics: { type: [{ type: String, enum: weakTopics }], default: undefined },
    currentMarks: {
      physics: { type: Number, min: 0, max: 100 },
      chemistry: { type: Number, min: 0, max: 100 },
      maths: { type: Number, min: 0, max: 100 },
    },
    learningStyle: { type: String, enum: learningStyles },
    isComplete: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true },
)

module.exports = mongoose.model('StudyProfile', studyProfileSchema)
