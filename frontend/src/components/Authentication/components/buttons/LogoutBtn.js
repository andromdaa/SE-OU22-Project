import Btn from "./Btn";
import {postEndpoint} from "../../../../utils";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setPassword, setUsername} from "../../../../features/auth/authSlice";

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);

    return <Button variant="outlined"
               onClick={() => {
                   postEndpoint("logout", username, password)
                       .then((res) => console.log(res))
                       .catch((err) => console.log(err));

                   dispatch(setUsername(''));
                   dispatch(setPassword(''));
               }}>Logout</Button>
}