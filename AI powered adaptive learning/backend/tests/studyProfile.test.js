const assert = require('node:assert/strict')
const { after, before, test } = require('node:test')
const express = require('express')
const jwt = require('jsonwebtoken')
const StudyProfile = require('../models/studyProfile')
const studyProfileRoutes = require('../routes/studyProfile')

const userId = '64b7ab123456789012345678'
const records = new Map()
let server
let token
let originalFindOne
let originalFindOneAndUpdate

before(async () => {
  process.env.JWT_SECRET = 'test-secret-with-adequate-randomness'
  token = jwt.sign({ sub: userId }, process.env.JWT_SECRET)

  originalFindOne = StudyProfile.findOne
  originalFindOneAndUpdate = StudyProfile.findOneAndUpdate
  StudyProfile.findOne = (filter) => ({
    lean: async () => records.get(String(filter.userId)) || null,
  })
  StudyProfile.findOneAndUpdate = async (filter, update) => {
    const key = String(filter.userId)
    const current = records.get(key) || { userId: filter.userId, isComplete: false }
    const profile = { ...current, ...update.$set }
    records.set(key, profile)
    return profile
  }

  const app = express()
  app.use(express.json())
  app.use('/api/study-profile', studyProfileRoutes)
  server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
})

after(async () => {
  StudyProfile.findOne = originalFindOne
  StudyProfile.findOneAndUpdate = originalFindOneAndUpdate
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
})

async function request(path, { method = 'GET', body, authenticated = true } = {}) {
  const headers = {}
  if (body) {
    headers['Content-Type'] = 'application/json'
  }
  if (authenticated) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/study-profile${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  return { status: response.status, data: await response.json() }
}

test('authenticated step updates accumulate and finish a complete profile', async () => {
  const unauthenticated = await request('/', { authenticated: false })
  assert.equal(unauthenticated.status, 401)

  const incompleteFinish = await request('/', {
    method: 'PATCH',
    body: { learningStyle: 'Summary', complete: true },
  })
  assert.equal(incompleteFinish.status, 400)

  const updates = [
    { exam: 'Intermediate Pre-Engineering' },
    { board: 'Sindh Board' },
    { subjects: ['Physics', 'Chemistry', 'Maths'] },
    { dailyStudyHours: 3.5, daysPerWeek: 5, examDate: '2027-01-19' },
    { weakTopics: ['Vectors', 'Organic basics'] },
    { currentMarks: { physics: 82, chemistry: null, maths: 91 } },
  ]

  for (const update of updates) {
    const result = await request('/', { method: 'PATCH', body: update })
    assert.equal(result.status, 200)
  }

  const invalid = await request('/', {
    method: 'PATCH',
    body: { dailyStudyHours: 3.3 },
  })
  assert.equal(invalid.status, 400)

  const completion = await request('/', {
    method: 'PATCH',
    body: { learningStyle: 'Summary', complete: true },
  })
  assert.equal(completion.status, 200)
  assert.equal(completion.data.profile.isComplete, true)
  assert.equal(completion.data.profile.learningStyle, 'Summary')

  const loaded = await request('/')
  assert.equal(loaded.status, 200)
  assert.deepEqual(loaded.data.profile.subjects, ['Physics', 'Chemistry', 'Maths'])
  assert.deepEqual(loaded.data.profile.weakTopics, ['Vectors', 'Organic basics'])
  assert.equal(loaded.data.profile.exam, 'Intermediate Pre-Engineering')
  assert.equal(loaded.data.profile.board, 'Sindh Board')
  assert.equal(loaded.data.profile.dailyStudyHours, 3.5)
  assert.equal(loaded.data.profile.daysPerWeek, 5)
  assert.equal(loaded.data.profile.examDate, '2027-01-19')
  assert.deepEqual(loaded.data.profile.currentMarks, {
    physics: 82,
    chemistry: null,
    maths: 91,
  })
})
