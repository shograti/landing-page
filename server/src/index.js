const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const { LOG } = require("./common");
const { createPostService, createPostController } = require("./posts");
const { createUserService, createUserController } = require("./user");
const { createAuthService, createAuthController, createAuthenticationMiddleware } = require("./security");
const { handleError } = require("./common/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

const HTTP_PORT = process.env["HTTP_PORT"] || 3001;

const db = mysql.createConnection({
    host: process.env["MYSQL_HOST"] || "localhost",
    user: process.env["MYSQL_USERNAME"] || "root",
    password: process.env["MYSQL_PASSWORD"] || "root",
    database: process.env["MYSQL_PASSWORD"] || "fermine",
});

const authService = createAuthService(db);
const authController = createAuthController(authService);
app.use("/auth", authController);

const auth = createAuthenticationMiddleware(authService);

const postService = createPostService(db);
const postController = createPostController(auth, postService);
app.use("/posts", postController);

const userService = createUserService(db);
const userController = createUserController(auth, userService);
app.use("/users", userController);

app.use((err, req, res, next) => {
    handleError(err, res, next);
});

app.listen(HTTP_PORT, () => {
    LOG.info(`Server running on port ${HTTP_PORT}`);
});
