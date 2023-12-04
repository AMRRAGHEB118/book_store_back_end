const express = require('express');
const router = express.Router();

const {
    createValidator,
} = require('../utils/validator/category');

const {
    createCategory,
    createCategories,
    getCategories
} = require('../controller/category');

router.route('/').post(createValidator, createCategory).get(getCategories);
router.route('/many').post(createCategories);

module.exports = router;
