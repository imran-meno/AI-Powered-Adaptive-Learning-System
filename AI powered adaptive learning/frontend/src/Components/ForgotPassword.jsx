import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // TODO: connect to your reset password API
    console.log(email)
  }

  return (
    <div className="forgot_main">
      <div className="forgot_left">
        <div className="forgot_logo">
          <span className="forgot_dot"></span>
          <p>Taleem AI</p>
        </div>

        <div className="forgot_left_bottom">
          <h2>
            Locked out? We’ll get
            <br />
            you back in.
          </h2>
          <ul>
            <li>We email you a secure reset link</li>
            <li>The link works for a short time only</li>
            <li>Your progress is never lost</li>
          </ul>
          <small>Built for Sindh Board, Punjab Board, O/A-Levels, MDCAT and ECAT.</small>
        </div>
      </div>

      <div className="forgot_right">
        <form className="forgot_form" onSubmit={handleSubmit}>
          <h1>Reset your password</h1>
          <p className="forgot_sub">
            Enter the email you signed up with. We’ll send you a link to choose a new password.
          </p>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="forgot_submit">
            Send reset link
          </button>

          <p className="forgot_bottom_text">
            Remembered it? <Link to="/login">Back to log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword