import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Hey There</h1>
      <h1 className="portfolio-title">We're <strong>Rayan & Rita</strong></h1>
      <p className="portfolio-subtitle">Two passionate developers on a mission to build, learn, and inspire.</p>

      <div className="portfolio-main">
  {/* Designer left side */}
  <div className="profile-card">
    {/* Rita Profile Card */}
    <img src="/images/image1.png" alt="Rita" className="profile-img" />
    <h4 className="profile-name">Rita Safadi</h4>
    <p className="profile-tagline">"Coding with creativity and heart."</p>
    <div className="side-text">
      <h3>Designer</h3>
      <p>
         UI/UX designer with 4 years of experience crafting clean, user-friendly interfaces.
      </p>
    </div>
  </div>

  {/* Rayan Profile Card */}
  <div className="profile-card">
    <img src="/images/image2.png" alt="Rayan" className="profile-img" />
    <h4 className="profile-name">Rayan Ibraheem</h4>
    <p className="profile-tagline">"Turning logic into magic."</p>
  

  {/* Coder right side */}
  <div className="side-text">
    <h3>Coder</h3>
    <p>
       Full-stack developer with 5 years of experience building functional web apps.
    </p>
  </div>
  </div>
</div>

    </div>
  );
}

export default Portfolio;
