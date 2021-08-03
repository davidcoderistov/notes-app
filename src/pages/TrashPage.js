import React, { Fragment } from "react";
import { markTrashedNoteAsFavorite } from "../thunks/notes";
import { getSelectedTrashNote } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function TrashPage() {
    const selectedNote = useSelector(getSelectedTrashNote);

    const dispatch = useDispatch();

    const onFavoriteClick = () => {
        if(selectedNote) {
            dispatch(markTrashedNoteAsFavorite({ noteId: selectedNote.id }))
        }
    };

    const onDeleteClick = () => {
        console.log('TrashPage/onDeleteClick()');
    };

    const onSyncClick = () => {
        console.log('TrashPage/onSyncClick()');
    };

    return (
        <Fragment>
            <NotesView status='trashed'/>
            <NoteView
                note={selectedNote}
                onFavoriteClick={onFavoriteClick}
                onDeleteClick={onDeleteClick}
                onSyncClick={onSyncClick}
            />
        </Fragment>
    );
}

export { TrashPage }
