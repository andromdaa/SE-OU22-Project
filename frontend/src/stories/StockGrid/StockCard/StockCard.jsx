import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import './stockcard.css';
import {postAPI} from "../../../utils";
import axios from "axios";
import mapStateToProps, {removeFavorite, setFavorites, setSymbols} from "../../../features/user/userSlice";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createWorkerFactory, useWorker} from "@shopify/react-web-worker";

const StockCard = ({ symbol, ...props }) => {
    const [ gain, setGain ] = useState(false);
    const [ full_name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ pChange, setChange ] = useState(0);

    const navigate = useNavigate();
    const createWorker = createWorkerFactory(() => import('../../workers/api.worker'));
    const worker = useWorker(createWorker);

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

            setGain(parseInt(message.previousClose) < parseInt(message.currentPrice));
            setName(symbol);
            setPrice(message.ask);

            let change = parseInt(message.previousClose) - parseInt(message.currentPrice);
            change /= parseInt(message.previousClose);
            change *= 100;
            setChange(Math.abs(change));

        })();

        setTimeout(() => update++, 5000);
    }, [update]);

    // remove stock when clicked
    let handleClick = async (symbol, username, e) => {
        if(e.type === 'click') {
            navigate(`/stock/detailed/${symbol}`);
        } else if(e.type === 'contextmenu') {
            e.preventDefault();

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

            await axios(config).then((res) => {
                props.dispatch(removeFavorite(symbol));
            });
        }
    }

    return (
        <div className="grid_items card grow"
             onClick={ (event) => handleClick(symbol, props.username, event) }
             onContextMenu={ (event) => handleClick(symbol, props.username, event) }>
            <Box elevation={8} sx={{
                borderRadius: '10px',
            }}>
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

export default connect(mapStateToProps)(StockCard);
