import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location.pathname]); // Update whenever route changes

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Portfolio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/skills">CV</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            {isAdmin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">Login</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <a href="https://github.com/RitaSaf/PortfolioCV" target="_blank" rel="noopener noreferrer" className="text-dark">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark">
              <FaLinkedin size={20} />
            </a>
            {isAdmin && (
              <button onClick={handleLogout} className="btn btn-sm btn-outline-primary ms-3">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
