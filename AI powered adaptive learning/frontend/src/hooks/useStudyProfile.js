import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearCurrentUser } from '../auth/currentUser'

const STUDY_PROFILE_URL = 'http://localhost:3000/api/study-profile'

function useStudyProfile() {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(sessionStorage.getItem('authToken')),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [error, setError] = useState('')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let isActive = true
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      navigate('/login', { replace: true })
      return () => {
        isActive = false
      }
    }

    async function loadProfile() {
      try {
        const response = await axios.get(STUDY_PROFILE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (isActive) {
          setProfile(response.data.profile)
        }
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          sessionStorage.removeItem('authToken')
          clearCurrentUser()
          navigate('/', { replace: true })
          return
        }

        if (isActive) {
          setLoadError(
            requestError.response?.data?.message || 'Could not load your learning profile.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProfile()
    return () => {
      isActive = false
    }
  }, [loadAttempt, navigate])

  const saveProfile = useCallback(
    async (updates, complete = false) => {
      const token = sessionStorage.getItem('authToken')
      if (!token) {
        navigate('/', { replace: true })
        return false
      }

      setIsSaving(true)
      setError('')

      try {
        const response = await axios.patch(
          STUDY_PROFILE_URL,
          complete ? { ...updates, complete: true } : updates,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        setProfile(response.data.profile)
        return true
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          sessionStorage.removeItem('authToken')
          clearCurrentUser()
          navigate('/', { replace: true })
          return false
        }

        setError(requestError.response?.data?.message || 'Could not save your learning profile.')
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [navigate],
  )

  const retryLoad = useCallback(() => {
    setIsLoading(true)
    setLoadError('')
    setError('')
    setLoadAttempt((attempt) => attempt + 1)
  }, [])

  return {
    profile,
    isLoading,
    isSaving,
    loadError,
    error,
    saveProfile,
    retryLoad,
  }
}

export default useStudyProfile
