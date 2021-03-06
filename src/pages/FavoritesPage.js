import React, { Fragment } from "react";
import {markFavoriteNoteAsTrashed, markNoteAsPending, markFavoriteNoteAsFavorite, syncNote} from "../thunks/notes";
import { getSelectedFavoriteNote } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function FavoritesPage() {
    const selectedNote = useSelector(getSelectedFavoriteNote);

    const dispatch = useDispatch();

    const onFavoriteClick = () => {
        if(selectedNote) {
            handleOnFavoriteActionClick(selectedNote);
        }
    };

    const onDeleteClick = () => {
        if(selectedNote) {
            dispatch(markFavoriteNoteAsTrashed({ noteId: selectedNote.id }));
        }
    };

    const onSyncClick = (noteId, title, content) => {
        if(noteId) {
            dispatch(syncNote({
                noteId,
                title,
                content,
                status: 'favorites'
            }));
        }
    };

    const onFavoriteActionClick = note => {
        if(note) {
            handleOnFavoriteActionClick(note);
        }
    };

    const handleOnFavoriteActionClick = note => {
        if(note.status === 'favorite') {
            dispatch(markNoteAsPending({ noteId: note.id }));
        } else if(note.status === 'pending') {
            dispatch(markFavoriteNoteAsFavorite({ noteId: note.id }));
        }
    };

    return (
        <Fragment>
            <NotesView
                status='favorite'
                selectedNote={selectedNote}
                onFavoriteActionClick={onFavoriteActionClick}
            />
            <NoteView
                note={selectedNote}
                onFavoriteClick={onFavoriteClick}
                onDeleteClick={onDeleteClick}
                onSyncClick={onSyncClick}
            />
        </Fragment>
    );
}

export { FavoritesPage }
