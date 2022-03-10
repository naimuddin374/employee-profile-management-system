const { Article } = require('../models')
const { actionSuccess, serverError, badRequest, validationError, createdSuccess } = require('../utils')
const articleValidator = require('../validators/article')



// GET DATA LIST
exports.get = async (req, res) => {
    return getByPaginate(res, null, req.query)
}


// GET DATA BY PAGINATE
const getByPaginate = async (res, message = null, query = {}) => {
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 10

    try {
        const data = await Article.find().skip((limit * page) - limit).limit(limit).sort({ _id: -1 })
        const totalDocument = await Article.countDocuments()

        const resObj = {
            totalPage: Math.ceil(totalDocument / limit),
            data,
        }

        return actionSuccess(res, message, resObj)
    } catch (error) {
        return serverError(res, error)
    }
}




// GET ALL DATA WITH PAGINATION
exports.getAll = async (req, res) => {
    try {
        const data = await Article.find().sort({ _id: -1 })
        return actionSuccess(res, '', data)
    } catch (error) {
        return serverError(res, error)
    }
}

// GET DETAIL
exports.getDetail = async (req, res) => {
    try {
        const data = await Article.findById(req.params.id)
        return actionSuccess(res, '', data)
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA STORE 
exports.store = async (req, res) => {
    try {
        const { title, description } = req.body


        // FORM VALIDATE
        const validate = articleValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // MAKE SCHEMA
        const article = new Article({
            title,
            description,
            publisherId: req.user._id,
            publishDate: new Date()
        })
        // STORE DATA 
        const result = await article.save()

        return createdSuccess(res, '', result)
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA UPDATE
exports.update = async (req, res) => {
    try {
        const { title, description } = req.body


        // FORM VALIDATE
        const validate = articleValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        // ID VALIDITY
        const oldData = await Article.findById(req.params.id)
        if (!oldData) {
            return badRequest(res, null, 'Invalid ID!')
        }


        const formData = {
            title,
            description,
        }


        // UPDATE  
        await Article.findOneAndUpdate({ _id: oldData._id }, { $set: formData }, { new: true, useFindAndModify: false })

        return getByPaginate(res, 'Article has been updated successfully!!!')
    } catch (error) {
        return serverError(res, error)
    }
}



// DATA DELETE 
exports.remove = async (req, res) => {
    try {
        // ALREADY EXIST
        const oldData = await Article.findOne({ _id: req.params.id, status: 0 })
        if (!oldData) {
            return badRequest(res, null, 'Invalid ID!')
        }


        // UPDATE  
        await Article.findOneAndUpdate({ _id: oldData._id }, { $set: { status: 0 } }, { new: true, useFindAndModify: false })

        return getByPaginate(res, 'Article has been removed successfully!!!')
    } catch (error) {
        return serverError(res, error)
    }
}




// ACTIVE INACTIVE HANDLER
exports.activeInactive = async (req, res) => {
    try {
        //  ALREADY EXIST
        const oldData = await Article.findOne({ _id: req.params.id })
        if (!oldData) {
            return badRequest(res, null, 'Invalid ID!')
        }

        const status = parseInt(req.query.status) || 0

        // UPDATE  
        await Article.findOneAndUpdate({ _id: oldArticle._id }, { $set: { status } }, { new: true, useFindAndModify: false })

        return getByPaginate(res, `Article has been ${status === 1 ? 'active' : 'inactive'} successfully!!!`)
    } catch (error) {
        return serverError(res, error)
    }
}