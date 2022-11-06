import {postEndpoint} from "../../../../utils";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setPassword, setUsername} from "../../../../features/auth/authSlice";

export default function LoginBtn(props) {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);

    return <Button variant="outlined"
       onClick={() => {
           postEndpoint("login", username, password)
               .then((res) => console.log(res))
               .catch((err) => console.log(err));

           dispatch(setUsername(''));
           dispatch(setPassword(''));

       }}>Login</Button>
}