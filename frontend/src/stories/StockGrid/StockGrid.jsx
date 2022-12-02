import React, {useEffect, useState} from 'react';
import '../container.css'
import axios from "axios";
import {connect, useSelector} from "react-redux";
import mapStateToProps, {setFavorites, setSymbols} from "../../features/user/userSlice";

const StockGrid = ({ stock_cards, ...props }) => {
    // todo:
    //  - populate favorites / watched symbols
    //  - click to open detailed stock view (detailed stock view page that makes call to api and then just push that to history?)

    useEffect( () => {
        (async () => {
            let config = {
                method: 'post',
                url: 'http://localhost:9000/user',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    "username": props.username,
                    "authorized": true
                }
            };

            await axios(config).then((res) => {
                props.dispatch(setFavorites(res.data.favorites));
                props.dispatch(setSymbols(res.data.symbol));
            });

        })();
    }, []);

    return <div>
        <div className="center"><h3>Watchlist</h3></div>
        <div className="grid_container">
            { stock_cards }
        </div>
    </div>
};

export default connect(mapStateToProps)(StockGrid);
