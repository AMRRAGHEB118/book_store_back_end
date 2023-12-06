const ApiError = require('../utils/apiError')
const asyncHandler = require('express-async-handler')
const userModel = require('../model/user')
const cartModel = require('../model/cart')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { addToBlackList } = require('./blackList')

const generateToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    })
}

exports.signup = asyncHandler(async (req, res) => {
    const user = await userModel.create(req.body)

    if(user.role === 'buyer') {
        const cart = await cartModel.create({
            user: user._id
        })
        user.cart = cart
    }

    const token = generateToken(user._id)

    res.status(201).json({
        success: true,
        data: {
            user,
            token
        },
        message: 'User successfully created.',
    })
})
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(
            new ApiError(400, 'Please provide both email and password.')
        )
    }

    const user = await userModel.findOne({ email }).select('+password')

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(
            new ApiError(401, 'The email or password you entered is incorrect.')
        )
    }

    const token = generateToken(user._id)

    res.status(200).json({
        success: true,
        data: {
            user,
            token
        },
        message: 'Logged in successfully.',
    })
})

exports.logout = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    await addToBlackList(token);
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
});
