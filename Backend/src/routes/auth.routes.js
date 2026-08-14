const express = require('express')
const authController = require('../Controller/auth.controllers')
const authMiddleWare = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register', authController.userRegister)

router.post('/login', authController.userLogin)

router.get('/logout', authController.userLogOut) 

router.get('/get-me',authMiddleWare.authUser, authController.userController )


module.exports = router