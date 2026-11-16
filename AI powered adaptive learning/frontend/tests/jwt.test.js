import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getJwtExpiration, isJwtExpired } from '../src/auth/jwt.js'

function tokenWithExpiration(expiration) {
  const payload = Buffer.from(JSON.stringify({ exp: expiration })).toString('base64url')
  return `header.${payload}.signature`
}

test('JWT expiration uses the exp claim in milliseconds', () => {
  const token = tokenWithExpiration(2_000)
  assert.equal(getJwtExpiration(token), 2_000_000)
  assert.equal(isJwtExpired(token, 1_999_999), false)
  assert.equal(isJwtExpired(token, 2_000_000), true)
})

test('malformed or missing-expiration tokens are treated as expired', () => {
  assert.equal(getJwtExpiration('not-a-jwt'), null)
  assert.equal(isJwtExpired('not-a-jwt'), true)
  assert.equal(isJwtExpired('header.e30.signature'), true)
})
