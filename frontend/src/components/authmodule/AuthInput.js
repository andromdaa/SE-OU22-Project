import React, {useState} from "react";
import {useDispatch} from "react-redux";
import TextField from '@mui/material/TextField';
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AuthInput(props) {
    return (
        <React.Fragment>
            <Grid2 xs={"auto"}><TextField error={props.error} id="username-input" label="username" variant="outlined" onChange={(e) => props.handleChange(e, 'username')} /></Grid2>
            <Grid2 xs={"auto"}><TextField error={props.error} type="password" id="password-input" label="password" variant="outlined" onChange={(e) => props.handleChange(e, 'password')} /></Grid2>
        </React.Fragment>
    );
}

