import { app, connection } from './index.js';
import sha3 from 'crypto-js/sha3.js';
import Hex from 'crypto-js/enc-hex.js';

function hashCredentials(input) {
    let hashed = sha3(input);
    return hashed.toString(Hex);
}

 function registerSuccess_callback(req, res) {
    login(req, res);
 }

 function registerFailure_callback(req, res) {
    console.log("Failure");
    res.sendStatus(400);
 }

 function loginSuccess_callback(req, res, username) {
    req.session.user = username;
    res.redirect('/dashboard');
 }

 function loginFailure_callback(req, res) {
    console.log("Failure");
    res.sendStatus(400);
 }

export function login(req, res) {
    let user = hashCredentials(req.body.username);
    let pass = hashCredentials(req.body.password);

    connection.query(`SELECT password FROM login_info WHERE username = "${user}"`, (err, result) => {
        if (err != null || result.length <= 0) loginFailure_callback(req, res);
        else if(result[0].password !== undefined && result[0].password === pass) loginSuccess_callback(req, res, user);
        else loginFailure_callback(req, res);
    });
}

export function register(req, res) {
    let user = hashCredentials(req.body.username);
    let pass = hashCredentials(req.body.password);

    connection.query(`INSERT INTO login_info (username, password) VALUES ("${user}", "${pass}")`, (error) => {
        if (error != null) registerFailure_callback(req, res);
        else registerSuccess_callback(req, res);
    });
}
