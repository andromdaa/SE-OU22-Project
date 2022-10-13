import axios from "axios";
import {login, logout} from "./features/user/userSlice";

export const postEndpoint = (endpoint, username, password) => {
    if(username.length <= 0 || password.length < 5) return Promise.reject(Error());

    return axios({
        url: `http://localhost:9000/${endpoint}`,
        method: 'post',
        data: {
            username: username,
            password: password,
        }
    });
};
