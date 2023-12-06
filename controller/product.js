const ApiError = require('../utils/apiError')
const asyncHandler = require('express-async-handler')
const productModel = require('../model/product')
const slugify = require('slugify')

exports.createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    const product = await productModel.create(req.body)

    res.status(201).json({
        success: true,
        data: product,
        message: 'Product successfully created.',
    })
})

exports.getProductsForSeller = asyncHandler(async (req, res) => {
    const products = await productModel.find({ seller: req.params.sellerId }).populate('category', 'title');

    const formattedProducts = products.map(product => ({
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category.title,
        quantity: product.quantity,
        sold: product.sold,
        coverImage: product.coverImage,
        updatedAt: formatDate(product.updatedAt),
    }));

    res.status(200).json({
        success: true,
        data: formattedProducts,
        message: 'Products successfully retrieved.',
    });
});

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

exports.updateProductBySeller = asyncHandler(async (req, res) => {
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

exports.updateProductByBuyer = asyncHandler(async (productId, quantity) => {
    const product = await productModel.findByIdAndUpdate(
        productId,
        {
            $inc: { sold: quantity, quantity: -quantity },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    return product;
});

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

function formatDate(date) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}