import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '20px'
    }
}));


function Note({title, onTitleChange, content, onContentChange, rows}) {
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
                rows={rows}
                maxrows={rows}
                value={content}
                onChange={onContentChange}/>
        </Fragment>
    );
}

export { Note }
