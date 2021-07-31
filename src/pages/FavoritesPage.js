import React, { Fragment } from "react";
import { getSelectedFavoriteNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function FavoritesPage() {
    const selectedNote = useSelector(getSelectedFavoriteNote);

    const onFavoriteClick = () => {
        console.log('FavoritesPage/onFavoriteClick()');
    };

    const onDeleteClick = () => {
        console.log('FavoritesPage/onDeleteClick()');
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
