import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all page components
import PortfolioPage from './Pages/Portfolio';
import AboutPage from './Pages/About';
import ContactPage from './Pages/Contact';
import SkillsPage from './Pages/Skills';
import ProjectsPage from './Pages/Projects';
import ProjectDetails from './Pages/ProjectDetails';
import BlogPage from './Pages/Blog';  // Import Blog page
import Login from './Pages/Admin/Login';
import Dashboard from './Pages/Admin/Dashboard';

// Import components
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;