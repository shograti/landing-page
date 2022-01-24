const express = require("express");
const { HttpStatus } = require("../common");
const controller = express.Router();

function createUserController(auth, userService) {
    controller.post("/", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const id = await userService.createUser({ email, password });
            res.status(HttpStatus.CREATED.code).json({ id });
        } catch (error) {
            next(error);
        }
    });

    controller.get("/me", auth, async (req, res, next) => {
        try {
            const user = await userService.getCurrentUser(req.securityContext);
            res.status(HttpStatus.OK.code).json(user);
        } catch (error) {
            next(error);
        }
    });


    return controller;
}

module.exports = { createUserController };
