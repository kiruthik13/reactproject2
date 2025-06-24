import { useState, useEffect } from 'react';
import { skillsAPI, trainingAPI, statsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [modules, setModules] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [skillsData, modulesData, statsData] = await Promise.all([
        skillsAPI.getAll(),
        trainingAPI.getAll(),
        statsAPI.getStats()
      ]);

      setSkills(skillsData);
      setModules(modulesData);
      setStats(statsData);
    } catch (error) {
      setError('Failed to load dashboard data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Placement Training Dashboard</h2>
      
      {/* Statistics Section */}
      {stats && (
        <div className="stats-section">
          <h3>Placement Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Students</h4>
              <p className="stat-number">{stats.totalStudents}</p>
            </div>
            <div className="stat-card">
              <h4>Placed Students</h4>
              <p className="stat-number">{stats.placedStudents}</p>
            </div>
            <div className="stat-card">
              <h4>Placement Rate</h4>
              <p className="stat-number">
                {((stats.placedStudents / stats.totalStudents) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="stat-card">
              <h4>Average Salary</h4>
              <p className="stat-number">${stats.averageSalary.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="top-companies">
            <h4>Top Hiring Companies</h4>
            <div className="companies-list">
              {stats.topCompanies.map((company, index) => (
                <span key={index} className="company-tag">{company}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <div className="skills-section">
        <h3>Available Skills</h3>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <h4>{skill.name}</h4>
              <p className="skill-category">{skill.category}</p>
              <span className={`skill-level skill-${skill.level.toLowerCase()}`}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Training Modules Section */}
      <div className="modules-section">
        <h3>Training Modules</h3>
        <div className="modules-grid">
          {modules.map((module) => (
            <div key={module.id} className="module-card">
              <h4>{module.title}</h4>
              <p className="module-duration">Duration: {module.duration}</p>
              <span className={`module-difficulty difficulty-${module.difficulty.toLowerCase()}`}>
                {module.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 