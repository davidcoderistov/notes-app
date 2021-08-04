import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Note } from "./Note";
import { NotesActionBar } from "../common";
import { useFormValue } from "../../hooks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        padding: '0 20px'
    }
}));

function NoteView(props) {
    const {
        note,
        onFavoriteClick,
        onDeleteClick,
        onSyncClick,
        onCreateClick,
        shouldShowAddNewNote
    } = props;

    const classes = useStyles();

    const [title, handleOnTitleChange] = useFormValue('');

    const [content, handleOnContentChange] = useFormValue('');

    const handleOnSyncClick = () => {
        onSyncClick(note ? note.id : null, title, content);
    };

    useEffect(() => {
        handleOnTitleChange(note ? note.title : '');
        handleOnContentChange(note ? note.content : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note]);

    return (
        <Box width="100%" height="100%" className={classes.container}>
            <Note
                title={title}
                onTitleChange={handleOnTitleChange}
                content={content}
                onContentChange={handleOnContentChange}
                rows={24}
            />
            <NotesActionBar
                onFavoriteClick={onFavoriteClick}
                onDeleteClick={onDeleteClick}
                onSyncClick={handleOnSyncClick}
                onCreateClick={onCreateClick}
                syncedAt={note ? note.syncedAt : null}
                shouldShowAddNewNote={shouldShowAddNewNote}
            />
        </Box>
    );
}

export { NoteView }
