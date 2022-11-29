import React, {Fragment} from 'react';
import {Provider, useSelector} from "react-redux";
import { StockGrid } from "./StockGrid";
import {store} from "../../app/store";

export default {
    title: 'StockGrid',
    component: StockGrid,
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

const Template = (args) => <StockGrid {...args}/>;

export const Default = Template.bind({});
Default.args = {

};


