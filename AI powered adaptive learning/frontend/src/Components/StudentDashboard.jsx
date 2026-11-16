import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import useStudyProfile from '../hooks/useStudyProfile'
import { getCurrentUser } from '../auth/currentUser'
import './StudentDashboard.css'

// one row in the "Your topics" card
function TopicRow({ name, percent }) {
  let barClass = 'dash_progress'
  let tag = null

  // topics under 50% are marked as weak
  if (percent < 50) {
    barClass = 'dash_progress dash_progress_weak'
    tag = <span className="dash_tag_lime">Needs work</span>
  }

  return (
    <div className="dash_topic">
      <div className="dash_topic_top">
        <span className="dash_topic_name">{name}</span>
        {tag}
        <span className="dash_topic_percent">{percent}%</span>
      </div>
      <progress className={barClass} value={percent} max="100"></progress>
    </div>
  )
}

function StudentDashboard() {
  const user = getCurrentUser()
  const userName = user?.name?.trim().split(/\s+/)[0]
  const { profile } = useStudyProfile()
  const score = 61

  // greeting changes with the time of the day
  const hour = new Date().getHours()
  let greeting = 'Good evening'
  if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 17) {
    greeting = 'Good afternoon'
  }

  // circle for the score
  const circumference = 2 * Math.PI * 40
  const filled = (score / 100) * circumference

  return (
    <div className="dash_page">
      <Sidebar />

      <div className="dash_content">
        <h1 className="dash_title">
          {greeting}{userName ? `, ${userName}` : ''}.
        </h1>
        <p className="dash_sub">
          {profile?.exam && profile?.dailyStudyHours != null
            ? `Your ${profile.exam} plan is set for ${profile.dailyStudyHours} study hours per day.`
            : 'Complete your study profile to personalize your plan.'}
        </p>

        <div className="dash_row">
          <div className="dash_score">
            <svg className="dash_ring" viewBox="0 0 100 100">
              <circle className="dash_ring_track" cx="50" cy="50" r="40" />
              <circle
                className="dash_ring_fill"
                cx="50"
                cy="50"
                r="40"
                strokeDasharray={filled + ' ' + circumference}
              />
            </svg>

            <div>
              <p className="dash_score_big">{score}%</p>
              <p className="dash_score_label">Predicted board score</p>
              <div className="dash_score_tags">
                <span className="dash_tag_lime">Medium risk</span>
                <span className="dash_tag_outline">
                  {profile?.exam || 'Exam'} preparation
                </span>
              </div>
            </div>
          </div>

          <div className="dash_fix">
            <h2>Fix this next</h2>
            <p>
              Projectile motion is at 38%. It is your weakest topic and it drags your whole
              prediction down.
            </p>
            <Link to="/diagnostic-quiz" className="dash_btn">
              Practise 4 questions
            </Link>
          </div>
        </div>

        <div className="dash_row">
          <div className="dash_card">
            <h2>Your topics</h2>
            <TopicRow name="Projectile motion" percent={38} />
            <TopicRow name="Circular motion" percent={47} />
            <TopicRow name="Work and energy" percent={55} />
            <TopicRow name="Kinematics" percent={64} />
            <TopicRow name="Newton’s laws" percent={71} />
            <TopicRow name="Vectors" percent={82} />
          </div>

          <div className="dash_card">
            <h2>Today’s plan</h2>

            <div className="dash_plan_item">
              <span className="dash_plan_dot"></span>
              <div>
                <p className="dash_plan_text">Projectile motion: split velocity into components</p>
                <p className="dash_plan_time">40 min</p>
              </div>
            </div>

            <div className="dash_plan_item">
              <span className="dash_plan_dot"></span>
              <div>
                <p className="dash_plan_text">Vectors: 10 quick drills</p>
                <p className="dash_plan_time">20 min</p>
              </div>
            </div>

            <div className="dash_plan_item">
              <span className="dash_plan_dot"></span>
              <div>
                <p className="dash_plan_text">Ask Rahnuma why range peaks at 45°</p>
                <p className="dash_plan_time">15 min</p>
              </div>
            </div>

            <Link to="/revision-planner" className="dash_btn dash_btn_space">
              Open full week
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard