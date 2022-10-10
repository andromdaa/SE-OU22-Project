import axios from "axios";

export const postEndpoint = (gusername, gpassword, endpoint) => {
    if((gusername === '' || gpassword.length <= 6) && endpoint !== 'logout') return new Promise(() => false);

    return axios({
        url: `http://10.1.99.36:9000/${endpoint}`,
        mode: 'no-cors',
        method: 'post',
        data: {
            username: gusername,
            password: gpassword,
        }
    });
};