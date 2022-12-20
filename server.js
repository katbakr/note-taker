const PORT = process.env.PORT || 3001;

// dependencies =================================================================================================
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
// const PORT = 3001;


//setting up express app and format as JSON ====================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//assets =======================================================================================================
app.use(express.static("public"));

const notes = require("./db/db.json");

//slice method returns selected element(s) of array ============================================================
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

//path to notes.html ===========================================================================================
app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})
//path to index.html============================================================================================
// * all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//function for making a new note, called in post ==============================================================
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
//POST for new notes ==========================================================================================
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
//function to delete note called in app.delete ===============================================================
function deleteNote(id, noteArray) {
  //loop to find note
  for (let i = 0; i < noteArray.length; i++) {
    let note = noteArray[i];
//splice note out of array
    if (note.id == id) {
      noteArray.splice(i, 1);
      //write without deleted note
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(noteArray, null, 2)
      );
    }
  }
};

app.delete("/api/notes/:id", (req,res) => {
  deleteNote(req.params.id, notes);
  res.json(true)
});

//listen and console log so user knows server is running ====================================================
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
