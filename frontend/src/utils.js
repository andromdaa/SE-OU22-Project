import axios from "axios";

export const postEndpoint = (username, password, endpoint) => {
    if((username === '' || password.length <= 6) && endpoint !== 'logout') return new Promise(() => false);

    return axios({
        url: `http://0.0.0.0:9000/${endpoint}`,
        method: 'post',
        data: {
            username: username,
            password: password,
        }
    });
};