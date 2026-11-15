
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./KnowledgeGraph.css";

function KnowledgeGraph() {

  const [confidence, setConfidence] = useState(2);

  return (
    <div className="kg-page">

      {/* Reusable Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="kg-main">

        {/* Header */}
        <header className="kg-header">

          <h1>See how your topics connect.</h1>

          <p>
            Green circles are topics that need work. Lines show which topics
            build on each other.
          </p>

        </header>


        {/* Knowledge Graph */}
        <div className="kg-graph-card">

          <svg className="kg-graph" viewBox="0 0 660 300">

            {/* Connections between topics */}

            <line x1="90" y1="150" x2="330" y2="90" className="kg-edge" />

            <line x1="90" y1="150" x2="330" y2="215" className="kg-edge" />

            <line x1="90" y1="150" x2="570" y2="60" className="kg-edge highlight" />

            <line x1="330" y1="90" x2="570" y2="60" className="kg-edge highlight" />

            <line x1="330" y1="90" x2="570" y2="150" className="kg-edge" />

            <line x1="330" y1="215" x2="570" y2="150" className="kg-edge" />

            <line x1="330" y1="215" x2="570" y2="245" className="kg-edge" />


            {/* Vectors */}
            <circle cx="90" cy="150" r="28" className="kg-node" />

            <text x="90" y="155" className="kg-node-value">
              82%
            </text>

            <text x="90" y="194" className="kg-node-label">
              Vectors
            </text>


            {/* Kinematics */}
            <circle cx="330" cy="90" r="28" className="kg-node" />

            <text x="330" y="95" className="kg-node-value">
              64%
            </text>

            <text x="330" y="134" className="kg-node-label">
              Kinematics
            </text>


            {/* Projectile Motion */}
            <circle cx="570" cy="60" r="28" className="kg-node weak" />

            <text x="570" y="65" className="kg-node-value">
              38%
            </text>

            <text x="570" y="104" className="kg-node-label">
              Projectile motion
            </text>


            {/* Newton's Laws */}
            <circle cx="330" cy="215" r="28" className="kg-node" />

            <text x="330" y="220" className="kg-node-value">
              71%
            </text>

            <text x="330" y="259" className="kg-node-label">
              Newton's laws
            </text>


            {/* Work and Energy */}
            <circle cx="570" cy="150" r="28" className="kg-node" />

            <text x="570" y="155" className="kg-node-value">
              55%
            </text>

            <text x="570" y="194" className="kg-node-label">
              Work and energy
            </text>


            {/* Circular Motion */}
            <circle cx="570" cy="245" r="28" className="kg-node weak" />

            <text x="570" y="250" className="kg-node-value">
              47%
            </text>

            <text x="570" y="289" className="kg-node-label">
              Circular motion
            </text>

          </svg>

        </div>


        {/* Topic Details */}
        <div className="kg-detail-card">

          <h2>Projectile motion</h2>

          <p>
            It builds on Kinematics (64%) and Vectors (82%).
            Because those basics are shaky, this topic feels hard.
            Revisit them first.
          </p>


          {/* Confidence Selection */}
          <div className="kg-confidence-label">
            How confident do you feel?
          </div>


          <div className="kg-confidence-row">

            <button
              className={confidence === 1 ? "kg-confidence-btn active" : "kg-confidence-btn"}
              onClick={() => setConfidence(1)}
            >
              1
            </button>

            <button
              className={confidence === 2 ? "kg-confidence-btn active" : "kg-confidence-btn"}
              onClick={() => setConfidence(2)}
            >
              2
            </button>

            <button
              className={confidence === 3 ? "kg-confidence-btn active" : "kg-confidence-btn"}
              onClick={() => setConfidence(3)}
            >
              3
            </button>

            <button
              className={confidence === 4 ? "kg-confidence-btn active" : "kg-confidence-btn"}
              onClick={() => setConfidence(4)}
            >
              4
            </button>

            <button
              className={confidence === 5 ? "kg-confidence-btn active" : "kg-confidence-btn"}
              onClick={() => setConfidence(5)}
            >
              5
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default KnowledgeGraph;
