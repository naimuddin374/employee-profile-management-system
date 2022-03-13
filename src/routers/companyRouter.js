const router = require('express').Router()
const { authenticate } = require('../middleware')

// Import Controller
const { store, update, activeInactive, getDetail, getAll, inviteEmployee } = require('../controllers/companyController')


router.get('/', authenticate, getAll)
router.get('/:id', getDetail)
router.post('/', store)
router.put('/:id', authenticate, update)
router.get('/active/inactive/:id', authenticate, activeInactive)
router.post('/invite', authenticate, inviteEmployee)



module.exports = router