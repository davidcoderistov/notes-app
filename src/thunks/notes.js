import {createAsyncThunk} from "@reduxjs/toolkit";
import {notesAPI} from "../api/notes";

function parseNote(note) {
    return {
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt.seconds
    }
}

const fetchMoreNotes = createAsyncThunk(
    'notes/fetchMoreNotes',
    async ({ startAt, pageSize }) => {
        const querySnapshot = await notesAPI.fetchMoreNotes(startAt, pageSize);
        const notes = [];
        querySnapshot.forEach(doc => {
            const note = doc.data();
            notes.push(parseNote(note))
        });
        return notes;
    }
);

export { fetchMoreNotes }
