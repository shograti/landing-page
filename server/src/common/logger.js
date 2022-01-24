const winston = require("winston");

const config = {
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ json: false }),
    ]
};

const LOG = winston.createLogger(config);

module.exports = { LOG };
