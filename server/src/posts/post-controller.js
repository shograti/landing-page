const express = require("express");
const { HttpStatus, LOG } = require("../common");
const controller = express.Router();

function createPostController(auth, postService) {
    controller.post("/", auth, async (req, res) => {
        try {
            const { img, content } = req.body;
            const id = await postService.createPost({ img, content });
            res.status(HttpStatus.CREATED.code).json({ id });
        } catch (error) {
            res.status(error.status()).json(error.body());
        }
    });

    controller.get("/", async(_, res) => {
        try {
            const posts = await postService.getPosts();
            res.status(HttpStatus.OK.code).json({ data: posts });
        } catch (error) {
            res.status(error.status()).json(error.body());
        }
    });

    controller.get("/:id", async(req, res) => {
        try {
            const post = await postService.getPost(req.params.id);
            res.status(HttpStatus.OK.code).json(post);
        } catch (error) {
            res.status(error.status()).json(error.body());
        }
    });

    controller.delete("/:id", auth, async(req, res) => {
        try {
            await postService.deletePost(req.params.id);
            res.status(HttpStatus.NO_CONTENT.code).end();
        } catch (error) {
            res.status(error.status()).json(error.body());
        }
    });

    controller.put("/:id", auth, async(req, res) => {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.status(HttpStatus.OK.code).end();
        } catch (error) {
            res.status(error.status()).json(error.body());
        }
    });


    return controller;
}

module.exports = { createPostController };