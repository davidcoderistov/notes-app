import React, { Fragment } from "react";
import { getSelectedFavoriteNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function FavoritesPage() {
    const selectedNote = useSelector(getSelectedFavoriteNote);

    return (
        <Fragment>
            <NotesView status='favorite'/>
            <NoteView note={selectedNote}/>
        </Fragment>
    );
}

export { FavoritesPage }
