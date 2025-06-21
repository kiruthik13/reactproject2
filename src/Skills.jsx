import { useState } from "react";
import './Skills.css';

const Skills = ({skill}) => {
    return (
        <div className="skills-container">
            <div className="skills-header">
                <h1 className="skills-title">Technical Skills</h1>
                <p className="skills-subtitle">Our expertise in modern technologies</p>
            </div>
            
            <div className="skills-grid">
                {skill.map((s, index) => (
                    <div key={index} className="skill-card">
                        <div className="skill-icon">
                            {getSkillIcon(s)}
                        </div>
                        <h3 className="skill-name">{s}</h3>
                        <div className="skill-level">
                            <div className="skill-progress">
                                <div 
                                    className="skill-progress-bar" 
                                    style={{width: `${Math.min(85 + Math.random() * 15, 100)}%`}}
                                ></div>
                            </div>
                            <span className="skill-percentage">
                                {Math.floor(85 + Math.random() * 15)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const getSkillIcon = (skillName) => {
    const icons = {
        'React': '⚛️',
        'Node': '🟢',
        'Express': '🚀',
        'MongoDB': '🍃',
        'JavaScript': '📜',
        'TypeScript': '📘',
        'Python': '🐍',
        'Java': '☕',
        'C++': '⚙️',
        'SQL': '🗄️',
        'HTML': '🌐',
        'CSS': '🎨',
        'Git': '📚',
        'Docker': '🐳',
        'AWS': '☁️'
    };
    
    return icons[skillName] || '💻';
};

export default Skills