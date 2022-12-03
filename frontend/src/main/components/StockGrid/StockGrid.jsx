import React, {useEffect} from 'react';
import '../../container.css'
import axios from "axios";
import {connect } from "react-redux";
import mapStateToProps, {setFavorites} from "../../../features/user/userSlice";

const StockGrid = ({ stock_cards, ...props }) => {

    // everytime the component is remounted, update the data with an api call
    useEffect( () => {
        // make async call
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

            // update the local state to reflect the users tracked symbols
            await axios(config).then((res) => {
                props.dispatch(setFavorites(res.data.favorites));
            });
        })();
    }, [props]);

    // what we are rendering
    return <div>
        <div className="center"><h3>Watchlist</h3></div>
        <div className="grid_container">
            { stock_cards }
        </div>
    </div>
};

export default connect(mapStateToProps)(StockGrid);
