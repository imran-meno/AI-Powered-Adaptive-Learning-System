import { useState } from 'react'
import Sidebar from './Sidebar'
import useStudyProfile from '../hooks/useStudyProfile'
import './StudyAssistant.css'

function StudyAssistant() {
  const { profile } = useStudyProfile()
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'user',
      text: 'Why is 45° the best angle for range?',
    },
    {
      from: 'bot',
      text: 'Range depends on how long the projectile stays in the air and how fast it moves sideways. At 45° the two balance, so the ball lands farthest. Gravity pulls vertically and horizontal speed stays constant.',
      source: 'profile-textbook',
    },
  ])

  // adds the question and the answer to the chat
  function sendQuestion(text) {
    if (text.trim() === '') {
      return
    }

    // TODO: call your AI API here and use its answer instead of this fake one
    const newMessages = [
      ...messages,
      { from: 'user', text: text },
      {
        from: 'bot',
        text: 'This is where the answer from your textbooks will appear.',
        source: 'Connect your AI API here',
      },
    ]

    setMessages(newMessages)
    setQuestion('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendQuestion(question)
  }

  // shows one message in the chat
  function showMessage(message, index) {
    if (message.from === 'user') {
      return (
        <div key={index} className="chat_row chat_row_user">
          <p className="chat_user">{message.text}</p>
        </div>
      )
    }

    return (
      <div key={index} className="chat_row">
        <div className="chat_bot">
          <p>{message.text}</p>
          <p className="chat_source">
            Source:{' '}
            <span>
              {message.source === 'profile-textbook'
                ? `${profile?.board || 'Your board'} · ${profile?.subjects?.[0] || 'your subject'} textbook`
                : message.source}
            </span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat_page">
      <Sidebar />

      <div className="chat_content">
        <h1 className="chat_title">Ask anything from your syllabus.</h1>
        <p className="chat_sub">
          Answers come from your own board textbooks and past papers, and every answer shows where it
          came from.
        </p>

        <div className="chat_suggest">
          <button
            type="button"
            className="chat_pill"
            onClick={() => sendQuestion('Why is 45° the best angle for range?')}
          >
            Why is 45° the best angle for range?
          </button>
          <button
            type="button"
            className="chat_pill"
            onClick={() => sendQuestion('Explain Newton’s second law')}
          >
            Explain Newton’s second law
          </button>
          <button
            type="button"
            className="chat_pill"
            onClick={() => sendQuestion('What is the work–energy theorem?')}
          >
            What is the work–energy theorem?
          </button>
        </div>

        <div className="chat_messages">{messages.map(showMessage)}</div>

        <form className="chat_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a question about Physics, Chemistry or Maths"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default StudyAssistant