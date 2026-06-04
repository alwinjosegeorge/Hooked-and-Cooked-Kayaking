import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// Establish database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Custom security token generation algorithm to match frontend signatures
const secret = "HC_SALT_SECRET_KEY_2026";
function generateSecurityToken(id, name, route, slot, date, guests) {
  const raw = `${id}:${name}:${route}:${slot}:${date}:${guests}:${secret}`;
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    h1 = Math.imul(h1 ^ char, 2654435761);
    h2 = Math.imul(h2 ^ char, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return (part1 + part2).toUpperCase();
}

// Table schemas creation
const initializeDatabase = async () => {
  try {
    // 1. Bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(50) PRIMARY KEY,
        date VARCHAR(20) NOT NULL,
        route VARCHAR(50) NOT NULL,
        slot VARCHAR(20) NOT NULL,
        kayak_type VARCHAR(20) NOT NULL,
        guests INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL,
        payment_status VARCHAR(20) NOT NULL,
        source VARCHAR(50) NOT NULL,
        amount INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        check_in_time VARCHAR(20),
        check_in_date VARCHAR(20),
        security_token VARCHAR(50) NOT NULL
      );
    `);

    // 2. Blocked dates table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blocked_dates (
        date VARCHAR(20) PRIMARY KEY
      );
    `);

    // 3. Closed slots table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS closed_slots (
        date VARCHAR(20) NOT NULL,
        slot VARCHAR(20) NOT NULL,
        PRIMARY KEY (date, slot)
      );
    `);

    console.log("Database tables verified/created successfully.");
  } catch (error) {
    console.error("Error initializing database tables: ", error);
  }
};

// ==================== REST API ENDPOINTS ====================

// 1. Bookings APIs
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id ASC');
    const bookings = result.rows.map(row => ({
      id: row.id,
      date: row.date,
      route: row.route,
      slot: row.slot,
      kayakType: row.kayak_type,
      guests: row.guests,
      name: row.name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      paymentStatus: row.payment_status,
      source: row.source,
      amount: row.amount,
      createdAt: row.created_at,
      checkInTime: row.check_in_time,
      checkInDate: row.check_in_date,
      securityToken: row.security_token
    }));
    res.json(bookings);
  } catch (error) {
    console.error('GET /api/bookings error: ', error);
    res.status(500).json({ error: 'Database fetch error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { id, date, route, slot, kayakType, guests, name, email, phone, status, paymentStatus, source, amount } = req.body;
    const token = generateSecurityToken(id, name, route, slot, date, guests);

    const result = await pool.query(
      `INSERT INTO bookings (id, date, route, slot, kayak_type, guests, name, email, phone, status, payment_status, source, amount, security_token, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
       RETURNING *`,
      [id, date, route, slot, kayakType, guests, name, email, phone, status, paymentStatus, source, amount, token]
    );

    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      date: row.date,
      route: row.route,
      slot: row.slot,
      kayakType: row.kayak_type,
      guests: row.guests,
      name: row.name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      paymentStatus: row.payment_status,
      source: row.source,
      amount: row.amount,
      createdAt: row.created_at,
      checkInTime: row.check_in_time,
      checkInDate: row.check_in_date,
      securityToken: row.security_token
    });
  } catch (error) {
    console.error('POST /api/bookings error: ', error);
    res.status(500).json({ error: 'Database insert error' });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, checkInTime, checkInDate } = req.body;

    const result = await pool.query(
      `UPDATE bookings
       SET status = $1, payment_status = $2, check_in_time = $3, check_in_date = $4
       WHERE id = $5
       RETURNING *`,
      [status, paymentStatus, checkInTime || null, checkInDate || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const row = result.rows[0];
    res.json({
      id: row.id,
      date: row.date,
      route: row.route,
      slot: row.slot,
      kayakType: row.kayak_type,
      guests: row.guests,
      name: row.name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      paymentStatus: row.payment_status,
      source: row.source,
      amount: row.amount,
      createdAt: row.created_at,
      checkInTime: row.check_in_time,
      checkInDate: row.check_in_date,
      securityToken: row.security_token
    });
  } catch (error) {
    console.error('PUT /api/bookings error: ', error);
    res.status(500).json({ error: 'Database update error' });
  }
});

// 2. Blocked Dates APIs
app.get('/api/blocked-dates', async (req, res) => {
  try {
    const result = await pool.query('SELECT date FROM blocked_dates');
    const dates = result.rows.map(row => row.date);
    res.json(dates);
  } catch (error) {
    console.error('GET /api/blocked-dates error: ', error);
    res.status(500).json({ error: 'Database fetch error' });
  }
});

app.post('/api/blocked-dates', async (req, res) => {
  try {
    const { date } = req.body;
    await pool.query('INSERT INTO blocked_dates (date) VALUES ($1) ON CONFLICT DO NOTHING', [date]);
    res.status(201).json({ date });
  } catch (error) {
    console.error('POST /api/blocked-dates error: ', error);
    res.status(500).json({ error: 'Database insert error' });
  }
});

app.delete('/api/blocked-dates/:date', async (req, res) => {
  try {
    const { date } = req.params;
    await pool.query('DELETE FROM blocked_dates WHERE date = $1', [date]);
    res.json({ success: true, date });
  } catch (error) {
    console.error('DELETE /api/blocked-dates error: ', error);
    res.status(500).json({ error: 'Database delete error' });
  }
});

// 3. Closed Slots APIs
app.get('/api/closed-slots', async (req, res) => {
  try {
    const result = await pool.query('SELECT date, slot FROM closed_slots');
    res.json(result.rows);
  } catch (error) {
    console.error('GET /api/closed-slots error: ', error);
    res.status(500).json({ error: 'Database fetch error' });
  }
});

app.post('/api/closed-slots', async (req, res) => {
  try {
    const { date, slot } = req.body;
    await pool.query('INSERT INTO closed_slots (date, slot) VALUES ($1, $2) ON CONFLICT DO NOTHING', [date, slot]);
    res.status(201).json({ date, slot });
  } catch (error) {
    console.error('POST /api/closed-slots error: ', error);
    res.status(500).json({ error: 'Database insert error' });
  }
});

app.delete('/api/closed-slots', async (req, res) => {
  try {
    const { date, slot } = req.query;
    await pool.query('DELETE FROM closed_slots WHERE date = $1 AND slot = $2', [date, slot]);
    res.json({ success: true, date, slot });
  } catch (error) {
    console.error('DELETE /api/closed-slots error: ', error);
    res.status(500).json({ error: 'Database delete error' });
  }
});

// Initialize database tables, then startup local server listener if not in serverless runtime
if (!process.env.VERCEL) {
  initializeDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Backend API server running locally on port ${port}`);
    });
  });
} else {
  // Under Vercel Serverless environment, we initialize database checks asynchronously
  initializeDatabase();
}

export default app;
