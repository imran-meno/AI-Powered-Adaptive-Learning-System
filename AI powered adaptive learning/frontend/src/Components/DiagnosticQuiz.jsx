import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import './DiagnosticQuiz.css'

// sample questions - add more here (the design has 12)
const questions = [
  {
    topic: 'Vectors',
    text: 'Which of these is a vector quantity?',
    options: ['Speed', 'Distance', 'Velocity', 'Mass'],
  },
  {
    topic: 'Vectors',
    text: 'Two forces of 3 N and 4 N act at right angles. What is the size of the resultant?',
    options: ['7 N', '5 N', '1 N', '12 N'],
  },
  {
    topic: 'Kinematics',
    text: 'A car speeds up from rest at 2 m/s². How far has it travelled after 5 seconds?',
    options: ['10 m', '25 m', '50 m', '100 m'],
  },
  {
    topic: 'Newton’s laws',
    text: 'A 2 kg object is pushed with a force of 10 N. What is its acceleration?',
    options: ['2 m/s²', '5 m/s²', '10 m/s²', '20 m/s²'],
  },
  {
    topic: 'Work and energy',
    text: 'What is the SI unit of work?',
    options: ['Newton', 'Watt', 'Joule', 'Pascal'],
  },
]

function DiagnosticQuiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const total = questions.length
  const question = questions[current]
  const timeLeft = '08:42 left' // TODO: add a real countdown

  // text of the main button
  let nextText = 'Next question'
  if (current === total - 1) {
    nextText = 'Finish quiz'
  }

  // saves the answer of the current question
  function selectAnswer(option) {
    setAnswers({ ...answers, [current]: option })
  }

  function handlePrevious() {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      // TODO: send the answers to your backend
      console.log(answers)
      navigate('/learning-path')
    }
  }

  // bars up to the current question are black
  function showSegment(item, index) {
    let segmentClass = 'quiz_seg'
    if (index <= current) {
      segmentClass = 'quiz_seg quiz_seg_done'
    }
    return <div key={index} className={segmentClass}></div>
  }

  // one answer button
  function showOption(option) {
    let optionClass = 'quiz_option'
    if (answers[current] === option) {
      optionClass = 'quiz_option quiz_option_active'
    }
    return (
      <button key={option} type="button" className={optionClass} onClick={() => selectAnswer(option)}>
        {option}
      </button>
    )
  }

  return (
    <div className="quiz_page">
      <Sidebar />

      <div className="quiz_content">
        <div className="quiz_header">
          <div>
            <h1 className="quiz_title">Diagnostic quiz</h1>
            <p className="quiz_sub">
              {total} quick questions so Taleem AI can see where you stand in Physics.
            </p>
          </div>
          <span className="quiz_timer">{timeLeft}</span>
        </div>

        <div className="quiz_layout">
          <div>
            <div className="quiz_progress">{questions.map(showSegment)}</div>
            <p className="quiz_count">
              Question {current + 1} of {total} · {question.topic}
            </p>
            <h2 className="quiz_question">{question.text}</h2>

            <div className="quiz_options">{question.options.map(showOption)}</div>

            <div className="quiz_buttons">
              <button type="button" className="quiz_prev" onClick={handlePrevious}>
                Previous
              </button>
              <button type="button" className="quiz_next" onClick={handleNext}>
                {nextText}
              </button>
            </div>
          </div>

          <div className="quiz_side">
            <h3>Why we ask</h3>
            <p>
              Your answers set your starting point. Taleem AI uses them to build your first learning
              path.
            </p>

            <p className="quiz_side_label">Topics covered</p>
            <ul>
              <li className="quiz_topic quiz_topic_done">
                <span className="quiz_topic_dot"></span>
                Vectors
              </li>
              <li className="quiz_topic quiz_topic_done">
                <span className="quiz_topic_dot"></span>
                Kinematics
              </li>
              <li className="quiz_topic">
                <span className="quiz_topic_dot"></span>
                Newton’s laws
              </li>
              <li className="quiz_topic">
                <span className="quiz_topic_dot"></span>
                Work and energy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiagnosticQuiz