const PORT = process.env.PORT || 3001;

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
// const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const notes = require("./db/db.json");

app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });
app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// * all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function makeNewNote(body, noteArray) {
  const newNote = body;
  if (!Array.isArray(noteArray)) noteArray = [];

  if (noteArray.length === 0) noteArray.push(0);
  //new id for notes
  body.id = noteArray[0];
  noteArray[0]++;

  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    //  JSON.stringify({ notes: noteArray}, null, 2),
    JSON.stringify(notes, null, 2)
  );
  return newNote;
}

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// });

app.post("/api/notes", (req, res) => {
  // console.log(req.body);
  // res.json(req.body);
  // req.body.id = notes.length.toString();
  //unique ID
  const newNote = makeNewNote(req.body, notes);

  res.json(newNote);
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/notes.html'));
// })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
