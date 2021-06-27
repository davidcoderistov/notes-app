import { createSlice } from "@reduxjs/toolkit";
import { fetchMoreNotes } from "../thunks/notes";

export const initialState = {
    all: {
        notes: [],
        loading: false,
        error: null,
        loadedToIndex: 0,
        lastNote: null,
    },
    favorites: {
        notes: [],
        loading: false,
        error: null
    },
    trash: {
        notes: [],
        loading: false,
        error: null
    }
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMoreNotes.pending]: state => {
            state.all.loading = true;
        },

        [fetchMoreNotes.fulfilled]: (state, { payload }) => {
            const { notes, lastNote } = payload;
            state.all.notes = [...state.all.notes, ...notes];
            state.all.lastNote = lastNote;
            state.all.loadedToIndex = state.all.loadedToIndex + notes.length;
            state.all.loading = false;
        },

        [fetchMoreNotes.rejected]: (state, { payload }) => {
            const { error, pageSize } = payload;
            state.all.error = error;
            state.all.loadedToIndex = state.all.loadedToIndex + pageSize;
            state.all.loading = false;
        },
    }
});

export default notesSlice.reducer;
