const express =  require('express')
const router =  express.Router()

// ******* Injecting controller
const CategoryController = require('../controllers/category.controller')

// ****** ROUTE FOR CATEGORY

// ****** POST ROUTES
router.post('/add-category',CategoryController.addCategory )

// ****** GET ROUTES
router.get('/all-category',CategoryController.allCategory)


// ******* PUT (udpate routes)
router.put('/update-category/:categoryId',CategoryController.updateCategory)

module.exports = router