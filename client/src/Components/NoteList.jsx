import React from "react";

const NoteList = ({ notes, onEditNotes, onDeleteNotes }) => {
  return (
    <ul>
      {notes.map((notes) => (
        <li key={notes.id}>
          <strong>{notes.title}</strong>
          <p>{notes.content}</p>

          <button
            className="button2"
            style={{ marginRight: "15px" }}
            onClick={() =>
              onEditNotes(
                notes._id,
                prompt("enter the title", notes.title),
                prompt("enter updated content", notes.content)
              )
            }
          >
            Edit
          </button>
          <button className="button2" onClick={() => onDeleteNotes(notes._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
