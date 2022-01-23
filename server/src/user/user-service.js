const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const { TechnicalError, ConflictError, UnauthorizedError } = require('../common/exceptions');
const { LOG } = require("../common/logger");
const { Roles } = require("../security/roles");

function mapUser(user) {
    return {
        id: user.user_id,
        email: user.user_email,
        role: user.user_role,
    }
}

function createUserService (db) {
    const query = promisify(db.query.bind(db));
      
    return {
        async createUser({ email, password }) {
            const hash = await bcrypt.hash(password, 10);
            const role = Roles.USER;
            try {
                const user = await query("INSERT INTO users (user_email, user_password, user_role) VALUES (?,?,?)", [email, hash, role]);
                return user.id;
            } catch (error) {
                LOG.error(error);
                if (error.code === 'ER_DUP_ENTRY') {
                    throw new ConflictError(`Email ${email} is already attached to an account`);
                }
                throw new TechnicalError();
            }
        },
        async getCurrentUser(securityContext) {
            if (!securityContext) {
                throw new UnauthorizedError();
            }
            try {
                const [user] = await query("SELECT * FROM users WHERE user_id = ?", [securityContext.user.id])
                return mapUser(user);
            } catch (error) {
                LOG.error(error);
                throw new TechnicalError();
            }
        }
    };
}

module.exports = { createUserService }