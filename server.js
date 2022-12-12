const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

const notes = require('./db/db');

app.get('/api/notes', (req, res => {
    res.json(notes);
}))

app.listen(3001, () =>
  console.log('Server listening on port 3001!'),
);