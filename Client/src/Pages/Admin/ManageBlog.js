import React, { useEffect, useState } from 'react';
import './AdminStyles.css';

function ManageBlog() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await fetch('http://localhost:5000/api/blog');
    const data = await res.json();
    setPosts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const res = await fetch('http://localhost:5000/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      alert('Post added!');
      fetchBlog();
      setForm({ title: '', content: '' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(`http://localhost:5000/api/blog/${id}`, { method: 'DELETE' });
    fetchBlog();
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({ title: post.title, content: post.content });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/blog/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      alert('Post updated!');
      fetchBlog();
      setEditId(null);
      setForm({ title: '', content: '' });
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Blog</h2>

      <div className="form-group">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} rows="5" />
        {editId ? (
          <button onClick={handleUpdate}>Update Post</button>
        ) : (
          <button onClick={handleAdd}>Add Post</button>
        )}
      </div>

      <div className="project-list">
        {posts.map((post) => (
          <div key={post.id} className="project-card">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)}>✏️ Edit</button>
            <button onClick={() => handleDelete(post.id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBlog;
