import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Note = (props) => {
  const { initialTitle, initialText, initialNotes } = props;

  const [title, setTitle] = useState(initialTitle || "");
  const [text, setText] = useState(initialText || "");
  const [savedNotes, setSavedNotes] = useState(initialNotes || []);

  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckAndSave = (event) => {
    event.preventDefault();
    if (!title || !text) {
      console.error("Title and text are required.");
      return;
    }
    const note = { title, content: text };
    setSavedNotes([...savedNotes, note]);
    setTitle("");
    setText("");
    titleInputRef.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleCheckAndSave}>
        <input
          type="text"
          placeholder="Nazwij swoją notatkę..."
          value={title}
          onChange={handleTitleChange}
          ref={titleInputRef}
        />
        <textarea
          placeholder="Napisz swoją notatkę..."
          value={text}
          onChange={handleContentChange}
        />
        <button type="submit">Save</button>
      </form>
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
