const express = require('express')
const StudyProfile = require('../models/studyProfile')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

function toProfileResponse(profile) {
  return {
    exam: profile.exam || null,
    board: profile.board || null,
    subjects: profile.subjects ?? null,
    dailyStudyHours: profile.dailyStudyHours ?? null,
    daysPerWeek: profile.daysPerWeek ?? null,
    examDate: profile.examDate || null,
    weakTopics: profile.weakTopics ?? null,
    currentMarks: profile.currentMarks || {},
    learningStyle: profile.learningStyle || null,
    isComplete: Boolean(profile.isComplete),
    completedAt: profile.completedAt || null,
  }
}

const editableFields = new Set([
  'exam',
  'board',
  'subjects',
  'dailyStudyHours',
  'daysPerWeek',
  'examDate',
  'weakTopics',
  'currentMarks',
  'learningStyle',
])

function handleServerError(res, error) {
  console.error('Study profile request failed:', error)
  return res.status(500).json({ message: 'Study profile request failed' })
}

router.use(requireAuth)

router.get('/', async (req, res) => {
  try {
    const profile = await StudyProfile.findOne({ userId: req.auth.userId }).lean()
    return res.status(200).json({
      profile: profile ? toProfileResponse(profile) : null,
    })
  } catch (error) {
    return handleServerError(res, error)
  }
})

router.patch('/', async (req, res) => {
  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ message: 'Provide profile fields to save' })
  }

  const { complete, ...updates } = body
  const unknownFields = Object.keys(updates).filter((field) => !editableFields.has(field))
  if (unknownFields.length > 0) {
    return res.status(400).json({ message: 'Request contains unsupported profile fields' })
  }
  if (complete !== undefined && typeof complete !== 'boolean') {
    return res.status(400).json({ message: 'The complete flag must be a boolean' })
  }
  if (Object.keys(updates).length === 0 && complete !== true) {
    return res.status(400).json({ message: 'Provide profile fields to save' })
  }

  try {
    const existingProfile = await StudyProfile.findOne({ userId: req.auth.userId }).lean()
    const candidate = new StudyProfile({
      ...(existingProfile || {}),
      userId: req.auth.userId,
      ...updates,
    })
    await candidate.validate()

    if (complete) {
      const requiredFields = [
        ['exam', candidate.exam],
        ['board', candidate.board],
        ['subjects', Array.isArray(candidate.subjects) && candidate.subjects.length > 0],
        ['daily study hours', candidate.dailyStudyHours != null],
        ['days per week', candidate.daysPerWeek != null],
        ['exam date', candidate.examDate],
        ['learning style', candidate.learningStyle],
      ]
      const missingFields = requiredFields
        .filter(([, value]) => !value)
        .map(([field]) => field)

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Complete these profile fields before finishing: ${missingFields.join(', ')}`,
        })
      }
    }

    const fieldsToSave = { ...updates }
    if (complete) {
      fieldsToSave.isComplete = true
      fieldsToSave.completedAt = new Date()
    }

    const profile = await StudyProfile.findOneAndUpdate(
      { userId: req.auth.userId },
      { $set: fieldsToSave },
      { new: true, upsert: true, runValidators: true },
    )

    return res.status(200).json({
      message: 'Study preferences saved',
      profile: toProfileResponse(profile),
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }

    return handleServerError(res, error)
  }
})

module.exports = router
