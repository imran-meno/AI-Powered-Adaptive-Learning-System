import './LandingPage.css'
import { Link } from 'react-router-dom'

const steps = [
  {
    title: 'Build your profile',
    text: 'Tell us your exam, board, subjects and study time.',
  },
  {
    title: 'Take a short diagnostic quiz',
    text: 'We find the topics that are costing you marks.',
  },
  {
    title: 'Get your plan',
    text: 'A learning path, revision plan and study assistant made for you.',
  },
]

const features = [
  {
    title: 'Your own learning profile',
    text: 'Board, subjects, study time and weak areas shape every plan you get.',
  },
  {
    title: 'Answers from your textbook',
    text: 'Ask a question and see the exact page your answer came from.',
  },
  {
    title: 'Weak topics found early',
    text: 'Quizzes and study habits show where you are losing marks.',
  },
  {
    title: 'A plan that updates itself',
    text: 'Your day-by-day revision plan changes as you improve.',
  },
]

function LandingPage() {
  return (
    <div className="lp">
      <section className="lp-hero">
        <header className="lp-nav">

          <Link to="/" className="lp-logo">
            <span className="lp-logo-dot" />
            Taleem AI
          </Link>

          <nav className="lp-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#boards">Boards</a>
            <a href="#assistant">Study assistant</a>

            <Link to="/login" className="lp-btn lp-btn-outline lp-btn-sm">
              Log in
            </Link>

            <Link to="/signup" className="lp-btn lp-btn-lime lp-btn-sm">
              Sign up
            </Link>
          </nav>
        </header>

        <div className="lp-hero-body">
          <div className="lp-hero-text">

            <h1 className="lp-title">
              Don’t just study harder.
              <span className="lp-title-accent">
                Study where it counts.
              </span>
            </h1>

            <p className="lp-sub">
              Taleem AI learns which topics are costing you marks, answers from
              your own board textbooks, and plans every revision day for you.
            </p>

            <div className="lp-cta">

              <Link to="/signup" className="lp-btn lp-btn-lime">
                Create free account
              </Link>

              <Link to="/login" className="lp-btn lp-btn-outline">
                Log in
              </Link>

            </div>
          </div>

          <aside className="lp-steps" id="how-it-works">
            <h2>Your path in three steps</h2>

            <ol>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="lp-step-num">{i + 1}</span>

                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="lp-features" id="assistant">
        <h2>Everything adapts to your exam.</h2>

        <div className="lp-feature-grid">
          {features.map((f) => (
            <article key={f.title} className="lp-card">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="lp-banner" id="boards">
        Built for Sindh Board, Punjab Board, O/A-Levels, MDCAT and ECAT.
      </footer>
    </div>
  )
}

export default LandingPage
