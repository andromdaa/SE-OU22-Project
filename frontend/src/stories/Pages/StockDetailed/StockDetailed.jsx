import React, {useEffect, useState} from 'react';
import './stockdetailed.css'
import {useParams} from "react-router-dom";
import {createWorkerFactory, useWorker} from '@shopify/react-web-worker';

function fillValues(data) {
    console.log(data);

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

export function StockDetailed({ ...props }) {
    let [ data, setData ] = useState( {} );
    let { symbol } = useParams();

    const formatter = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
    });

    const createWorker = createWorkerFactory(() => import('../../workers/api.worker'));
    const worker = useWorker(createWorker);

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
    }, [update]);

    return (
        <div className="detailed">
            <table style={{ padding: '10px' }} >
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
                        <th>Earnings Growth</th>
                        <td>{data.earnings_growth ? parseFloat(data.earnings_growth) + "%" : "Not Tracked"}</td>
                    </tr>
                    <tr>
                        <th>Ask:</th>
                        <td>{formatter.format(parseInt(data.ask))}</td>
                        <th>Day's High</th>
                        <td>{formatter.format(parseFloat(data.day_high).toFixed(2))}</td>
                    </tr>
                    <tr>
                        <th>Annual % Change</th>
                        <td>{parseFloat(data.annual_change).toFixed(2)}%</td>
                        <th>Day's Low</th>
                        <td>{formatter.format(parseFloat(data.day_low).toFixed(2))}</td>
                    </tr>
                    <tr>
                        <th>Sector</th>
                        <td>{data.sector}</td>
                        <th>Total Cash</th>
                        <td>{formatter.format(parseInt(data.total_cash).toFixed(2))}</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{data.volume}</td>
                        <th>Profit Margins</th>
                        <td>{parseFloat(data.profit_margins).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <th>Avg. Volume</th>
                        <td>{data.avg_volume}</td>
                        <th>Avg. Target</th>
                        <td>{formatter.format(parseFloat(data.target_avg))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
