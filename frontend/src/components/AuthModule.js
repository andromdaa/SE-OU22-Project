import React, {useState } from 'react'
import { postEndpoint } from "../utils";
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice';

export default function AuthModule(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    // sets the username when change is detected
    let handleChange = (event, type) => {
        console.log(event.target.value);

        if (type === 'username') setUsername(event.target.value);
        else if (type === 'password') setPassword(event.target.value);

        if (username.length === 0 || password.length <= 6) setDisabled(true);
        else setDisabled(false);
    }

    let postRegister = (username, password) => {
        postEndpoint(username, password, 'register')
            .then(() => dispatch(login()))
            .catch(() => dispatch(logout()))
            .finally(() => {
                setUsername('');
                setPassword('');
            });
    }

    let postLogin = (username, password) => {
        postEndpoint(username, password, 'login')
            .then(() => dispatch(login()))
            .catch(() => dispatch(logout()))
            .finally(() => {
                setUsername('');
                setPassword('');
            });
    }

    let postLogout = (username, password) => {
        postEndpoint(username, password, 'logout')
            .then(() => dispatch(logout()))
            .catch(() => dispatch(logout()))
            .finally(() => {
                setUsername('');
                setPassword('');
            });
    }

    let submitType;
    let content = (
        <div>
            <input type="text" placeholder="username" value={username} onChange={(e) => handleChange(e, 'username')}/>
            <br/>
            <input type="text" placeholder="password" value={password} onChange={(e) => handleChange(e, 'password')}/>
            <br/>
        </div>
    );

    if (props.type === 'register') {
        submitType = (
            <div>
                <button disabled={disabled} type="button" onClick={() => postRegister(username, password)}>Create Account</button>
            </div>
        );
    } else if (props.type === 'login') {
        submitType = (
            <div>
                <button type="button" onClick={() => postLogin(username, password)}>Login</button>
                <button type="button" onClick={() => postLogout(username, password)}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            {content}
            {submitType}
            <br/>
        </div>
    )
}



