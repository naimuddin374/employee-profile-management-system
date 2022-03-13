const router = require('express').Router()
const { authenticate } = require('../middleware')

// Import Controller
const { update, activeInactive, getAll, getDetail } = require('../controllers/userController')


router.get('/', authenticate, getAll)
router.get('/:id', authenticate, getDetail)
router.put('/:id', authenticate, update)
router.get('/active/inactive/:id', authenticate, activeInactive)


module.exports = router