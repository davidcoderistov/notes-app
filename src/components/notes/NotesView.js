import React, { useState, useEffect } from "react";
import { useFormValue } from "../../hooks";
import { makeStyles } from '@material-ui/core/styles';
import { NotesList } from "./NotesList";
import { NotesSearchInput } from "../common";
import { useDispatch, useSelector} from "react-redux";
import { isNonEmptyString } from "../../helpers";
import {
    loadAllNotes,
    loadFavoriteNotes,
    loadTrashedNotes
} from "../../thunks/notes";
import { notesAPI } from "../../api/notes";
import { getAllNotes } from "../../selectors";

const useStyles = makeStyles(() => ({
    search: {
        marginLeft: '20px',
        marginBottom: '5px'
    }
}));

function NotesView({status}) {
    const classes = useStyles();

    const [notesCount, setNotesCount] = useState(0);

    const [listKey, setListKey] = useState(1000);

    const [searchText, handleOnSearchTextChange] = useFormValue('');

    const dispatch = useDispatch();

    const state = useSelector(getAllNotes);

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
        if(status === 'favorite') {
            dispatch(loadFavoriteNotes({ startAt, pageSize, titleQuery: searchText, initialLoad }));
        } else if(status === 'trashed') {
            dispatch(loadTrashedNotes({ startAt, pageSize, titleQuery: searchText, initialLoad }));
        } else {
            dispatch(loadAllNotes({ startAt, pageSize, titleQuery: searchText, initialLoad }));
        }
    };

    const onNotesCounted = querySnapshot => {
        setListKey(listKey + 1);
        setNotesCount(querySnapshot.size);
        loadMoreNotes(24, true);
    };


    const onSearch = () => {
        if(status === 'favorite') {
            notesAPI.getFavoriteNotesByTitle(searchText).then(onNotesCounted);
        } else if(status === 'trashed') {
            notesAPI.getTrashedNotesByTitle(searchText).then(onNotesCounted);
        } else {
            notesAPI.getAllNotesByTitle(searchText).then(onNotesCounted);
        }
    };

    useEffect(() => {
        if(status === 'favorite') {
            notesAPI.getFavoriteNotes().then(onNotesCounted);
        } else if(status === 'trashed') {
            notesAPI.getTrashedNotes().then(onNotesCounted);
        } else {
            notesAPI.getAllNotes().then(onNotesCounted);
        }
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
