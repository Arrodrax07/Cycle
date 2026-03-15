require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elite-cycling')
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

const User = require('./models/User');
const Slot = require('./models/Slot');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    const adminEmail = 'admin@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await new User({
        name: 'Elite Admin',
        email: adminEmail,
        phone: '9082943365',
        password: hashedPassword,
        role: 'admin'
      }).save();
      console.log('Admin user seeded: admin@gmail.com / admin123');
    }

    // Seed dummy slots for today and next few days if empty
    const count = await Slot.countDocuments();
    if (count === 0) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      
      await Slot.insertMany([
        { date: dateStr, slot: 'Standard Edition', totalSlots: 10, bookedSlots: 0 },
        { date: dateStr, slot: 'Premium Performance', totalSlots: 10, bookedSlots: 0 }
      ]);
      console.log('Sample slots seeded');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

// Routes
console.log('Mounting routes...');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/slots', require('./routes/slots'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/reviews', require('./routes/reviews'));
console.log('Routes mounted: auth, bookings, slots, admin, reviews');

// API Status Version should match server version
app.get('/api/health', (req, res) => res.json({ status: 'active', version: '1.3.1', timestamp: new Date() }));

// Root endpoint
app.get('/', (req, res) => res.send(`Elite BMW Cycling API v1.3.1 [Port 5001] - Last Updated: ${new Date().toLocaleString()} - Code Status: Operational`));

// Custom 404 Catch-all with logging
app.use((req, res) => {
  console.log(`Elite API 404 - [${req.method}] ${req.url} - (Path not found)`);
  res.status(404).json({ 
    message: 'Route not found in Elite API', 
    requestedUrl: req.originalUrl,
    hint: 'Check your route mounting in server.js'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

