import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Box, Button as Mbutton, Container, Fade, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setPassword, setUsername} from "../../features/auth/authSlice";
import './interactionbox.css';
import {postEndpoint} from "../../utils";

export const InteractionBox = ({ sx, type, msg, ...props }) => {
    const [status, setStatus] = useState({ value: false, data: "", severity: "error"});

    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);
    const dispatch = useDispatch();

    const post = async (type, username, password) => {
        postEndpoint(type.toLowerCase(), username, password)
            .then((data) => {
                setStatus({ value: true, data: msg.success, severity: "success" });
                setTimeout(() => setStatus({ value: false, data: msg.success, severity: "success" }), 3000);
                dispatch(setUsername(""));
                dispatch(setPassword(""));
            })
            .catch((err) => {
                setStatus({ value: true, data: msg.fail, severity: "error"});
                setTimeout(() => setStatus({ value: false, data: msg.fail, severity: "error" }), 3000);
                dispatch(setPassword(""));
            });
    };

    return (
        <div className="container">
            <TextField sx={{ mb: '4%' }} placeholder="username" onChange={(e) => dispatch(setUsername(e.target.value))} value={username}></TextField>
            <TextField sx={{ mb: '4%' }} type="password" placeholder="password" onChange={(e) => dispatch(setPassword(e.target.value))} value={password}></TextField>
            <Mbutton sx={{ mb: '4%' }} variant="outlined" onClick={() => post(type.toLowerCase(), username, password)}>{type}</Mbutton>
            <Fade in={status.value} timeout={ 1000 }>
                <Alert sx={{ mb: '4%' }} severity={ status.severity }>{ status.data }</Alert>
            </Fade>
        </div>
    );
};

InteractionBox.propTypes = {
};

InteractionBox.defaultProps = {
};

