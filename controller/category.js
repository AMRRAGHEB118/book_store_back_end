const asyncHandler = require('express-async-handler');
const categoryModel = require('../model/category');
const slugify = require('slugify');


exports.createCategory = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    const category = await categoryModel.create(req.body)

    res.status(201).json({
        success: true,
        data: category,
        message: 'Category successfully created.',
    })
})

exports.createCategories = asyncHandler(async (req, res) => {
    req.body = req.body.map(category => {
        category.slug = slugify(category.title)
        return category
    })
    const categories = await categoryModel.insertMany(req.body)

    res.status(201).json({
        success: true,
        data: categories,
        message: 'Categories successfully created.',
    })
})

exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await categoryModel.find().select('title');

    res.status(200).json({
        success: true,
        data: categories,
        message: 'Categories successfully retrieved.',
    })
})