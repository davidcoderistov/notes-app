import React, { Fragment } from "react";
import { getSelectedTrashNote } from "../selectors";
import { useSelector } from "react-redux";
import { NotesView, NoteView } from "../components/notes";


function TrashPage() {
    const selectedNote = useSelector(getSelectedTrashNote);

    return (
        <Fragment>
            <NotesView status='trashed'/>
            <NoteView note={selectedNote}/>
        </Fragment>
    );
}

export { TrashPage }
