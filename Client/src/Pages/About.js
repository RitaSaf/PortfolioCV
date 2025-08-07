import React, { useState } from 'react';
import './About.css';

function AboutPage() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Who We Are</h1>
        <p className="intro-text">
          We are a dynamic duo of full-stack developers from Tel-Hai College. 
          Rita brings exceptional design skills to create beautiful user interfaces, 
          while Rayan focuses on robust backend solutions. Together, we create 
          seamless digital experiences that solve real-world problems.
        </p>
      </div>

      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab(activeTab === 'team' ? null : 'team')}
        >
          <i className="fas fa-users"></i> Our Team
        </button>
        <button 
          className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab(activeTab === 'education' ? null : 'education')}
        >
          <i className="fas fa-graduation-cap"></i> Our Education
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="team-section animate-in">
          <div className="profile-card">
          <img src="/images/image3.jpg" alt="Rita" className="profile-image" />
              <div className="profile-content">
              <h2>Rita Safadi</h2>
              <div className="role">UI/UX Designer & Frontend Developer</div>
              <p>
                Rita transforms complex requirements into intuitive, beautiful interfaces. 
                With a keen eye for detail and passion for user experience, she creates 
                designs that users love to interact with.
              </p>
              <div className="skills">
                <span>UI Design</span>
                <span>Figma</span>
                <span>React</span>
                <span>CSS</span>
              </div>
              <a href="https://github.com/RitaSaf" className="github-link">
                <i className="fab fa-github"></i> GitHub Profile
              </a>
            </div>
          </div>
          
          <div className="profile-card">
          <img src="/images/image4.jpg" alt="Rita" className="profile-image" />
            <div className="profile-content">
              <h2>Rayan Ibraheem</h2>
              <div className="role">Backend Developer & Systems Architect</div>
              <p>
                Rayan builds robust, scalable systems that power our applications. 
                With expertise in complex algorithms and system architecture, he 
                ensures our solutions are performant and secure.
              </p>
              <div className="skills">
                <span>Node.js</span>
                <span>PostgreSQL</span>
                <span>API Design</span>
                <span>AWS</span>
              </div>
              <a href="https://github.com/Rayanib" className="github-link">
                <i className="fab fa-github"></i> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="education-section animate-in">
          
          <div className="certificates">
            <div className="certificate-card">
            <img src="/images/image6.png" alt="Rita" className="cert-image" />
              <h3>Rita's Certification</h3>
            </div>
            <div className="certificate-card">
            <img src="/images/image5.png" alt="Rita" className="cert-image" />
              <h3>Rayan's Certification</h3>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default AboutPage;