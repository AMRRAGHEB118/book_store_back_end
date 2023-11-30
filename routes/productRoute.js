const express = require('express')
const router = express.Router()

const {
    createValidator,
    getValidator,
    updateValidator,
    deleteValidator
} = require('../utils/validator/product')

const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controller/product')

router.route('/').post(createValidator, createProduct)
router.route('/:id').get(getValidator, getProduct).put(updateValidator, updateProduct).delete(deleteValidator, deleteProduct)

module.exports = router