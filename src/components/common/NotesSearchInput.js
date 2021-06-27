import React from "react";
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


function NotesSearchInput(props) {
    const {
        value,
        onValueChange,
        onSearch
    } = props;

    const onHandleSearch = event => {
        if (event.type === 'click' || event.key === 'Enter') {
            event.preventDefault();
            onSearch();
        }
    };

    return (
        <FormControl>
            <InputLabel>Search by title</InputLabel>
            <Input id="search-notes"
                   type="search"
                   value={value}
                   onChange={onValueChange}
                   onKeyDown={onHandleSearch}
                   endAdornment={
                       <InputAdornment position="end">
                           <IconButton
                               aria-label="search icon"
                               onClick={onHandleSearch}
                           >
                               <SearchIcon/>
                           </IconButton>
                       </InputAdornment>
                   }/>
        </FormControl>
    );
}


export { NotesSearchInput }
