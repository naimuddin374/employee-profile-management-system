const { User } = require('../models')
const { actionSuccess, serverError, badRequest, validationError, createdSuccess } = require('../utils')
const registerValidator = require('../validators/register')
const bcrypt = require('bcrypt')



// GET DATA LIST
exports.get = async (req, res) => {
    return getByPaginate(res, null, req.query)
}


// GET DATA BY PAGINATE
const getByPaginate = async (res, message = null, query = {}) => {
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 10

    try {
        const user = await User.find().skip((limit * page) - limit).limit(limit).sort({ _id: -1 })
        const totalDocument = await User.countDocuments()

        const resObj = {
            totalPage: Math.ceil(totalDocument / limit),
            data: user,
        }

        return actionSuccess(res, message, resObj)
    } catch (error) {
        return serverError(res, error)
    }
}




// GET ALL DATA WITH PAGINATION
exports.getAll = async (req, res) => {
    try {
        const user = await User.find({ type: 2 }).sort({ _id: -1 })
        return actionSuccess(res, '', user)
    } catch (error) {
        return serverError(res, error)
    }
}

// GET DETAIL
exports.getDetail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return actionSuccess(res, '', user)
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA STORE 
exports.store = async (req, res) => {
    try {
        const { name, password, contact, email } = req.body


        // FORM VALIDATE
        const validate = registerValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // USER ALREADY EXIST
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return badRequest(res, null, 'This email already exist!')
        }

        // PASSWORD HASH
        const hash = await bcrypt.hash(password, 11)
        // COUNT TOTAL USER


        await User.findOneAndUpdate({ type: 2, status: 1 }, { $set: { status: 0, inactiveDate: new Date() } }, { new: true, useFindAndModify: false })


        // MAKE USER SCHEMA
        const user = new User({
            name,
            password: hash,
            contact,
            email,
            type: 2
        })
        // STORE USER 
        const result = await user.save()

        return createdSuccess(res, '', result)
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA UPDATE
exports.update = async (req, res) => {
    try {
        const { name, password, contact, address } = req.body


        // FORM VALIDATE
        const validate = registerValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // USER ID VALIDITY
        const oldUser = await User.findById(req.params.id)
        if (!oldUser) {
            return badRequest(res, null, 'Invalid ID!')
        }


        // PASSWORD HASH
        let hash
        if (password) {
            hash = await bcrypt.hash(password, 11)
        }

        const formData = {
            name,
            contact,
            address,
        }


        // UPDATE USER 
        await User.findOneAndUpdate({ _id: oldUser._id }, { $set: formData }, { new: true, useFindAndModify: false })

        return getByPaginate(res, 'User has been updated successfully!!!')
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA DELETE 
exports.remove = async (req, res) => {
    try {
        // USER ALREADY EXIST
        const oldUser = await User.findOne({ _id: req.params.id, status: 0 })
        if (!oldUser) {
            return badRequest(res, null, 'Invalid ID!')
        }


        // UPDATE USER 
        await User.findOneAndUpdate({ _id: oldUser._id }, { $set: { status: 0 } }, { new: true, useFindAndModify: false })

        return getByPaginate(res, 'User has been removed successfully!!!')
    } catch (error) {
        return serverError(res, error)
    }
}




// ACTIVE INACTIVE HANDLER
exports.activeInactive = async (req, res) => {
    try {
        // USER ALREADY EXIST
        const oldUser = await User.findOne({ _id: req.params.id })
        if (!oldUser) {
            return badRequest(res, null, 'Invalid ID!')
        }

        const status = parseInt(req.query.status) || 0

        // UPDATE USER 
        await User.findOneAndUpdate({ _id: oldUser._id }, { $set: { status } }, { new: true, useFindAndModify: false })

        return getByPaginate(res, `User has been ${status === 1 ? 'active' : 'inactive'} successfully!!!`)
    } catch (error) {
        return serverError(res, error)
    }
}