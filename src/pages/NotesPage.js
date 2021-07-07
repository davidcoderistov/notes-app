import React, { Fragment } from "react";
import { NotesView } from "../components/notes";


function NotesPage() {

    return (
        <Fragment>
            <NotesView/>
            <div>
                Notes Page
            </div>
        </Fragment>
    );
}

export { NotesPage }
