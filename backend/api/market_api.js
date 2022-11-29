import axios from "axios";
import express from "express";
const symRouter = express.Router();

// TODO: look into using postToAPI as middleware for symRouter rather than calling it every single time

// setup Rapid API API
function postToAPI(req, res, url='https://yahoo-finance97.p.rapidapi.com/stock-info') {
    let encodedParams = new URLSearchParams(`symbol=${req.params.symbol}`);
    axios({
        method: 'POST',
        url: url,
        // TODO: DONT OPEN CONTAINS API SECRET KEYS
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'eff657cf48msh5053e667b04a2f1p1a4b56jsncc706e317fc7',
            'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
        },
        data: encodedParams
    })
        // TODO: Flatten this
        .then((data) => res.status(200).send(JSON.stringify({ "data": data.data.data[req.params.requested] })))
}

// ### PRICES ####
// TODO: make the route .../price/current then have .../symbol/price return current, bid, ask
symRouter.get("/api/:symbol/price", function (req, res) {
    // get the data from the api
    req.params.requested = 'currentPrice';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/price/bid', function (req, res) {
    // get the data from the api
    req.params.requested = 'bid';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/price/ask', function (req, res) {
    // get the data from the api
    req.params.requested = 'ask';
    postToAPI(req, res);
});

// MARKET CAP ROUTES
symRouter.get('/api/:symbol/cap', function (req, res) {
    // get the data from the api
    req.params.requested = 'marketCap';
    postToAPI(req, res);
});

// ANNUAL ROUTES
// TODO: add percentage option to all annual routes

symRouter.get('/api/:symbol/annual/change', function (req, res) {
    // get the data from the api
    req.params.requested = '52WeekChange';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/annual/high', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekHigh';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/annual/low', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekLow';
    postToAPI(req, res);
});


symRouter.get('/api/:symbol/close/prev', function (req, res) {
    // get the data from the api
    req.params.requested = 'previousClose';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/open', function (req, res) {
    // get the data from the api
    req.params.requested = 'regularMarketOpen';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/beta', function (req, res) {
    // get the data from the api
    req.params.requested = 'beta';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/earnings/growth', function (req, res) {
    // get the data from the api
    req.params.requested = 'earningsGrowth';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/revenue/growth', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekLow';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/address', function (req, res) {
    // get the data from the api
    req.params.requested = 'address1';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/earnings/quarter', function (req, res) {
    // get the data from the api
    req.params.requested = 'earningsQuarterlyGrowth';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/volume', function (req, res) {
    // get the data from the api
    req.params.requested = 'regularMarketVolume';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/sector', function (req, res) {
    // get the data from the api
    req.params.requested = 'sector';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/dividend/yield', function (req, res) {
    // get the data from the api
    req.params.requested = 'trailingAnnualDividendYield';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/dividend/rate', function (req, res) {
    // get the data from the api
    req.params.requested = 'trailingAnnualDividendRate';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/volume/avg', function (req, res) {
    // get the data from the api
    req.params.requested = 'averageVolume';
    postToAPI(req, res);
});

symRouter.get('/api/:symbol/target/avg', function (req, res) {
    // get the data from the api
    req.params.requested = 'targetMeanPrice';
    postToAPI(req, res);
});

// TODO: add weekly, monthly, quarter, bi-annual
// custom time frames rather than predefined?

export default symRouter;