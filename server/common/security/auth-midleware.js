const jwt = require("jsonwebtoken");

const config = process.env;

function createAuthenticationMiddleware(authService) {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.replace("Bearer ", "");
        try {
            const userInfo = jwt.verify(token, authService.getJwtSigninKey());
            req.securityContext = { userInfo };
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
    };
}

module.exports = { createAuthenticationMiddleware };