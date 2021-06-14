import React from "react";
import { Signup } from "./components/signup";
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
        <Signup/>
      </Grid>
  );
}

export default App;
