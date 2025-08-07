import React from 'react';
import { Link } from 'react-router-dom';
import './AdminStyles.css';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2>Hello, Welcome to the Admin Panel</h2>
        <p className="dashboard-subtitle">Choose what you want to manage:</p>

        <div className="dashboard-buttons">
          <Link to="/projects" className="dashboard-btn">
            📁 Manage Projects
          </Link>
          <Link to="/blog" className="dashboard-btn">
            📝 Manage Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
