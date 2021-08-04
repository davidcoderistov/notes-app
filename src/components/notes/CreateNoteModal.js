import React, { useEffect } from 'react';
import { useFormValue } from "../../hooks";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Note } from "./Note";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
    title: {
        color: 'rgb(63,81,181)'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function CreateNoteModal({open, handleClose, handleCreate, isCreatingNote}) {
    const styles = useStyles();

    const [title, setTitle] = useFormValue('');
    const handleOnTitleChange = title => {
        setTitle(title);
    };

    const [content, setContent] = useFormValue('');
    const handleOnContentChange = content => {
        setContent(content);
    };

    const onCreateClick = () => {
        handleCreate(title, content);
    };

    useEffect(() => {
        setTitle('');
        setContent('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className={styles.title}>{"Create note"}</DialogTitle>
            <DialogContent>
                <Note
                    title={title}
                    content={content}
                    onTitleChange={handleOnTitleChange}
                    onContentChange={handleOnContentChange}
                    rows={20}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onCreateClick} color="primary">
                    { isCreatingNote ? (
                        <CircularProgress size={20}/>
                    ) : 'Create' }
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export { CreateNoteModal }
