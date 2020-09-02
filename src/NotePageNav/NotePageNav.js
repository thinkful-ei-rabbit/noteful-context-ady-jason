import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotePageMainContext from '../NotePageMainContext'
import { findNote, findFolder } from '../notes-helpers';
import { render } from 'enzyme'

export default class NotePageNav extends Component {
  static contextType = NotePageMainContext;

  render() {
    const { folders, notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
        <div className='NotePageNav'>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => this.context.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
    )
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
