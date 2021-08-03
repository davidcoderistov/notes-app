
export const getAuth = state => state.auth;

export const getAllNotes = state => state.notes.all;

export const getFavoriteNotes = state => state.notes.favorites;

export const getTrashedNotes = state => state.notes.trash;

export const getSelectedNote = state => state.notes.all.selectedNote;

export const getSelectedFavoriteNote = state => state.notes.favorites.selectedNote;

export const getSelectedTrashNote = state => state.notes.trash.selectedNote;

export const getAllNotesCount = state => state.notes.all.totalCount;

export const getFavoriteNotesCount = state => state.notes.favorites.totalCount;

export const getTrashedNotesCount = state => state.notes.trash.totalCount;

export const getDeleteDialogValue = state => state.notes.trash.isDeleteDialogOpen;

export const getIsDeletingNote = state => state.notes.trash.deletingNote;
