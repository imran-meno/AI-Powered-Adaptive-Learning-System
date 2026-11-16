const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

function requireAuth(req, res, next) {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  const token = authorization.slice('Bearer '.length)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (
      !payload ||
      typeof payload !== 'object' ||
      typeof payload.sub !== 'string' ||
      !mongoose.isValidObjectId(payload.sub)
    ) {
      return res.status(401).json({ message: 'Invalid authentication token' })
    }

    req.auth = { userId: payload.sub }
    return next()
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError' ||
      error.name === 'NotBeforeError'
    ) {
      return res.status(401).json({ message: 'Invalid or expired authentication token' })
    }

    return next(error)
  }
}

module.exports = requireAuth
