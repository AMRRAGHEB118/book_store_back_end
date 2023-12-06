const express = require('express');
const router = express.Router();

const {
    createContact
} = require('../controller/contact');

router.route('/').post(createContact);

module.exports = router;