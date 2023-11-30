const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Category title is required'],
        unique: [true, 'Category title must be unique'],
    },

    slug: {
        type: String,
        lowercase: true,
    }

},
    {
        timestamps: true
    })

const categoryModel = model('Category', categorySchema)
module.exports = categoryModel