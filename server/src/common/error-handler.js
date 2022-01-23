const { NotFoundError, UnauthorizedError, ConflictError, ForbiddenError, BadRequestError, TechnicalError } = require(".");

function getOrBuidApiError(error) {
    switch (error.constructor) {
    case NotFoundError:
    case UnauthorizedError:
    case ConflictError:
    case ForbiddenError:
    case BadRequestError:
    case TechnicalError:
        return error;
    default:
        return new TechnicalError();        
    }
}
 
function handleError(error, res) {
    const apiError = getOrBuidApiError(error);
    res.status(apiError.status()).json(apiError.body());
}

module.exports = { handleError };