const PORT = process.env.PORT || 3001
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// const PORT = 3001;

const notes = require('./db/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public')); 

 function makeNewNote(body, noteArray) {
   const newNote = body;
   noteArray.push(newNote);
   fs.writeFileSync(
     path.join(__dirname, './db/db.json'),
     JSON.stringify({ notes: noteArray}, null, 2),
    
   );
   return newNote;
 } 

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // console.log(req.body);
  // res.json(req.body);
  req.body.id = notes.length.toString();
//unique ID 
  const NewNote = makeNewNote(req.body, notes);

  res.json(newNote);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

