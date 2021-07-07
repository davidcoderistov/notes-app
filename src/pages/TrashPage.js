import React, { Fragment } from "react";
import { NotesView } from "../components/notes";


function TrashPage() {

    return (
        <Fragment>
            <NotesView status='trashed'/>
            <div>
                Trash Page
            </div>
        </Fragment>
    );
}

export { TrashPage }
