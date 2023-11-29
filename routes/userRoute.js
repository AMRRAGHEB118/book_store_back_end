const express = require('express')
const router = express.Router()

const {
    signupValidator,
    loginValidator,
} = require('../utils/validator/auth')

const {
    signup,
    login,
    logout,
} = require('../controller/auth')

router.route('/login').post(loginValidator, login)
router.route('/logout').post(logout)
router.route('/signup').post(signupValidator, signup)

module.exports = router