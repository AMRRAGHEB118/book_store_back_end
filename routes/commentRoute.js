const express = require('express');
const router = express.Router();

const {
    createComment,
    getComments
} = require('../controller/comment');

router.route('/').post(createComment).get(getComments);

module.exports = router