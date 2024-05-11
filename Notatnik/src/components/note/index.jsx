import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import languages from '../../assets/language.json';
import './style.scss';

const Note = ({ initialTitle = '', initialText = '', initialNotes = [] }) => {
  const [language, setLanguage] = useState('pl');
  const [theme, setTheme] = useState('dark');
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [savedNotes, setSavedNotes] = useState(initialNotes);

  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'pl' : 'en');
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);

  const handleCheckAndSave = (event) => {
    event.preventDefault();
    if (!title.trim() || !text.trim()) {
      console.error("Both title and text are required for a note.");
      return;
    }
    const note = { title, content: text };
    setSavedNotes(prevNotes => [...prevNotes, note]);
    setTitle('');
    setText('');
    titleInputRef.current.focus();
  };

  return (
    <div className="note-container">
      <div className="header">
        <button onClick={toggleLanguage}>{languages[language].switchLanguage}</button>
        <button onClick={toggleTheme}>{languages[language].toggleTheme}</button>
      </div>
      <form onSubmit={handleCheckAndSave} className="note-form">
        <input
          type="text"
          className="title-input"
          placeholder={languages[language].noteTitlePlaceholder}
          value={title}
          onChange={handleTitleChange}
          ref={titleInputRef}
        />
        <textarea
          className="text-input"
          placeholder={languages[language].noteContentPlaceholder}
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit" className="save-button">{languages[language].saveButton}</button>
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
  initialNotes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })),
};

export default Note;
