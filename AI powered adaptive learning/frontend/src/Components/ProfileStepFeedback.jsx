import './ProfileStepFeedback.css'

function ProfileStepFeedback({ isLoading, loadError, error, onRetry }) {
  if (isLoading) {
    return (
      <p className="profile_step_feedback" role="status">
        Loading your learning profile...
      </p>
    )
  }

  if (loadError) {
    return (
      <p className="profile_step_feedback profile_step_feedback_error" role="alert">
        {loadError}{' '}
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      </p>
    )
  }

  if (error) {
    return (
      <p className="profile_step_feedback profile_step_feedback_error" role="alert">
        {error}
      </p>
    )
  }

  return null
}

export default ProfileStepFeedback
