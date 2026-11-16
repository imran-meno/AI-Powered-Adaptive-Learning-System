
import { NavLink } from "react-router-dom";
import useStudyProfile from "../hooks/useStudyProfile";
import { getCurrentUser } from "../auth/currentUser";

import dashboardIcon from "../assets/dashboard.png";
import assistantIcon from "../assets/study_assistant.png";
import diagnosticIcon from "../assets/diagnostic.png";
import learningPathIcon from "../assets/learning_path.png";
import revisionIcon from "../assets/revision_planner.png";
import analyticsIcon from "../assets/analytics.png";
import resourcesIcon from "../assets/resources.png";
import knowledgeGraphIcon from "../assets/knowledge_graph.png";
import settingsIcon from "../assets/setting.png";

import "./Sidebar.css";

function Sidebar() {
  const user = getCurrentUser();
  const { profile } = useStudyProfile();
  const name = user?.name?.trim() || "Your account";
  const initials = name === "Your account"
    ? "U"
    : name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const studyDetails = [
    profile?.exam,
    profile?.dailyStudyHours != null ? `${profile.dailyStudyHours} h/day` : null,
  ].filter(Boolean).join(" · ");

  return (
    <aside className="an-sidebar">

      <div className="an-logo">
        <div className="an-logo-dot"></div>
        <span>Taleem AI</span>
      </div>

      <nav className="an-nav">

        <NavLink to="/dashboard" className="an-nav-item">
          <img src={dashboardIcon} alt="" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/study-assistant" className="an-nav-item">
          <img src={assistantIcon} alt="" />
          <span>Study Assistant</span>
        </NavLink>

        <NavLink to="/diagnostic-quiz" className="an-nav-item">
          <img src={diagnosticIcon} alt="" />
          <span>Diagnostic Quiz</span>
        </NavLink>

        <NavLink to="/learning-path" className="an-nav-item">
          <img src={learningPathIcon} alt="" />
          <span>Learning Path</span>
        </NavLink>

        <NavLink to="/revision-planner" className="an-nav-item">
          <img src={revisionIcon} alt="" />
          <span>Revision Planner</span>
        </NavLink>

        <NavLink to="/analytics" className="an-nav-item">
          <img src={analyticsIcon} alt="" />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/resources" className="an-nav-item">
          <img src={resourcesIcon} alt="" />
          <span>Resources</span>
        </NavLink>

        <NavLink to="/knowledge-graph" className="an-nav-item">
          <img src={knowledgeGraphIcon} alt="" />
          <span>Knowledge Graph</span>
        </NavLink>

        <NavLink to="/settings" className="an-nav-item">
          <img src={settingsIcon} alt="" />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="an-user">
        <div className="an-user-avatar">{initials}</div>

        <div>
          <div className="an-user-name">{name}</div>
          <div className="an-user-sub">{studyDetails || "Study profile not set"}</div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
