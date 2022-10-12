import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import AuthModule from "./authmodule/AuthModule";

function App() {

    return (
        <Grid2 display="flex" justifyContent="center" alignItems="center" container>
            <Grid2><AuthModule/></Grid2>
        </Grid2>
    );
}

export default App;
