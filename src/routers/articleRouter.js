const router = require('express').Router()
const { authenticate } = require('../middleware')

// Import Controller
const { get, store, update, remove, activeInactive, getDetail, getAll } = require('../controllers/articleController')


router.get('/', get)
router.get('/all', authenticate, getAll)
router.get('/:id', getDetail)
router.post('/', authenticate, store)
router.put('/:id', authenticate, update)
router.delete('/:id', authenticate, remove)
router.get('/active/inactive/:id', authenticate, activeInactive)



module.exports = router