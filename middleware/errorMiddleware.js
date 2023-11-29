const dotenv = require('../config/config')

const ENV = process.env.NODE_ENV
const ApiError = require('../utils/apiError')

const sendErrorForDev = (err, req, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        error: err,
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
    })
}

const sendErrorForProd = (err, res) => {
    return res.status(err.status_code).json({
        status: err.status_code,
        message: err.message,
        timestamp: new Date().toISOString(),
    })
}

const handleSpecialError = (
    err_name,
    status_code = 400,
    err_msg = 'Error'
) => {
    if (err.name === err_name) {
        err = new ApiError(status_code, err_msg)
    }
}

const globalError = (err, req, res, next) => {
    err.status_code = err.status_code || 500
    err.status = err.status || 'error'

    if (ENV === 'development') {
        sendErrorForDev(err, req, res)
    } else if (ENV === 'production') {
        handleSpecialError(
            'JsonWebTokenError',
            401,
            'Invalid authentication token.'
        )
        handleSpecialError(
            'TokenExpiredError',
            401,
            'Authentication token has expired.'
        )
        return sendErrorForProd(err, res)
    }
}

module.exports = globalError