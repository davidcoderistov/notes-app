import { createSlice } from "@reduxjs/toolkit";
import {
    loadAllNotes,
    loadFavoriteNotes,
    loadTrashedNotes,
    markNoteAsFavorite,
    markNoteAsTrashed,
    markFavoriteNoteAsTrashed,
    markNoteAsPending,
    markFavoriteNoteAsFavorite,
    markTrashedNoteAsFavorite,
    deleteNote,
    syncNote,
    addNote
} from "../thunks/notes";
import moment from "moment";

export const initialState = {
    all: {
        notes: [],
        totalCount: 0,
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
        markingNoteAsFavorite: false,
        markingNoteAsTrashed: false,
        isCreateDialogOpen: false,
        syncingNote: false,
        creatingNote: false,
    },
    favorites: {
        notes: [],
        totalCount: 0,
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
        markingNoteAsFavorite: false,
        markingNoteAsPending: false,
        markingNoteAsTrashed: false,
        syncingNote: false,
    },
    trash: {
        notes: [],
        totalCount: 0,
        loading: false,
        error: null,
        loadedToIndex: 0,
        selectedNote: null,
        markingNoteAsFavorite: false,
        isDeleteDialogOpen: false,
        deletingNote: false,
        syncingNote: false,
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
        setAllNotesTotalCount: (state, { payload }) => {
            const { count } = payload;
            state.all.totalCount = count;
        },
        setFavoriteNotesTotalCount: (state, { payload }) => {
            const { count } = payload;
            state.favorites.totalCount = count;
        },
        setTrashedNotesTotalCount: (state, { payload }) => {
            const { count } = payload;
            state.trash.totalCount = count;
        },
        setDeleteDialog: (state, { payload }) => {
            const { isOpen } = payload;
            state.trash.isDeleteDialogOpen = isOpen;
        },
        setCreateDialog: (state, { payload }) => {
            const { isOpen } = payload;
            state.all.isCreateDialogOpen = isOpen;
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
            removeNote(state.all, payload);
            state.all.markingNoteAsTrashed = false;
        },

        [markNoteAsTrashed.rejected]: state => {
            state.all.markingNoteAsTrashed = false;
        },

        [markFavoriteNoteAsTrashed.pending]: state => {
            state.favorites.markingNoteAsTrashed = true;
        },

        [markFavoriteNoteAsTrashed.fulfilled]: (state, { payload }) => {
            removeNote(state.favorites, payload);
            state.favorites.markingNoteAsTrashed = false;
        },

        [markFavoriteNoteAsTrashed.rejected]: state => {
            state.favorites.markingNoteAsTrashed = false;
        },

        [markNoteAsPending.pending]: state => {
            state.favorites.markingNoteAsPending = true;
        },

        [markNoteAsPending.fulfilled]: (state, { payload }) => {
            const { noteId } = payload;
            markNote(state.favorites, { noteId, status: 'pending' });
            state.favorites.markingNoteAsPending = false;
        },

        [markNoteAsPending.rejected]: state => {
            state.favorites.markingNoteAsPending = false;
        },

        [markFavoriteNoteAsFavorite.pending]: state => {
            state.favorites.markingNoteAsFavorite = true;
        },

        [markFavoriteNoteAsFavorite.fulfilled]: (state, { payload }) => {
            const { noteId } = payload;
            markNote(state.favorites, { noteId, status: 'favorite' });
            state.favorites.markingNoteAsFavorite = false;
        },

        [markFavoriteNoteAsFavorite.rejected]: state => {
            state.favorites.markingNoteAsFavorite = false;
        },

        [markTrashedNoteAsFavorite.pending]: state => {
            state.trash.markingNoteAsFavorite = true;
        },

        [markTrashedNoteAsFavorite.fulfilled]: (state, { payload }) => {
            removeNote(state.trash, payload);
            state.trash.markingNoteAsFavorite = false;
        },

        [markTrashedNoteAsFavorite.rejected]: state => {
            state.trash.markingNoteAsFavorite = false;
        },

        [deleteNote.pending]: state => {
            state.trash.deletingNote = true;
        },

        [deleteNote.fulfilled]: (state, { payload }) => {
            removeNote(state.trash, payload);
            state.trash.deletingNote = false;
            state.trash.isDeleteDialogOpen = false;
        },

        [deleteNote.rejected]: state => {
            state.trash.deletingNote = false;
            state.trash.isDeleteDialogOpen = false;
        },

        [syncNote.pending]: (state, { meta }) => {
            const { status } = meta.arg;
            const stateSlice = status === 'all' ? state.all :
                status === 'favorites' ? state.favorites :
                    state.trash;
            stateSlice.syncingNote = true;
        },

        [syncNote.fulfilled]: (state, { payload }) => {
            const { noteId, title, content, status } = payload;
            const stateSlice = status === 'all' ? state.all :
                status === 'favorites' ? state.favorites :
                    state.trash;
            stateSlice.notes = stateSlice.notes.map(note => {
                if(note.id === noteId) {
                    const updatedNote = {
                        ...note,
                        title,
                        content,
                        syncedAt: moment().format('LT on L')
                    };
                    stateSlice.selectedNote = {...updatedNote};
                    return {...updatedNote};
                }
                return note
            });
            stateSlice.syncingNote = false;
        },

        [syncNote.rejected]: (state, { payload }) => {
            const { status } = payload;
            const stateSlice = status === 'all' ? state.all :
                status === 'favorites' ? state.favorites :
                    state.trash;
            stateSlice.syncingNote = false;
        },

        [addNote.pending]: state => {
            state.all.creatingNote = true;
        },

        [addNote.fulfilled]: (state, { payload }) => {
            const { note } = payload;
            state.all.totalCount = state.all.totalCount + 1;
            state.all.notes = [{...note}, ...state.all.notes];
            state.all.selectedNote = {...note};
            state.all.creatingNote = false;
            state.all.isCreateDialogOpen = false;
        },

        [addNote.rejected]: state => {
            state.all.creatingNote = false;
            state.all.isCreateDialogOpen = false;
        },
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
        } else {
            state.selectedNote = null;
        }
    } else {
        state.notes = [...state.notes, ...notes];
        if(notes.length === 0) {
            state.selectedNote = null;
        }
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

function removeNote(state, payload) {
    const { noteId } = payload;
    state.totalCount = state.totalCount - 1;
    state.notes = state.notes.filter(note => note.id !== noteId);
    if(state.notes.length > 0) {
        state.selectedNote = {...state.notes[0]};
    } else {
        state.selectedNote = null;
    }
}

export const {
    setSelectedNote,
    setSelectedFavoriteNote,
    setSelectedTrashNote,
    setAllNotesTotalCount,
    setFavoriteNotesTotalCount,
    setTrashedNotesTotalCount,
    setDeleteDialog,
    setCreateDialog
} = notesSlice.actions;

export default notesSlice.reducer;
