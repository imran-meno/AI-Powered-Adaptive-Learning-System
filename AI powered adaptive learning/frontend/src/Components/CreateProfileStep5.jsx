import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileSteps from './ProfileSteps'
import ProfileProgress from './ProfileProgress'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function CreateProfileStep5() {
  const [selection, setSelection] = useState(null)
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()

  const selected = selection ?? profile?.weakTopics ?? [
    'Projectile motion',
    'Circular motion',
    'Organic basics',
  ]

  // click on a topic: remove it if already selected, add it if not
  function toggleTopic(name) {
    if (isLoading || isSaving || loadError) {
      return
    }
    if (selected.includes(name)) {
      const newList = selected.filter((item) => item !== name)
      setSelection(newList)
    } else {
      const newList = [...selected, name]
      setSelection(newList)
    }
  }

  // gives the active class to the selected topics
  function getChipClass(name) {
    if (selected.includes(name)) {
      return 'ps_chip ps_chip_active'
    }
    return 'ps_chip'
  }

  function handleBack() {
    navigate('/create-profile4')
  }

  async function saveTopics(topics) {
    if (await saveProfile({ weakTopics: topics })) {
      navigate('/create-profile6')
    }
  }

  const disabled = isLoading || isSaving || Boolean(loadError)

  return (
    <div className="ps_main">
      <ProfileSteps currentStep={5} />

      <div className="ps_right">
        <div className="ps_content">
          <ProfileProgress currentStep={5} />

          <h1 className="ps_title">Which topics feel hardest?</h1>
          <p className="ps_sub">Optional. Taleem AI also finds weak topics from your quizzes.</p>

          <p className="ps_group_title">Physics</p>
          <div className="ps_chips_row">
            <button type="button" className={getChipClass('Vectors')} disabled={disabled} onClick={() => toggleTopic('Vectors')}>
              Vectors
            </button>
            <button
              type="button"
              className={getChipClass('Projectile motion')}
              disabled={disabled}
              onClick={() => toggleTopic('Projectile motion')}
            >
              Projectile motion
            </button>
            <button
              type="button"
              className={getChipClass('Circular motion')}
              disabled={disabled}
              onClick={() => toggleTopic('Circular motion')}
            >
              Circular motion
            </button>
            <button
              type="button"
              className={getChipClass('Work and energy')}
              disabled={disabled}
              onClick={() => toggleTopic('Work and energy')}
            >
              Work and energy
            </button>
          </div>

          <p className="ps_group_title">Chemistry</p>
          <div className="ps_chips_row">
            <button
              type="button"
              className={getChipClass('Chemical equilibrium')}
              disabled={disabled}
              onClick={() => toggleTopic('Chemical equilibrium')}
            >
              Chemical equilibrium
            </button>
            <button
              type="button"
              className={getChipClass('Organic basics')}
              disabled={disabled}
              onClick={() => toggleTopic('Organic basics')}
            >
              Organic basics
            </button>
          </div>

          <p className="ps_group_title">Maths</p>
          <div className="ps_chips_row">
            <button
              type="button"
              className={getChipClass('Integration')}
              disabled={disabled}
              onClick={() => toggleTopic('Integration')}
            >
              Integration
            </button>
            <button type="button" className={getChipClass('Matrices')} disabled={disabled} onClick={() => toggleTopic('Matrices')}>
              Matrices
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
              onClick={() => saveTopics(selected)}
            >
              Continue
            </button>
            <button type="button" className="ps_skip" disabled={disabled} onClick={() => saveTopics([])}>
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

export default CreateProfileStep5
