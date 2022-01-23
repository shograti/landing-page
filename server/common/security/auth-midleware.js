const jwt = require("jsonwebtoken");
const { LOG } = require("../logger");

function createAuthenticationMiddleware(authService) {
    return (req, res, next) => {
        const clientAuth = req.headers["authorization"] || req.cookies["authorization"];
        if (!clientAuth) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = clientAuth.replace(RegExp("Bearer(\\s+)" ,"i"), "");

        try {
            const user = jwt.verify(token, authService.getJwtSigninKey());
            req.securityContext = { user };
        } catch (err) {
            LOG.error(err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
    };
}

module.exports = { createAuthenticationMiddleware };
