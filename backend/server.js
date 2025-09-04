const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://argonztest-ds8y.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/tasks', require('./routes/tasks'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'DNX Settings API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0" ,() => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.MONGODB_URI ? 'Atlas' : 'Local'}`);
});




