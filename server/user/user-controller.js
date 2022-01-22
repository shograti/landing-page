const express = require('express');
const { LOG } = require('../common/logger');
const controller = express.Router();

function createUserController(userService) {
    controller.post("/", async (req, res) => {
        try {
          const { email, password } = req.body;
          const id = await userService.createUser({ email, password });
          res.status(201).json({ id });
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).send();
        }
    });

    return controller;
}

module.exports = { createUserController };