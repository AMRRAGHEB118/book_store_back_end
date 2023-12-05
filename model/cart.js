const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: { unique: true, dropDups: true }
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    total_price: {
        type: Number,
        default: 0
    }
})

const cartModel = model('cart', cartSchema)

module.exports = cartModel