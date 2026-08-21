const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// This allows your index.html to talk to localhost:3000
app.use(cors());
app.use(express.json());

// Fake data for testing
const fellows = [
  { id: 1, name: "Telma", tier: "rookie", project: "I-NNOVA API" },
  { id: 2, name: "John", tier: "pro", project: "E-commerce Site" },
  { id: 3, name: "Amina", tier: "rookie", project: "Chat App" }
];

// Route 1: GET /fellows - get all
app.get('/fellows', (req, res) => {
  res.json(fellows);
});

// Route 2: GET /fellows/2 - get by id
app.get('/fellows/:id', (req, res) => {
  const fellow = fellows.find(f => f.id == req.params.id);
  fellow ? res.json(fellow) : res.status(404).json({ message: "Fellow not found" });
});

// Route 3: GET /fellows?tier=rookie - get by query
app.get('/fellows', (req, res) => {
  const tier = req.query.tier;
  if (tier) {
    const filtered = fellows.filter(f => f.tier === tier);
    return res.json(filtered);
  }
  res.json(fellows);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});