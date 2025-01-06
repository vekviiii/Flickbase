const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

///MIDDLEWARE
const auth = require('../middleware/auth')

router.route('/profile')
.get(auth('readOwn','profile'), userController.profile)
.patch(auth('updateOwn','profile'), userController.updateProfile)

router.patch('/email',auth('updateOwn','profile'), userController.updateUserEmail)
router.get('/verify', userController.VerifyAccount)

module.exports = router