import React, { Fragment, useState, useEffect } from "react";
import { NotesList } from "./NotesList";
import { useDispatch, useSelector} from "react-redux";
import { fetchMoreNotes } from "../../thunks/notes";
import { notesAPI } from "../../api/notes";
import { getAllNotes } from "../../selectors";


function NotesView() {
    const [notesCount, setNotesCount] = useState(0);

    const dispatch = useDispatch();

    const loadNotes = ({ startAt, pageSize }) => {
        dispatch(fetchMoreNotes({ startAt, pageSize }));
    };

    const state = useSelector(getAllNotes);

    useEffect(() => {
        notesAPI.getAllNotes().then(querySnapshot => setNotesCount(querySnapshot.size))
    }, []);

    return (
        <Fragment>
            <NotesList
                loadNotes={loadNotes}
                loading={state.loading}
                error={state.error}
                notes={state.notes}
                lastNote={state.lastNote}
                notesCount={notesCount}
                loadedToIndex={state.loadedToIndex}
            />
        </Fragment>
    );
}

export { NotesView }
