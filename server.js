const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const notes = require('./db/db');

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

