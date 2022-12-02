import express from 'express';
import {app, collection, db} from '../index.js';
import * as crypto from "crypto";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const saltRounds = 10;
dotenv.config();

function isAuthorized(req, res, next) {
    if(!req.body.authorized) {
        let err = new Error('not authorized');
        return next(err);
    } else return next();
}

// used to hash + salt password
function hashCredentials(input) {
    return new Promise(function (resolve) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(input, salt, function (err, hash) {
                resolve(hash);
            })
        });
    });
}

// used to generate random api keys for users
function generateKey(size = 64) {
    const buffer = crypto.randomBytes(size);
    return buffer.toString('base64');
}

export function add_favorite(req, res) {
    // no point in hashing username, already exposed in plain text
    let username = req.body.username;
    let symbol = req.body.symbol;

    // make sure the collection does not already contain the symbol
    let found = collection.findOne({ _id: username })
        .then((user) => {
            if(user.favorites.length >= 10 || user.favorites.includes(symbol)) return res.send({ status: "1" });
            else return res.send({ status: "0" });
        }).catch((err) => { return res.send({ status: "2" }) });

    collection.updateOne(
        { _id: username},
        {
            $addToSet: { favorites: symbol },
            $inc: { size: 1 }
        }
    );
}

export function remove_favorite(req, res) {
    // no point in hashing username, already exposed in plain text
    let username = req.body.username;
    let symbol = req.body.symbol;

    collection.updateOne({ _id: username }, {$pull: { favorites: { $in: [ symbol ] }}, $inc: { size: -1}})
        .then((data) => {
            return res.sendStatus(200);
        });
}

export async function get_user(req, res) {
    let username = req.body.username;

    await collection.findOne({ _id: username })
        .then((user) => {
            return res.send(JSON.stringify(user));
    });
}


export function login(req, res) {
    // no point in hashing username, already exposed in plain text
    let username = req.body.username;
    let password = req.body.password;

    // get the hash of the password
    collection.findOne({ _id: username })
        .then((data) => {     // user was found, check if passwords match
            bcrypt.compare(password, data.password, function (err, result) {
                if(result) {
                    req.body.authorized = true;
                    return res.sendStatus(200);
                } // if result is defined, then password matched
                else return res.sendStatus(401);
            });
        }).catch((err) => { return res.sendStatus(404)} );
}

export function logout(req, res) {
    req.body.authorized = false;
    return res.sendStatus(200);
}

export function register(req, res) {
    // no point in hashing username, already exposed in plain text
    let username = req.body.username;
    let password = req.body.password;

    // should really be handled with front end input checking
    if(username.length <= 0 || password.length < 6) return;

    hashCredentials(password)
        .then((hash) => {
            collection.insertOne({
                _id: username,
                password: hash,
                api_key: generateKey(),
                symbols: [],
                favorites: [],
                size: 0,
            })
                .then((data) => { return res.sendStatus(200) })
                .catch((err) => { return res.sendStatus(400) })
        });
}

export let authRouter = express.Router();

// leave it, the app breaks if its not here
authRouter.use((req, res, next) => next());

// user account authentication
authRouter.post("/login", (req, res) => login(req, res));
authRouter.post("/logout", (req, res) => logout(req, res));
authRouter.post("/register", (req, res) => register(req, res));
authRouter.post("/favorites/add", isAuthorized, (req, res) => add_favorite(req, res));
authRouter.post("/favorites/remove", isAuthorized, (req, res) => remove_favorite(req, res));
authRouter.post("/user", (req, res) => get_user(req, res));
