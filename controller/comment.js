const asyncHandler = require('express-async-handler');
const commentModel = require('../model/comment');

exports.createComment = asyncHandler(async (req, res) => {
    const comment = await commentModel.create(req.body)

    const comments = await commentModel
        .find({ product: req.body.product })
        .populate('user', 'username email')

    res.status(201).json({
        success: true,
        data: {
            comment,
            comments
        },
        message: 'Comment successfully created.',
    })
})

exports.getComments = asyncHandler(async (req, res) => {
    const comments = await commentModel
        .find({ product: req.params.productId })
        .populate('user', 'username email')

    res.status(200).json({
        success: true,
        data: comments,
        message: 'Comments successfully retrieved.',
    })
})
