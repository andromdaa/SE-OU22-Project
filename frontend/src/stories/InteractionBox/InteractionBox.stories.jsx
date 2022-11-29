import React, {Fragment} from 'react';
import { InteractionBox } from './InteractionBox';
import {postEndpoint} from "../../utils";
import {Provider, useSelector} from "react-redux";
import {store} from "../../app/store";
import { Button as Mbutton } from "@mui/material";

export default {
    title: 'InteractionBox',
    component: InteractionBox,
    sx: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    decorators: [
        (Story) => (
            <div>
                <Provider store={ store }>
                    <Story />
                </Provider>
            </div>
        )
    ]
};

const Template = (args) => <InteractionBox {...args}/>;

export const Login = Template.bind({});
Login.args = {
    type: "Login",
    msg: {
        success: "Login successful, redirecting",
        fail: "Incorrect username/password"
    }
};

export const Register = Template.bind({});
Register.args = {
    type: "Register",
    msg: {
        success: "Registration Successful, redirecting",
        fail: "Username already in use"
    }
};

