import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import './stockcard.css';
import {postAPI} from "../../../utils";
import axios from "axios";
import mapStateToProps, {removeFavorite, setFavorites, setSymbols} from "../../../features/user/userSlice";
import {connect} from "react-redux";
import {navigate} from "@storybook/addon-links";
import {useNavigate} from "react-router-dom";

const StockCard = ({ symbol, ...props }) => {
    const [ gain, setGain ] = useState(false);
    const [ full_name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ pChange, setChange ] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            postAPI(symbol).then((res) => {
                res = res.data.data;
                setGain(parseInt(res.previousClose) < parseInt(res.currentPrice));
                setName(symbol);
                setPrice(res.ask);

                let change = parseInt(res.previousClose) - parseInt(res.currentPrice);
                change /= parseInt(res.previousClose);
                change *= 100;
                setChange(Math.abs(change));
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [symbol]);

    // remove stock when clicked
    let handleClick = async (symbol, username, e) => {
        if(e.type === 'click') {
            navigate(`/stock/detailed/${symbol}`);
        } else if(e.type === 'contextmenu') {
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
        <div className="grid_items card"
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
