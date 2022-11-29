import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import '../container.css';

export const Header = ({ content, ...props }) => {
    const authorized = useSelector((state) => state.authorized);
    const mode = authorized ? 'Logout' : 'Login';

    return (
        <header className="header">
            { content }
        </header>
    );
};

Header.propTypes = {
    loggedIn: PropTypes.bool,
    backgroundColor: PropTypes.string,
    username: PropTypes.string,
    onClick: PropTypes.func,
};

Header.defaultProps = {
    loggedIn: false,
    username: '',
    onClick: undefined,
};
