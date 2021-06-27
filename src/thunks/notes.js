import {createAsyncThunk} from "@reduxjs/toolkit";
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

const fetchMoreNotes = createAsyncThunk(
    'notes/fetchMoreNotes',
    async ({ startAt, pageSize }, { rejectWithValue }) => {
        try {
            const querySnapshot = await notesAPI.fetchMoreNotes(startAt, pageSize);
            const notes = [];
            querySnapshot.forEach(doc => {
                const note = doc.data();
                notes.push(parseNote(note))
            });
            const lastNote = querySnapshot.docs[querySnapshot.size - 1].data();
            return { notes, lastNote: parseNote(lastNote) };
        } catch(error) {
            return rejectWithValue({ error: parseError(error), pageSize });
        }
    }
);

export { fetchMoreNotes }
