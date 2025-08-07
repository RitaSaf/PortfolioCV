const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { Pool } = require('pg');

const pool = new Pool();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, description, github_link, youtube_embed, image_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO projects (title, description, github_link, youtube_embed, image_url, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [title, description, github_link, youtube_embed, image_url]
    );
    res.status(201).json({ message: 'Project added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
