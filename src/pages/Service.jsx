// src/pages/Services.jsx
import { useContext } from 'react';
import { InfoContext } from '../hooks/InfoContext';
import './Service.css';

const Services = () => {
  const info = useContext(InfoContext);

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['React', 'Node.js', 'Responsive Design']
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android',
      features: ['React Native', 'Flutter', 'Native Apps']
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment services',
      features: ['AWS', 'Azure', 'Google Cloud']
    },
    {
      icon: '🔒',
      title: 'Security Services',
      description: 'Comprehensive security audits and protection solutions',
      features: ['Penetration Testing', 'SSL Certificates', 'Firewall Setup']
    }
  ];

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">Professional solutions tailored to your needs</p>
        <div className="user-info-card">
          <div className="user-avatar">
            <span>{info.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h3>Welcome, {info.name}!</h3>
            <p>Age: {info.age} | Department: {info.dep}</p>
          </div>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-features">
              {service.features.map((feature, featureIndex) => (
                <span key={featureIndex} className="feature-tag">{feature}</span>
              ))}
            </div>
            <button className="service-btn">Learn More</button>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Contact us today to discuss your project requirements</p>
        <button className="cta-btn">Contact Us</button>
      </div>
    </div>
  );
};

export default Services;
