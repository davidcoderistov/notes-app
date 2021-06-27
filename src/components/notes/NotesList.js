import React, { Fragment } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    CircularProgress
} from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';


function Note({ index, style, payload }) {
    const { notes, isItemLoaded } = payload;
    let note = notes[index];

    if(!note) {
        note = {
            title: 'Default title',
            content: 'Default content'
        }
    }

    const isLoading = !isItemLoaded(index);
    return (
        <ListItem style={style} key={index}>
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
                </Fragment>
            )}
        </ListItem>
    );
}

function NotesList({ loadNotes, notes, error, loading, loadedToIndex, notesCount, listKey }) {
    // TODO: Display different views when there is an error or initial loading
    const loadMoreItems = (startIndex, stopIndex) => {
        if(startIndex >= loadedToIndex) {
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
                    height={500}
                    itemCount={notesCount}
                    itemSize={60}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={300}
                >
                    {args => Note({...args, payload: { notes, isItemLoaded }})}
                </List>
            )}
        </InfiniteLoader>
    );
}


export { NotesList }


