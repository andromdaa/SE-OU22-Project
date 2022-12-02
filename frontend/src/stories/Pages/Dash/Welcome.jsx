import React from 'react';
import '../../container.css'
import {Header} from "../../Header/Header";
import {Fade} from "@mui/material";
import InteractionBox from "../../InteractionBox/InteractionBox";
import mapStateToProps from "../../../features/user/userSlice";
import {connect} from "react-redux";

function Welcome({ user, ...props }) {
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
                        fail: "Username already in use"
                    }}/>
            </div>
    </div>;
}

export default connect(mapStateToProps)(Welcome);