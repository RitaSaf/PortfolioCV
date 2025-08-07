import React, { useEffect, useState } from 'react';
import './Projects.css';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', details: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProjects();
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('http://localhost:5000/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      details: project.details || '',
    });
    setShowAddForm(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.image_url) return alert('Fill all fields');

    const url = editId ? `http://localhost:5000/api/projects/${editId}` : 'http://localhost:5000/api/projects';
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    alert(editId ? 'Project updated!' : 'Project added!');
    setForm({ title: '', description: '', image_url: '', details: '' });
    setEditId(null);
    setShowAddForm(false);
    fetchProjects();
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">Our Projects</h2>

      {isAdmin && (
        <div className="text-center mb-4">
          <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '➕ Add Project'}
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="mb-4">
          <input className="form-control mb-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input className="form-control mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input className="form-control mb-2" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
          <textarea className="form-control mb-2" name="details" placeholder="Details" rows="3" value={form.details} onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update Project' : 'Add Project'}</button>
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image_url} className="project-img" alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link className="details-btn" to={`/projects/${project.id}`}>
  Details
</Link>
            {isAdmin && (
              <div className="text-center">
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(project)}>✏️ Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project.id)}>🗑️ Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;