import React, {useEffect, useState} from 'react';
import '../../container.css'
import {Alert, Fade} from "@mui/material";
import InteractionBox from "../../components/InteractionBox/InteractionBox";
import {connect} from "react-redux";
import mapStateToProps from "../../../features/user/userSlice";
import {Header} from "../../components/Header/Header";
import Waves from "../../components/Waves/Waves";

// the login page
function Login({ user, ...props }) {

    // what we are rendering - Fade animation is from MUI (https://mui.com/material-ui/)
    return <div>
        <Header authorized={false} login={true} />
        <Fade in={true} timeout={ 1000 }>
            <div className="center_column" style={{ marginTop: "5%"}}>
                <h1>Welcome back to Track-N-Train</h1>
                <Fade in={true} timeout={ 3000 }>
                    <p>An efficient solution to test your trading algorithms.</p>
                </Fade>
            </div>
        </Fade>

        <div className="center_column app_border">
            <InteractionBox type="login" msg={{
                success: "Login successful, redirecting",
                fail: "Incorrect username/password"}}/>
        </div>

        <Waves/>
    </div>;
}

export default connect(mapStateToProps)(Login);