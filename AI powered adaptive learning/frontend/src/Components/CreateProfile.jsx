import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CreateProfile.css'

function CreateProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // password field type and button text
  let passwordType = 'password'
  let passwordBtn = 'Show'
  if (showPassword === true) {
    passwordType = 'text'
    passwordBtn = 'Hide'
  }

  // confirm password field type and button text
  let confirmType = 'password'
  let confirmBtn = 'Show'
  if (showConfirm === true) {
    confirmType = 'text'
    confirmBtn = 'Hide'
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }

    // TODO: connect to your signup API
    console.log(name, email, password)
  }

  return (
    <div className="main_div">
      <div className="div_one">
        <div className="logo_div">
          <span className="logo_dot"></span>
          <p>Taleem AI</p>
        </div>

        <div className="div_one_bottom">
          <h2>
            Start with a free
            <br />
            account.
          </h2>
          <ul>
            <li>A plan built around your exam</li>
            <li>Answers from your own textbooks</li>
            <li>Weak topics found early</li>
          </ul>
          <small>Built for Sindh Board, Punjab Board, O/A-Levels, MDCAT and ECAT.</small>
        </div>
      </div>

      <div className="div_two">
        <form className="form_box" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="form_sub">
            It takes about a minute. Next, we’ll set up your learning profile.
          </p>

          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="pass_wrap">
            <input
              id="password"
              type={passwordType}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {passwordBtn}
            </button>
          </div>
          <span className="hint">Use at least 8 characters.</span>

          <label htmlFor="confirm">Confirm password</label>
          <div className="pass_wrap">
            <input
              id="confirm"
              type={confirmType}
              placeholder="Enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
              {confirmBtn}
            </button>
          </div>

          <label className="check_row">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <span className="check_box">✓</span>
            <span>I agree to the terms and privacy policy</span>
          </label>

          <button type="submit" className="submit_btn">
            Create account
          </button>

          <p className="login_row">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile