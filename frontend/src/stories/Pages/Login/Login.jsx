import React, {useEffect, useState} from 'react';
import '../../container.css'
import {Alert, Fade} from "@mui/material";
import InteractionBox from "../../InteractionBox/InteractionBox";
import {connect} from "react-redux";
import mapStateToProps from "../../../features/user/userSlice";
import {Header} from "../../Header/Header";

function Login({ user, ...props }) {
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
                fail: "Incorrect username/password"
            }}/>
        </div>
        <div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill='rgba(163,22,33,0.7)' />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(78,128,152,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(14,39,60,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(196, 32, 33 ,0.1)" />
                </g>
            </svg>
        </div>
    </div>;
}

export default connect(mapStateToProps)(Login);