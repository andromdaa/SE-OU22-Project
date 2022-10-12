import axios from "axios";
import {login, logout} from "./features/user/userSlice";

export const postEndpoint = (username, password, endpoint, dispatcher, setError) => {
    if((username === '' || password.length <= 6) && endpoint !== 'logout') return;

    axios({
        url: `http://104.154.220.135:9000/${endpoint}`,
        method: 'post',
        data: {
            username: username,
            password: password,
        }
    })
        .then((res) => {
            if(endpoint === 'logout') dispatcher(logout());
            else dispatcher(login());
            setError(false);
        })
        .catch((err) => {
            dispatcher(logout());
            setError(true);
        });
};
