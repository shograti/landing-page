const { HttpStatus } = require("./http-status");

function ApiErrorMixin(clazz) {
  return class extends Error {
    #status;

    constructor(status) {
      super();
      this.status = this.status.bind(this);
      this.body = this.body.bind(this);
      this.#status = status;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, clazz);
      }
    }

    status() {
      return this.#status;
    }

    body() {
      return this.message ? { message: this.message } : { message: "No Details" };
    }
  }
}

class TechnicalError extends ApiErrorMixin(Error) {
  message;
  constructor(message = HttpStatus.INTERNAL_SERVER_ERROR.message) {
    super(HttpStatus.INTERNAL_SERVER_ERROR.code);
    this.message = message;
  }
}

class UnauthorizedError extends ApiErrorMixin(Error) {
  message;
  constructor(message = HttpStatus.UNAUTHORIZED.message) {
    super(HttpStatus.UNAUTHORIZED.code);
    this.message = message;
  }
}

class NotFoundError extends ApiErrorMixin(Error) {
  message;
  constructor(message = HttpStatus.NOT_FOUND.message) {
    super(HttpStatus.NOT_FOUND.code);
    this.message = message;
  }
}

class ConflictError extends ApiErrorMixin(Error) {
  message;
  constructor(message = HttpStatus.CONFLICT.message) {
    super(HttpStatus.CONFLICT.code);
    this.message = message;
  }
}

module.exports = { TechnicalError, UnauthorizedError, ConflictError }
