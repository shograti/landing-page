const express = require('express');
const controller = express.Router();

function createPostController(postService) {
    controller.post("/", async (req, res) => {
        try {
          const { img, content } = req.body;
          const id = await postService.createPost({ img, content });
          res.status(201).json({ id });
        } catch (error) {
          res.status(error.status()).send();
        }
    });

    controller.get("/", async(_, res) => {
        try {
            const posts = await postService.getPosts();
            res.status(200).json({ data: posts });
        } catch (error) {
            res.status(error.status()).send();
        }
    });

    return controller;
}

module.exports = { createPostController };