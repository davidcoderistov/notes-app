import React, { Fragment } from "react";
import { markNoteAsFavorite, markNoteAsTrashed, syncNote } from "../thunks/notes";
import { getSelectedNote } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";



function NotesPage() {
    const selectedNote = useSelector(getSelectedNote);

    const dispatch = useDispatch();

    const onFavoriteClick = () => {
        if(selectedNote) {
            dispatch(markNoteAsFavorite({ noteId: selectedNote.id }));
        }
    };

    const onDeleteClick = () => {
        if(selectedNote) {
            dispatch(markNoteAsTrashed({ noteId: selectedNote.id }));
        }
    };

    const onSyncClick = (noteId, title, content) => {
        if(noteId) {
            dispatch(syncNote({
                noteId,
                title,
                content,
                status: 'all'
            }));
        }
    };

    return (
        <Fragment>
            <NotesView
                status='all'
                selectedNote={selectedNote}
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

export { NotesPage }
