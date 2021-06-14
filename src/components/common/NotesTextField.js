import React from "react";
import TextField from '@material-ui/core/TextField';



function NotesTextField(props) {
    const {
        value,
        onValueChange,
        name,
        label,
        autoComplete,
        type
    } = props;
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={name || 'Default name'}
            label={label || 'Default label'}
            name={name || 'Default name'}
            autoComplete={autoComplete || 'autocomplete'}
            type={type || ''}
            autoFocus
            value={value}
            onChange={onValueChange}
        />
    )
}

export { NotesTextField }
