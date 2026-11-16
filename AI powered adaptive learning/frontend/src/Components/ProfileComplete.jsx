import { useNavigate } from 'react-router-dom'
import ProfileSteps from './ProfileSteps'
import ProfileProgress from './ProfileProgress'

function ProfileComplete() {
  const navigate = useNavigate()

  return (
    <div className="ps_main">
      <ProfileSteps currentStep={7} />
      <div className="ps_right">
        <div className="ps_content">
          <ProfileProgress currentStep={7} />
          <h1 className="ps_title">Your learning profile is saved</h1>
          <p className="ps_sub">
            Your selections are saved to your account. You can continue to your learning path now.
          </p>
          <div className="ps_buttons">
            <button type="button" className="ps_continue" onClick={() => navigate('/learning-path')}>
              Go to learning path
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileComplete
