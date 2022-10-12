import Button from "@mui/material/Button";
import { postEndpoint } from "../../utils";
import React from "react";

export default function LoginButtons(props) {
    return (
        <React.Fragment>
            <Button variant = "outlined" onClick={() => {
                postEndpoint(props.username, props.password, "logout", props.dispatcher, props.setError)
            }}>Logout</Button>
        </React.Fragment>
    );
}