const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, Invitation, Profile } = require('../models')
const { actionSuccess, createdSuccess, badRequest, serverError, validationError } = require('../utils')
const loginValidator = require('../validators/login')
const registerValidator = require('../validators/register')





// USER LOGIN METHOD
exports.userLogin = async (req, res) => {
    try {
        // FORM VALIDATE
        const validate = loginValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }


        const { email, password } = req.body

        // Check credentials
        const user = await User.findOne({ email })
        if (!user) {
            return badRequest(res, null, 'Invalid Credentials!')
        } else if (user.status === 0) {
            return badRequest(res, null, 'Your account has been inactive, please contact with support!!!')
        }


        // Match Password
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return badRequest(res, null, 'Invalid Credential!')
        }


        const profile = await Profile.findOne({ userId: user._id }).populate(['userId', 'companyId'])


        if (profile.companyId && profile.companyId.status !== 1) {
            return badRequest(res, null, 'Your company has been inactive, please contact with support!!!')
        }

        const obj = {
            ...user._doc,
            companyId: profile?.companyId?._id || null,
            companyName: profile?.companyId?.name || null
        }
        const token = await tokenGenerator(obj)
        return actionSuccess(res, 'Logged In Successfully', `Bearer ${token}`)

    } catch (error) {
        return serverError(res, error)
    }
}



// USER REGISTER METHOD
exports.userRegister = async (req, res) => {
    try {
        const { name, password, email, token } = req.body


        // FORM VALIDATE
        const validate = registerValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }



        // CHECK TOKEN VALIDITY
        const invitation = await Invitation.findOne({ token, status: 1 }).populate('companyId')
        if (!invitation) {
            return badRequest(res, null, 'Invalid Token!')
        } if (invitation.companyId.status === 0) {
            return badRequest(res, null, 'Company Inactive!')
        }



        // USER ALREADY EXIST
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return badRequest(res, null, 'This email address already exist!')
        }


        // MAKE HASH & STORE USER SCHEMA 
        const hash = await bcrypt.hash(password, 11)
        const user = new User({
            name,
            email,
            password: hash,
            role: 1
        })
        const result = await user.save()


        // PROFILE SCHEMA STORE
        const profile = new Profile({
            userId: user._id,
            companyId: invitation.companyId._id,
            invitationId: invitation._id,
        })
        await profile.save()
        await Invitation.findOneAndUpdate({ token }, { $set: { statue: 0 } }, { new: true, useFindAndModify: false })


        return createdSuccess(res, 'Registered Successful.', result)
    } catch (error) {
        return serverError(res, error)
    }
}




// Token Generate
const tokenGenerator = async (payload) => {
    let token = await jwt.sign({
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        companyId: payload.companyId,
        companyName: payload.companyName,
    }, config.get('SECRET_KEY'), { expiresIn: '7d' })
    return token
}