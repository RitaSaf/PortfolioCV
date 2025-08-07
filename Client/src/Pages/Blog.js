import React, { useEffect, useState } from 'react';
import './Blog.css';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/api/blog');
    const data = await res.json();
    setBlogs(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`http://localhost:5000/api/blog/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({ title: post.title, content: post.content });
    setShowAddForm(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) return alert('Fill all fields');
    const url = editId ? `http://localhost:5000/api/blog/${editId}` : 'http://localhost:5000/api/blog';
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    alert(editId ? 'Blog post updated!' : 'Blog post added!');
    setForm({ title: '', content: '' });
    setEditId(null);
    setShowAddForm(false);
    fetchBlogs();
  };

  return (
    <div className="blog-container">
      <h2 className="blog-title">Blog Posts</h2>

      {isAdmin && (
        <div className="text-center mb-4">
          <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '➕ Add Blog'}
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="mb-4">
          <input className="form-control mb-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <textarea className="form-control mb-2" name="content" placeholder="Content" rows="5" value={form.content} onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update Post' : 'Add Post'}</button>
        </div>
      )}

      <div className="blog-grid">
        {blogs.map((post) => (
          <div key={post.id} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {isAdmin && (
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(post)}>✏️ Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post.id)}>🗑️ Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;