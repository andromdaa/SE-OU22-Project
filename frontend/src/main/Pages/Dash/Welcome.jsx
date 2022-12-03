import React from 'react';
import '../../container.css'
import {Header} from "../../components/Header/Header";
import {Fade} from "@mui/material";
import InteractionBox from "../../components/InteractionBox/InteractionBox";
import mapStateToProps from "../../../features/user/userSlice";
import {connect} from "react-redux";
import './welcome.css';
import Waves from "../../components/Waves/Waves";

function Welcome({ user, ...props }) {
    // return the proper header depends on if we are logged in or not

    // what we are rendering - Fade animation is from MUI (https://mui.com/material-ui/)
    return <div>
        <Header authorized={false} />
            <Fade in={true} timeout={ 1000 }>
                <div className="center_column" style={{ marginTop: "5%"}}>
                    <h1>Welcome to Track-N-Train</h1>
                    <Fade in={true} timeout={ 3000 }>
                        <p>An efficient solution to test your trading algorithms.</p>
                    </Fade>
                </div>
            </Fade>

            <div className="center_column app_border">
                <InteractionBox type="register" msg={{
                        success: "Registration Successful, redirecting",
                        fail: "Username already in use"}}/>
            </div>
        <Waves/>
    </div>;
}

export default connect(mapStateToProps)(Welcome);