const asyncHandler = require('express-async-handler')
const couponModel = require('../model/coupon')


exports.applyCoupon = asyncHandler(async (req, res) => {
    const { id, product } = req.body
    const coupon = await couponModel.findOne({ _id: id, product: product })

    if (!coupon) {
        throw new ApiError(404, 'Coupon not found')
    }

    res.status(200).json({
        success: true,
        data: coupon,
        message: 'Coupon successfully applied.',
    })
})

exports.generateCoupon = asyncHandler(async (req, res) => {
    const productId = req.params.productId
    const coupon = await couponModel.create({
        product: productId
    })

    res.status(201).json({
        success: true,
        data: coupon,
        message: 'Coupon successfully created.',
    })
})