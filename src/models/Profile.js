const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: null,
    },
    invitationId: {
        type: Schema.Types.ObjectId,
        ref: 'Invitation',
        default: null,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        default: null,
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
}, { timestamps: true })


module.exports = model('Profile', ProfileSchema)