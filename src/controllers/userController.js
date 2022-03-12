const { User, Profile } = require('../models')
const { actionSuccess, serverError, badRequest, updatedSuccess } = require('../utils')





// GET ALL DATA WITH PAGINATION
exports.getAll = async (req, res) => {
    try {
        const user = req.user
        let where = {};
        if (user.role !== 3) {
            where.companyId = user.companyId;
        }

        const result = await Profile.find(where).sort({ _id: -1 }).populate('userId')
        return actionSuccess(res, '', result)
    } catch (error) {
        return serverError(res, error)
    }
}

// GET DETAIL
exports.getDetail = async (req, res) => {
    try {
        const user = await Profile.findByOne({ userId: req.params.id, }).populate(['userId', 'companyId'])
        return actionSuccess(res, '', user)
    } catch (error) {
        return serverError(res, error)
    }
}



// UPDATE
exports.update = async (req, res) => {
    try {
        const { name, phone, address } = req.body

        const result = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { name } }, { new: true, useFindAndModify: false })
        await Profile.findOneAndUpdate({ userId: req.user._id }, { $set: { phone, address } }, { new: true, useFindAndModify: false })
        return updatedSuccess(res, result, 'Profile has been updated successfully!!!')
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
        const result = await User.findOneAndUpdate({ _id: oldUser._id }, { $set: { status } }, { new: true, useFindAndModify: false })
        return updatedSuccess(res, result, `User has been ${status === 1 ? 'active' : 'inactive'} successfully!!!`);
    } catch (error) {
        return serverError(res, error)
    }
}