const { HttpStatus } = require("./http-status");

class ApiError extends Error {
    #status;
    #message;

    constructor(status, message) {
        super();
        this.#status = status;
        this.#message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.#bindMethods();
    }

    status() {
        return this.#status;
    }

    body() {
        return this.#message ? { message: this.#message } : { message: "No Details" };
    }

    #bindMethods() {
        this.status = this.status.bind(this);
        this.body = this.body.bind(this);
    }
}

class TechnicalError extends ApiError {
    constructor(message = HttpStatus.INTERNAL_SERVER_ERROR.message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR.code, message);
    }
}

class UnauthorizedError extends ApiError {
    constructor(message = HttpStatus.UNAUTHORIZED.message) {
        super(HttpStatus.UNAUTHORIZED.code, message);
    }
}

class ForbiddenError extends ApiError {
    constructor(message = HttpStatus.FORBIDDEN.message) {
        super(HttpStatus.FORBIDDEN.code, message);
    }
}

class BadRequestError extends ApiError {
    constructor(message = HttpStatus.BAD_REQUEST.message) {
        super(HttpStatus.BAD_REQUEST.code, message);
    }
}


class NotFoundError extends ApiError {
    constructor(message = HttpStatus.NOT_FOUND.message) {
        super(HttpStatus.NOT_FOUND.code, message);
    }
}

class ConflictError extends ApiError {
    constructor(message = HttpStatus.CONFLICT.message) {
        super(HttpStatus.CONFLICT.code, message);
    }
}

module.exports = { ApiError, TechnicalError, UnauthorizedError, ConflictError, NotFoundError, BadRequestError, ForbiddenError };

