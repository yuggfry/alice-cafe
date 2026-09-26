const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./database');
const { sendReservationEmail, sendOwnerNotification } = require('./email');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// ===== AUTHENTICATION ROUTES =====
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.OWNER_EMAIL && password === process.env.OWNER_PASSWORD) {
    const token = jwt.sign({ id: 'owner', email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// ===== OFFERS ROUTES =====
app.get('/api/offers', (req, res) => {
  db.all('SELECT * FROM offers ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/offers', verifyToken, (req, res) => {
  const { title, description, validUntil } = req.body;
  db.run(
    'INSERT INTO offers (title, description, validUntil) VALUES (?, ?, ?)',
    [title, description, validUntil],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID, message: 'Offer created successfully!' });
    }
  );
});

app.put('/api/offers/:id', verifyToken, (req, res) => {
  const { title, description, validUntil } = req.body;
  db.run(
    'UPDATE offers SET title = ?, description = ?, validUntil = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, validUntil, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Offer updated successfully!' });
    }
  );
});

app.delete('/api/offers/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM offers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Offer deleted successfully!' });
  });
});

// ===== MENU ROUTES =====
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items WHERE isActive = 1 ORDER BY displayOrder ASC, id ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/menu/all', verifyToken, (req, res) => {
  db.all('SELECT * FROM menu_items ORDER BY displayOrder ASC, id ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/menu', verifyToken, (req, res) => {
  const { name, description, price, category, image, displayOrder, isActive } = req.body;
  db.run(
    'INSERT INTO menu_items (name, description, price, category, image, displayOrder, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, price, category || 'Cafe', image || '', displayOrder || 0, isActive === false ? 0 : 1],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID, message: 'Menu item created successfully!' });
    }
  );
});

app.put('/api/menu/:id', verifyToken, (req, res) => {
  const { name, description, price, category, image, displayOrder, isActive } = req.body;
  db.run(
    'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ?, image = ?, displayOrder = ?, isActive = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [name, description, price, category || 'Cafe', image || '', displayOrder || 0, isActive === false ? 0 : 1, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Menu item updated successfully!' });
    }
  );
});

app.delete('/api/menu/:id', verifyToken, (req, res) => {
  db.run('DELETE FROM menu_items WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Menu item deleted successfully!' });
  });
});

// ===== RESERVATIONS ROUTES =====
app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, preferredDate, message } = req.body;

  db.run(
    'INSERT INTO reservations (name, email, phone, preferredDate, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, preferredDate, message],
    async function(err) {
      if (err) return res.status(500).json({ error: err.message });

      try {
        // Send confirmation to client
        await sendReservationEmail({ name, email, phone, preferredDate, message });
        
        // Notify owner
        await sendOwnerNotification({ name, email, phone, preferredDate, message });
        
        res.json({ 
          success: true, 
          id: this.lastID, 
          message: 'Reservation submitted! Check your email for confirmation.' 
        });
      } catch (emailErr) {
        res.json({ 
          success: true, 
          id: this.lastID, 
          message: 'Reservation submitted!',
          warning: 'Email notification could not be sent. Please call us to confirm.'
        });
      }
    }
  );
});

app.get('/api/reservations', verifyToken, (req, res) => {
  db.all('SELECT * FROM reservations ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.put('/api/reservations/:id/status', verifyToken, (req, res) => {
  const { status } = req.body;
  db.run(
    'UPDATE reservations SET status = ? WHERE id = ?',
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Reservation status updated!' });
    }
  );
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Alice Poulain Café Server running on http://localhost:${PORT}`);
  console.log('⚙️  Make sure to configure .env file with your email credentials!');
});
