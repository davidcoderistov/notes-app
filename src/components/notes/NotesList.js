import React, { Fragment } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    CircularProgress
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import NotesIcon from '@material-ui/icons/Notes';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(() => ({
    noteContainer: {
        cursor: 'pointer'
    }
}));


function Note({ index, style, payload }) {
    const classes = useStyles();

    const { notes, isItemLoaded, onNoteClick } = payload;
    let note = notes[index];

    const handleOnNoteClick = () => {
        onNoteClick(note);
    };

    const isLoading = !isItemLoaded(index);
    return (
        <ListItem style={style} key={index} className={classes.noteContainer} onClick={handleOnNoteClick}>
            { isLoading ? <CircularProgress/> : (
                <Fragment>
                    <ListItemAvatar>
                        <Avatar>
                            <NotesIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={note.title}
                        secondary={note.content}
                    />
                    { note.status === 'favorite' ? (
                        <ListItemSecondaryAction>
                            <StarIcon color='primary'/>
                        </ListItemSecondaryAction>
                    ) : null }
                    { note.status === 'trashed' ? (
                        <ListItemSecondaryAction>
                            <DeleteIcon color='secondary'/>
                        </ListItemSecondaryAction>
                    ) : null }
                </Fragment>
            )}
        </ListItem>
    );
}

function NotesList({ loadNotes, notes, error, loading, loadedToIndex, notesCount, listKey, onNoteClick }) {
    // TODO: Display different views when there is an error or initial loading
    const loadMoreItems = (startIndex, stopIndex) => {
        if(startIndex > 0) {
            loadNotes(stopIndex - startIndex + 1);
        }
    };

    const isItemLoaded = index => index < loadedToIndex;


    return (
        <InfiniteLoader
            key={listKey}
            isItemLoaded={isItemLoaded}
            itemCount={notesCount}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    height={530}
                    itemCount={notesCount}
                    itemSize={60}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={300}
                >
                    {args => Note({...args, payload: { notes, isItemLoaded, onNoteClick } })}
                </List>
            )}
        </InfiniteLoader>
    );
}


export { NotesList }


