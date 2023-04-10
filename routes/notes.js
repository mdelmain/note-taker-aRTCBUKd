const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  writeToFile,
  appendToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving the notes
router.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
router.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    appendToFile("./db/db.json", newNote);

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

// DELETE Route for retrieving the notes
router.delete("/:id", async (req, res) => {
  const noteId = req.params.id;
  const data = await readFromFile("./db/db.json");
  const json = JSON.parse(data);
  const result = json.map((e) => e.id).indexOf(noteId);
  console.log(noteId);
  console.log(result);
  json.splice(result, 1);
  writeToFile("./db/db.json", json);

  const response = {
    status: "success",
  };

  res.json(response);
});

module.exports = router;
