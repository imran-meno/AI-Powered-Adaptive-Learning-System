import { useState } from 'react'
import './CreateProfileStep1.css'
import { useNavigate } from 'react-router-dom'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep1() {
  const [selection, setSelection] = useState(null)
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const selected = selection ?? profile?.exam ?? 'Intermediate Pre-Engineering'

  // gives the active class to the selected card
  function getCardClass(name) {
    if (selected === name) {
      return 'step1_card step1_card_active'
    }
    return 'step1_card'
  }

  async function handleContinue() {
    if (await saveProfile({ exam: selected })) {
      navigate('/create-profile2')
    }
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="step1_main">
      <div className="step1_left">
        <div className="step1_logo">
          <span className="step1_dot"></span>
          <p>Taleem AI</p>
        </div>

        <h2>
          Let’s build your
          <br />
          learning profile.
        </h2>

        <ul className="step1_steps">
          <li className="step1_step_active">
            <span>1</span>
            Exam
          </li>
          <li>
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

      <div className="step1_right">
        <div className="step1_content">
          <div className="step1_progress">
            <div className="step1_bar step1_bar_done"></div>
            <div className="step1_bar"></div>
            <div className="step1_bar"></div>
            <div className="step1_bar"></div>
            <div className="step1_bar"></div>
            <div className="step1_bar"></div>
            <div className="step1_bar"></div>
          </div>

          <p className="step1_count">Step 1 of 7</p>
          <h1>Which exam are you preparing for?</h1>
          <p className="step1_sub">We use this to pick the right syllabus and past papers for you.</p>

          <div className="step1_grid">
            <button
              type="button"
              className={getCardClass('Matric')}
              disabled={disabled}
              onClick={() => setSelection('Matric')}
            >
              <h3>Matric</h3>
              <p>Sindh or Punjab Board</p>
            </button>

            <button
              type="button"
              className={getCardClass('Intermediate Pre-Medical')}
              disabled={disabled}
              onClick={() => setSelection('Intermediate Pre-Medical')}
            >
              <h3>Intermediate Pre-Medical</h3>
              <p>Part 1 and 2</p>
            </button>

            <button
              type="button"
              className={getCardClass('Intermediate Pre-Engineering')}
              disabled={disabled}
              onClick={() => setSelection('Intermediate Pre-Engineering')}
            >
              <h3>Intermediate Pre-Engineering</h3>
              <p>Part 1 and 2</p>
            </button>

            <button
              type="button"
              className={getCardClass('O and A Levels')}
              disabled={disabled}
              onClick={() => setSelection('O and A Levels')}
            >
              <h3>O and A Levels</h3>
              <p>Cambridge or Edexcel</p>
            </button>

            <button
              type="button"
              className={getCardClass('MDCAT')}
              disabled={disabled}
              onClick={() => setSelection('MDCAT')}
            >
              <h3>MDCAT</h3>
              <p>Medical entry test</p>
            </button>

            <button
              type="button"
              className={getCardClass('ECAT')}
              disabled={disabled}
              onClick={() => setSelection('ECAT')}
            >
              <h3>ECAT</h3>
              <p>Engineering entry test</p>
            </button>
          </div>

          <ProfileStepFeedback
            isLoading={isLoading}
            loadError={loadError}
            error={error}
            onRetry={retryLoad}
          />

          <button
            type="button"
            className="step1_continue"
            disabled={disabled}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep1