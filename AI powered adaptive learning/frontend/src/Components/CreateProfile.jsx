import { useState } from 'react'
import './CreateProfile.css'

const points = [
  'A plan built around your exam',
  'Answers from your own textbooks',
  'Weak topics found early',
]

function CreateProfile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to your signup API
    console.log(form)
  }

  return (
    <div className="main_div">
      <div className="div_one">
        <div className="logo_div">
          <span className="logo_dot" />
          <p>Taleem AI</p>
        </div>

        <div className="div_one_bottom">
          <h2>
            Start with a free
            <br />
            account.
          </h2>
          <ul>
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
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
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="pass_wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <span className="hint">Use at least 8 characters.</span>

          <label htmlFor="confirm" className="confirm_label">
            Confirm password
          </label>
          <div className="pass_wrap">
            <input
              id="confirm"
              name="confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowConfirm((s) => !s)}>
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          </div>

          <label className="check_row">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            <span className="check_box" aria-hidden="true">✓</span>
            <span>I agree to the terms and privacy policy</span>
          </label>

          <button type="submit" className="submit_btn">
            Create account
          </button>

          <p className="login_row">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile