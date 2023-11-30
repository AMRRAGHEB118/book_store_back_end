const ApiError = require('../utils/apiError')
const asyncHandler = require('express-async-handler')
const productModel = require('../model/product')

exports.createProduct = asyncHandler(async (req, res) => {
    const product = await productModel.create(req.body)

    res.status(201).json({
        success: true,
        data: product,
        message: 'Product successfully created.',
    })
})

exports.getProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    res.status(200).json({
        success: true,
        data: product,
        message: 'Product successfully retrieved.',
    })
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    res.status(200).json({
        success: true,
        data: product,
        message: 'Product successfully updated.',
    })
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findByIdAndDelete(req.params.id)

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    res.status(200).json({
        success: true,
        data: null,
        message: 'Product successfully deleted.',
    })
})