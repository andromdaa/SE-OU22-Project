import React from 'react';
import {useDispatch} from "react-redux";
import '../../container.css';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {postAuth} from "../../../utils";
import {logout} from "../../../features/user/userSlice";
import {persistor} from "../../../app/store";

const handleClick = (dispatch, navigate) => {
    postAuth("logout");
    dispatch(logout());
    navigate("/");
    persistor.purge();
}

export const Header = ({ authorized, login, ...props }) => {
    // used to dispatch actions via the reducers in ../../features
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let button = [];

    // depends on if we are logged in, the button we want to display to the
    // user changes, but we always want to display the docs button for quick access

    // select login / logout / register button
    if(authorized) button.push(<Button key={1} onClick={() => handleClick(dispatch, navigate)}>Logout</Button>);
    else if(login) button.push(<Button key={1} onClick={() => navigate('/') }>Register</Button>);
    else button.push(<Button onClick={() => navigate('/login') } key={1} >Login</Button>);

    // add docs button
    button.push(<Button onClick={() => navigate('/docs') } key={2}>Docs</Button>);

    // render it
    return (
        <header className="header">
            {button}
        </header>
    );
};
