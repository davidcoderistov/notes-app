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

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADING;
    }
    return new Promise(resolve =>
        setTimeout(() => {
            for (let index = startIndex; index <= stopIndex; index++) {
                itemStatusMap[index] = LOADED;
            }
            resolve();
        }, 2500)
    );
};

function Note({ index, style }) {
    const isLoading = itemStatusMap[index] === LOADING;
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
                        primary="Order meal and eggs and"
                        secondary={'Secondary text'}
                    />
                </Fragment>
            )}
        </ListItem>
    );
}

function NotesList() {
    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={1000}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    height={580}
                    itemCount={100}
                    itemSize={60}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={300}
                >
                    {Note}
                </List>
            )}
        </InfiniteLoader>
    );
}


export { NotesList }


