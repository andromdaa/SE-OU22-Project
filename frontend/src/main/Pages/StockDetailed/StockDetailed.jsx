import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createWorkerFactory, useWorker} from '@shopify/react-web-worker';
import './stockdetailed.css'
import {Box, Button, Grid, Paper} from "@mui/material";

function fillValues(data) {
    return {
        "prev_close":  data['previousClose'],
        "open": data['regularMarketOpen'],
        "beta": data['beta'],
        "bid": data['bid'],
        "earnings_growth": data['earningsGrowth'],
        "ask": data['ask'],
        "day_high": data['dayHigh'],
        "day_low": data['dayLow'],
        "annual_change": data['52WeekChange'],
        "total_cash": data['totalCash'],
        "sector": data['sector'],
        "cap": data['marketCap'],
        "dividend_yield": data['trailingAnnualDividendYield'],
        "volume": data['regularMarketVolume'],
        "profit_margins": data['profitMargins'],
        "avg_volume": data['averageVolume'],
        "target_avg": data['targetMeanPrice']
    };
}

// the view when you left click on a stock
export function StockDetailed({ ...props }) {
    let [ data, setData ] = useState( {} );
    let { symbol } = useParams();
    const navigate = useNavigate();

    const formatter = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
    });

    // create a worked for the component that will fetch its most recent data
    const createWorker = createWorkerFactory(() => import('../../workers/api.worker'));
    const worker = useWorker(createWorker);

    // track update to cause 5 second delay effect
    // update stock information that is rendered to latest
    let update = 0;
    useEffect(() => {
        ( async () => {
            const message = await worker.default({
                url: `http://localhost:9000/api/${symbol}`,
                options: {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            });

            let data = fillValues(message.data);
            setData(data);
        })();

        setTimeout(() => update++, 5000);
    }, [update, worker, symbol]);

    // what we are rendering - Grid and Paper are from MUI (https://mui.com/material-ui/)
    return (
        <Grid container display="flex" justifyContent="center" alignContent="center">
            <Paper elevation={8} style={{ padding:'10px', marginTop: '10%' }}>
                <h1 style={{ textAlign: "center" }}>{symbol}</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Prev. Close:</th>
                            <td>{formatter.format(parseFloat(data.prev_close))}</td>
                            <th>Market Cap:</th>
                            <td>{formatter.format(data.cap)}</td>
                        </tr>
                        <tr>
                            <th>Open:</th>
                            <td>{formatter.format(parseFloat(data.open))}</td>
                            <th>Beta:</th>
                            <td>{parseFloat(data.beta).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Bid:</th>
                            <td>{formatter.format(parseFloat(data.bid))}</td>
                            <th>Earnings Growth:</th>
                            <td>{data.earnings_growth ? parseFloat(data.earnings_growth) + "%" : "Not Tracked"}</td>
                        </tr>
                        <tr>
                            <th>Ask:</th>
                            <td>{formatter.format(parseInt(data.ask))}</td>
                            <th>Day's High:</th>
                            <td>{formatter.format(parseFloat(data.day_high).toFixed(2))}</td>
                        </tr>
                        <tr>
                            <th>Annual Change:</th>
                            <td>{parseFloat(data.annual_change).toFixed(2)}%</td>
                            <th>Day's Low:</th>
                            <td>{formatter.format(parseFloat(data.day_low).toFixed(2))}</td>
                        </tr>
                        <tr>
                            <th>Sector:</th>
                            <td>{data.sector}</td>
                            <th>Total Cash:</th>
                            <td>{formatter.format(parseInt(data.total_cash).toFixed(2))}</td>
                        </tr>
                        <tr>
                            <th>Volume:</th>
                            <td>{data.volume}</td>
                            <th>Profit Margins:</th>
                            <td>{parseFloat(data.profit_margins).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th>Avg. Volume:</th>
                            <td>{data.avg_volume}</td>
                            <th>Avg. Target:</th>
                            <td>{formatter.format(parseFloat(data.target_avg))}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ textAlign: "center" }}> <Button sx={{ m: '4%' }} variant="outlined" onClick={ () => navigate(-1) }>Go Back</Button> </div>
            </Paper>
        </Grid>
    );
}
