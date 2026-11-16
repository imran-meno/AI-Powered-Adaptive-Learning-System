import { useState } from 'react'
import './CreateProfileStep2.css'
import { useNavigate } from 'react-router-dom'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep2() {
  const [selection, setSelection] = useState(null)
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const selected = selection ?? profile?.board ?? 'Sindh Board'

  // gives the active class to the selected card
  function getCardClass(name) {
    if (selected === name) {
      return 'step2_card step2_card_active'
    }
    return 'step2_card'
  }

  async function handleContinue() {
    if (await saveProfile({ board: selected })) {
      navigate('/create-profile3')
    }
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="step2_main">
      <div className="step2_left">
        <div className="step2_logo">
          <span className="step2_dot"></span>
          <p>Taleem AI</p>
        </div>

        <h2>
          Let’s build your
          <br />
          learning profile.
        </h2>

        <ul className="step2_steps">
          <li className="step2_step_done">
            <span>✓</span>
            Exam
          </li>
          <li className="step2_step_active">
            <span>2</span>
            Board
          </li>
          <li>
            <span>3</span>
            Subjects
          </li>
          <li>
            <span>4</span>
            Study time
          </li>
          <li>
            <span>5</span>
            Weak topics
          </li>
          <li>
            <span>6</span>
            Target marks
          </li>
          <li>
            <span>7</span>
            Learning style
          </li>
        </ul>
      </div>

      <div className="step2_right">
        <div className="step2_content">
          <div className="step2_progress">
            <div className="step2_bar step2_bar_done"></div>
            <div className="step2_bar step2_bar_done"></div>
            <div className="step2_bar"></div>
            <div className="step2_bar"></div>
            <div className="step2_bar"></div>
            <div className="step2_bar"></div>
            <div className="step2_bar"></div>
          </div>

          <p className="step2_count">Step 2 of 7</p>
          <h1>Which board do you follow?</h1>
          <p className="step2_sub">
            Your syllabus, textbooks and past papers depend on your board.
          </p>

          <div className="step2_grid">
            <button
              type="button"
              className={getCardClass('Sindh Board')}
              disabled={disabled}
              onClick={() => setSelection('Sindh Board')}
            >
              <h3>Sindh Board</h3>
              <p>BISE Sindh</p>
            </button>

            <button
              type="button"
              className={getCardClass('Punjab Board')}
              disabled={disabled}
              onClick={() => setSelection('Punjab Board')}
            >
              <h3>Punjab Board</h3>
              <p>BISE Punjab</p>
            </button>

            <button
              type="button"
              className={getCardClass('Federal Board')}
              disabled={disabled}
              onClick={() => setSelection('Federal Board')}
            >
              <h3>Federal Board</h3>
              <p>FBISE</p>
            </button>

            <button
              type="button"
              className={getCardClass('Cambridge or Edexcel')}
              disabled={disabled}
              onClick={() => setSelection('Cambridge or Edexcel')}
            >
              <h3>Cambridge or Edexcel</h3>
              <p>O and A Levels</p>
            </button>
          </div>

          <div className="step2_buttons">
            <button type="button" className="step2_back" onClick={() => navigate('/create-profile1')}>
              Back
            </button>
            <button
              type="button"
              className="step2_continue"
              disabled={disabled}
              onClick={handleContinue}
            >
              Continue
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

export default CreateProfileStep2