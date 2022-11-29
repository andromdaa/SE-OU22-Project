import React, {Fragment} from 'react';
import {Provider, useSelector} from "react-redux";
import {Dash} from "./Dash";
import {store} from "../../../app/store";

export default {
    title: 'Dash',
    component: Dash,
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

const Template = (args) => <Dash {...args}/>;

export const Default = Template.bind({});
Default.args = {

};


