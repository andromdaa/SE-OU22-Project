import React from 'react';
import {useDispatch} from "react-redux";
import '../container.css';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {postAuth} from "../../utils";
import {logout} from "../../features/user/userSlice";
import {persistor} from "../../app/store";

export const Header = ({ authorized, ...props }) => {
    const dispatch = useDispatch();

    let button;
    if(authorized) button = <Button onClick={() => {
            postAuth("logout");
            dispatch(logout());
            navigate("/");
            persistor.purge();
    }}>Logout</Button>
    else button = <Button onClick={() => navigate('/login') }>Login</Button>

    let navigate = useNavigate();

    return (
        <header className="header">
            {button}
        </header>
    );
};
