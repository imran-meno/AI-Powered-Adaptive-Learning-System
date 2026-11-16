import './ProfileSteps.css'

// Shared progress bars + "Step X of 7" text.
// Use it like this:  <ProfileProgress currentStep={4} />
function ProfileProgress({ currentStep }) {
  // bars up to the current step are black
  function getBarClass(number) {
    if (number <= currentStep) {
      return 'ps_bar ps_bar_done'
    }
    return 'ps_bar'
  }

  return (
    <>
      <div className="ps_progress">
        <div className={getBarClass(1)}></div>
        <div className={getBarClass(2)}></div>
        <div className={getBarClass(3)}></div>
        <div className={getBarClass(4)}></div>
        <div className={getBarClass(5)}></div>
        <div className={getBarClass(6)}></div>
        <div className={getBarClass(7)}></div>
      </div>

      <p className="ps_count">Step {currentStep} of 7</p>
    </>
  )
}

export default ProfileProgress
