import React, {useState} from 'react'
import axios from "axios";

export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let register = (username, password) => {
        axios({
            url: 'http://localhost:8080/register',
            method: 'post',
            data: {
                username: username,
                password: password,
            }
        }).then((data) => { console.log(data) })
            .catch((err) => {
                throw err;
            })
    };

    return (
        <div>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <br/>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button onClick={() => register(username, password)}>Register</button>
        </div>
    );
}