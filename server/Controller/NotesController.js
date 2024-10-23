const Notes = require("../model/Notesschema");

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    const notes = new Notes({ title, content });
    const newNotes = await notes.save();
    return res.status(201).json(newNotes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const noteId = req.params.id; // Extract the note ID from the request parameters
    const deletedNote = await Notes.findByIdAndDelete(noteId); // Attempt to delete the note

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" }); // Return 404 if the note does not exist
    }

    return res.status(204).send(); // Successfully deleted, return no content
  } catch (error) {
    console.error("Error deleting note:", error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" }); // Return a generic error message
  }
};

const updateNotes = async (req, res) => {
  try {
    const noteid = req.params.id;
    console.log(noteid);
    const { title, content } = req.body;
    console.log("title", title, content);
    const updatedNotes = await Notes.findByIdAndUpdate(
      noteid,
      {
        title,
        content,
      },
      { new: true, runValidators: true }
    );

    if (!updatedNotes) {
      return res.status(404).json({ success: false, message: "not found" });
    }
    console.log(updatedNotes);
    return res.status(200).json({ success: true, data: updatedNotes });
  } catch (error) {
    res.status(404).json({ message: "Note not found" });
  }
};

module.exports = {
  getNotes,
  uploadNotes,
  updateNotes,
  deleteNotes,
};
