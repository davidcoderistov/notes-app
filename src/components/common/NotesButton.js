import React from "react";
import { Button, CircularProgress } from "@material-ui/core";



function NotesButton(props) {
    const {
        children,
        type,
        variant,
        color,
        fullWidth,
        className,
        onClick,
        loading
    } = props;
    return (
        <Button
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            color={color}
            className={className}
            onClick={onClick}
            disabled={loading}
        >
            {!loading && children}
            {loading && <CircularProgress size={20} />}
        </Button>
    );
}

export { NotesButton }
