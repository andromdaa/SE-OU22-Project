import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import '../container.css';
import {Button} from "@mui/material";

export const Header = ({ authorized, ...props }) => {
    let text;

    if(authorized) text = "Logout"
    else text = "Login"

    return (
        <header className="header">
            <Button>{text}</Button>
        </header>
    );
};
