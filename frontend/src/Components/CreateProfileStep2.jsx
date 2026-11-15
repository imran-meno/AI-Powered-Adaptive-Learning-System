import { useState } from 'react'
import './CreateProfileStep2.css'
import { useNavigate } from 'react-router-dom'

function CreateProfileStep2() {
  const [selected, setSelected] = useState('Sindh Board')
  const navigate= useNavigate()
  // gives the active class to the selected card
  function getCardClass(name) {
    if (selected === name) {
      return 'step2_card step2_card_active'
    }
    return 'step2_card'
  }

  function handleBack() {
    // TODO: go back to step 1
    console.log('back')
  }

  function handleContinue() {
    // TODO: save the board and go to the next step
    navigate('/create-profile3')
    console.log(selected)
  }

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
          </div>

          <p className="step2_count">Step 2 of 6</p>
          <h1>Which board do you follow?</h1>
          <p className="step2_sub">
            Your syllabus, textbooks and past papers depend on your board.
          </p>

          <div className="step2_grid">
            <button
              type="button"
              className={getCardClass('Sindh Board')}
              onClick={() => setSelected('Sindh Board')}
            >
              <h3>Sindh Board</h3>
              <p>BISE Sindh</p>
            </button>

            <button
              type="button"
              className={getCardClass('Punjab Board')}
              onClick={() => setSelected('Punjab Board')}
            >
              <h3>Punjab Board</h3>
              <p>BISE Punjab</p>
            </button>

            <button
              type="button"
              className={getCardClass('Federal Board')}
              onClick={() => setSelected('Federal Board')}
            >
              <h3>Federal Board</h3>
              <p>FBISE</p>
            </button>

            <button
              type="button"
              className={getCardClass('Cambridge or Edexcel')}
              onClick={() => setSelected('Cambridge or Edexcel')}
            >
              <h3>Cambridge or Edexcel</h3>
              <p>O and A Levels</p>
            </button>
          </div>

          <div className="step2_buttons">
            <button type="button" className="step2_back" onClick={() => navigate('/create-profile1')}>
              Back
            </button>
            <button type="button" className="step2_continue" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep2