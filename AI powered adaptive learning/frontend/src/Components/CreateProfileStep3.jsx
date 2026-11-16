import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateProfileStep3.css'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep3() {
  const [selection, setSelection] = useState(null)
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const selected = selection ?? profile?.subjects ?? ['Physics', 'Chemistry', 'Maths']

  // click on a subject: remove it if already selected, add it if not
  function toggleSubject(name) {
    setFormError('')
    if (selected.includes(name)) {
      const newList = selected.filter((item) => item !== name)
      setSelection(newList)
    } else {
      const newList = [...selected, name]
      setSelection(newList)
    }
  }

  // gives the active class to the selected subjects
  function getChipClass(name) {
    if (selected.includes(name)) {
      return 'step3_chip step3_chip_active'
    }
    return 'step3_chip'
  }

  // text under the subjects
  let countText = selected.length + ' subjects selected'
  if (selected.length === 1) {
    countText = '1 subject selected'
  }

  function handleBack() {
    navigate('/create-profile2')
  }

  async function handleContinue() {
    if (selected.length === 0) {
      setFormError('Select at least one subject before continuing.')
      return
    }
    if (await saveProfile({ subjects: selected })) {
      navigate('/create-profile4')
    }
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="step3_main">
      <div className="step3_left">
        <div className="step3_logo">
          <span className="step3_dot"></span>
          <p>Taleem AI</p>
        </div>

        <h2>
          Let’s build your
          <br />
          learning profile.
        </h2>

        <ul className="step3_steps">
          <li className="step3_step_done">
            <span>✓</span>
            Exam
          </li>
          <li className="step3_step_done">
            <span>✓</span>
            Board
          </li>
          <li className="step3_step_active">
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

      <div className="step3_right">
        <div className="step3_content">
          <div className="step3_progress">
            <div className="step3_bar step3_bar_done"></div>
            <div className="step3_bar step3_bar_done"></div>
            <div className="step3_bar step3_bar_done"></div>
            <div className="step3_bar"></div>
            <div className="step3_bar"></div>
            <div className="step3_bar"></div>
            <div className="step3_bar"></div>
          </div>

          <p className="step3_count">Step 3 of 7</p>
          <h1>Which subjects do you study?</h1>
          <p className="step3_sub">Pick all that apply. You can change this later in Settings.</p>

          <div className="step3_chips">
            <button
              type="button"
              className={getChipClass('Physics')}
              disabled={disabled}
              onClick={() => toggleSubject('Physics')}
            >
              Physics
            </button>
            <button
              type="button"
              className={getChipClass('Chemistry')}
              disabled={disabled}
              onClick={() => toggleSubject('Chemistry')}
            >
              Chemistry
            </button>
            <button
              type="button"
              className={getChipClass('Maths')}
              disabled={disabled}
              onClick={() => toggleSubject('Maths')}
            >
              Maths
            </button>
            <button
              type="button"
              className={getChipClass('English')}
              disabled={disabled}
              onClick={() => toggleSubject('English')}
            >
              English
            </button>
            <button
              type="button"
              className={getChipClass('Urdu')}
              disabled={disabled}
              onClick={() => toggleSubject('Urdu')}
            >
              Urdu
            </button>
            <button
              type="button"
              className={getChipClass('Pakistan Studies')}
              disabled={disabled}
              onClick={() => toggleSubject('Pakistan Studies')}
            >
              Pakistan Studies
            </button>
          </div>

          <p className="step3_selected_text">{countText}</p>
          {formError && (
            <p className="profile_step_feedback profile_step_feedback_error" role="alert">
              {formError}
            </p>
          )}

          <div className="step3_buttons">
            <button type="button" className="step3_back" onClick={handleBack}>
              Back
            </button>
            <button
              type="button"
              className="step3_continue"
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

export default CreateProfileStep3