const { Schema, model} = require('mongoose');

const commentSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    },
}, {
    timestamps: true
})

const commentModel = model('Comment', commentSchema);

module.exports = commentModel;