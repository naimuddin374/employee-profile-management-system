const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Number, //1=EMPLOYEE, 2=COMPANY ADMINISTRATOR, 3=SYSTEM ADMINISTRATOR
        default: 1
    },
    status: {
        type: Number, //0=INACTIVE, 1=ACTIVE
        default: 1
    }
}, { timestamps: true })


module.exports = model('User', UserSchema)