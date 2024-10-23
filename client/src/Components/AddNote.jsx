import React from "react";

const AddNote = ({ title, setTitle, setContent, content, onAddNote }) => {
  return (
    <div>
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="button1" onClick={onAddNote}>
        AddNote
      </button>
    </div>
  );
};
export default AddNote;
