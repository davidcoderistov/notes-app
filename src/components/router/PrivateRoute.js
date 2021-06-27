import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { NotesAppSidebar } from "../sidebar";
import { getAuth } from "../../selectors";


function PrivateRoute({children, ...rest}) {
    const auth = useSelector(getAuth);
    const location = useLocation();

    return (
        <Route {...rest}>
            {!auth.isAuthenticated ? (
                <NotesAppSidebar>
                    {children}
                </NotesAppSidebar>
            ): (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />
            )}
        </Route>
    );
}

export { PrivateRoute }
