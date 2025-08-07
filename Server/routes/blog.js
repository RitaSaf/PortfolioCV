const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { Pool } = require('pg');

const pool = new Pool();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, content, media_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO blog_posts (title, content, media_url, created_at) VALUES ($1, $2, $3, NOW())',
      [title, content, media_url]
    );
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
