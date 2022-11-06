import express from 'express';
import { collection } from '../index.js';
import * as crypto from "crypto";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const saltRounds = 10;
dotenv.config();

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

export function login(req, res) {
    // no point in hashing username, already exposed in plain text
    let username = req.body.username;
    let password = req.body.password;

    // get the hash of the password
    collection.findOne({ _id: username })
        .then((data) => {     // user was found, check if passwords match
            bcrypt.compare(password, data.password, function (err, result) {
                if(result) return res.sendStatus(200); // if result is defined, then password matched
                else return res.sendStatus(401);
            });
        }).catch(() => { return res.sendStatus(404)} );
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
                watched_symbols: {}
            })
                .then(() => { return res.sendStatus(200) })
                .catch(() => { return res.sendStatus(400) })
        });
}

export let authRouter = express.Router();

// leave it, the app breaks if its not here
authRouter.use((req, res, next) => next());
// user account authentication
authRouter.post("/login", (req, res) => login(req, res));
authRouter.post("/register", (req, res) => register(req, res));

