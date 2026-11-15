import { useState } from 'react'
import './CreateProfileStep1.css'
import { useNavigate } from 'react-router-dom'

function CreateProfileStep1() {
  const [selected, setSelected] = useState('Intermediate Pre-Engineering')
  const navigate= useNavigate()
  // gives the active class to the selected card
  function getCardClass(name) {
    if (selected === name) {
      return 'step1_card step1_card_active'
    }
    return 'step1_card'
  }

  function handleContinue() {
    // TODO: save the exam and go to the next step
    navigate('/create-profile2')
    console.log(selected)
  }

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
          </div>

          <p className="step1_count">Step 1 of 6</p>
          <h1>Which exam are you preparing for?</h1>
          <p className="step1_sub">We use this to pick the right syllabus and past papers for you.</p>

          <div className="step1_grid">
            <button
              type="button"
              className={getCardClass('Matric')}
              onClick={() => setSelected('Matric')}
            >
              <h3>Matric</h3>
              <p>Sindh or Punjab Board</p>
            </button>

            <button
              type="button"
              className={getCardClass('Intermediate Pre-Medical')}
              onClick={() => setSelected('Intermediate Pre-Medical')}
            >
              <h3>Intermediate Pre-Medical</h3>
              <p>Part 1 and 2</p>
            </button>

            <button
              type="button"
              className={getCardClass('Intermediate Pre-Engineering')}
              onClick={() => setSelected('Intermediate Pre-Engineering')}
            >
              <h3>Intermediate Pre-Engineering</h3>
              <p>Part 1 and 2</p>
            </button>

            <button
              type="button"
              className={getCardClass('O and A Levels')}
              onClick={() => setSelected('O and A Levels')}
            >
              <h3>O and A Levels</h3>
              <p>Cambridge or Edexcel</p>
            </button>

            <button
              type="button"
              className={getCardClass('MDCAT')}
              onClick={() => setSelected('MDCAT')}
            >
              <h3>MDCAT</h3>
              <p>Medical entry test</p>
            </button>

            <button
              type="button"
              className={getCardClass('ECAT')}
              onClick={() => setSelected('ECAT')}
            >
              <h3>ECAT</h3>
              <p>Engineering entry test</p>
            </button>
          </div>

          <button type="button" className="step1_continue" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateProfileStep1