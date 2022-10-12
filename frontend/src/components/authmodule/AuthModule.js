import React, {useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AuthInput from "./AuthInput";
import LoginButtons from "./LoginButtons";
import RegisterButton from "./RegisterButton";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Paper} from "@mui/material";

export default function AuthModule() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const dispatcher = useDispatch();
    const loggedIn = useSelector((state) => state.user.authorized);
    const loggedInStr = useSelector((state) => state.user.authorizedStr);

    // sets the username when change is detected
    let handleChange = (event, type) => {
        if (type === 'username') setUsername(event.target.value);
        else if (type === 'password') setPassword(event.target.value);
    }

    let resetFields = () => {
        setUsername('');
        setPassword('');
    }

    let content;
    if(loggedIn) content = <LoginButtons setError={setError} username={username} password={password} reset={resetFields} dispatcher={dispatcher}/>;
    else content = <RegisterButton username={username} setError={setError} password={password} reset={resetFields} dispatcher={dispatcher}/>;

    return (
        <Grid2 sx={{ mt: '50%' }}>
            <Grid2 sx={{ mb: '10%' }} display="flex" justifyContent="center">
                <img src={require('./TrackNTrain-1.png')} width='150px' height='auto'  alt={'logo'}/>
            </Grid2>
            <Paper sx={{ boxShadow: 24, color: 'black' }}>
                <Grid2 container spacing={1} minHeight={230}>
                    <Grid2 sx={{ margin: '10px' }}>
                        <Grid2><AuthInput error={error} handleChange={handleChange} username={username} password={password}/></Grid2>
                        <Grid2 display="flex" justifyContent="center">{content}</Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 sx={{ mb: '10%' }} display="flex" justifyContent="center">
                    Logged in: {loggedInStr}
                </Grid2>
            </Paper>
        </Grid2>
)
}





