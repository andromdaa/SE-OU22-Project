import React, {useEffect, useState} from 'react';
import {StockCard} from "./StockCard/StockCard";
import '../container.css'

export const StockGrid = ({ stock_cards, ...props }) => {
    return <div>
        <div className="center"><h3>Watchlist</h3></div>
        <div className="grid_container">
            { stock_cards }
        </div>
    </div>
};
