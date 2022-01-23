function httpStatus(code, message) {
    return { code, message };
}

const HttpStatus = Object.freeze({
    OK: httpStatus(200, "OK"),
    CREATED: httpStatus(201, "Created"),
    NO_CONTENT: httpStatus(204, "No Content"),
    BAD_REQUEST: httpStatus(400, "Bad Request"),
    UNAUTHORIZED: httpStatus(401, "Unauthorized"),
    FORBIDDEN: httpStatus(403, "Forbidden"),
    NOT_FOUND: httpStatus(404, "Not Found"),
    CONFLICT: httpStatus(409, "Conflict"),
    INTERNAL_SERVER_ERROR: httpStatus(500, "Internal Server Error")
});

module.exports = { HttpStatus };