import {app, connection} from './index.js';
import sha3 from 'crypto-js/sha3.js';
import Hex from 'crypto-js/enc-hex.js';

function hashCredentials(input) {
    let hashed = sha3(input);
    return hashed.toString(Hex);
}

// remove uHash and pHash, this is to show off data being input into the database for the class demo
function registerSuccess_callback(req, res) {
    return res.sendStatus(200);
}

function registerFailure_callback(req, res) {
    return res.send(401);
}

function loginSuccess_callback(req, res) {
    return res.send(200);
}

function loginFailure_callback(req, res) {
    return res.send(401);
}

export function logout(req, res) {
    return res.sendStatus(200);
}

export function login(req, res) {
    let user = hashCredentials(req.body.username);
    let pass = hashCredentials(req.body.password);

    connection.query(`SELECT password FROM login_info WHERE username = "${user}"`, (err, result) => {
        if (err != null || result.length <= 0 || result[0].password !== pass) loginFailure_callback(req, res);
        else loginSuccess_callback(req, res);
    });
}

export function register(req, res) {
    let user = hashCredentials(req.body.username);
    let pass = hashCredentials(req.body.password);

    connection.query(`INSERT INTO login_info (username, password) VALUES ("${user}", "${pass}")`, (err) => {
        if (err != null) registerFailure_callback(req, res);
        else registerSuccess_callback(req, res);
    });
}
