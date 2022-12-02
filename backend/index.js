import express, {urlencoded} from 'express';
import {MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import { authRouter } from './endpoints/authEndpoints.js';
import symRouter from './api/market_api.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";

dotenv.config();


function getCollection(name) {
    client.connect().catch((err) => console.log(err));
    let database = client.db("se_project");
    return database.collection(name);
}

function getDB() {
    return client.db("se_project");
}

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
export const collection = getCollection("users");
export const app = express();
export const db = getDB();

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
