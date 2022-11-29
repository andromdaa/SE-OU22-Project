import React, {Fragment} from 'react';
import {Provider, useSelector} from "react-redux";
import {store} from "../../../app/store";
import {StockDetailed} from "./StockDetailed";

export default {
    title: 'StockDetailed',
    component: StockDetailed,
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

const Template = (args) => <StockDetailed {...args}/>;

export const Default = Template.bind({});
Default.args = {

};


