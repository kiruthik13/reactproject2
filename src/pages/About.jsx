import { useContext } from 'react';
import { userContext } from '../hooks/Usercontext';
import { Link } from 'react-router-dom';
import Reducer from '../hooks/Reducer';
import './About.css';

const About = () => {
  const { name, age, dept } = useContext(userContext);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Learn more about our team and mission</p>
      </div>

      <div className="about-content">
        <div className="user-profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{name.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="welcome-text">Welcome, {name}!</h2>
          </div>
          
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Age:</span>
              <span className="detail-value">{age} years</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{dept.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="navigation-section">
          <h3 className="section-title">Quick Navigation</h3>
          <div className="nav-links">
            <Link to="/state" className="nav-link">
              <span className="link-icon">⚡</span>
              Use State
            </Link>
            <Link to="/form" className="nav-link">
              <span className="link-icon">📝</span>
              Controlled Form
            </Link>
          </div>
        </div>

        <div className="reducer-section">
          <h3 className="section-title">useReducer Demo</h3>
          <div className="reducer-card">
            <Reducer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
