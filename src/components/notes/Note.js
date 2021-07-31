import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '20px'
    }
}));


function Note({title, onTitleChange, content, onContentChange}) {
    const classes = useStyles();

    return (
        <Fragment>
            <TextField
                label="Title"
                fullWidth
                className={classes.title}
                value={title}
                onChange={onTitleChange}/>
            <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows="24"
                maxrows="24"
                value={content}
                onChange={onContentChange}/>
        </Fragment>
    );
}

export { Note }
