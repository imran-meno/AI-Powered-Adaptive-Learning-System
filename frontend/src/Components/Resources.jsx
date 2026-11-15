
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Resources.css";

function Resources() {

  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="rs-page">

      {/* Reusable Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="rs-main">

        {/* Header */}
        <header className="rs-header">

          <h1>Resources for you</h1>

          <p>
            Textbook examples, past papers and practice sets
            picked for your weak topics.
          </p>

        </header>


        {/* Resource Filters */}
        <div className="rs-filters">

          <button
            className={activeFilter === "All" ? "rs-filter-btn active" : "rs-filter-btn"}
            onClick={() => setActiveFilter("All")}
          >
            All
          </button>

          <button
            className={activeFilter === "Textbook examples" ? "rs-filter-btn active" : "rs-filter-btn"}
            onClick={() => setActiveFilter("Textbook examples")}
          >
            Textbook examples
          </button>

          <button
            className={activeFilter === "Past papers" ? "rs-filter-btn active" : "rs-filter-btn"}
            onClick={() => setActiveFilter("Past papers")}
          >
            Past papers
          </button>

          <button
            className={activeFilter === "Practice sets" ? "rs-filter-btn active" : "rs-filter-btn"}
            onClick={() => setActiveFilter("Practice sets")}
          >
            Practice sets
          </button>

        </div>


        {/* Resources Grid */}
        <section className="rs-grid">


          {/* Resource 1: Practice Set */}
          {(
            activeFilter === "All" ||
            activeFilter === "Practice sets"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Practice set</span>

              <h2>Projectile motion: 20 mixed problems</h2>

              <div className="rs-sub">
                Sindh Board Physics XI · Ch 3
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                Projectile motion is at 38%
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}


          {/* Resource 2: Textbook Example */}
          {(
            activeFilter === "All" ||
            activeFilter === "Textbook examples"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Textbook example</span>

              <h2>Solved examples: resolving velocity</h2>

              <div className="rs-sub">
                Physics XI · Ch 3, pp. 48–51
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                Builds on your Vectors result
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}


          {/* Resource 3: Past Paper */}
          {(
            activeFilter === "All" ||
            activeFilter === "Past papers"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Past paper</span>

              <h2>ECAT Physics: Section A</h2>

              <div className="rs-sub">
                ECAT past papers
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                You are preparing for ECAT
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}


          {/* Resource 4: Textbook Example */}
          {(
            activeFilter === "All" ||
            activeFilter === "Textbook examples"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Textbook example</span>

              <h2>Centripetal force, worked step by step</h2>

              <div className="rs-sub">
                Physics XI · Ch 5
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                Circular motion is at 47%
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}


          {/* Resource 5: Practice Set */}
          {(
            activeFilter === "All" ||
            activeFilter === "Practice sets"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Practice set</span>

              <h2>Work and energy: 15 MCQs</h2>

              <div className="rs-sub">
                Physics XI · Ch 6
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                Work and energy is at 55%
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}


          {/* Resource 6: Past Paper */}
          {(
            activeFilter === "All" ||
            activeFilter === "Past papers"
          ) && (

            <div className="rs-card">

              <span className="rs-tag">Past paper</span>

              <h2>Sindh Board Physics, Paper 1</h2>

              <div className="rs-sub">
                Board past papers
              </div>

              <div className="rs-note">
                <span className="rs-dot"></span>
                Matches your board
              </div>

              <button className="rs-open">
                Open
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Resources;
