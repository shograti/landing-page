const { TechnicalError, ApiError } = require(".");

function getOrBuidApiError(error) {
    if (error instanceof ApiError) {
        return error;
    } 
    return new TechnicalError();
}
 
function handleError(error, res) {
    const apiError = getOrBuidApiError(error);
    res.status(apiError.status()).json(apiError.body());
}

module.exports = { handleError };
