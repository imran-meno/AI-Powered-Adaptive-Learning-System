
import Sidebar from "./Sidebar";
import "./LearningPath.css";

function LearningPath() {
  return (
    <div className="lp-page">

      {/* Reusable Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="lp-main">

        {/* Page Header */}
        <header className="lp-header">

          <div>
            <h1>Your learning path</h1>
            <p>
              Your next step changes as your quiz results come in.
            </p>
          </div>

          <span className="lp-pill">
            Updated 2 hours ago
          </span>

        </header>


        {/* Learning Path Stepper */}
        <section className="lp-stepper">

          {/* Step 1 */}
          <div className="lp-step">

            <div className="lp-step-row">
              <div className="lp-circle done">✓</div>
              <div className="lp-connector done"></div>
            </div>

            <div className="lp-step-label">Vectors</div>
            <div className="lp-step-sub">Completed</div>

          </div>


          {/* Step 2 */}
          <div className="lp-step">

            <div className="lp-step-row">
              <div className="lp-circle done">✓</div>
              <div className="lp-connector done"></div>
            </div>

            <div className="lp-step-label">Kinematics</div>
            <div className="lp-step-sub">Completed</div>

          </div>


          {/* Step 3 */}
          <div className="lp-step">

            <div className="lp-step-row">
              <div className="lp-circle current">38%</div>
              <div className="lp-connector"></div>
            </div>

            <div className="lp-step-label">Projectile motion</div>
            <div className="lp-step-sub current">Up next</div>

          </div>


          {/* Step 4 */}
          <div className="lp-step">

            <div className="lp-step-row">
              <div className="lp-circle upcoming">47%</div>
              <div className="lp-connector"></div>
            </div>

            <div className="lp-step-label">Circular motion</div>
            <div className="lp-step-sub">Coming up</div>

          </div>


          {/* Step 5 */}
          <div className="lp-step">

            <div className="lp-step-row">
              <div className="lp-circle upcoming">55%</div>
            </div>

            <div className="lp-step-label">Work and energy</div>
            <div className="lp-step-sub">Coming up</div>

          </div>

        </section>


        {/* Learning Path Cards */}
        <section className="lp-cards">

          {/* Recommended Topic */}
          <div className="lp-card lp-card-highlight">

            <h2>Why Projectile motion is next</h2>

            <p>
              It is your weakest topic at 38%, and it builds on
              Kinematics and Vectors, which you have just completed.
              Fixing it moves your predicted score the most.
            </p>

            <button className="lp-button">
              Start the 20-minute drill
            </button>

          </div>


          {/* Upcoming Topics */}
          <div className="lp-card lp-card-muted">

            <h2>Coming up</h2>

            <ul className="lp-list">

              {/* Topic 1 */}
              <li>
                <span className="lp-list-dot active"></span>

                <div>
                  <div className="lp-list-title">
                    Circular motion
                  </div>

                  <div className="lp-list-sub">
                    Needs work at 47%
                  </div>
                </div>
              </li>


              {/* Topic 2 */}
              <li>
                <span className="lp-list-dot"></span>

                <div>
                  <div className="lp-list-title">
                    Work and energy
                  </div>

                  <div className="lp-list-sub">
                    Builds on Newton's laws
                  </div>
                </div>
              </li>


              {/* Topic 3 */}
              <li>
                <span className="lp-list-dot"></span>

                <div>
                  <div className="lp-list-title">
                    Mixed quiz
                  </div>

                  <div className="lp-list-sub">
                    Checks that the gains stick
                  </div>
                </div>
              </li>

            </ul>

          </div>

        </section>

      </main>

    </div>
  );
}

export default LearningPath;
