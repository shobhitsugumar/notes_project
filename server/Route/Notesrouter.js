const express = require("express");
const route = express.Router();
const NotesController = require("../Controller/NotesController");

route.get("/notes", NotesController.getNotes);
route.post("/notes", NotesController.uploadNotes);

route.put("/notes/:id", NotesController.updateNotes);
route.delete("/notes/:id", NotesController.deleteNotes);

module.exports = route;
