const express = require('express');
const { HttpStatus } = require('../common');
const { LOG } = require('../common');
const controller = express.Router();

function createUserController(auth, userService) {
    controller.post("/", async (req, res) => {
        try {
          const { email, password } = req.body;
          const id = await userService.createUser({ email, password });
          res.status(HttpStatus.CREATED.code).json({ id });
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).json(error.body());
        }
    });

    controller.get("/me", auth, async (req, res) => {
        try {
          const user = await userService.getCurrentUser(req.securityContext);
          res.status(HttpStatus.OK.code).json(user);
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).json(error.body());
        }
    });


    return controller;
}

module.exports = { createUserController };