//const ERROR_VALIDATION = 400;
//const ERROR_NOT_FOUND = 404;
//const ERROR_SERVER = 500;


const ValidationError = require('./ValidationError')
const AthorizedError = require('./AthorizedError')
const ForbiddenError = require('./ForbiddenError')
const NotFoundError = require('./NotFoundError')
const ConflictError = require('./ConflictError')
const ServerError = require('./ServerError')


module.exports = { ValidationError, AthorizedError, ForbiddenError, NotFoundError, ConflictError, ServerError };

