import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NoteList from "./Components/NoteList";
import AddNote from "./Components/AddNote";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes")
      .then((response) => setNotes(response.data.data))
      .catch((error) => console.error("Error fetching notes", error));
  }, []);

  //for adding new note data in to the post
  // we are doing inside the function because when we click the button this function will be called and it will get fetched
  const handleAddNote = () => {
    axios
      .post("http://localhost:5000/api/notes", {
        title,
        content,
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Error adding note", error));
  };

  //update the note

  const handleUpdate = (id, updatedTitle, updatedContent) => {
    axios
      .put(`http://localhost:5000/api/notes/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      })
      .then((response) => {
        const updatedNotes = notes.map((note) =>
          note._id === id ? response.data.data : note
        );

        setNotes(updatedNotes);
      })
      .catch((error) => console.log("Error updating note", error));
  };

  //deleting the notes
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`)
      .then((response) => {
        console.log(response);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => console.log("Error Deleting notes", error));
  };

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      <AddNote
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onAddNote={handleAddNote}
      />
      <NoteList
        notes={notes}
        onEditNotes={handleUpdate}
        onDeleteNotes={handleDelete}
      />
    </div>
  );
}

export default App;
