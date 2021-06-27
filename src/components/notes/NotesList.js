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

function NotesList({ loadNotes, notes, error, loading, loadedToIndex, lastNote, notesCount }) {
    // TODO: Display different views when there is an error or initial loading
    const loadMoreItems = (startIndex, stopIndex) => {
        if(startIndex >= loadedToIndex) {
            loadNotes({ startAt: lastNote ? lastNote.createdAt : startIndex, pageSize: stopIndex - startIndex + 1 });
        }
    };

    const isItemLoaded = index => index < loadedToIndex;


    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={notesCount}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    height={580}
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


