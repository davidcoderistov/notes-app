import { createSlice } from "@reduxjs/toolkit";
import { loadNotes } from "../thunks/notes";

export const initialState = {
    all: {
        notes: [],
        loading: false,
        error: null,
        loadedToIndex: 0,
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
        [loadNotes.pending]: state => {
            state.all.loading = true;
        },

        [loadNotes.fulfilled]: (state, { payload }) => {
            const { notes, initialLoad } = payload;
            if(initialLoad) {
                state.all.notes = notes;
                state.all.loadedToIndex = 0;
            } else {
                state.all.notes = [...state.all.notes, ...notes];
            }
            state.all.loadedToIndex = state.all.loadedToIndex + notes.length;
            state.all.loading = false;
        },

        [loadNotes.rejected]: (state, { payload }) => {
            const { error, pageSize } = payload;
            state.all.error = error;
            state.all.loadedToIndex = state.all.loadedToIndex + pageSize;
            state.all.loading = false;
        },
    }
});

export default notesSlice.reducer;
