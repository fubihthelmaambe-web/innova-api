const express = require('express');
const app = express();
const PORT = 3000;

// Hardcoded data
const fellows = [
  { id: 1, name: "Thelma", tier: "rookie" },
  { id: 2, name: "Joy", tier: "pro" },
  { id: 3, name: "Ajang", tier: "rookie" },
  { id: 4, name: "Grace", tier: "expert" }
];

// 1. GET all fellows OR filter by query string ?tier=rookie
app.get('/fellows', (req, res) => {
  const tier = req.query.tier;
  if (tier) {
    const filtered = fellows.filter(f => f.tier === tier);
    return res.json(filtered); // use return so it stops here
  }
  res.json(fellows); // if no query, return all
});

// 2. GET fellow by ID - route parameter :id
app.get('/fellows/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fellow = fellows.find(f => f.id === id);
  if (fellow) {
    res.json(fellow);
  } else {
    res.status(404).json({ error: "Fellow not found" });
  }
});

// 3. Extra route example
app.get('/about', (req, res) => {
  res.json({ message: "I-NNOVA KICKSTARTER API" });
});

// 4. Root route so / doesn't give error
app.get('/', (req, res) => {
  res.json({ message: "Welcome to I-NNOVA API. Try /fellows" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});