import React from "react";
import SignUp from "./components/auth/SignUp";
import { Grid } from "@material-ui/core";

function App() {
  return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
      >
        <SignUp/>
      </Grid>
  );
}

export default App;
