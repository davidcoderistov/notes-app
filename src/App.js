import React from "react";
import {
    Login,
    SignUp
} from "./components/auth";
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
                  <Route path="/" exact>
                      <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                      >
                          <Login/>
                      </Grid>
                  </Route>
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
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
