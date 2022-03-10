const { Company } = require('../models')
const { actionSuccess, serverError, badRequest, validationError, createdSuccess, updatedSuccess } = require('../utils')
const companyValidator = require('../validators/company')



// GET ALL DATA WITH PAGINATION
exports.getAll = async (req, res) => {
    try {
        const data = await Company.find().sort({ _id: -1 })
        return actionSuccess(res, '', data)
    } catch (error) {
        return serverError(res, error)
    }
}



// GET DETAIL
exports.getDetail = async (req, res) => {
    try {
        const detail = await Company.findById(req.params.id)
        const users = await Profile.find({ companyId: req.params.id })
        return actionSuccess(res, '', { detail, users })
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA STORE 
exports.store = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body


        // FORM VALIDATE
        const validate = companyValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // MAKE SCHEMA
        const company = new Company({
            name,
            email,
            phone,
            address,
        })
        // STORE DATA 
        const result = await company.save()

        return createdSuccess(res, '', result)
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA UPDATE
exports.update = async (req, res) => {
    try {
        const { name, address, phone } = req.body


        // FORM VALIDATE
        const validate = companyValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // ID VALIDITY
        const oldData = await Company.findById(req.params.id)
        if (!oldData) {
            return badRequest(res, null, 'Invalid ID!')
        }


        const formData = {
            name, address, phone
        }


        // UPDATE  
        const result = await Company.findOneAndUpdate({ _id: oldData._id }, { $set: formData }, { new: true, useFindAndModify: false })

        return updatedSuccess(res, result, 'company has been updated successfully!!!')
    } catch (error) {
        return serverError(res, error)
    }
}





// ACTIVE INACTIVE HANDLER
exports.activeInactive = async (req, res) => {
    try {
        //  ALREADY EXIST
        const oldData = await Company.findOne({ _id: req.params.id })
        if (!oldData) {
            return badRequest(res, null, 'Invalid ID!')
        }

        const status = parseInt(req.query.status) || 0

        // UPDATE  
        const result = await Company.findOneAndUpdate({ _id: oldCompany._id }, { $set: { status } }, { new: true, useFindAndModify: false })

        return updatedSuccess(res, result, `The company has been ${status === 1 ? 'active' : 'inactive'} successfully!!!`)
    } catch (error) {
        return serverError(res, error)
    }
}