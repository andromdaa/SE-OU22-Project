import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import './stockcard.css';
import axios from "axios";
import mapStateToProps, {removeFavorite} from "../../../../features/user/userSlice";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createWorkerFactory, useWorker} from "@shopify/react-web-worker";

const StockCard = ({ symbol, ...props }) => {
    // used for state and setting state
    const [ gain, setGain ] = useState(false);
    const [ full_name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ pChange, setChange ] = useState(0);
    const navigate = useNavigate();

    // creates a web worker so that stocks update independently
    const createWorker = createWorkerFactory(() => import('../../../workers/api.worker'));
    const worker = useWorker(createWorker);

    // whenever the component is mounted, then every 5 seconds, update the stock information from the api
    let update = 0;
    useEffect(() => {
        ( async () => {
            let message = await worker.default({
                url: `http://localhost:9000/api/${symbol}`,
                options: {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            });

            message = message.data;

            // set the set values (to be used in the return value for rendering)

            setGain(parseInt(message.previousClose) < parseInt(message.currentPrice));
            setName(symbol);
            setPrice(message.ask);

            let change = parseInt(message.previousClose) - parseInt(message.currentPrice);
            change /= parseInt(message.previousClose);
            change *= 100;
            setChange(Math.abs(change));

        })();

        // set timeout, will cause update to increment every 5 seconds
        setTimeout(() => update++, 5000);
    }, [update, symbol, worker]); // this function depends on update to change to fire, so every 5 seconds update causes it to fire

    let handleClick = async (symbol, username, e) => {
        if(e.type === 'click') {
            navigate(`/stock/detailed/${symbol}`);
        } else if(e.type === 'contextmenu') {  // remove stock when right clicked
            e.preventDefault(); // prevent default r click menu

            // remove it locally for "speed"
            props.dispatch(removeFavorite(symbol));

            // define request options
            let config = {
                method: 'post',
                url: 'http://localhost:9000/favorites/remove',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    "symbol": symbol,
                    "username": username,
                    "authorized": true
                }
            };

            // reflect local change in the database
            await axios(config).then();

        }
    }

    // what we are rendering - Box and Typography and from MUI (https://mui.com/material-ui/)
    return (
        <div className="grid_items card grow"
             onClick={ (event) => handleClick(symbol, props.username, event) }
             onContextMenu={ (event) => handleClick(symbol, props.username, event) }>
            <Box elevation={8} sx={{ borderRadius: '10px' }}>
                <Box>
                    <Typography color="#333333" variant="subtitle2"><strong>{ symbol }</strong></Typography>
                    <Typography color="#999999" variant="caption">{ full_name }</Typography>
                </Box>
                <Box>
                    <Typography color="#333333" variant="subtitle1"><strong>{ price }</strong>
                    <Typography color={ gain ? "#73e0bb" : "#FF5733" } variant="caption">
                        <strong> {gain ? "+" : "-"}{pChange.toFixed(2)}%</strong></Typography>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

// connecting to our redux store which maps the state to our props (props.username)
export default connect(mapStateToProps)(StockCard);
