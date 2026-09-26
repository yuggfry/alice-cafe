const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'cafe.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  // Offers & Notices table
  db.run(`
    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      validUntil DATE NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Editable menu items table
  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      category TEXT DEFAULT 'Cafe',
      image TEXT,
      displayOrder INTEGER DEFAULT 0,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO menu_items (id, name, description, price, category, image, displayOrder) VALUES
    (1, 'Espresso', 'Rich, concentrated shot of our signature blend', '$3.50', 'Coffee', '☕', 1),
    (2, 'Honey Lavender Latte', 'Espresso, steamed milk, local honey and lavender', '$6.50', 'Coffee', '🥐', 2),
    (3, 'Maple Cinnamon Latte', 'Smooth latte with maple syrup and cinnamon', '$6.50', 'Coffee', '🍰', 3),
    (4, 'Cafe Noisette', 'A touch of cream in our signature coffee', '$4.00', 'Coffee', '🥛', 4),
    (5, 'Loose Leaf Tea', 'English Breakfast, Earl Grey and Jasmine Green', '$6.50', 'Tea', '🍃', 5),
    (6, 'Fresh Orange Juice', 'Freshly squeezed, cold-pressed daily', '$6.00', 'Juice', '🥤', 6)
  `);

  // Newsletter Subscribers table
  db.run(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      subscribedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isActive BOOLEAN DEFAULT 1
    )
  `);

  // Reservations table
  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      preferredDate DATE,
      message TEXT,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Newsletter Messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS newsletters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      recipientCount INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
