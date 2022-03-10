const { Schema, model } = require('mongoose');

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number, //0=INACTIVE, 1=ACTIVE
        default: 1
    },
}, { timestamps: true })


module.exports = model('Company', CompanySchema)