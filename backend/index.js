import express, {urlencoded} from 'express';
import {MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import { authRouter } from './endpoints/authEndpoints.js';
import symRouter from './api/market_api.js';

import cors from 'cors';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function getCollection(name) {
    client.connect().catch((err) => console.log(err));
    let database = client.db("se_project");
    return database.collection(name);
}

export let collection = getCollection("users");
export let app = express();

app.use(cors({
    origin: '*',
}));

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(symRouter);
app.use(authRouter);

// listening on this port
app.listen(9000, () => {
    console.log(`Listening on 9000`);
});
