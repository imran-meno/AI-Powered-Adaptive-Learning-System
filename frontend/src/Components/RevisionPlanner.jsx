
import Sidebar from "./Sidebar";
import "./RevisionPlanner.css";

function RevisionPlanner() {
  return (
    <div className="rp-page">

      {/* Reusable Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="rp-main">

        {/* Header */}
        <header className="rp-header">

          <div>
            <h1>Revision planner</h1>

            <p>
              A day-by-day plan built from your days left,
              study time and weak topics.
            </p>
          </div>

          <span className="rp-pill">
            74 days to ECAT
          </span>

        </header>


        {/* Statistics */}
        <section className="rp-stats">

          <div className="rp-stat-box">
            <div className="rp-stat-value">74</div>
            <div className="rp-stat-label">days left to ECAT</div>
          </div>

          <div className="rp-stat-box">
            <div className="rp-stat-value">2 h</div>
            <div className="rp-stat-label">study time each day</div>
          </div>

          <div className="rp-stat-box">
            <div className="rp-stat-value">18</div>
            <div className="rp-stat-label">topics still to cover</div>
          </div>

        </section>


        {/* Weekly Study Plan */}
        <section className="rp-week">


          {/* Monday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Mon</span>
              <span className="rp-day-date">10</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Projectile motion</div>
                <div className="rp-task-time">40 min</div>
              </div>

              <div className="rp-task">
                <div className="rp-task-title">Vectors drills</div>
                <div className="rp-task-time">20 min</div>
              </div>

            </div>

          </div>


          {/* Tuesday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Tue</span>
              <span className="rp-day-date">11</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Circular motion</div>
                <div className="rp-task-time">40 min</div>
              </div>

              <div className="rp-task">
                <div className="rp-task-title">Kinematics paper</div>
                <div className="rp-task-time">45 min</div>
              </div>

            </div>

          </div>


          {/* Wednesday - Active Day */}
          <div className="rp-day-col active">

            <div className="rp-day-header">
              <span>Wed</span>
              <span className="rp-day-date">12</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Work and energy</div>
                <div className="rp-task-time">40 min</div>
              </div>

              <div className="rp-task dark">
                <div className="rp-task-title">Newton's laws MCQs</div>
                <div className="rp-task-time">30 min</div>
              </div>

            </div>

          </div>


          {/* Thursday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Thu</span>
              <span className="rp-day-date">13</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Projectile motion</div>
                <div className="rp-task-time">45 min</div>
              </div>

              <div className="rp-task">
                <div className="rp-task-title">Mixed quiz</div>
                <div className="rp-task-time">20 min</div>
              </div>

            </div>

          </div>


          {/* Friday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Fri</span>
              <span className="rp-day-date">14</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Circular motion</div>
                <div className="rp-task-time">35 min</div>
              </div>

              <div className="rp-task highlight">
                <div className="rp-task-title">Work and energy</div>
                <div className="rp-task-time">35 min</div>
              </div>

            </div>

          </div>


          {/* Saturday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Sat</span>
              <span className="rp-day-date">15</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task">
                <div className="rp-task-title">Full physics mock</div>
                <div className="rp-task-time">90 min</div>
              </div>

            </div>

          </div>


          {/* Sunday */}
          <div className="rp-day-col">

            <div className="rp-day-header">
              <span>Sun</span>
              <span className="rp-day-date">16</span>
            </div>

            <div className="rp-tasks">

              <div className="rp-task highlight">
                <div className="rp-task-title">Recap weak topics</div>
                <div className="rp-task-time">40 min</div>
              </div>

              <div className="rp-task">
                <div className="rp-task-title">Plan next week</div>
                <div className="rp-task-time">15 min</div>
              </div>

            </div>

          </div>

        </section>


        {/* Action Buttons */}
        <section className="rp-actions">

          <button className="rp-btn-dark">
            Change study time
          </button>

          <button className="rp-btn-outline">
            Re-plan around weak topics
          </button>

          <span className="rp-hint">
            Green tasks cover your weak topics.
          </span>

        </section>

      </main>

    </div>
  );
}

export default RevisionPlanner;
