import {Fragment} from 'react';
import {Container, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword } from "../../../features/auth/authSlice";

export default function Inputs() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);

    return (
        <Fragment>
            <Container sx={{ m: '10px' }}><TextField placeholder="username" onChange={(e) => dispatch(setUsername(e.target.value))} value={username}></TextField></Container>
            <Container sx={{ m: '10px' }}><TextField type="password" placeholder="password" onChange={(e) => dispatch(setPassword(e.target.value))} value={password}></TextField></Container>
        </Fragment>
    );
}