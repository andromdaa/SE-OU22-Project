import React from 'react';
import { Header } from './Header';
import {Provider} from "react-redux";
import {store} from "../../app/store";
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button, IconButton, Menu} from "@mui/material";

export default {
    title: 'Header',
    component: Header,
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

const Template = (args) => <Header {...args}/>;

export const User = Template.bind({});
User.args = {
    content: <div>
        <Button>Logout</Button>
    </div>
};

export const Guest = Template.bind({});
Guest.args = {
    content: <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div>
            <Button >Login</Button>
            <Button>Register</Button>
        </div>
    </div>
};
