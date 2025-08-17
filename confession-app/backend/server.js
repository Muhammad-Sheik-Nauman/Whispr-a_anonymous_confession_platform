const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Confession = require('./models/Confession'); // Import model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Routes
// POST → Add new confession
app.post('/confessions', async (req, res) => {
    try {
        const confession = new Confession({
            content: req.body.content
        });
        await confession.save();
        res.status(201).json(confession);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET → Fetch all confessions (latest first)
app.get('/confessions', async (req, res) => {
    try {
        const confessions = await Confession.find().sort({ createdAt: -1 });
        res.json(confessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));