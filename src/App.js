import React from "react";
import {
    Login,
    SignUp
} from "./components/auth";
import {
    NotesPage,
    FavoritesPage,
    TrashPage
} from "./pages";
import { PrivateRoute } from "./components/router";
import { Grid } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  return (
      <Router>
          <React.Fragment>
              <Switch>
                  <Route path="/login">
                      <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                      >
                          <Login/>
                      </Grid>
                  </Route>
                  <Route path="/signup">
                      <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                      >
                          <SignUp/>
                      </Grid>
                  </Route>
                  <PrivateRoute path="/notes">
                      <NotesPage/>
                  </PrivateRoute>
                  <PrivateRoute path="/favorites">
                      <FavoritesPage/>
                  </PrivateRoute>
                  <PrivateRoute path="/trash">
                      <TrashPage/>
                  </PrivateRoute>
                  <PrivateRoute path="/">
                      <NotesPage/>
                  </PrivateRoute>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
