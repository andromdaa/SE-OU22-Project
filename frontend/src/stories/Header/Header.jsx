import React from 'react';
import {useDispatch} from "react-redux";
import '../container.css';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {postAuth} from "../../utils";
import {logout} from "../../features/user/userSlice";
import {persistor} from "../../app/store";

export const Header = ({ authorized, login, ...props }) => {
    const dispatch = useDispatch();

    let button = [];

    if(authorized) button.push(<Button key={1} onClick={() => {
            postAuth("logout");
            dispatch(logout());
            navigate("/");
            persistor.purge(); }}>Logout</Button>);
    else if(login) button.push(<Button key={1} onClick={() => navigate('/') }>Register</Button>);
    else button.push(<Button onClick={() => navigate('/login') } key={1} >Login</Button>);

    button.push(<Button onClick={() => navigate('/docs') } key={2}>Docs</Button>);

    let navigate = useNavigate();
    return (
        <header className="header">
            {button}
        </header>
    );
};
