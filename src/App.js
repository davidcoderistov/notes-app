import React from "react";
import {
    Login,
    SignUp
} from "./components/auth";
import { NotesList } from "./components/notes";
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
                      <NotesList/>
                  </PrivateRoute>
                  <PrivateRoute path="/favorites">
                      <p>Favorites</p>
                  </PrivateRoute>
                  <PrivateRoute path="/trash">
                      <p>Trash</p>
                  </PrivateRoute>
                  <PrivateRoute path="/">
                      <p>Notes</p>
                  </PrivateRoute>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
