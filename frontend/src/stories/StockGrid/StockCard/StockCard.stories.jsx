import React, {Fragment} from 'react';
import { StockCard } from './StockCard';
import {Provider, useSelector} from "react-redux";
import {store} from "../../../app/store";

export default {
    title: 'StockCard',
    component: StockCard,
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

const Template = (args) => <StockCard {...args}/>;

export const Gain = Template.bind({});
Gain.args = {
    symbol: "APPL",
    gain: true,
    price: "$146.10",
    full_name: "Apple Inc",
    percent_change: "+2.56%",
};

export const Loss = Template.bind({});
Loss.args = {
    symbol: "APPL",
    gain: false,
    price: "$146.10",
    full_name: "Apple Inc",
    percent_change: "-2.56%",
};

