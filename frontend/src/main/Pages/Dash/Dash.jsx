import React, {useEffect, useState} from 'react';
import '../../container.css'
import StockGrid from "../../components/StockGrid/StockGrid";
import {Header} from "../../components/Header/Header";
import axios from "axios";
import {connect, useDispatch} from "react-redux";
import mapStateToProps, {addFavorite, setUsername} from "../../../features/user/userSlice";
import StockCard from "../../components/StockGrid/StockCard/StockCard";
import {TextField} from "@mui/material";

// async call to api to add a symbol to user's favorites
async function add_favorites(symbol, username, dispatch) {
    dispatch(addFavorite(symbol));

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

    await axios(config);
}

function Dash({ user, ...props }) {
    const [ symbol, set_symbol ] = useState({});
    let stock_cards = [];

    /*
        every symbol that is present in their favorites list,
        create a StockCard element and push it to the stock_cards list for later rendering
     */

    props.favorites.map((symbol) => {
        stock_cards.push(<StockCard key={symbol} symbol={symbol}/>);
    });

    // when enter is pressed we want to add the symbol to favorites
    const handleSearch = (event) => {
        if(symbol.length <= 0) return;

        if(event.keyCode === 13) {
            add_favorites(symbol, props.username, props.dispatch);
        }
    }

    // what we are rendering
    return <div>
        <Header authorized={true} />
        <StockGrid stock_cards={stock_cards}/>
        <div className="center">
            <TextField sx={{ mb: '4%' }} placeholder="Add stock symbol" onChange={ (event) => set_symbol(event.target.value) } onKeyDown={(event) => handleSearch(event)}></TextField>
        </div>
    </div>
}

export default connect(mapStateToProps)(Dash);