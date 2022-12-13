const express = require('express');

const app = express();
const PORT = 3001;

const notes = require('./db/db');

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});