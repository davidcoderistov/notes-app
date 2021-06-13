import React from "react";
import { Login } from "./components/login";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getAuth } from "./selectors";

function App() {
  const auth = useSelector(getAuth);
  console.log(auth);
  return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
      >
        <Login/>
      </Grid>
  );
}

export default App;
