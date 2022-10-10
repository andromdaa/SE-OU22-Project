import express from 'express';
import { login, register, logout } from "./loginSystem.js";

export let router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post("/login", (req, res) => {
    login(req, res);
});

router.post("/register", (req, res) => {
    register(req, res);
});

router.post("/logout", (req, res) => {
    logout(req, res);
});