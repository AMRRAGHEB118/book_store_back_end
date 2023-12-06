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
    updateProductBySeller,
    deleteProduct,
    getProductsForSeller
} = require('../controller/product')

router.route('/').post(createValidator, createProduct)
router.route('/:id').get(getValidator, getProduct).put(updateValidator, updateProductBySeller).delete(deleteValidator, deleteProduct)
router.route('/seller/:sellerId').get(getProductsForSeller)

module.exports = router