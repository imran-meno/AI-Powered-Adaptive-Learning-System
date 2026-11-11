import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // password field type and button text
  let passwordType = 'password'
  let passwordBtn = 'Show'
  if (showPassword === true) {
    passwordType = 'text'
    passwordBtn = 'Hide'
  }

  function handleSubmit(e) {
    e.preventDefault()

    // TODO: connect to your login API
    console.log(email, password)
  }

  return (
    <div className="login_main">
      <div className="login_left">
        <div className="login_logo">
          <span className="login_dot"></span>
          <p>Taleem AI</p>
        </div>

        <div className="login_left_bottom">
          <h2>
            Pick up where you
            <br />
            left off.
          </h2>
          <ul>
            <li>Your next step is ready</li>
            <li>Your revision plan stays up to date</li>
            <li>Your progress is saved</li>
          </ul>
          <small>Built for Sindh Board, Punjab Board, O/A-Levels, MDCAT and ECAT.</small>
        </div>
      </div>

      <div className="login_right">
        <form className="login_form" onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <p className="login_sub">Welcome back. Enter your details to continue.</p>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="login_label_row">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="login_pass_wrap">
            <input
              id="password"
              type={passwordType}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {passwordBtn}
            </button>
          </div>

          <button type="submit" className="login_submit">
            Log in
          </button>

          <p className="login_bottom_text">
            New to Taleem AI? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login