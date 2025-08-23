const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://whispr-pearl-seven.vercel.app/"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));


app.get('/health', (req, res) => {
  res.status(200).send('ok');
});



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
    const { content, ownerToken } = req.body;
    if (!content || !ownerToken || content.trim() === '') {
      return res.status(400).json({ error: 'Content and ownerToken are required' });
    }
    const confession = new Confession({ content,ownerToken });
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
        const confessions = await Confession.find().sort({ createdAt: 1 });
        res.json(confessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/confessions/:id', async (req, res) => {
  try {
    const { ownerToken } = req.body;
    const { id } = req.params;

    const confession = await Confession.findById(id);
    if (!confession) {
      return res.status(404).json({ error: 'Confession not found' });
    }

    if (confession.ownerToken !== ownerToken) {
      return res.status(403).json({ error: 'You do not have permission to delete this confession' });
    }

    await confession.deleteOne();
    res.json({ message: `Confession with id ${id} deleted successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));