const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        validate: [validator.isEmail, 'Email is invalid'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: [true, 'Password must be unique'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
        type: String,
        enum: ['admin', 'buyer', 'seller'],
        default: 'buyer',
    }
},
{ 
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const userModel = model('User', userSchema)

module.exports = userModel