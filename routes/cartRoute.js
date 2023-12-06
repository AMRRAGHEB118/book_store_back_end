const express = require('express');
const router = express.Router();

const {
    getCart,
    deleteCart,
    addToCart,
    deleteFromCart
} = require('../controller/cart');

router.route('/').get(getCart).delete(deleteCart);
router.route('/:productId').post(addToCart).put(deleteFromCart);

module.exports = router;