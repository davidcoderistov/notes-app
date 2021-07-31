import React, { Fragment } from "react";
import { getSelectedNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";



function NotesPage() {
    const selectedNote = useSelector(getSelectedNote);

    return (
        <Fragment>
            <NotesView status='all'/>
            <NoteView note={selectedNote}/>
        </Fragment>
    );
}

export { NotesPage }
