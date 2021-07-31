import React, { Fragment } from "react";
import { markNoteAsFavorite } from "../thunks/notes";
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
        console.log('NotesPage/onDeleteClick()');
    };

    const onSyncClick = () => {
        console.log('NotesPage/onSyncClick()');
    };

    return (
        <Fragment>
            <NotesView status='all'/>
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
