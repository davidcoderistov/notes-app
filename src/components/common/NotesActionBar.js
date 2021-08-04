import React from "react";
import { Box, IconButton } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';
import AddIcon from '@material-ui/icons/Add';

function NotesActionBar(props) {
    const {
        onFavoriteClick,
        onDeleteClick,
        onSyncClick,
        onCreateClick,
        syncedAt,
        shouldShowAddNewNote
    } = props;

    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <div>
                <IconButton onClick={onFavoriteClick}>
                    <StarIcon color='primary'/>
                </IconButton>
                <IconButton onClick={onDeleteClick}>
                    <DeleteIcon color='secondary'/>
                </IconButton>
            </div>
            <div>
                {syncedAt ? (
                    <span>{ syncedAt }</span>
                ) : null}
                <IconButton onClick={onSyncClick}>
                    <SyncIcon/>
                </IconButton>
                {shouldShowAddNewNote ? (
                    <IconButton onClick={onCreateClick}>
                        <AddIcon/>
                    </IconButton>
                ) : null}
            </div>
        </Box>
    )
}

export { NotesActionBar }
