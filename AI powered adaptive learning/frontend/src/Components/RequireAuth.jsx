import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getJwtExpiration, isJwtExpired } from '../auth/jwt'
import { clearCurrentUser } from '../auth/currentUser'

function RequireAuth() {
  const token = sessionStorage.getItem('authToken')
  const expiration = getJwtExpiration(token)
  const isExpired = isJwtExpired(token)
  const [expiredToken, setExpiredToken] = useState(null)

  useEffect(() => {
    if (!token || expiration === null || isJwtExpired(token)) {
      sessionStorage.removeItem('authToken')
      clearCurrentUser()
      return undefined
    }

    const timeout = setTimeout(() => {
      sessionStorage.removeItem('authToken')
      clearCurrentUser()
      setExpiredToken(token)
    }, expiration - Date.now())

    return () => clearTimeout(timeout)
  }, [expiration, token])

  if (!token || expiration === null || isExpired || expiredToken === token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireAuth
