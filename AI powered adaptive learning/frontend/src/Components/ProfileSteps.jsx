import './ProfileSteps.css'

// Shared left panel for all the create-profile steps.
// Use it like this:  <ProfileSteps currentStep={3} />
function ProfileSteps({ currentStep }) {
  // finished steps get the lime tick, current step is white
  function getItemClass(number) {
    if (number < currentStep) {
      return 'ps_item ps_item_done'
    }
    if (number === currentStep) {
      return 'ps_item ps_item_active'
    }
    return 'ps_item'
  }

  // finished steps show a tick, others show their number
  function getCircleText(number) {
    if (number < currentStep) {
      return '✓'
    }
    return number
  }

  return (
    <div className="ps_left">
      <div className="ps_logo">
        <span className="ps_dot"></span>
        <p>Taleem AI</p>
      </div>

      <h2>
        Let’s build your
        <br />
        learning profile.
      </h2>

      <ul className="ps_list">
        <li className={getItemClass(1)}>
          <span>{getCircleText(1)}</span>
          Exam
        </li>
        <li className={getItemClass(2)}>
          <span>{getCircleText(2)}</span>
          Board
        </li>
        <li className={getItemClass(3)}>
          <span>{getCircleText(3)}</span>
          Subjects
        </li>
        <li className={getItemClass(4)}>
          <span>{getCircleText(4)}</span>
          Study time
        </li>
        <li className={getItemClass(5)}>
          <span>{getCircleText(5)}</span>
          Weak topics
        </li>
        <li className={getItemClass(6)}>
          <span>{getCircleText(6)}</span>
          Current marks
        </li>
        <li className={getItemClass(7)}>
          <span>{getCircleText(7)}</span>
          Learning style
        </li>
      </ul>
    </div>
  )
}

export default ProfileSteps
