import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice';
import axios from "axios";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authorized = useSelector((state) => state.user.authorizedStr);
    const dispatch = useDispatch();

    let postLogin = (username, password) => {
        axios({
            url: 'http://localhost:8080/login',
            method: 'post',
            data: {
                username: username,
                password: password,
            }
        })
            .then(() => dispatch(login()))
            .catch(() => dispatch(logout()))
    };

    let postLogout = () => {
        axios({
            url: 'http://localhost:8080/logout',
            method: 'post',
        })
            .finally(() => dispatch(logout()))
    };

    return (
        <div>
            <div>
                <p> Logged in: {authorized} </p>
            </div>
            <div>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button onClick={() => postLogin(username, password)}>Login</button>
                <button onClick={() => postLogout()}>Logout</button>
            </div>
        </div>

    );
}