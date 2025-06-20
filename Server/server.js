const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfoliodb',
  password: '0000',
  port: 5432
});


app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// we did this to see if we are connected succefully to portfoliodb
app.listen(port, async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected to portfolioDb. Current time:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Failed to connect to portfolioDb:', error.message);
  }

  console.log(`Server running on http://localhost:${port}`);
});

