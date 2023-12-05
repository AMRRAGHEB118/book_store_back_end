const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
})


const contactModel = model('Contact', contactSchema);

module.exports = contactModel;