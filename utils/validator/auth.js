const { check } = require('express-validator')
const validatorMiddleware = require('../../middleware/validatorMiddleware')


exports.signupValidator = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be a string'),
    check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
    validatorMiddleware
]

exports.loginValidator = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be a string'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    validatorMiddleware
]