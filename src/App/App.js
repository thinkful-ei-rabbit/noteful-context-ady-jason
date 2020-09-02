import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotePageMainContext from '../NotePageMainContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
      Promise.all([
        fetch('http://localhost:9090/folders'),
        fetch('http://localhost:9090/notes')
      ]).then(([foldersResults, notesResults]) => {
        if(!foldersResults.ok) {
          return Promise.reject()
        }
        if(!notesResults.ok) {
          return Promise.reject()
        }
        return Promise.all([foldersResults.json(), notesResults.json()])
      })
        .then(([folders, notes]) => {
          this.setState({notes, folders})
        })
    }

    handleDeleteNote = (noteId) => {
      fetch(`http://localhost:1234/foo/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then (
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        })
      )
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {
        return (
            <NotePageMainContext.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders,
                deleteNote: this.handleDeleteNote
            }}>
              <div className="App">
                  <nav className="App__nav">{this.renderNavRoutes()}</nav>
                  <header className="App__header">
                      <h1>
                          <Link to="/">Noteful</Link>{' '}
                          <FontAwesomeIcon icon="check-double" />
                      </h1>
                  </header>
                  <main className="App__main">{this.renderMainRoutes()}</main>
              </div>
            </NotePageMainContext.Provider>
        );
    }
}

export default App;
