import React, { Fragment } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    CircularProgress,
    IconButton
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import NotesIcon from '@material-ui/icons/Notes';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    noteContainer: {
        cursor: 'pointer'
    },
    noteBackground: {
        backgroundColor: '#F0F0F0'
    }
}));


function Note({ index, style, payload }) {
    const classes = useStyles();

    const { notes, isItemLoaded, onNoteClick, onFavoriteActionClick, onDeleteActionClick, selectedNote } = payload;
    let note = notes[index];

    const handleOnNoteClick = () => {
        onNoteClick(note);
    };

    const handleOnFavoriteActionClick = () => {
        if(onFavoriteActionClick) {
            onFavoriteActionClick(note);
        }
    };

    const handleOnDeleteActionClick = () => {
        if(onDeleteActionClick) {
            onDeleteActionClick(note);
        }
    };

    const isLoading = !isItemLoaded(index, note);

    const isNoteSelected = !isLoading && note && selectedNote && selectedNote.id === note.id;

    return (
        <ListItem
            style={style}
            key={index}
            className={clsx(classes.noteContainer, isNoteSelected && classes.noteBackground )}
            onClick={handleOnNoteClick}
        >
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
                            <IconButton onClick={handleOnFavoriteActionClick}>
                                <StarIcon color='primary'/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    ) : null }
                    { note.status === 'trashed' ? (
                        <ListItemSecondaryAction>
                            <IconButton onClick={handleOnDeleteActionClick}>
                                <DeleteIcon color='secondary'/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    ) : null }
                    { note.status === 'pending' ? (
                        <ListItemSecondaryAction>
                            <IconButton onClick={handleOnFavoriteActionClick}>
                                <StarIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    ) : null }
                </Fragment>
            )}
        </ListItem>
    );
}

function NotesList({ loadNotes, notes, error, loading, loadedToIndex, notesCount, listKey, onNoteClick, onFavoriteActionClick, onDeleteActionClick, selectedNote }) {
    // TODO: Display different views when there is an error or initial loading
    const loadMoreItems = (startIndex, stopIndex) => {
        if(startIndex > 0) {
            loadNotes(stopIndex - startIndex + 1);
        }
    };

    const isItemLoaded = (index, note) => note && index < loadedToIndex;


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
                    {args => Note({...args, payload: { notes, isItemLoaded, onNoteClick, onFavoriteActionClick, onDeleteActionClick, selectedNote } })}
                </List>
            )}
        </InfiniteLoader>
    );
}


export { NotesList }


