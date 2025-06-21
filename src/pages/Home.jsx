import { useState } from 'react';
import './Home.css';

const Home = () => {
    return(
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Our Platform</h1>
                    <p className="hero-subtitle">Discover amazing features and professional solutions for your needs</p>
                    <div className="hero-buttons">
                        <button className="btn-primary">Get Started</button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-placeholder">
                        <span>🚀</span>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast Performance</h3>
                        <p>Lightning-fast loading times and smooth interactions</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Secure & Reliable</h3>
                        <p>Enterprise-grade security and 99.9% uptime guarantee</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Modern Design</h3>
                        <p>Beautiful, responsive design that works on all devices</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home