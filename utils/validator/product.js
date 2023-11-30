const { check } = require('express-validator')
const validatorMiddleware = require('../../middleware/validatorMiddleware')


exports.createValidator = [
    check('title')
    .notEmpty()
    .withMessage('Product title required')
    .trim(),
    check('description')
    .notEmpty()
    .withMessage('Product description is required'),
    check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .isInt({ min: 0 })
    .withMessage('Quantity cannot be negative'),
    check('sold')
    .optional()
    .isNumeric()
    .withMessage('Sold must be a number')
    .isInt({ min: 0 })
    .withMessage('Sold cannot be negative'),
    check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
    check('cover_image')
    .notEmpty()
    .withMessage('Product image Cover is required')
    .isString()
    .withMessage('Cover image must be a string'),
    check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid category ID')
    .custom(async (category_id) => {
        const category = await category_model.findById(category_id)
        if (!category) {
            return Promise.reject(
                new Error(`No category for this Id : ${category}`)
            )
        }
        return Promise.resolve()
    }),
    validatorMiddleware,
]

exports.getValidator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validatorMiddleware,
]

exports.updateValidator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validatorMiddleware,
]

exports.deleteValidator = [
    check('id').isMongoId().withMessage('Invalid Product ID'),
    validatorMiddleware,
]