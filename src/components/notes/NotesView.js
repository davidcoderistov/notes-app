import React, { useState, useEffect } from "react";
import { useFormValue } from "../../hooks";
import { makeStyles } from '@material-ui/core/styles';
import { NotesList } from "./NotesList";
import { NotesSearchInput } from "../common";
import { useDispatch, useSelector} from "react-redux";
import { isNonEmptyString } from "../../helpers";
import { loadNotes } from "../../thunks/notes";
import { notesAPI } from "../../api/notes";
import { getAllNotes } from "../../selectors";

const useStyles = makeStyles(() => ({
    search: {
        marginLeft: '20px',
        marginBottom: '5px'
    }
}));

function NotesView() {
    const classes = useStyles();

    const [notesCount, setNotesCount] = useState(0);

    const [listKey, setListKey] = useState(1000);

    const [searchText, handleOnSearchTextChange] = useFormValue('');

    const onSearch = () => {
        notesAPI.getAllNotesByTitle(searchText).then(querySnapshot => {
            setListKey(listKey + 1);
            setNotesCount(querySnapshot.size);
            loadMoreNotes(24, true);
        });
    };


    const dispatch = useDispatch();

    const loadMoreNotes = (pageSize, initialLoad = false) => {
        const lastNote = state.notes.length > 0 ? state.notes[state.notes.length - 1] : null;
        let startAt = 0;
        if(!initialLoad && lastNote) {
            if(isNonEmptyString(searchText)) {
                startAt = lastNote.title;
            } else {
                startAt = lastNote.createdAt;
            }
        }
        dispatch(loadNotes({ startAt, pageSize, titleQuery: searchText, initialLoad }));
    };

    const state = useSelector(getAllNotes);

    useEffect(() => {
        notesAPI.getAllNotes().then(querySnapshot => setNotesCount(querySnapshot.size));
        return () => {
            loadMoreNotes(24, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NotesSearchInput
                className={classes.search}
                value={searchText}
                onValueChange={handleOnSearchTextChange}
                onSearch={onSearch}
            />
            <NotesList
                listKey={listKey}
                loadNotes={loadMoreNotes}
                loading={state.loading}
                error={state.error}
                notes={state.notes}
                notesCount={notesCount}
                loadedToIndex={state.loadedToIndex}
            />
        </div>
    );
}

export { NotesView }
