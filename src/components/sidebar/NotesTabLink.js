import React from "react";
import {
    ListItem,
    ListItemIcon,
    makeStyles
} from "@material-ui/core";
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'rgb(208,208,208)',
        fontSize: 16
    }
}));

function NotesTabLink({children, title, ...rest}) {
    const classes = useStyles();

    return (
        <ListItem button>
            <ListItemIcon>
                {React.cloneElement(children, { style: { color: 'rgb(85,85,85)' }})}
            </ListItemIcon>
            <Link {...rest} className={classes.link}>
                {title}
            </Link>
        </ListItem>
    );
}

export { NotesTabLink }
