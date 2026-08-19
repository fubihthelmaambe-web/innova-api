const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Hardcoded data
const fellows = [
  { id: 1, name: "Thelma", tier: "rookie" },
  { id: 2, name: "Joy", tier: "pro" },
  { id: 3, name: "Anjang", tier: "rookie" },
  { id: 4, name: "Grace", tier: "expert" }
];

// Serve the HTML page at /
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>I-NNOVA API Demo</title>
      <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        button { padding: 10px 15px; margin: 5px; cursor: pointer; border: 1px solid #333; border-radius: 5px; }
        pre { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ccc; }
      </style>
    </head>
    <body>
      <h1>I-NNOVA KICKSTARTER API</h1>
      <p>Server is running on localhost:3000</p>
      
      <button onclick="getAll()">GET /fellows</button>
      <button onclick="getById(2)">GET /fellows/2</button>
      <button onclick="getByTier('rookie')">GET /fellows?tier=rookie</button>

      <h3>Result:</h3>
      <pre id="result">Click a button to test the API</pre>

      <script>
        const API = ''; // empty because it's same server

        async function getAll() {
          const res = await fetch(API + '/fellows');
          const data = await res.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }

        async function getById(id) {
          const res = await fetch(API + '/fellows/' + id);
          const data = await res.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }

        async function getByTier(tier) {
          const res = await fetch(API + '/fellows?tier=' + tier);
          const data = await res.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

// API ROUTES
app.get('/fellows', (req, res) => {
  const tier = req.query.tier;
  if (tier) {
    const filtered = fellows.filter(f => f.tier === tier);
    return res.json(filtered);
  }
  res.json(fellows);
});

app.get('/fellows/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fellow = fellows.find(f => f.id === id);
  if (fellow) {
    res.json(fellow);
  } else {
    res.status(404).json({ error: "Fellow not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});