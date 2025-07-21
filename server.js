import express from 'express';
import pool from './db.js'; // adjust this if your pool is in db.js
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/api/dishes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dishes');
    console.log('Fetched dishes:', result);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching dishes');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
