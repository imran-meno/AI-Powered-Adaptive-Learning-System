
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Settings.css";

export default function Settings() {

  const [toggles, setToggles] = useState({
    daily: true,
    weakTopic: true,
    weekly: false,
  });

  const toggle = (key) => {
    setToggles({
      ...toggles,
      [key]: !toggles[key],
    });
  };

  return (
    <div className="st-page">

      <Sidebar />

      <main className="st-main">

        <header className="st-header">
          <h1>Settings</h1>
          <p>Update your profile, study time and notifications.</p>
        </header>

        <section className="st-grid">

          <div className="st-col">

            <div className="st-card">
              <h2>Profile</h2>

              <label className="st-label">Full name</label>
              <input className="st-input" defaultValue="Ayesha Memon" />

              <label className="st-label">Email</label>
              <input className="st-input" defaultValue="ayesha@example.com" />

              <label className="st-label">Exam and board</label>
              <input
                className="st-input"
                defaultValue="Intermediate Pre-Engineering · Sindh Board"
              />
            </div>

            <div className="st-card">
              <h2>Study preferences</h2>

              <div className="st-study-row">
                <span>Study time per day</span>
                <span>2 h</span>
              </div>

              <div className="st-bar-track">
                <div className="st-bar-fill" style={{ width: "65%" }}></div>
              </div>

              <div className="st-tags">
                <span className="st-tag">Physics</span>
                <span className="st-tag">Chemistry</span>
                <span className="st-tag">Maths</span>
              </div>
            </div>

          </div>

          <div className="st-col">

            <div className="st-card">
              <h2>Notifications</h2>

              <div className="st-toggle-row">
                <span>Daily revision reminder</span>
                <button
                  className={`st-switch ${toggles.daily ? "on" : ""}`}
                  onClick={() => toggle("daily")}
                >
                  <span className="st-switch-knob"></span>
                </button>
              </div>

              <div className="st-toggle-row">
                <span>Weak topic alerts</span>
                <button
                  className={`st-switch ${toggles.weakTopic ? "on" : ""}`}
                  onClick={() => toggle("weakTopic")}
                >
                  <span className="st-switch-knob"></span>
                </button>
              </div>

              <div className="st-toggle-row">
                <span>Weekly progress summary</span>
                <button
                  className={`st-switch ${toggles.weekly ? "on" : ""}`}
                  onClick={() => toggle("weekly")}
                >
                  <span className="st-switch-knob"></span>
                </button>
              </div>
            </div>

            <div className="st-card">
              <h2>Your data</h2>

              <p className="st-data-text">
                Your study data is used only to personalise Taleem AI for
                you. You can download or delete it at any time.
              </p>

              <div className="st-data-actions">
                <button className="st-btn-outline">Download my data</button>
                <button className="st-btn-outline">Delete account</button>
              </div>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}
