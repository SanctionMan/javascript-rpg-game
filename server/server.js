const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static client files
app.use(express.static(path.join(__dirname, '..', 'client')));

// Simple health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
