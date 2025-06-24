import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">Placement Training</div>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/service" onClick={closeMenu}>Service</Link></li>
          <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
          <li><a href="#skills-section" onClick={closeMenu}>Skills</a></li>
          <li><Link to="/form" onClick={closeMenu}>Form</Link></li>
          <li><Link to="/state" onClick={closeMenu}>State Demo</Link></li>
          <li><Link to="/reducer" onClick={closeMenu}>Reducer Demo</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
