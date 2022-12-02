import axios from "axios";
import express from "express";
const symRouter = express.Router();



function postToAPI(req, res, url='https://yfinance-stock-market-data.p.rapidapi.com/stock-info') {
    let encodedParams = new URLSearchParams(`symbol=${req.params.symbol}`);
    axios({
        method: 'POST',
        url: url,
        // TODO: DONT OPEN CONTAINS API SECRET KEYS
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'c67e30856dmsh1cea8d9474525e9p151f42jsn81088cb0c4ac',
            'X-RapidAPI-Host': 'yfinance-stock-market-data.p.rapidapi.com'
        },
        data: encodedParams
    })
        .then((data) => {
            if(req.params.requested !== "") res.status(200).send(JSON.stringify({ "data": data.data.data[req.params.requested] }))
            else res.status(200).send(JSON.stringify({ "data": data.data.data }));
        })
}

/**
 * @api {get} /api/:symbol/price
 * @apiName getPrice
 * @apiVersion 1.0.0
 * @apiDescription Get the current price of the passed symbol
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get("/api/:symbol/price", function (req, res) {
    // get the data from the api
    req.params.requested = 'currentPrice';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol
 * @apiName getSymbol
 d    * @apiVersion 1.0.0
 * @apiDescription Get all current data available about a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get("/api/:symbol", function (req, res) {
    // get the data from the api
    req.params.requested = '';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/price/bid
 * @apiName getBid
 * @apiVersion 1.0.0
 * @apiDescription Get the current bid price of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/price/bid', function (req, res) {
    // get the data from the api
    req.params.requested = 'bid';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/price/ask
 * @apiName getAsk
 * @apiVersion 1.0.0
 * @apiDescription Get the current ask price of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/price/ask', function (req, res) {
    // get the data from the api
    req.params.requested = 'ask';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/cap
 * @apiName getMarketCap
 * @apiVersion 1.0.0
 * @apiDescription Get the market cap. for a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
// MARKET CAP ROUTES
symRouter.get('/api/:symbol/cap', function (req, res) {
    // get the data from the api
    req.params.requested = 'marketCap';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/annual/change
 * @apiName getAnnualChange
 * @apiVersion 1.0.0
 * @apiDescription Get the annual change percentage of a stocks performance
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/annual/change', function (req, res) {
    // get the data from the api
    req.params.requested = '52WeekChange';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/annual/high
 * @apiName getAnnualHigh
 * @apiVersion 1.0.0
 * @apiDescription Get the annual high price of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/annual/high', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekHigh';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/annual/low
 * @apiName getPrice
 * @apiVersion 1.0.0
 * @apiDescription Get the annual low price of a stock
 * @apiParam {string} symbol - The symbol to get the price of
 */
symRouter.get('/api/:symbol/annual/low', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekLow';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/close/prev
 * @apiName getClose
 * @apiVersion 1.0.0
 * @apiDescription Get the price a stock closed at the previous day
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/close/prev', function (req, res) {
    // get the data from the api
    req.params.requested = 'previousClose';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/open
 * @apiName getOpen
 * @apiVersion 1.0.0
 * @apiDescription Get the price a stock opened at the current day
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/open', function (req, res) {
    // get the data from the api
    req.params.requested = 'regularMarketOpen';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/beta
 * @apiName getBeta
 * @apiVersion 1.0.0
 * @apiDescription Get the current beta value for a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/beta', function (req, res) {
    // get the data from the api
    req.params.requested = 'beta';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/earnings/growth
 * @apiName getEGrowth
 * @apiVersion 1.0.0
 * @apiDescription Get the earnings growth of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/earnings/growth', function (req, res) {
    // get the data from the api
    req.params.requested = 'earningsGrowth';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/revenue/growth
 * @apiName getRGrowth
 * @apiVersion 1.0.0
 * @apiDescription Get the revenue growth of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/revenue/growth', function (req, res) {
    // get the data from the api
    req.params.requested = 'revenueGrowth';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/address
 * @apiName getAddress
 * @apiVersion 1.0.0
 * @apiDescription Get the physical address of a stock's company HQ
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/address', function (req, res) {
    // get the data from the api
    req.params.requested = 'address1';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/earnings/quarter
 * @apiName getQEarnings
 * @apiVersion 1.0.0
 * @apiDescription Get the quarter earnings report of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/earnings/quarter', function (req, res) {
    // get the data from the api
    req.params.requested = 'earningsQuarterlyGrowth';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/volume
 * @apiName getVolume
 * @apiVersion 1.0.0
 * @apiDescription Get the volume of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/volume', function (req, res) {
    // get the data from the api
    req.params.requested = 'regularMarketVolume';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/sector
 * @apiName getSector
 * @apiVersion 1.0.0
 * @apiDescription Get the sector a stock belongs to
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/sector', function (req, res) {
    // get the data from the api
    req.params.requested = 'sector';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/dividend/yield
 * @apiName getDYield
 * @apiVersion 1.0.0
 * @apiDescription Get the dividend yield of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/dividend/yield', function (req, res) {
    // get the data from the api
    req.params.requested = 'trailingAnnualDividendYield';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/dividend/rate
 * @apiName getDRate
 * @apiVersion 1.0.0
 * @apiDescription Get the dividend rate of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/dividend/rate', function (req, res) {
    // get the data from the api
    req.params.requested = 'trailingAnnualDividendRate';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/volume/avg
 * @apiName getAvgVolume
 * @apiVersion 1.0.0
 * @apiDescription Get the average volume quantity of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/volume/avg', function (req, res) {
    // get the data from the api
    req.params.requested = 'averageVolume';
    postToAPI(req, res);
});

/**
 * @api {get} /api/:symbol/target/avg
 * @apiName getAvgTarget
 * @apiVersion 1.0.0
 * @apiDescription Get the average target price of a stock
 * @apiParam {string} symbol - The symbol of a stock that is recognized
 */
symRouter.get('/api/:symbol/target/avg', function (req, res) {
    // get the data from the api
    req.params.requested = 'targetMeanPrice';
    postToAPI(req, res);
});

export default symRouter;