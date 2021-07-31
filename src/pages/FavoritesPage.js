import React, { Fragment } from "react";
import { markFavoriteNoteAsTrashed } from "../thunks/notes";
import { getSelectedFavoriteNote } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function FavoritesPage() {
    const selectedNote = useSelector(getSelectedFavoriteNote);

    const dispatch = useDispatch();

    const onFavoriteClick = () => {};

    const onDeleteClick = () => {
        if(selectedNote) {
            dispatch(markFavoriteNoteAsTrashed({ noteId: selectedNote.id }));
        }
    };

    const onSyncClick = () => {
        console.log('FavoritesPage/onSyncClick()');
    };

    return (
        <Fragment>
            <NotesView status='favorite'/>
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
