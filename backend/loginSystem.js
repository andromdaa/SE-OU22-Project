import { app, connection } from './index.js';
import sha3 from 'crypto-js/sha3.js';
import Hex from 'crypto-js/enc-hex.js';

function hashCredentials(input) {
    let hashed = sha3(input);
    return hashed.toString(Hex);
}

 function registerSuccess_callback(req, res) {
     res.sendStatus(200);
 }

 function registerFailure_callback(req, res) {
    res.sendStatus(400);
 }

 function loginSuccess_callback(req, res) {
    req.session.authed = true;
    res.sendStatus(200);
 }

 function loginFailure_callback(req, res) {
    res.sendStatus(400);
 }

export function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

export function login(req, res) {
    let user = hashCredentials(req.body.username);
    let pass = hashCredentials(req.body.password);

    connection.query(`SELECT password FROM login_info WHERE username = "${user}"`, (err, result) => {
        if (err != null || result.length <= 0) loginFailure_callback(req, res);
        else if(result[0].password !== undefined && result[0].password === pass) loginSuccess_callback(req, res);
        else loginFailure_callback(req, res);
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
