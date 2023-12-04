const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');


exports.createValidator = [
    check('title')
        .notEmpty()
        .withMessage('Category title required')
        .trim(),
    validatorMiddleware
]
