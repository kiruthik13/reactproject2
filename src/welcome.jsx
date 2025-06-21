import { useState } from "react";
import './welcome.css';

const Welcome = (props) => {
    return(
        <div className="welcome-container">
            <div className="welcome-card">
                <div className="welcome-header">
                    <div className="welcome-icon">👋</div>
                    <h1 className="welcome-title">Welcome, {props.name}!</h1>
                </div>
                <div className="welcome-content">
                    <div className="country-info">
                        <span className="country-label">Country:</span>
                        <span className="country-value">{props.country}</span>
                    </div>
                    <div className="welcome-message">
                        <p>We're excited to have you here. Explore our platform and discover amazing features!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome