import React from 'react';

const NotePageMainContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {}
})

export default NotePageMainContext;