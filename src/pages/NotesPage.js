import React, { Fragment } from "react";
import { markNoteAsFavorite, markNoteAsTrashed, syncNote, addNote } from "../thunks/notes";
import { setCreateDialog } from "../slices/notes";
import { getSelectedNote, getCreateDialogValue, getIsCreatingNote } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { NotesView, NoteView, CreateNoteModal } from "../components/notes";


function NotesPage() {
    const selectedNote = useSelector(getSelectedNote);
    const open = useSelector(getCreateDialogValue);
    const isCreatingNote = useSelector(getIsCreatingNote);

    const dispatch = useDispatch();

    const onFavoriteClick = () => {
        if(selectedNote) {
            dispatch(markNoteAsFavorite({ noteId: selectedNote.id }));
        }
    };

    const onDeleteClick = () => {
        if(selectedNote) {
            dispatch(markNoteAsTrashed({ noteId: selectedNote.id }));
        }
    };

    const onSyncClick = (noteId, title, content) => {
        if(noteId) {
            dispatch(syncNote({
                noteId,
                title,
                content,
                status: 'all'
            }));
        }
    };

    const onCreateClick = () => {
        dispatch(setCreateDialog({ isOpen: true }));
    };

    const handleCreateNote = (title, content) => {
        dispatch(addNote({ title, content }));
    };

    const handleCloseModal = () => {
        dispatch(setCreateDialog({ isOpen: false }));
    };

    return (
        <Fragment>
            <NotesView
                status='all'
                selectedNote={selectedNote}
            />
            <NoteView
                note={selectedNote}
                onFavoriteClick={onFavoriteClick}
                onDeleteClick={onDeleteClick}
                onSyncClick={onSyncClick}
                onCreateClick={onCreateClick}
                shouldShowAddNewNote
            />
            <CreateNoteModal
                open={open}
                handleClose={handleCloseModal}
                handleCreate={handleCreateNote}
                isCreatingNote={isCreatingNote}
            />
        </Fragment>
    );
}

export { NotesPage }
