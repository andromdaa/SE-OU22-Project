import React, {useEffect, useState} from 'react';
import './stockdetailed.css'
import { postAPI } from "../../../utils";
import {useParams} from "react-router-dom";
let stock = {};

function fillValues(data, callback) {
    data = data.data.data;

    stock = {
        "prev_close":  data['previousClose'],
        "open": data['regularMarketOpen'],
        "beta": data['beta'],
        "bid": data['bid'],
        "earnings_growth": data['earningsGrowth'],
        "ask": data['ask'],
        "revenue_growth": data['revenueGrowth'],
        "annual_change": data['52WeekChange'],
        "address": data['address1'],
        "sector": data['sector'],
        "cap": data['marketCap'],
        "dividend_yield": data['trailingAnnualDividendYield'],
        "volume": data['regularMarketVolume'],
        "dividend_rate": data['trailingAnnualDividendRate'],
        "avg_volume": data['averageVolume'],
        "target_avg": data['targetMeanPrice']
    };

    callback(stock)
}

export function StockDetailed({ ...props }) {
    let [ data, setData ] = useState( {} );
    let { symbol } = useParams();

    console.log(symbol);

    useEffect(() => {
        const interval = setInterval(() => {
            postAPI(symbol).then((res) => fillValues(res, setData));
        }, 10000);

        return () => clearInterval(interval);
    }, [symbol])

    return (
        <div className="detailed">
            <table style={{ padding: '10px' }} >
                <tbody>
                    <tr>
                        <th>Prev. Close:</th>
                        <td>${data.prev_close}</td>
                        <th>Market Cap:</th>
                        <td>${data.cap}</td>
                    </tr>
                    <tr>
                        <th>Open:</th>
                        <td>${data.open}</td>
                        <th>Beta:</th>
                        <td>{data.beta}</td>
                    </tr>
                    <tr>
                        <th>Bid:</th>
                        <td>${data.bid}</td>
                        <th>Earnings Growth</th>
                        <td>{data.earnings_growth}%</td>
                    </tr>
                    <tr>
                        <th>Ask:</th>
                        <td>${data.ask}</td>
                        <th>Revenue Growth</th>
                        <td>{data.revenue_growth}%</td>
                    </tr>
                    <tr>
                        <th>Annual % Change</th>
                        <td>{data.annual_change}%</td>
                        <th>Physical Address</th>
                        <td>{data.address}</td>
                    </tr>
                    <tr>
                        <th>Sector</th>
                        <td>{data.sector}</td>
                        <th>Dividend Yield</th>
                        <td>{data.dividend_yield}%</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{data.volume}</td>
                        <th>Dividend Rate</th>
                        <td>{data.dividend_rate}%</td>
                    </tr>
                    <tr>
                        <th>Avg. Volume</th>
                        <td>{data.avg_volume}</td>
                        <th>Avg. Target</th>
                        <td>${data.target_avg}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
