function WithStatusCode(clazz) {
  return class extends Error {
    statusCode;

    constructor(statusCode) {
      super();
      this.status = this.status.bind(this);
      this.statusCode = statusCode;
    }

    status() {
      return this.statusCode;
    }
  }
}

class TechnicalError extends WithStatusCode(Error) {
  constructor() {
    super(500);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TechnicalError);
    }
  }
}

class UnauthorizedError extends WithStatusCode(Error) {
  constructor() {
    super(401);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

class ConflictError extends WithStatusCode(Error) {
  constructor() {
    super(404);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

module.exports = { TechnicalError, UnauthorizedError, ConflictError }