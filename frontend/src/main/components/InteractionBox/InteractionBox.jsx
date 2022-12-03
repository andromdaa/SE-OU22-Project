import React, {useEffect, useState} from 'react';
import {Alert, Box, Button as Mbutton, Container, Fade, TextField} from "@mui/material";
import {connect, useDispatch, useSelector} from "react-redux";
import './interactionbox.css';
import {postAuth} from "../../../utils";
import mapStateToProps, {
    login,
    setPassword,
    setUsername,
} from "../../../features/user/userSlice";

import {useNavigate} from "react-router-dom";

// dynamic register / login box
const InteractionBox = ({ sx, type, msg, ...props }) => {
    const [status, setStatus] = useState({ value: false, data: "", severity: "error"});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*
        function that is called when the user clicks login / register
        makes a post to the backend and creates / validates the user
     */
    const post = async (type, username, password) => {
        postAuth(type, username, password)
            .then(async (data) => {
                // login, set local username and password data, redirect to dashboard
                dispatch(login());
                dispatch(setUsername(username));
                dispatch(setPassword(password));
                navigate('/dash');
            })
            .catch((err) => {
                // set local state through setstatus and display the error message with given data, clear the password entry
                setStatus({ value: true, data: msg.fail, severity: "error"});
                setTimeout(() => setStatus({ value: false, data: msg.fail, severity: "error" }), 3000);
                dispatch(setPassword(""));
            });
    };

    const handleEnter = async (event, username, password) => {
        if(username.length <= 0 || password.length <= 0) return;

        if(event.keyCode === 13) {
            await post(type, props.username, props.password);
        }
    }

    // render the text fields and button
    return (
        <div className="container">
            <TextField sx={{ mb: '4%' }} placeholder="username" onChange={(e) => dispatch(setUsername(e.target.value)) } value={props.username} ></TextField>
            <TextField sx={{ mb: '4%' }} type="password" placeholder="password" onChange={(e) => dispatch(setPassword(e.target.value)) } onKeyDown={(event) => handleEnter(event, props.username, props.password)} value={props.password}></TextField>
            <Mbutton sx={{ mb: '4%' }} variant="outlined" onClick={async () => await post(type, props.username, props.password)} >{type}</Mbutton>
            <Fade in={status.value} timeout={ 1000 }>
                <Alert sx={{ mb: '4%' }} severity={ status.severity }>{ status.data }</Alert>
            </Fade>
        </div>
    );
};

export default connect(mapStateToProps)(InteractionBox);