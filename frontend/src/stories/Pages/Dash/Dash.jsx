import React, {useEffect, useState} from 'react';
import '../../container.css'
import StockGrid from "../../StockGrid/StockGrid";
import {Header} from "../../Header/Header";
import axios from "axios";
import {connect, useDispatch} from "react-redux";
import mapStateToProps, {addFavorite} from "../../../features/user/userSlice";
import StockCard from "../../StockGrid/StockCard/StockCard";

async function add_favorites(symbol, username, dispatch) {
    let config = {
        method: 'post',
        url: 'http://localhost:9000/favorites/add',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            "username": username,
            "authorized": true,
            "symbol": symbol
        }
    };

    dispatch(addFavorite(symbol));
    await axios(config);
}

function Dash({ user, ...props }) {
    const [ symbol, set_symbol ] = useState({});
    let stock_cards = [];

    props.favorites.map((symbol) => {
        stock_cards.push(<StockCard key={symbol} symbol={symbol}/>);
    });


    return <div>
        <Header authorized={true} />
        <StockGrid stock_cards={stock_cards}/>
        <div className="center">
            <form onSubmit={() => {
                add_favorites(symbol, props.username, props.dispatch);
            }}>
                <input placeholder="Enter symbol" onChange={ (event) => { set_symbol(event.target.value) }}/>
            </form></div>
    </div>
}

export default connect(mapStateToProps)(Dash);