const express = require("express");
const { HttpStatus } = require("../common");
const controller = express.Router();

function createAuthController(authService) {
    controller.post("/", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await authService.getToken({ email, password });
            res.cookie("Authorization", token, { httpOnly: true });
            res.status(HttpStatus.OK.code).json({ token });
        } catch (error) {
            next(error);
        }
    });
    return controller;
}

module.exports = { createAuthController };
