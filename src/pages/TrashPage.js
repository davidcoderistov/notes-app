import React, { Fragment } from "react";
import { getSelectedTrashNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function TrashPage() {
    const selectedNote = useSelector(getSelectedTrashNote);

    const onFavoriteClick = () => {
        console.log('TrashPage/onFavoriteClick()');
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
