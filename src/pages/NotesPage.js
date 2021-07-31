import React, { Fragment } from "react";
import { getSelectedNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";



function NotesPage() {
    const selectedNote = useSelector(getSelectedNote);

    const onFavoriteClick = () => {
        console.log('NotesPage/onFavoriteClick()');
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
