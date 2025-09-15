const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Lock CORS to your landing domains (broaden if you need local dev)
app.use(cors({
  origin: [
    "https://cardbey-landing.onrender.com",
    "https://landing.cardbey.com",
  ],
}));

app.use(express.json());

// ✅ Serve static files (unchanged)
app.use(express.static("public"));

// Routes
app.use('/api/slideshow', require('./routes/slideshow'));
app.use('/api/chat', require('./routes/chat'));   // ← NEW

// Optional health check
app.get('/', (_req, res) => res.send('Backend is alive ✅'));
app.get('/api/chat', (_req, res) => res.json({ ok: true }));   // temp GET check
app.post('/api/chat', (req, res) => res.json({ echo: req.body || null })); // temp POST echo


const PORT = process.env.PORT || 5000; // Render will set PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
