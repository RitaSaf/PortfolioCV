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
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.listen(port, async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected to portfolioDb. Current time:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Failed to connect to portfolioDb:', error.message);
  }
  console.log(`Server running on http://localhost:${port}`);
});

console.log('Attempting to register POST /api/messages route...'); 
app.post('/api/messages', async (req, res) => {
  console.log('>>> Received a POST request to /api/messages <<<');
  console.log('Request body:', req.body);

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
    console.error('Error saving message to DB:', err);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

app.use((req, res, next) => {
  res.status(404).send('Sorry, that resource was not found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});