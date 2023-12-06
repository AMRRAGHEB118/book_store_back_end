const express = require('express');
const router = express.Router();

const {
    createComment,
    getComments
} = require('../controller/comment');

router.route('/').post(createComment);
router.route('/:productId').get(getComments);

module.exports = router