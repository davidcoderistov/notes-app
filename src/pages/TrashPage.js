import React, { Fragment } from "react";
import { markTrashedNoteAsFavorite, deleteNote } from "../thunks/notes";
import { setDeleteDialog } from "../slices/notes";
import { getSelectedTrashNote, getDeleteDialogValue, getIsDeletingNote } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { NotesView, NoteView, DeleteNoteModal } from "../components/notes";


function TrashPage() {
    const selectedNote = useSelector(getSelectedTrashNote);

    const open = useSelector(getDeleteDialogValue);

    const isDeletingNote = useSelector(getIsDeletingNote);

    const dispatch = useDispatch();

    const handleModalClose = () => {
        dispatch(setDeleteDialog({ isOpen: false }));
    };

    const handleDeleteNote = () => {
        if(selectedNote) {
            dispatch(deleteNote({ noteId: selectedNote.id }));
        }
    };

    const onFavoriteClick = () => {
        if(selectedNote) {
            dispatch(markTrashedNoteAsFavorite({ noteId: selectedNote.id }))
        }
    };

    const onDeleteClick = () => {
        dispatch(setDeleteDialog({ isOpen: true }));
    };

    const onSyncClick = () => {
        console.log('TrashPage/onSyncClick()');
    };

    return (
        <Fragment>
            <NotesView
                status='trashed'
                selectedNote={selectedNote}
            />
            <NoteView
                note={selectedNote}
                onFavoriteClick={onFavoriteClick}
                onDeleteClick={onDeleteClick}
                onSyncClick={onSyncClick}
            />
            <DeleteNoteModal
                open={open}
                note={selectedNote}
                isDeletingNote={isDeletingNote}
                handleClose={handleModalClose}
                handleDelete={handleDeleteNote}
            />
        </Fragment>
    );
}

export { TrashPage }
