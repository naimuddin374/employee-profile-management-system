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
    contact: {
        type: Number,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    type: {
        type: Number, //1=USER, 2=EDITOR, 3=ADMIN
        default: 2
    },
    status: {
        type: Number, //0=INACTIVE, 1=ACTIVE
        default: 1
    },
    inactiveDate: {
        type: Date,
        default: null
    }
}, { timestamps: true })


module.exports = model('User', UserSchema)