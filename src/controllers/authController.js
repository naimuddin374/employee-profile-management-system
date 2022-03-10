const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, Invitation, Company, Profile } = require('../models')
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
        const user = await Profile.findOne({ "userId.email": email, "userId.status": 1, "companyId.status": 1 })
        // .where('user.email').equals(email)

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

        const token = await tokenGenerator(user)
        return actionSuccess(res, 'Logged In Successfully', `Bearer ${token}`)

    } catch (error) {
        return serverError(res, error)
    }
}



// USER REGISTER METHOD
exports.userRegister = async (req, res) => {
    try {
        const { name, password, contact, email, token } = req.body


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
            type: 1
        })
        const result = await user.save()


        // PROFILE SCHEMA STORE
        const profile = new Profile({
            userId: user._id,
            companyId: invitation.companyId._id,
            invitationId: invitation._id,
        })
        await profile.save()


        return createdSuccess(res, 'Registered Successful.', result)
    } catch (error) {
        return serverError(res, error)
    }
}




// Token Generate
const tokenGenerator = async (result) => {
    let token = await jwt.sign({
        _id: result._id,
        name: result.name,
        email: result.email,
        type: result.type,
    }, config.get('SECRET_KEY'), { expiresIn: '7d' })
    return token
}