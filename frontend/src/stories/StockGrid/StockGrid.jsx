import React, {useEffect, useState} from 'react';
import {StockCard} from "./StockCard/StockCard";
import '../container.css'

export const StockGrid = ({ stock_cards, ...props }) => {
    stock_cards = [
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"143.45"} /> </div>,
    ]

    return <div className="grid_container">
        { stock_cards }
    </div>;
};
