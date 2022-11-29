import React, {useEffect, useState} from 'react';
import '../../container.css'
import {Alert, Fade} from "@mui/material";
import {InteractionBox} from "../../InteractionBox/InteractionBox";

export function Login({ ...props }) {
    return <div>
            <Fade in={true} timeout={ 1000 }>
                <div className="center_column" style={{ marginTop: "5%"}}>
                    <h1>Welcome back to Track-N-Train</h1>
                </div>
            </Fade>

            <div className="center_column app_border">
                <InteractionBox type="login" msg={{
                        success: "Login successful, redirecting",
                        fail: "Incorrect username/password"
                    }}/>
            </div>
    </div>
}
