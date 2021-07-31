
export const getAuth = state => state.auth;

export const getAllNotes = state => state.notes.all;

export const getFavoriteNotes = state => state.notes.favorites;

export const getTrashedNotes = state => state.notes.trash;

export const getSelectedNote = state => state.notes.all.selectedNote;

export const getSelectedFavoriteNote = state => state.notes.favorites.selectedNote;

export const getSelectedTrashNote = state => state.notes.trash.selectedNote;
