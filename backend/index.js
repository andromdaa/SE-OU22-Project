import express, {urlencoded} from 'express';
import session from 'express-session';
import mysql from 'mysql';
import MySQLStore from 'express-mysql-session';
import * as dotenv from 'dotenv';
import { router } from './routing.js';
import cors from 'cors';

dotenv.config();

// Load mysql session store, mysql and session configs
let mysqlStore = MySQLStore(session);

//  create the session store to access mysql session info
export let sessionStore = new mysqlStore({
    connectionLimit: 5,
    host: process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_PORT,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASS,
    database: process.env.REACT_APP_DB,
    expiration: 86400000,
    createDatabaseTable: true
});

function createDBConnection() {
    return mysql.createPool({
        connectionLimit: 5,
        host: process.env.REACT_APP_HOST,
        user: process.env.REACT_APP_USER,
        password: process.env.REACT_APP_PASS,
        database: process.env.REACT_APP_DB,
    });
}

export let connection = createDBConnection();

export let app = express();

app.use(session({
    name: "seproject",
    store: sessionStore,
    secret: process.env.REACT_APP_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 }
}));

app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(router);

// listening on this port
app.listen(8080, () => {
    console.log(`Listening on 8080`);
});

// use routing defined in different file
