import { createSlice } from "@reduxjs/toolkit";
import { fetchMoreNotes } from "../thunks/notes";

export const initialState = {
    all: {
        notes: [],
        loading: false,
        error: null
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
            state.all.notes = payload;
            state.all.loading = false;
        },

        [fetchMoreNotes.rejected]: (state, { error }) => {
            state.all.error = error;
            state.all.loading = false;
        },
    }
});

export default notesSlice.reducer;
