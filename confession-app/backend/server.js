const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://whispr-by-nauman.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));


app.get('/healthz', (req, res) => {
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


// Add 
app.post('/confessions', async (req, res) => {
  try {
    const { content, ownerToken } = req.body;
    if (!content || !ownerToken || content.trim() === '') {
      return res.status(400).json({ error: 'Content and ownerToken are required' });
    }
    const confession = new Confession({ content, ownerToken });
    await confession.save();
    res.status(201).json(confession);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

//get 
app.get('/confessions', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: 1 });
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete
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


//like
app.post("/confessions/:id/like", async (req, res) => {
  const { ownerToken } = req.body; // must send ownerToken

  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });


    if (confession.likedBy.includes(ownerToken)) {
      confession.likedBy = confession.likedBy.filter(t => t !== ownerToken);
    } else {
      confession.likedBy.push(ownerToken);
    }

    confession.likes = confession.likedBy.length;
    await confession.save();

    res.json({
      message: confession.likedBy.includes(ownerToken) ? "Liked!" : "Like removed",
      likes: confession.likes,
      likedBy: confession.likedBy
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//report

app.post("/confessions/:id/report", async (req, res) => {
  const { ownerToken } = req.body;

  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });

    if (confession.reportedBy.includes(ownerToken)) {
      return res.status(400).json({ message: "You have already reported this confession" });
    }

    confession.reportedBy.push(ownerToken);
    confession.reports = confession.reportedBy.length;

    // Auto delete after 15 reports
    if (confession.reports >= 15) {
      await Confession.findByIdAndDelete(req.params.id);
      return res.json({ message: "Confession deleted due to multiple reports" });
    }

    await confession.save();
    res.json({ message: "Confession reported successfully", reports: confession.reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//edit
app.put("/confessions/:id", async (req, res) => {
  const { content, ownerToken } = req.body;

  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });

    if (confession.ownerToken !== ownerToken) {
      return res.status(403).json({ message: "You cannot edit this confession" });
    }

    confession.content = content;
    await confession.save();

    res.json({ message: "Confession updated", confession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));