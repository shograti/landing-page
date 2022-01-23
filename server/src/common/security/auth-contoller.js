const express = require('express');
const { LOG } = require('../logger');
const controller = express.Router();

function createAuthController(authService) {
    controller.post("/", async (req, res) => {
        try {
          const { email, password } = req.body;
          const token = await authService.getToken({ email, password });
          res.cookie("Authorization", token, { httpOnly: true });
          res.status(200).json({ token });
        } catch (error) {
          LOG.error(error);
          res.status(error.status()).json(error.body());
        }
    });
    return controller;
}

module.exports = { createAuthController };