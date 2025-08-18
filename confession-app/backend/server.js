const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));


const Confession = require('./models/Confession'); // Import model



// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));


// Add new confession
app.post('/confessions', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Content is required' });
    }
    const confession = new Confession({ content });
    await confession.save();
    res.status(201).json(confession);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

//huhuhuhu
//Fetch all confessions
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