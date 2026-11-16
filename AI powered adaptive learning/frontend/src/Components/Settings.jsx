
import { useState } from "react";
import Sidebar from "./Sidebar";
import useStudyProfile from "../hooks/useStudyProfile";
import { getCurrentUser } from "../auth/currentUser";
import "./Settings.css";

export default function Settings() {
  const user = getCurrentUser();
  const { profile } = useStudyProfile();

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
              <input className="st-input" value={user?.name || ""} readOnly />

              <label className="st-label">Email</label>
              <input className="st-input" value={user?.email || ""} readOnly />

              <label className="st-label">Exam and board</label>
              <input
                className="st-input"
                value={[profile?.exam, profile?.board].filter(Boolean).join(" · ")}
                readOnly
              />
            </div>

            <div className="st-card">
              <h2>Study preferences</h2>

              <div className="st-study-row">
                <span>Study time per day</span>
                <span>{profile?.dailyStudyHours != null ? `${profile.dailyStudyHours} h` : "Not set"}</span>
              </div>

              <div className="st-bar-track">
                <div
                  className="st-bar-fill"
                  style={{
                    width: `${Math.min(100, ((profile?.dailyStudyHours || 0) / 5) * 100)}%`,
                  }}
                ></div>
              </div>

              <div className="st-tags">
                {profile?.subjects?.length
                  ? profile.subjects.map((subject) => (
                      <span className="st-tag" key={subject}>{subject}</span>
                    ))
                  : <span className="st-tag">No subjects selected</span>}
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
