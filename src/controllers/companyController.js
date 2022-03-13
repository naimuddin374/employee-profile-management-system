const { Company, User, Profile, Invitation } = require('../models')
const { actionSuccess, serverError, badRequest, validationError, createdSuccess, updatedSuccess, uuid } = require('../utils')
const companyValidator = require('../validators/company')
const bcrypt = require('bcrypt')
const config = require('config')
const nodemailer = require('nodemailer');



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
        const { name, email, password, phone, address } = req.body


        // FORM VALIDATE
        const validate = companyValidator(req.body)
        if (!validate.isValid) {
            return validationError(res, validate.error)
        }
        // OLD COMPANY
        const oldData = await Company.findOne({ email })
        if (oldData) {
            return badRequest(res, null, 'This company already exist!')
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



        // MAKE HASH & STORE USER SCHEMA 
        const hash = await bcrypt.hash(password, 11)

        // MAKE SCHEMA
        const user = new User({
            name,
            email,
            type: 2,
            password: hash
        })
        // STORE DATA 
        await user.save()



        // PROFILE
        const profile = new Profile({
            companyId: company._id,
            userId: user._id,
            address,
            phone
        })
        await profile.save()



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
        const validate = companyValidator({ ...req.body, _id: req.params.id })
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
        const profile = await Profile.findOne({ companyId: oldData._id, "userId.role": 2 })
        await User.findOneAndUpdate({ _id: profile.userId }, { $set: { name } }, { new: true, useFindAndModify: false })
        await Profile.findOneAndUpdate({ _id: profile._id }, { $set: { phone, address } }, { new: true, useFindAndModify: false })

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


// INVITATION
exports.inviteEmployee = async (req, res) => {
    try {
        // VALIDATION
        const email = req.body.email
        if (!email) {
            return validationError(res, { email: 'The email field is required!' });
        }


        // CHECK USER
        const oldData = await User.findOne({ email });
        if (oldData) {
            return badRequest(res, null, 'This email already exist!');
        }



        // MAKE TOKEN
        const token = uuid();


        // SHAVE TOKEN
        const invitation = new Invitation({
            companyId: req.user.companyId,
            email,
            token
        })
        const result = await invitation.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('MY_EMAIL'),
                pass: config.get('MY_PASS')
            }
        });

        const url = `${config.get('CLIENT_BASE_URL')}/register/${token}`;

        const mailOptions = {
            from: config.get('MY_EMAIL'),
            to: email,
            subject: 'Send Invitation',
            text: url
        };

        await transporter.sendMail(mailOptions);
        return createdSuccess(res, 'Invitation has been sent successfully!', result);
    } catch (error) {
        return serverError(res, error)
    }
}