import axios from "axios";
import {useDispatch} from "react-redux";
import {setPassword, setUsername} from "./features/auth/authSlice";

export const postEndpoint = (endpoint, username, password) => {
    if(username.length <= 0 || password.length < 5) return Promise.reject(Error());

    let res = axios({
        url: `http://localhost:9000/${endpoint}`,
        method: 'post',
        data: {
            username: username,
            password: password,
        }
    });

    return res;
};
