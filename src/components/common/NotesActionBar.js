import React from "react";
import { Box, IconButton } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';

function NotesActionBar(props) {
    const {
        onFavoriteClick,
        onDeleteClick,
        onSyncClick
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
                <IconButton onClick={onSyncClick}>
                    <SyncIcon/>
                </IconButton>
            </div>
        </Box>
    )
}

export { NotesActionBar }
