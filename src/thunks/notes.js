import {createAsyncThunk} from "@reduxjs/toolkit";
import { isNonEmptyString } from "../helpers";
import {notesAPI} from "../api/notes";

function parseNote(note) {
    return {
        id: note.id,
        title: note.title,
        content: note.content,
        status: note.status,
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

const loadAllNotes = createAsyncThunk(
    'notes/loadAllNotes',
    async ({ startAt, pageSize, titleQuery = '', initialLoad = false }, { rejectWithValue }) => {
        try {
            let querySnapshot;
            if(isNonEmptyString(titleQuery)) {
                querySnapshot = await notesAPI.searchAllNotesByTitle(titleQuery, startAt, pageSize);
            } else {
                querySnapshot = await notesAPI.loadAllNotes(startAt, pageSize);
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

const loadFavoriteNotes = createAsyncThunk(
    'notes/loadFavoriteNotes',
    async ({ startAt, pageSize, titleQuery = '', initialLoad = false }, { rejectWithValue }) => {
        try {
            let querySnapshot;
            if(isNonEmptyString(titleQuery)) {
                querySnapshot = await notesAPI.searchFavoriteNotesByTitle(titleQuery, startAt, pageSize);
            } else {
                querySnapshot = await notesAPI.loadFavoriteNotes(startAt, pageSize);
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

const loadTrashedNotes = createAsyncThunk(
    'notes/loadTrashedNotes',
    async ({ startAt, pageSize, titleQuery = '', initialLoad = false }, { rejectWithValue }) => {
        try {
            let querySnapshot;
            if(isNonEmptyString(titleQuery)) {
                querySnapshot = await notesAPI.searchTrashedNotesByTitle(titleQuery, startAt, pageSize);
            } else {
                querySnapshot = await notesAPI.loadTrashedNotes(startAt, pageSize);
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

const markNoteAsFavorite = createAsyncThunk(
    'notes/markNoteAsFavorite',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsFavorite(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

const markNoteAsTrashed = createAsyncThunk(
    'notes/markNoteAsTrashed',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsTrashed(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

const markFavoriteNoteAsTrashed = createAsyncThunk(
    'notes/markFavoriteNoteAsTrashed',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsTrashed(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

const markNoteAsPending = createAsyncThunk(
    'notes/markNoteAsPending',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsPending(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

const markFavoriteNoteAsFavorite = createAsyncThunk(
    'notes/markFavoriteNoteAsFavorite',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsFavorite(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

const markTrashedNoteAsFavorite = createAsyncThunk(
    'notes/markTrashedNoteAsFavorite',
    async ({ noteId }, { rejectWithValue }) => {
        try {
            await notesAPI.markNoteAsFavorite(noteId);
            return { noteId };
        } catch(error) {
            return rejectWithValue({ error: parseError(error) });
        }
    }
);

export {
    loadAllNotes,
    loadFavoriteNotes,
    loadTrashedNotes,
    markNoteAsFavorite,
    markNoteAsTrashed,
    markFavoriteNoteAsTrashed,
    markNoteAsPending,
    markFavoriteNoteAsFavorite,
    markTrashedNoteAsFavorite
}
