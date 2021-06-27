import {createAsyncThunk} from "@reduxjs/toolkit";
import { isNonEmptyString } from "../helpers";
import {notesAPI} from "../api/notes";

function parseNote(note) {
    return {
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: {
            seconds: note.createdAt.seconds,
            nanoseconds: note.createdAt.nanoseconds
        }
    }
}

function parseError(error) {
    return {
        code: error.code,
        message: error.message
    }
}

const loadNotes = createAsyncThunk(
    'notes/fetchMoreNotes',
    async ({ startAt, pageSize, titleQuery = '', initialLoad = false }, { rejectWithValue }) => {
        try {
            let querySnapshot;
            if(isNonEmptyString(titleQuery)) {
                querySnapshot = await notesAPI.searchByTitle(titleQuery, startAt, pageSize);
            } else {
                querySnapshot = await notesAPI.loadNotes(startAt, pageSize);
            }
            const notes = [];
            querySnapshot.forEach(doc => {
                const note = doc.data();
                notes.push(parseNote(note))
            });
            return { notes, initialLoad };
        } catch(error) {
            return rejectWithValue({ error: parseError(error), pageSize });
        }
    }
);

export { loadNotes }
