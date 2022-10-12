import Button from "@mui/material/Button";
import { postEndpoint } from "../../utils";
import React from "react";


export default function RegisterButton(props) {
    return (
        <React.Fragment>
            <Button sx={{mr: 2}} margin='10px' variant = "outlined" onClick={() => {
                postEndpoint(props.username, props.password, "login", props.dispatcher, props.setError);
                props.reset();
            }}>Login</Button>

            <Button sx={{ml: 2}} variant = "outlined" onClick={() => {
                postEndpoint(props.username, props.password, "register", props.dispatcher, props.setError);
                props.reset();
            }}>Register</Button>
        </React.Fragment>
    );
}