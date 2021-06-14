import React from "react";
import { Link } from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'rgb(63,81,181)'
    }
}));

function NotesLink(props) {
    const {
        children,
        to
    } = props;

    const classes = useStyles();

    return (
        <Link to={to} className={classes.link}>
            {children}
        </Link>
    );
}

export { NotesLink }
