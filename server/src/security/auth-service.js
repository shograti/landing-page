const { promisify } = require("util");
const { TechnicalError, UnauthorizedError } = require("../common");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { LOG } = require("../common");

const JWT_SIGNIN_KEY = process.env["JWT_SIGNING_KEY"] || crypto.randomBytes(16).toString("hex");

function createAuthService(db) {
    const query = promisify(db.query.bind(db));
    const comparePasswords = promisify(bcrypt.compare);

    return {
        async getToken({ email, password }) {
            try {
                const [user] = await query("SELECT * FROM users WHERE user_email = ?", [email]);
                if (!user) {
                    throw new UnauthorizedError();
                }

                const isAuthenticated = await comparePasswords(password, user.user_password);
                if (!isAuthenticated) {
                    throw new UnauthorizedError();
                }

                return jwt.sign({ id: user.user_id, email: user.user_email, role: user.user_role }, JWT_SIGNIN_KEY, { expiresIn: "24h" });
            } catch (error) {
                LOG.error(error);
                throw error instanceof UnauthorizedError ? error : new TechnicalError();
            }
        },
        getJwtSigninKey() {
            return JWT_SIGNIN_KEY;
        }    
    };
}

module.exports = { createAuthService };