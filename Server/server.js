const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Server startup
app.listen(port, async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connected to portfolioDb. Current time:', result.rows[0].now);
  } catch (error) {
    console.error(' Failed to connect to portfolioDb:', error.message);
  }
  console.log(` Server running on http://localhost:${port}`);
});

// ------------------- CONTACT FORM -------------------
app.post('/api/messages', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message]
    );
    res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(' Error fetching messages:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// ------------------- ADMIN LOGIN -------------------
const ADMIN_USERS = {
  rita: 'rita123',
  rayan: 'rayan123',
};

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (ADMIN_USERS[username] && ADMIN_USERS[username] === password) {
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ------------------- BLOG -------------------
app.post('/api/blog', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    await pool.query(
      'INSERT INTO blog (title, content) VALUES ($1, $2)',
      [title, content]
    );
    res.status(201).json({ success: true, message: 'Blog post added!' });
  } catch (err) {
    console.error(' Error adding blog post:', err);
    res.status(500).json({ success: false, error: 'Failed to add blog post' });
  }
});

app.get('/api/blog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(' Failed to fetch blog posts:', err);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM blog WHERE id = $1', [blogId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog post:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await pool.query(
      'UPDATE blog SET title = $1, content = $2 WHERE id = $3',
      [title, content, id]
    );
    res.json({ success: true, message: 'Blog post updated successfully' });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// ------------------- PROJECTS -------------------
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(' Failed to fetch projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});
app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to fetch project by ID:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, description, image_url, details } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, image_url, details) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, image_url, details]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to add project:', err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1', [projectId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  const { title, description, image_url, details } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE projects SET title = $1, description = $2, image_url = $3, details = $4 WHERE id = $5 RETURNING *',
      [title, description, image_url, details, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to update project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// ------------------- ERROR HANDLING -------------------
app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.use((err, req, res, next) => {
  console.error(' Uncaught server error:', err.stack);
  res.status(500).send('Something broke!');
});
