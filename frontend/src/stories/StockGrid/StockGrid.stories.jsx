import React, {Fragment} from 'react';
import {Provider, useSelector} from "react-redux";
import { StockGrid } from "./StockGrid";
import {store} from "../../app/store";
import {StockCard} from "./StockCard/StockCard";

export default {
    title: 'StockGrid',
    component: StockGrid,
    decorators: [
        (Story) => (
            <Provider store={ store }>
                <Story />
            </Provider>
        )
    ]
};

const Template = (args) => <StockGrid {...args}/>;

export const Default = Template.bind({});
Default.args = {
    stock_cards: [
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
    ]
};


