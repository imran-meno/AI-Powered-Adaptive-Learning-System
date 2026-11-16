import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileSteps from './ProfileSteps'
import ProfileProgress from './ProfileProgress'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep6() {
  const [physicsSelection, setPhysicsSelection] = useState(null)
  const [chemistrySelection, setChemistrySelection] = useState(null)
  const [mathsSelection, setMathsSelection] = useState(null)
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const physics = physicsSelection ?? profile?.currentMarks?.physics ?? ''
  const chemistry = chemistrySelection ?? profile?.currentMarks?.chemistry ?? ''
  const maths = mathsSelection ?? profile?.currentMarks?.maths ?? ''

  function handleBack() {
    navigate('/create-profile5')
  }

  async function saveMarks(marks) {
    const invalidMark = Object.values(marks).some(
      (mark) => mark !== null && (!Number.isFinite(mark) || mark < 0 || mark > 100),
    )
    if (invalidMark) {
      setFormError('Enter marks between 0 and 100, or leave them blank.')
      return
    }

    setFormError('')
    if (await saveProfile({ currentMarks: marks })) {
      navigate('/create-profile7')
    }
  }

  function handleContinue() {
    void saveMarks({
      physics: physics === '' ? null : Number(physics),
      chemistry: chemistry === '' ? null : Number(chemistry),
      maths: maths === '' ? null : Number(maths),
    })
  }

  function handleSkip() {
    void saveMarks({ physics: null, chemistry: null, maths: null })
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="ps_main">
      <ProfileSteps currentStep={6} />

      <div className="ps_right">
        <div className="ps_content">
          <ProfileProgress currentStep={6} />

          <h1 className="ps_title">What did you score recently?</h1>
          <p className="ps_sub">Optional. This gives us a starting point before your first quiz.</p>

          <label className="ps_label" htmlFor="physics">
            Physics (last exam)
          </label>
          <div className="ps_percent_wrap">
            <input
              id="physics"
              className="ps_percent"
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="Enter marks"
              value={physics}
              disabled={disabled}
              onChange={(e) => setPhysicsSelection(e.target.value)}
            />
            <span className="ps_percent_sign">%</span>
          </div>

          <label className="ps_label" htmlFor="chemistry">
            Chemistry (last exam)
          </label>
          <div className="ps_percent_wrap">
            <input
              id="chemistry"
              className="ps_percent"
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="Enter marks"
              value={chemistry}
              disabled={disabled}
              onChange={(e) => setChemistrySelection(e.target.value)}
            />
            <span className="ps_percent_sign">%</span>
          </div>

          <label className="ps_label" htmlFor="maths">
            Maths (last exam)
          </label>
          <div className="ps_percent_wrap">
            <input
              id="maths"
              className="ps_percent"
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="Enter marks"
              value={maths}
              disabled={disabled}
              onChange={(e) => setMathsSelection(e.target.value)}
            />
            <span className="ps_percent_sign">%</span>
          </div>

          <p className="ps_hint">You can skip this and let the diagnostic quiz find your level.</p>
          {formError && (
            <p className="ps_error" role="alert">
              {formError}
            </p>
          )}

          <div className="ps_buttons">
            <button type="button" className="ps_back" onClick={handleBack}>
              Back
            </button>
            <button
              type="button"
              className="ps_continue"
              disabled={disabled}
              onClick={handleContinue}
            >
              Continue
            </button>
            <button type="button" className="ps_skip" disabled={disabled} onClick={handleSkip}>
              Skip for now
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

export default CreateProfileStep6
