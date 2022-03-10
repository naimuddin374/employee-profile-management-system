const router = require('express').Router()


// Import Controller
const { userRegister, userLogin } = require('../controllers/authController')


router.post('/register', userRegister)
router.post('/login', userLogin)

module.exports = router