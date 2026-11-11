import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateProfileStep3.css'

function CreateProfileStep3() {
  const [selected, setSelected] = useState(['Physics', 'Chemistry', 'Maths'])
  const navigate = useNavigate()

  // click on a subject: remove it if already selected, add it if not
  function toggleSubject(name) {
    if (selected.includes(name)) {
      const newList = selected.filter((item) => item !== name)
      setSelected(newList)
    } else {
      const newList = [...selected, name]
      setSelected(newList)
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

  function handleContinue() {
    // TODO: save the subjects
    console.log(selected)
    navigate('/create-profile4')
  }

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
            Current marks
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
          </div>

          <p className="step3_count">Step 3 of 6</p>
          <h1>Which subjects do you study?</h1>
          <p className="step3_sub">Pick all that apply. You can change this later in Settings.</p>

          <div className="step3_chips">
            <button
              type="button"
              className={getChipClass('Physics')}
              onClick={() => toggleSubject('Physics')}
            >
              Physics
            </button>
            <button
              type="button"
              className={getChipClass('Chemistry')}
              onClick={() => toggleSubject('Chemistry')}
            >
              Chemistry
            </button>
            <button
              type="button"
              className={getChipClass('Maths')}
              onClick={() => toggleSubject('Maths')}
            >
              Maths
            </button>
            <button
              type="button"
              className={getChipClass('English')}
              onClick={() => toggleSubject('English')}
            >
              English
            </button>
            <button
              type="button"
              className={getChipClass('Urdu')}
              onClick={() => toggleSubject('Urdu')}
            >
              Urdu
            </button>
            <button
              type="button"
              className={getChipClass('Pakistan Studies')}
              onClick={() => toggleSubject('Pakistan Studies')}
            >
              Pakistan Studies
            </button>
          </div>

          <p className="step3_selected_text">{countText}</p>

          <div className="step3_buttons">
            <button type="button" className="step3_back" onClick={handleBack}>
              Back
            </button>
            <button type="button" className="step3_continue" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep3