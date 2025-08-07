import React, { useEffect, useState } from 'react';
import './AdminStyles.css';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image_url: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('http://localhost:5000/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      alert('Project added!');
      fetchProjects();
      setForm({ title: '', description: '', image_url: '' });
    }
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
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/projects/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      alert('Project updated!');
      setEditId(null);
      fetchProjects();
      setForm({ title: '', description: '', image_url: '' });
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Projects</h2>

      <div className="form-group">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        {editId ? (
          <button onClick={handleUpdate}>Update Project</button>
        ) : (
          <button onClick={handleAdd}>Add Project</button>
        )}
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image_url} alt={project.title} width="100%" />
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <button onClick={() => handleEdit(project)}>✏️ Edit</button>
            <button onClick={() => handleDelete(project.id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;
