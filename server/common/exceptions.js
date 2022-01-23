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

  constructor(message = "Internal Server Error") {
    super(500);
    this.message = message;
  }
}

class UnauthorizedError extends ApiErrorMixin(Error) {
  message;

  constructor(message = "Unauthorized") {
    super(401);
    this.message = message;
  }
}

class ConflictError extends ApiErrorMixin(Error) {
  message;

  constructor(message = "Conflict") {
    super(409);
    this.message = message;
  }
}

module.exports = { TechnicalError, UnauthorizedError, ConflictError }
