const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../common");
const { LOG } = require("../common");

function unfoldToken(req) {
    if (req.cookiers && req.cookies["authorization"]) {
        return req.cookies["authorization"];
    }
    if (req.headers["authorization"]) {
        return req.headers["authorization"].replace(RegExp("Bearer(\\s+)" ,"i"), "");
    }
    throw new UnauthorizedError();
}

function createAuthenticationMiddleware(authService) {
    return (req, res, next) => {
        try {
            const token = unfoldToken(req);
            const user = jwt.verify(token, authService.getJwtSigninKey());
            req.securityContext = { user };
            return next();
        } catch (error) {
            LOG.error(error);
            next(new UnauthorizedError());
        }
    };
}

module.exports = { createAuthenticationMiddleware };
