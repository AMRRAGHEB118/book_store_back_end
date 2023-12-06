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

exports.getProductCount = asyncHandler(async (req, res) => {
    const count = await productModel.countDocuments();
    res.status(200).json({
        success: true,
        data: count,
        message: 'Product count successfully retrieved.',
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

exports.filterProductsByCategory = asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.query.category) filter.category = req.query.category
    req.filter = filter;
    next();
})


exports.getProductsForBuyer = asyncHandler(async (req, res) => {
    const filter = req.filter
    const limit = parseInt(req.query.limit) || 12
    const page = parseInt(req.query.page) || 1
    const skip = (page - 1) * limit;
    const products = await productModel.find(filter).skip(skip).limit(limit).select('coverImage _id title price');

    if(!products) {
        throw new ApiError(404, 'Products not found')
    }

    res.status(200).json({
        success: true,
        data: products,
        message: 'Products successfully retrieved.',
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