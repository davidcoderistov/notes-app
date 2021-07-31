import { createSlice } from "@reduxjs/toolkit";
import {
    loadAllNotes,
    loadFavoriteNotes,
    loadTrashedNotes,
    markNoteAsFavorite,
    markNoteAsTrashed
} from "../thunks/notes";

export const initialState = {
    all: {
        notes: [],
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
        markingNoteAsFavorite: false,
        markingNoteAsTrashed: false,
    },
    favorites: {
        notes: [],
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
    },
    trash: {
        notes: [],
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
    }
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setSelectedNote: (state, { payload }) => {
            const { note } = payload;
            state.all.selectedNote = note;
        },
        setSelectedFavoriteNote: (state, { payload }) => {
            const { note } = payload;
            state.favorites.selectedNote = note;
        },
        setSelectedTrashNote: (state, { payload }) => {
            const { note } = payload;
            state.trash.selectedNote = note;
        },
    },
    extraReducers: {
        [loadAllNotes.pending]: state => {
            onLoadNotesLoading(state.all);
        },

        [loadAllNotes.fulfilled]: (state, { payload }) => {
            onLoadNotesSuccess(state.all, payload);
        },

        [loadAllNotes.rejected]: (state, { payload }) => {
            onLoadNotesError(state.all, payload);
        },

        [loadFavoriteNotes.pending]: state => {
            onLoadNotesLoading(state.favorites);
        },

        [loadFavoriteNotes.fulfilled]: (state, { payload }) => {
            onLoadNotesSuccess(state.favorites, payload);
        },

        [loadFavoriteNotes.rejected]: (state, { payload }) => {
            onLoadNotesError(state.favorites, payload);
        },

        [loadTrashedNotes.pending]: state => {
            onLoadNotesLoading(state.trash);
        },

        [loadTrashedNotes.fulfilled]: (state, { payload }) => {
            onLoadNotesSuccess(state.trash, payload);
        },

        [loadTrashedNotes.rejected]: (state, { payload }) => {
            onLoadNotesError(state.trash, payload);
        },

        [markNoteAsFavorite.pending]: state => {
            state.all.markingNoteAsFavorite = true;
        },

        [markNoteAsFavorite.fulfilled]: (state, { payload }) => {
            const { noteId } = payload;
            markNote(state.all, { noteId, status: 'favorite' });
            state.all.markingNoteAsFavorite = false;
        },

        [markNoteAsFavorite.rejected]: state => {
            state.all.markingNoteAsFavorite = false;
        },

        [markNoteAsTrashed.pending]: state => {
            state.all.markingNoteAsTrashed = true;
        },

        [markNoteAsTrashed.fulfilled]: (state, { payload }) => {
            const { noteId } = payload;
            markNote(state.all, { noteId, status: 'trashed' });
            state.all.markingNoteAsTrashed = true;
        },

        [markNoteAsTrashed.rejected]: state => {
            state.all.markingNoteAsTrashed = true;
        }
    }
});

function onLoadNotesLoading(state) {
    state.loading = true;
}

function onLoadNotesSuccess(state, payload) {
    const { notes, initialLoad } = payload;
    if(initialLoad) {
        state.notes = notes;
        state.loadedToIndex = 0;
        if(notes.length > 0) {
            state.selectedNote = {...notes[0]}
        }
    } else {
        state.notes = [...state.notes, ...notes];
    }
    state.loadedToIndex = state.loadedToIndex + notes.length;
    state.loading = false;
}

function onLoadNotesError(state, payload) {
    const { error, pageSize } = payload;
    state.error = error;
    state.loadedToIndex = state.loadedToIndex + pageSize;
    state.loading = false;
    state.selectedNote = null;
}

function markNote(state, payload) {
    const { noteId, status } = payload;
    state.notes = state.notes.map(note => {
        if(note.id === noteId) {
            return {
                ...note,
                status
            };
        }
        return note;
    });
}

export const { setSelectedNote, setSelectedFavoriteNote, setSelectedTrashNote } = notesSlice.actions;

export default notesSlice.reducer;
