import React, {useEffect, useState} from 'react';
import {Alert, Box, Button as Mbutton, Container, Fade, TextField} from "@mui/material";
import {connect, useDispatch, useSelector} from "react-redux";
import './interactionbox.css';
import {postAuth} from "../../utils";
import mapStateToProps, {
    login,
    setFavorites,
    setPassword,
    setSymbols,
    setUsername,
    userSlice
} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";

const InteractionBox = ({ sx, type, msg, ...props }) => {
    const [status, setStatus] = useState({ value: false, data: "", severity: "error"});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // needed for async
    const post = async (type, username, password) => {
        postAuth(type, username, password)
            .then(async (data) => {
                dispatch(login());
                dispatch(setUsername(username));
                dispatch(setPassword(password));
                navigate('/dash');
            })
            .catch((err) => {
                setStatus({ value: true, data: msg.fail, severity: "error"});
                setTimeout(() => setStatus({ value: false, data: msg.fail, severity: "error" }), 3000);
                dispatch(setPassword(""));
            });
    };


    return (
        <div className="container">
            <TextField sx={{ mb: '4%' }} placeholder="username" onChange={(e) => {
                dispatch(setUsername(e.target.value))
            }} value={props.username} ></TextField>
            <TextField sx={{ mb: '4%' }} type="password" placeholder="password" onChange={(e) => {
                dispatch(setPassword(e.target.value));
            }} value={props.password}></TextField>
            <Mbutton sx={{ mb: '4%' }} variant="outlined" onClick={async () => {
                await post(type, props.username, props.password)
            }  }>{type}</Mbutton>
            <Fade in={status.value} timeout={ 1000 }>
                <Alert sx={{ mb: '4%' }} severity={ status.severity }>{ status.data }</Alert>
            </Fade>
        </div>
    );
};

export default connect(mapStateToProps)(InteractionBox);