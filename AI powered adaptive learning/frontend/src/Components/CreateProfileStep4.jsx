import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileSteps from './ProfileSteps'
import ProfileProgress from './ProfileProgress'
import useStudyProfile from '../hooks/useStudyProfile'
import ProfileStepFeedback from './ProfileStepFeedback'

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDaysUntil(dateString, today = new Date()) {
  const [year, month, day] = dateString.split('-').map(Number)
  const examDay = Date.UTC(year, month - 1, day)
  const currentDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  return (examDay - currentDay) / (24 * 60 * 60 * 1000)
}

function getDaysText(daysAway) {
  if (daysAway === null) {
    return 'Select your exam date'
  }
  if (daysAway < 0) {
    return 'Date has passed'
  }
  if (daysAway === 0) {
    return 'Today'
  }
  if (daysAway === 1) {
    return '1 day away'
  }
  return `${daysAway} days away`
}

function CreateProfileStep4() {
  const [hoursSelection, setHoursSelection] = useState(null)
  const [daysSelection, setDaysSelection] = useState(null)
  const [examDateSelection, setExamDateSelection] = useState(null)
  const navigate = useNavigate()
  const { profile, isLoading, isSaving, loadError, error, saveProfile, retryLoad } =
    useStudyProfile()
  const hours = hoursSelection ?? profile?.dailyStudyHours ?? 2
  const days = daysSelection ?? profile?.daysPerWeek ?? 6
  const examDate = examDateSelection ?? profile?.examDate ?? ''
  const today = getLocalDateString()

  // gives the active class to the selected day number
  function getDayClass(number) {
    if (days === number) {
      return 'ps_day ps_day_active'
    }
    return 'ps_day'
  }

  const daysAway = examDate ? getDaysUntil(examDate) : null
  const daysText = getDaysText(daysAway)

  function handleBack() {
    navigate('/create-profile3')
  }

  async function handleContinue() {
    if (!examDate || examDate < today) {
      return
    }

    if (
      await saveProfile({
        dailyStudyHours: hours,
        daysPerWeek: days,
        examDate,
      })
    ) {
      navigate('/create-profile5')
    }
  }

  const canEdit = !isLoading && !loadError && !isSaving

  return (
    <div className="ps_main">
      <ProfileSteps currentStep={4} />

      <div className="ps_right">
        <div className="ps_content">
          <ProfileProgress currentStep={4} />

          <h1 className="ps_title">How much time can you study?</h1>
          <p className="ps_sub">We build your daily plan around the time you really have.</p>

          <div className="ps_slider_row">
            <label htmlFor="dailyStudyHours">Study time per day</label>
            <output htmlFor="dailyStudyHours">{hours} h</output>
          </div>
          <input
            id="dailyStudyHours"
            className="ps_slider"
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={hours}
            aria-valuetext={`${hours} hours per day`}
            disabled={!canEdit}
            onChange={(e) => setHoursSelection(Number(e.target.value))}
          />

          <fieldset className="ps_day_group" disabled={!canEdit}>
            <legend className="ps_label">Days per week</legend>
            <div className="ps_days">
              <button
                type="button"
                className={getDayClass(1)}
                aria-label="1 day per week"
                aria-pressed={days === 1}
                onClick={() => setDaysSelection(1)}
              >
                1
              </button>
              <button
                type="button"
                className={getDayClass(2)}
                aria-label="2 days per week"
                aria-pressed={days === 2}
                onClick={() => setDaysSelection(2)}
              >
                2
              </button>
              <button
                type="button"
                className={getDayClass(3)}
                aria-label="3 days per week"
                aria-pressed={days === 3}
                onClick={() => setDaysSelection(3)}
              >
                3
              </button>
              <button
                type="button"
                className={getDayClass(4)}
                aria-label="4 days per week"
                aria-pressed={days === 4}
                onClick={() => setDaysSelection(4)}
              >
                4
              </button>
              <button
                type="button"
                className={getDayClass(5)}
                aria-label="5 days per week"
                aria-pressed={days === 5}
                onClick={() => setDaysSelection(5)}
              >
                5
              </button>
              <button
                type="button"
                className={getDayClass(6)}
                aria-label="6 days per week"
                aria-pressed={days === 6}
                onClick={() => setDaysSelection(6)}
              >
                6
              </button>
              <button
                type="button"
                className={getDayClass(7)}
                aria-label="7 days per week"
                aria-pressed={days === 7}
                onClick={() => setDaysSelection(7)}
              >
                7
              </button>
            </div>
          </fieldset>

          <label className="ps_label" htmlFor="examDate">
            Exam date
          </label>
          <div className="ps_date_wrap">
            <input
              id="examDate"
              className="ps_date"
              type="date"
              min={today}
              required
              value={examDate}
              disabled={!canEdit}
              onChange={(e) => setExamDateSelection(e.target.value)}
            />
            <span className="ps_date_text" aria-live="polite">
              {daysText}
            </span>
          </div>

          {(!examDate || examDate < today) && (
            <p className="ps_error" role="alert">
              Choose today or a future exam date before continuing.
            </p>
          )}
          <ProfileStepFeedback
            isLoading={isLoading}
            loadError={loadError}
            error={error}
            onRetry={retryLoad}
          />

          <div className="ps_buttons">
            <button type="button" className="ps_back" onClick={handleBack}>
              Back
            </button>
            <button
              type="button"
              className="ps_continue"
              disabled={!canEdit || !examDate || examDate < today}
              onClick={handleContinue}
            >
              {isSaving ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep4
