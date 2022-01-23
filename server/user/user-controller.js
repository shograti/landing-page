const express = require('express');
const { LOG } = require('../common/logger');
const controller = express.Router();

function createUserController(auth, userService) {
    controller.post("/", async (req, res) => {
        try {
          const { email, password } = req.body;
          const id = await userService.createUser({ email, password });
          res.status(201).json({ id });
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).json(error.body());
        }
    });

    controller.get("/me", auth, async (req, res) => {
        try {
          const user = await userService.getCurrentUser(req.securityContext);
          res.status(200).json(user);
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).json(error.body());
        }
    });


    return controller;
}

module.exports = { createUserController };