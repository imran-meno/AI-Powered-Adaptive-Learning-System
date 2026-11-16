import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileSteps from './ProfileSteps'
import ProfileProgress from './ProfileProgress'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep7() {
  const [selection, setSelection] = useState(null)
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const selected = selection ?? profile?.learningStyle ?? 'Step by step'

  // gives the active class to the selected card
  function getCardClass(name) {
    if (selected === name) {
      return 'ps_card ps_card_active'
    }
    return 'ps_card'
  }

  function handleBack() {
    navigate('/create-profile6')
  }

  async function handleFinish() {
    if (await saveProfile({ learningStyle: selected }, true)) {
      navigate('/profile-complete')
    }
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="ps_main">
      <ProfileSteps currentStep={7} />

      <div className="ps_right">
        <div className="ps_content">
          <ProfileProgress currentStep={7} />

          <h1 className="ps_title">How do you like to learn?</h1>
          <p className="ps_sub">We shape explanations and practice around your style. You can change this later.</p>

          <div className="ps_grid ps_grid_one">
            <button
              type="button"
              className={getCardClass('Step by step')}
              disabled={disabled}
              onClick={() => setSelection('Step by step')}
            >
              <h3>Step by step</h3>
              <p>Detailed explanations that walk you through every idea</p>
            </button>

            <button
              type="button"
              className={getCardClass('Summary')}
              disabled={disabled}
              onClick={() => setSelection('Summary')}
            >
              <h3>Summary</h3>
              <p>Short, quick notes so you can revise fast</p>
            </button>

            <button
              type="button"
              className={getCardClass('Quiz wise')}
              disabled={disabled}
              onClick={() => setSelection('Quiz wise')}
            >
              <h3>Quiz wise</h3>
              <p>Learn by answering questions and seeing why each answer is right</p>
            </button>
          </div>

          <div className="ps_buttons">
            <button type="button" className="ps_back" onClick={handleBack}>
              Back
            </button>
            <button
              type="button"
              className="ps_continue"
              disabled={disabled}
              onClick={handleFinish}
            >
              Finish setting up my profile
            </button>
          </div>
          <ProfileStepFeedback
            isLoading={isLoading}
            loadError={loadError}
            error={error}
            onRetry={retryLoad}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep7
