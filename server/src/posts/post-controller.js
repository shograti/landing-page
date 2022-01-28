const express = require("express");
const { HttpStatus } = require("../common");
const controller = express.Router();

function createPostController(auth, postService) {
    controller.post("/", auth, async (req, res, next) => {
        try {
            const { img, content } = req.body;
            const id = await postService.createPost({ img, content });
            res.status(HttpStatus.CREATED.code).json({ id });
        } catch (error) {
            next(error);
        }
    });

    controller.get("/", async(req, res, next) => {
        try {
            const posts = await postService.getPosts();
            res.status(HttpStatus.OK.code).json({ data: posts });
        } catch (error) {
            next(error);
        }
    });

    controller.get("/:id", async(req, res, next) => {
        try {
            const post = await postService.getPost(req.params.id);
            res.status(HttpStatus.OK.code).json(post);
        } catch (error) {
            next(error);
        }
    });

    controller.delete("/:id", auth, async(req, res, next) => {
        try {
            await postService.deletePost(req.params.id);
            res.status(HttpStatus.NO_CONTENT.code).end();
        } catch (error) {
            next(error);
        }
    });

    controller.put("/:id", auth, async(req, res, next) => {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.status(HttpStatus.OK.code).end();
        } catch (error) {
            next(error);
        }
    });
    
    return controller;
}

module.exports = { createPostController };
