import React from 'react';
import './Skills.css';

const ritaSkills = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React.js', level: 85 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'Adobe XD', level: 70 },
];

const rayanSkills = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'PostgreSQL', level: 75 },
  { name: 'Express.js', level: 70 },
];

function SkillsPage() {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-wrapper">
        {/* Rita's Section */}
        <div className="person-section">
          <h3 className="person-name">Rita Safadi</h3>
          
          <div className="skills-list">
            {ritaSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cv-download-section">
            <a 
              href={`${process.env.PUBLIC_URL}/cvs/rita_cv.docx`} 
              download="Rita_Safadi_CV.docx"
              className="cv-download-btn"
            >
              Rita's CV
            </a>
          </div>
        </div>

        {/* Rayan's Section */}
        <div className="person-section">
          <h3 className="person-name">Rayan Ibraheem</h3>
          
          <div className="skills-list">
            {rayanSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cv-download-section">
            <a 
              href={`${process.env.PUBLIC_URL}/cvs/rayan_cv.docx`} 
              download="Rayan_Ibraheem_CV.docx"
              className="cv-download-btn"
            >
              Rayan's CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;