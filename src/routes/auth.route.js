const express =  require('express')
const router =  express.Router()

// ****** Controllers Injected
const authController =  require('../controllers/auth.controller')

// ****** auth user routes

// ******  POST ROUTE
router.post('/register',authController.registerUser)

// ****** GET ROUTE
router.get('/login',authController.loginUser)

module.exports = router