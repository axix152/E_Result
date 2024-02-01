const express = require('express')
const router =  express.Router()

// ***** Injected Halqa controller
const HalqaController = require('../controllers/halqa.controller')

// ********* POST Route
router.post('/add-halqa',HalqaController.addHalqa)

// ******** GET ROUTE
router.get('/',HalqaController.allHalqa)

// ******* PUT ROUTE (update)
router.put('/update-details',HalqaController.updateCandidateVote)


module.exports = router