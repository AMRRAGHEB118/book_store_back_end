const ApiError = require('../utils/apiError')
const asyncHandler = require('express-async-handler')
const cartModel = require('../model/cart')
const productModel = require('../model/product')
const { updateProductByBuyer } = require('./product')


exports.getCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId

    const cart = await cartModel.findOne({ user: userId })
        .populate({
            path: 'products.product',
            select: 'price title coverImage _id',
            populate: {
                path: 'category',
                select: 'title',
                model: 'Category'
            }
        });

    if (!cart) {
        throw new ApiError(404, 'Cart not found')
    }

    res.status(200).json({
        success: true,
        data: cart,
        message: 'Cart successfully retrieved.',
    })
})

exports.deleteCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId

    const cart = await cartModel.findOneAndDelete({ user: userId })

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    res.status(200).json({
        success: true,
        data: cart,
        message: 'Cart successfully deleted.',
    })
})

exports.addToCart = asyncHandler(async (req, res) => {
    const offer = req.query.offer
    const { userId, quantity } = req.body
    const { productId } = req.params

    const cart = await cartModel
        .findOne({ user: userId })
        .populate('products.product')

    let product = await productModel.findById(productId)

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    const offerDiscount = offer ? (product.price * (offer / 100) * quantity) : 0;

    if (!cart) {
        const newCart = await cartModel.create({
            user: userId,
            products: [{
                product: productId,
                price: product.price,
                quantity: quantity,
            }],
            totalPrice: (product.price * quantity) - offerDiscount,
            discount: offerDiscount,
        });

        product = await Promise.resolve(updateProductByBuyer(productId, quantity));

        res.status(200).json({
            success: true,
            data: {
                cart: newCart,
                product
            },
            message: 'Product successfully added to cart.',
        })
    } else {
        const productIndex = cart.products.findIndex((index) => index.product.equals(productId));

        if (productIndex === -1) {
            cart.products.push({
                product: productId,
                price: product.price,
                quantity: quantity,
            })
            cart.totalPrice += (product.price * quantity) - offerDiscount;
            cart.discount += offerDiscount;
            await cart.save()

            product = await Promise.resolve(updateProductByBuyer(productId, quantity));

            res.status(200).json({
                success: true,
                data: {
                    cart,
                    product
                },
                message: 'Product successfully added to cart.',
            })
        } else {
            cart.products[productIndex].quantity += quantity
            const productPrice = cart.products[productIndex].price
            cart.totalPrice += (productPrice * quantity) - offerDiscount;
            cart.discount += offerDiscount;
            await cart.save()

            product = await Promise.resolve(updateProductByBuyer(productId, quantity));

            res.status(200).json({
                success: true,
                data: cart,
                message: 'Product successfully added to cart.',
            })
        }
    }
})

exports.deleteFromCart = asyncHandler(async (req, res) => {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
        const newCart = await cartModel.create({
            user: userId,
            products: [],
            totalPrice: 0
        });

        res.status(200).json({
            success: true,
            data: newCart,
            message: 'Cart successfully created.',
        })
    }

    const productIndex = cart.products.findIndex((index) => index.product.equals(productId));

    if (productIndex === -1) {
        throw new ApiError(404, 'Product not found');
    } else {
        cart.products[productIndex].quantity -= quantity
        cart.totalPrice -= (cart.products[productIndex].price * quantity)
        await cart.save()

        const product = await Promise.resolve(updateProductByBuyer(productId, -quantity));

        res.status(200).json({
            success: true,
            data: {
                cart,
                product
            },
            message: 'Product successfully removed from cart.',
        })
    }
})