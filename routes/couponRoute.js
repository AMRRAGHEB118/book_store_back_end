const express = require('express');
const router = express.Router();

const {
    applyCoupon,
    generateCoupon
} = require('../controller/coupon');

router.route('/apply').post(applyCoupon);
router.route('/generate/:productId').post(generateCoupon);

module.exports = router;