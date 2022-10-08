const crypto = require("crypto-js");
const mysql = require('mysql');
const fs = require('fs');

let connection = createDBConnection();

function createDBConnection() {
    let config = JSON.parse(fs.readFileSync('../configs/mysql.cnf', 'utf-8'));

    return mysql.createPool({
        connectionLimit: 5,
        host: config['host'],
        user: config['user'],
        password: config['pass'],
        database: config['db']
    });
}

function hashCredentials(input) {
    let hashed = crypto.SHA3(input);
    return hashed.toString(crypto.enc.Hex);
}

function createUserSuccess_callback() {
    console.log("Success");
}

function createUserFailure_callback() {
    console.log("Failure");
}

function loginSuccess_callback() {
    console.log("Success");

}

function loginFailure_callback() {
    console.log("Failure");
}

function login(username, password) {
    let user = hashCredentials(username);
    let pass = hashCredentials(password);

    connection.query(`SELECT password FROM login_info WHERE username = "${user}"`, (err, result) => {
        if (err != null || result.length <= 0) loginFailure_callback();
        else if(result[0].password !== undefined && result[0].password === pass) loginSuccess_callback();
        else loginFailure_callback();
    });
}

function createUser(username, password) {
    let user = hashCredentials(username);
    let pass = hashCredentials(password);

    connection.query(`INSERT INTO login_info (username, password) VALUES ("${user}", "${pass}")`, (error, results) => {
        if (error != null || results.length <= 0) createUserFailure_callback();
        else if(results[0].password !== undefined && results[0].password === pass) createUserSuccess_callback();
        else createUserFailure_callback();
    });

    throw 'Database Connection Seems To Be Down';
}


login("andromda", "Chiefs933!");

return 0;