import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Note = (props) => {
  const { initialTitle, initialText, initialNotes } = props;

  const [title, setTitle] = useState(initialTitle || "");
  const [text, setText] = useState(initialText || "");
  const [savedNotes, setSavedNotes] = useState(initialNotes || []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckAndSave = () => {
    if (!title || !text) {
      console.error("Title and text are required.");
      return;
    }
    const note = { title, content: text };
    setSavedNotes([...savedNotes, note]);
    setTitle("");
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nazwij swoją notatkę..."
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        placeholder="Napisz swoją notatkę..."
        value={text}
        onChange={handleContentChange}
      />
      <button onClick={handleCheckAndSave}>Save</button>
      <div className="saved-notes">
        {savedNotes.map((note, index) => (
          <div key={index} className="saved-note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Note.propTypes = {
  initialTitle: PropTypes.string,
  initialText: PropTypes.string,
  initialNotes: PropTypes.array,
};

export default Note;
