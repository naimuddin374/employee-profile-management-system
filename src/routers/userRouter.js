const router = require('express').Router()
const { authenticate } = require('../middleware')

// Import Controller
const { get, store, update, remove, activeInactive, getAll, getDetail } = require('../controllers/userController')


router.get('/', get)
router.get('/id', getDetail)
router.get('/all', authenticate, getAll)
router.post('/', authenticate, store)
router.put('/:id', authenticate, update)
router.delete('/:id', authenticate, remove)
router.get('/active/inactive/:id', authenticate, activeInactive)


module.exports = router