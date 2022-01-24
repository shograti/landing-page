const { HttpStatus } = require("./http-status");

function ApiErrorMixin(clazz) {
    return class extends Error {
        #status;
        #message;

        constructor(status, message) {
            super();
            this.#status = status;
            this.#message = message;
            this.status = this.status.bind(this);
            this.body = this.body.bind(this);
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, clazz);
            }
        }

        status() {
            return this.#status;
        }

        body() {
            return this.#message ? { message: this.#message } : { message: "No Details" };
        }
    };
}

class TechnicalError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.INTERNAL_SERVER_ERROR.message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR.code, message);
    }
}

class UnauthorizedError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.UNAUTHORIZED.message) {
        super(HttpStatus.UNAUTHORIZED.code, message);
    }
}

class ForbiddenError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.FORBIDDEN.message) {
        super(HttpStatus.FORBIDDEN.code, message);
    }
}

class BadRequestError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.BAD_REQUEST.message) {
        super(HttpStatus.BAD_REQUEST.code, message);
    }
}


class NotFoundError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.NOT_FOUND.message) {
        super(HttpStatus.NOT_FOUND.code, message);
    }
}

class ConflictError extends ApiErrorMixin(Error) {
    constructor(message = HttpStatus.CONFLICT.message) {
        super(HttpStatus.CONFLICT.code, message);
    }
}

module.exports = { TechnicalError, UnauthorizedError, ConflictError, NotFoundError, BadRequestError, ForbiddenError };
 
