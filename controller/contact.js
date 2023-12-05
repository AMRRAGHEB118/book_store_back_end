const asyncHandler = require('express-async-handler')
const contactModel = require('../model/contact')

exports.createContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.create(req.body)

    res.status(201).json({
        success: true,
        data: contact,
        message: 'Contact successfully created.',
    })
});