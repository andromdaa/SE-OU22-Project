import express from 'express';
import { login, register } from "./loginSystem.js";

export let router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post("/login", (req, res) => {
    login(req, res)
});

router.put("/register", (req, res) => {
    register(req, res)
});