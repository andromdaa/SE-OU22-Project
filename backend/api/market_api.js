import axios from "axios";
import express from "express";
const symRouter = express.Router();

// setup rapid api
function postToAPI(req, res, url='https://yahoo-finance97.p.rapidapi.com/stock-info') {
    let encodedParams = new URLSearchParams(`symbol=${req.params.symbol}`);
    axios({
        method: 'POST',
        url: url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'eff657cf48msh5053e667b04a2f1p1a4b56jsncc706e317fc7',
            'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
        },
        data: encodedParams
    })
        .then((data) => res.status(200).send(JSON.stringify({ "data": data.data.data[req.params.requested] })))
}

// PRICE ROUTES

symRouter.post("/api/:symbol/price", function (req, res) {
    // get the data from the api
    req.params.requested = 'currentPrice';
    postToAPI(req, res);
});

symRouter.post('/api/:symbol/price/bid', function (req, res) {
    // get the data from the api
    req.params.requested = 'bid';
    postToAPI(req, res);
});

symRouter.post('/api/:symbol/price/ask', function (req, res) {
    // get the data from the api
    req.params.requested = 'ask';
    postToAPI(req, res);
});

// MARKET CAP ROUTES

symRouter.post('/api/:symbol/cap', function (req, res) {
    // get the data from the api
    req.params.requested = 'marketCap';
    postToAPI(req, res);
});

// ANNUAL ROUTES

symRouter.post('/api/:symbol/annual/change', function (req, res) {
    // get the data from the api
    req.params.requested = '52WeekChange';
    postToAPI(req, res);
});

symRouter.post('/api/:symbol/annual/high', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekHigh';
    postToAPI(req, res);
});

symRouter.post('/api/:symbol/annual/low', function (req, res) {
    // get the data from the api
    req.params.requested = 'fiftyTwoWeekLow';
    postToAPI(req, res);
});

export default symRouter;