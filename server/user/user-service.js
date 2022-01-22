const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const { TechnicalError, ConflictError } = require('../common/exceptions');
const { LOG } = require("../common/logger");

function mapUser(user) {
    return {
        email: user.user_email,
        role: user.user_role,
    }
}

function createUserService (db) {
    const query = promisify(db.query.bind(db));
      
    return {
        async createUser({ email, password }) {
            const hash = await bcrypt.hash(password, 10);
            const role = 'USER';
            try {
                const user = await query("INSERT INTO users (user_email, user_password, user_role) VALUES (?,?,?)", [email, hash, role]);
                return user.id;
            } catch (error) {
                LOG.error(error);
                throw new TechnicalError();
            }
        },
    };
}

module.exports = { createUserService }