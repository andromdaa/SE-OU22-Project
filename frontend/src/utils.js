import axios from "axios";

// make post via axios, used throughout components
export const postAuth = (endpoint, username, password) => {
    return axios({
        url: `http://localhost:9000/${endpoint}`,
        method: 'post',
        data: {
            username: username,
            password: password,
        }
    });
};

// make GET request (despite its name) via axios to api, used throughout components
export const postAPI = (endpoint) => {
    if(endpoint.length <= 0) return Promise.reject(Error());

    return axios({
        url: `http://localhost:9000/api/${endpoint}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};