import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Note } from "./Note";
import { useFormValue } from "../../hooks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        padding: '0 20px'
    }
}));

function NoteView({note}) {
    const classes = useStyles();

    const [title, handleOnTitleChange] = useFormValue('');

    const [content, handleOnContentChange] = useFormValue('');

    useEffect(() => {
        if(note) {
            handleOnTitleChange(note.title);
            handleOnContentChange(note.content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note]);

    return (
        <Box width="100%" height="100%" className={classes.container}>
            <Note
                title={title}
                onTitleChange={handleOnTitleChange}
                content={content}
                onContentChange={handleOnContentChange}
            />
        </Box>
    );
}

export { NoteView }
