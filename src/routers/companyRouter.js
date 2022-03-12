const router = require('express').Router()
const { authenticate } = require('../middleware')

// Import Controller
const { store, update, activeInactive, getDetail, getAll } = require('../controllers/companyController')


router.get('/', authenticate, getAll)
router.get('/:id', getDetail)
router.post('/', store)
router.put('/:id', authenticate, update)
router.get('/active/inactive/:id', authenticate, activeInactive)



module.exports = router