import React, { Fragment } from "react";
import { NotesView } from "../components/notes";


function FavoritesPage() {

    return (
        <Fragment>
            <NotesView status='favorite'/>
            <div>
                Favorites Page
            </div>
        </Fragment>
    );
}

export { FavoritesPage }
