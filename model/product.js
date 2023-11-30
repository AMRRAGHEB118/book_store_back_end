const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Product title is required'],
        unique: [true, 'Product title must be unique'],
    },

    slug: {
        type: String,
        lowercase: true,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be non-negative'],
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Product category is required'],
    },

    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be non-negative'],
        default: 0,
    },

    sold: {
        type: Number,
        required: [true, 'Product sold is required'],
        min: [0, 'Product sold must be non-negative'],
        default: 0,
    },

    cover_image: {
        type: String,
        required: true,
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Product seller is required'],
    }
},
    {
        timestamps: true
    })

const productModel = model('products', productSchema)

module.exports = productModel