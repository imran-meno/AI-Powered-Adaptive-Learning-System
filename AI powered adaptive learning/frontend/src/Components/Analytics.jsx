
import { Link } from "react-router-dom";
import "./Analytics.css";
import Sidebar from './Sidebar'
import useStudyProfile from '../hooks/useStudyProfile'


function Analytics() {
  const { profile } = useStudyProfile()

  return (
    <div className="an-page">

      <Sidebar/>


      {/* Main Content */}
      <main className="an-main">

        <div className="an-header">
          <h1>Analytics</h1>
          <p>Track your learning progress and performance.</p>
        </div>


        <div className="an-grid">

          {/* Predicted Performance */}
          <div className="an-card an-card-dark">

            <h2>Predicted Performance</h2>

            <div className="an-card-label">
              Your predicted board score
            </div>

            <div className="an-score">61%</div>

            <div className="an-pills">
              <span className="an-pill">Medium Risk</span>
              <span className="an-pill">
                {profile?.exam || 'Exam'} · {profile?.dailyStudyHours ?? '—'} h/day
              </span>
            </div>

          </div>


          {/* Biggest Weakness */}
          <div className="an-card an-card-highlight">

            <h2>Biggest Weakness</h2>

            <p>
              Projectile Motion is currently your weakest topic.
              Your average performance is 38%.
            </p>

            <Link to="/learning-path" className="an-button">
              Improve This Topic
            </Link>

          </div>


          {/* Quiz Performance */}
          <div className="an-card an-card-muted">

            <h2>Quiz Performance</h2>

            <p className="an-card-label">
              Your recent quiz scores
            </p>

            <svg
              className="an-chart"
              viewBox="0 0 400 180"
              preserveAspectRatio="none"
            >

              <polyline
                className="an-chart-line"
                points="30,130 95,105 160,115 225,70 290,85 355,35"
              />

              <circle className="an-chart-dot" cx="30" cy="130" r="5" />
              <circle className="an-chart-dot" cx="95" cy="105" r="5" />
              <circle className="an-chart-dot" cx="160" cy="115" r="5" />
              <circle className="an-chart-dot" cx="225" cy="70" r="5" />
              <circle className="an-chart-dot" cx="290" cy="85" r="5" />
              <circle className="an-chart-dot" cx="355" cy="35" r="5" />

              <text className="an-chart-label" x="30" y="165">Quiz 1</text>
              <text className="an-chart-label" x="95" y="165">Quiz 2</text>
              <text className="an-chart-label" x="160" y="165">Quiz 3</text>
              <text className="an-chart-label" x="225" y="165">Quiz 4</text>
              <text className="an-chart-label" x="290" y="165">Quiz 5</text>
              <text className="an-chart-label" x="355" y="165">Quiz 6</text>

            </svg>

          </div>


          {/* Subject Performance */}
          <div className="an-card an-card-muted">

            <h2>Subject Performance</h2>

            <p className="an-card-label">
              Your predicted scores by subject
            </p>

            <div className="an-subjects">

              <div>
                <div className="an-subject-top">
                  <span>Physics</span>
                  <span>58%</span>
                </div>

                <div className="an-bar-track">
                  <div
                    className="an-bar-fill highlight"
                    style={{ width: "58%" }}
                  ></div>
                </div>
              </div>


              <div>
                <div className="an-subject-top">
                  <span>Chemistry</span>
                  <span>66%</span>
                </div>

                <div className="an-bar-track">
                  <div
                    className="an-bar-fill"
                    style={{ width: "66%" }}
                  ></div>
                </div>
              </div>


              <div>
                <div className="an-subject-top">
                  <span>Mathematics</span>
                  <span>60%</span>
                </div>

                <div className="an-bar-track">
                  <div
                    className="an-bar-fill"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Analytics;
