const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models')
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
        const user = await User.findOne({ email, status: 1 })

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

        const hash = await bcrypt.hash(password, 11)

        const user = new User({
            name,
            email,
            password: hash,
            contact,
            type: 1
        })
        const result = await user.save()

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
        contact: result.contact,
        type: result.type,
    }, config.get('SECRET_KEY'), { expiresIn: '7d' })
    return token
}